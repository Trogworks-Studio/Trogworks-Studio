"use client";

import { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bir sorun oldu");
      setStatus("done");
      setMessage("Duman isaretin alindi. Bataklik haberlerini kacirmayacaksin.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Bir sorun oldu");
    }
  }

  return (
    <div>
      <h3 className="font-display text-sm text-bone-300">Bataklik Postasi</h3>
      <p className="mt-3 text-sm text-bone-500">
        Yeni surumler ve yazilar cikinca haberin olsun.
      </p>
      {status === "done" ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-ooze-400">
          <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
          {message}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            E-posta adresin
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sen@bataklik.com"
            className="w-full min-w-0 rounded-sm border border-bog-500/60 bg-bog-800 px-3 py-2 text-sm text-bone-200 placeholder:text-bone-500/60 focus:border-ooze-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex shrink-0 items-center gap-2 rounded-sm bg-ooze-600 px-3 py-2 text-sm font-medium text-bog-900 transition-colors hover:bg-ooze-500 disabled:opacity-60"
          >
            <FontAwesomeIcon icon={faScroll} className="h-3.5 w-3.5" />
            Katil
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-ember-300">{message}</p>
      )}
    </div>
  );
}
