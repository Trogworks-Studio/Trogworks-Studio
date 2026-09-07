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
      if (!res.ok) throw new Error(data.error || "Mesaj gönderilemedi");
      setStatus("done");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Mesaj gönderilemedi");
    }
  }

  if (status === "done") {
    return (
      <div className="hud-panel flex items-center gap-3 p-6 text-vex-300">
        <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
        <p>Mesajın bataklık postasına düştü. En kısa sürede döneriz.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="hud-panel space-y-5 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-display text-xs uppercase tracking-wider text-bronze-400">
            Adın
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1.5 w-full border border-ink-500/60 bg-ink-800 px-3 py-2.5 text-parchment-200 focus:border-vex-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-display text-xs uppercase tracking-wider text-bronze-400">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 w-full border border-ink-500/60 bg-ink-800 px-3 py-2.5 text-parchment-200 focus:border-vex-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="font-display text-xs uppercase tracking-wider text-bronze-400">
          Konu
        </label>
        <input
          id="subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="mt-1.5 w-full border border-ink-500/60 bg-ink-800 px-3 py-2.5 text-parchment-200 focus:border-vex-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="font-display text-xs uppercase tracking-wider text-bronze-400">
          Mesajın
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1.5 w-full resize-none border border-ink-500/60 bg-ink-800 px-3 py-2.5 text-parchment-200 focus:border-vex-500 focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-wound-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-hud flex items-center gap-2 bg-vex-600 px-5 py-2.5 text-sm font-display text-ink-950 disabled:opacity-60"
      >
        <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
        {status === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
      </button>
    </form>
  );
}
