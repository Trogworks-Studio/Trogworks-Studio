"use client";

import { useState, FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCallback = searchParams.get("callbackUrl");
  const callbackUrl = requestedCallback?.startsWith("/") && !requestedCallback.startsWith("//")
    ? requestedCallback
    : "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("E-posta veya sifre hatali.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm border border-ink-500/50 bg-ink-800/60 p-8">
      <div className="flex items-center gap-2.5 font-display text-lg text-parchment-100">
        <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-vex-600/50 bg-ink-700 text-vex-400">
          T
        </span>
        Atolye Girisi
      </div>
      <p className="mt-2 text-sm text-parchment-500">
        Sadece atolye sakinleri icin.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm text-parchment-300">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-ink-500/60 bg-ink-900 px-3 py-2.5 text-parchment-200 focus:border-vex-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-parchment-300">
            Sifre
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-ink-500/60 bg-ink-900 px-3 py-2.5 text-parchment-200 focus:border-vex-500"
          />
        </div>

        {error && <p className="text-sm text-wound-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-vex-600 px-4 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:bg-vex-500 disabled:opacity-60"
        >
          <FontAwesomeIcon icon={faKey} className="h-3.5 w-3.5" />
          {loading ? "Girilyor..." : "Giris Yap"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
