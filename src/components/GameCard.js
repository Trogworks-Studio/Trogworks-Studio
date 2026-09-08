import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDice } from "@fortawesome/free-solid-svg-icons";
import { statusBadge } from "@/lib/format";

export default function GameCard({ game }) {
  const badge = statusBadge(game.status);
  return (
    <Link
      href={`/games/${game.slug}`}
      className="workshop-panel group flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-b from-brass-deep/25 to-surface">
        <Image
          src={game.cover_image}
          alt={game.name}
          width={140}
          height={140}
          className="h-36 w-36 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-surface-line bg-ink/70 px-2.5 py-1 text-[11px] font-bold text-brass-bright backdrop-blur">
          <FontAwesomeIcon icon={faDice} /> {game.genre}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl text-parchment">{game.name}</h3>
          <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.color}`}>
            {badge.label}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-text">{game.summary}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-bold text-brass-bright">
          Detayları gör <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
