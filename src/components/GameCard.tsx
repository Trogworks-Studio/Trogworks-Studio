import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faGamepad } from "@fortawesome/free-solid-svg-icons";
import StatusBadge from "./StatusBadge";
import PlatformIcon from "./PlatformIcon";
import type { Game } from "@prisma/client";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="hud-panel hud-panel-hover group flex flex-col overflow-hidden"
    >
      <div className="relative h-40 w-full overflow-hidden bg-ink-700">
        {game.coverImage ? (
          <Image
            src={game.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-500">
            <FontAwesomeIcon icon={faGamepad} className="h-8 w-8" />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink-950/80 to-transparent" />
        <div className="absolute left-3 top-3">
          <StatusBadge status={game.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-parchment-100 group-hover:text-hex-300">
          {game.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-parchment-500">
          {game.tagline}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2 text-parchment-500">
            {game.platforms.map((p) => (
              <PlatformIcon key={p} platform={p} className="h-4 w-4" />
            ))}
          </div>
          <span className="flex items-center gap-1.5 font-display text-sm text-hex-300">
            Arenaya Gir
            <FontAwesomeIcon
              icon={faArrowRight}
              className="h-3 w-3 transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
