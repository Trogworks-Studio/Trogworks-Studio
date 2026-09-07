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
      className="group flex flex-col overflow-hidden rounded-sm border border-bog-500/50 bg-bog-800/60 transition-colors hover:border-rune-500/60"
    >
      <div className="relative h-40 w-full overflow-hidden bg-bog-700">
        {game.coverImage ? (
          <Image
            src={game.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-bog-400">
            <FontAwesomeIcon icon={faGamepad} className="h-8 w-8" />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge status={game.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-bone-100 group-hover:text-rune-300">
          {game.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-bone-500">
          {game.tagline}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2 text-bone-500">
            {game.platforms.map((p) => (
              <PlatformIcon key={p} platform={p} className="h-4 w-4" />
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-sm text-rune-300">
            Incele
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
