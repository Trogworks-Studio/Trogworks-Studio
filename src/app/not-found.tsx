import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-5 text-center text-parchment-200">
      <h1 className="font-display text-3xl">Bu iz bataklıkta kayboldu</h1>
      <p className="mt-3 text-parchment-500">Aradığın sayfa bulunamadı.</p>
      <Link
        href="/"
        className="mt-6 rounded-sm bg-vex-600 px-5 py-2.5 text-sm font-medium text-ink-950 hover:bg-vex-500"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
