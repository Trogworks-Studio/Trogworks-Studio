"use client";

import { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Mesaj gonderilemedi");
      setStatus("done");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Mesaj gonderilemedi");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 border border-ooze-600/40 bg-ooze-900/20 p-6 text-ooze-300">
        <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
        <p>Mesajin bataklik postasina dustu. En kisa surede doneriz.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm text-bone-300">
            Adin
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1.5 w-full rounded-sm border border-bog-500/60 bg-bog-800 px-3 py-2.5 text-bone-200 focus:border-ooze-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-bone-300">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 w-full rounded-sm border border-bog-500/60 bg-bog-800 px-3 py-2.5 text-bone-200 focus:border-ooze-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="text-sm text-bone-300">
          Konu
        </label>
        <input
          id="subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="mt-1.5 w-full rounded-sm border border-bog-500/60 bg-bog-800 px-3 py-2.5 text-bone-200 focus:border-ooze-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm text-bone-300">
          Mesajin
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1.5 w-full resize-none rounded-sm border border-bog-500/60 bg-bog-800 px-3 py-2.5 text-bone-200 focus:border-ooze-500"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-ember-300">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2 rounded-sm bg-ooze-600 px-5 py-2.5 text-sm font-medium text-bog-900 transition-colors hover:bg-ooze-500 disabled:opacity-60"
      >
        <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
        {status === "loading" ? "Gonderiliyor..." : "Mesaji Gonder"}
      </button>
    </form>
  );
}
