import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bog-900 px-5 text-center text-bone-200">
      <h1 className="font-display text-3xl">Bu iz bataklikta kayboldu</h1>
      <p className="mt-3 text-bone-500">Aradigin sayfa bulunamadi.</p>
      <Link
        href="/"
        className="mt-6 rounded-sm bg-ooze-600 px-5 py-2.5 text-sm font-medium text-bog-900 hover:bg-ooze-500"
      >
        Ana Sayfaya Don
      </Link>
    </div>
  );
}
