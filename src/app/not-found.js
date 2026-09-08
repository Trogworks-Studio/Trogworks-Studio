import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Image
        src="/images/mascots/mascot-shocked.png"
        alt="Bulunamadı"
        width={140}
        height={140}
        className="h-32 w-32 object-contain"
      />
      <h1 className="mt-4 font-display text-4xl text-parchment">404</h1>
      <p className="mt-2 text-muted-text">
        Bu dişli atölyede yok gibi görünüyor — aradığın sayfa bulunamadı.
      </p>
      <Link
        href="/"
        className="mt-6 flex items-center gap-2 rounded-xl bg-brass px-5 py-2.5 text-sm font-bold text-ink hover:bg-brass-bright"
      >
        <FontAwesomeIcon icon={faHouse} />
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
