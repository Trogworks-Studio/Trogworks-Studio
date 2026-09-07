import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <div className="relative h-48 w-48">
        <Image
          src="/trog/shocked.webp"
          alt="Şaşkın Trog maskotu"
          fill
          className="object-contain drop-shadow-[0_16px_20px_rgba(0,0,0,0.5)]"
        />
      </div>
      <h1 className="mt-6 font-display text-3xl text-parchment-100">
        Bu iz bataklıkta kayboldu
      </h1>
      <p className="mt-3 text-parchment-500">
        Aradığın sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
      </p>
      <Link
        href="/"
        className="btn-hud mt-6 bg-vex-600 px-5 py-2.5 text-sm font-display text-ink-950"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
