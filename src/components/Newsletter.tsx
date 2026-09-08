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
      setMessage("Duman işaretin alındı. Bataklık haberlerini kaçırmayacaksın.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Bir sorun oldu");
    }
  }

  return (
    <div className="newsletter-console">
      <p className="game-footer__eyebrow">Frekans 07 // Günlük sinyali</p>
      <h3 className="mt-3 font-display text-xl text-parchment-100">
        Yeni kayıtları al
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-parchment-500">
        Yeni sürümler ve yazılar çıktığında sinyalini aç.
      </p>
      {status === "done" ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-vex-400">
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
            className="hud-panel w-full min-w-0 bg-ink-800 px-3 py-2.5 text-sm text-parchment-200 placeholder:text-parchment-500/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-hud flex shrink-0 items-center gap-2 bg-vex-600 px-3 py-2 text-sm font-medium text-ink-950 disabled:opacity-60"
          >
            <FontAwesomeIcon icon={faScroll} className="h-3.5 w-3.5" />
            Katıl
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-wound-400">{message}</p>
      )}
    </div>
  );
}
