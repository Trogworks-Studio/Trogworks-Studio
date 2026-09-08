"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });
    setBusy(false);
    if (res?.error) {
      setError("E-posta veya şifre hatalı.");
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <div className="mb-6 flex justify-center">
        <Image
          src="/images/mascots/mascot-waving-bust.png"
          alt="Trogworks"
          width={90}
          height={90}
          className="h-24 w-24 object-contain"
        />
      </div>
      <h1 className="text-center font-display text-3xl text-parchment">Atölyeye Geri Dön</h1>
      <p className="mt-2 text-center text-sm text-muted-text">
        Hesabına giriş yap ve kaldığın yerden devam et.
      </p>

      <form onSubmit={submit} className="workshop-panel mt-8 space-y-4 rounded-2xl p-6">
        {error && (
          <p className="rounded-lg border border-crimson/40 bg-crimson/10 px-3 py-2 text-sm text-crimson">
            {error}
          </p>
        )}
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
          placeholder="Şifren"
          value={form.password}
          onChange={(v) => setForm((f) => ({ ...f, password: v }))}
        />
        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brass px-4 py-3 font-bold text-ink hover:bg-brass-bright disabled:opacity-60"
        >
          <FontAwesomeIcon icon={faRightToBracket} />
          {busy ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-text">
        Hesabın yok mu?{" "}
        <Link href="/register" className="font-bold text-brass-bright">
          Hemen oluştur
        </Link>
      </p>

      <p className="mt-3 rounded-lg border border-surface-line bg-surface px-3 py-2 text-center text-xs text-muted-text">
        Demo hesap: <strong className="text-ink-text">goblin@trogworks.studio</strong> / atolye1234
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
