"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Kayıt başarısız oldu.");
      setBusy(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setBusy(false);

    if (signInRes?.error) {
      router.push("/login");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <div className="mb-6 flex justify-center">
        <Image
          src="/images/mascots/mascot-thumbsup-bust.png"
          alt="Trogworks"
          width={90}
          height={90}
          className="h-24 w-24 object-contain"
        />
      </div>
      <h1 className="text-center font-display text-3xl text-parchment">Atölyeye Katıl</h1>
      <p className="mt-2 text-center text-sm text-muted-text">
        Bir hesap oluştur, seviye atla, özel ödüller kazan.
      </p>

      <form onSubmit={submit} className="workshop-panel mt-8 space-y-4 rounded-2xl p-6">
        {error && (
          <p className="rounded-lg border border-crimson/40 bg-crimson/10 px-3 py-2 text-sm text-crimson">
            {error}
          </p>
        )}
        <Field
          icon={faUser}
          type="text"
          placeholder="Adın (görünecek isim)"
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />
        <Field
          icon={faEnvelope}
          type="email"
          placeholder="E-posta adresin"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <Field
          icon={faLock}
          type="password"
          placeholder="Şifre (en az 6 karakter)"
          value={form.password}
          onChange={(v) => setForm((f) => ({ ...f, password: v }))}
        />
        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-goblin px-4 py-3 font-bold text-ink hover:bg-goblin-bright disabled:opacity-60"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          {busy ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-text">
        Zaten hesabın var mı?{" "}
        <Link href="/login" className="font-bold text-brass-bright">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}

function Field({ icon, type, placeholder, value, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-surface-line bg-surface px-4 py-3 focus-within:border-brass">
      <FontAwesomeIcon icon={icon} className="text-muted-text" />
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-ink-text placeholder:text-muted-text focus:outline-none"
      />
    </div>
  );
}
