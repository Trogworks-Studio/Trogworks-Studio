import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faDownload,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";
import PlatformIcon from "@/components/PlatformIcon";
import { platformLabels } from "@/lib/utils";

export const revalidate = 60;

async function getGame(slug: string) {
  return prisma.game.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const game = await getGame(params.slug);
  if (!game) return {};

  return {
    title: game.title,
    description: game.tagline,
    openGraph: {
      title: game.title,
      description: game.tagline,
      images: game.coverImage ? [game.coverImage] : undefined,
    },
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const game = await getGame(params.slug);
  if (!game) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    genre: game.genres,
    gamePlatform: game.platforms.map((p) => platformLabels[p] || p),
    url:
      game.playUrl ||
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/games/${game.slug}`,
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={game.status} />
        {game.version && (
          <span className="text-xs text-bone-500">v{game.version}</span>
        )}
      </div>

      <h1 className="mt-4 font-display text-4xl text-bone-100 sm:text-5xl">
        {game.title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-bone-400">{game.tagline}</p>

      <div className="mt-4 flex gap-3 text-bone-500">
        {game.platforms.map((p) => (
          <span key={p} className="flex items-center gap-1.5 text-sm">
            <PlatformIcon platform={p} />
            {platformLabels[p] || p}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {game.playUrl && (
          <a
            href={game.playUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-sm bg-rune-600 px-4 py-2.5 text-sm font-medium text-bone-100 shadow-glow-rune transition-colors hover:bg-rune-500"
          >
            <FontAwesomeIcon icon={faPlay} className="h-3.5 w-3.5" />
            Hemen Oyna
          </a>
        )}
        {game.downloadUrl && (
          <a
            href={game.downloadUrl}
            className="flex items-center gap-2 rounded-sm border border-ember-400/50 px-4 py-2.5 text-sm font-medium text-ember-200 transition-colors hover:bg-ember-900/20"
          >
            <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5" />
            Indir
          </a>
        )}
        {game.trailerUrl && (
          <a
            href={game.trailerUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-sm border border-bog-400/50 px-4 py-2.5 text-sm font-medium text-bone-300 transition-colors hover:bg-bog-700"
          >
            Fragmani Izle
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {game.coverImage && (
        <div className="relative mt-10 h-72 w-full overflow-hidden rounded-sm sm:h-96">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_260px]">
        <div>
          <h2 className="font-display text-xl text-bone-100">Oyun hakkinda</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-bone-400">
            {game.description}
          </p>

          {game.gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-bone-100">Galeri</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {game.gallery.map((img, i) => (
                  <div
                    key={img + i}
                    className="relative h-40 overflow-hidden rounded-sm"
                  >
                    <Image
                      src={img}
                      alt={`${game.title} gorsel ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="border border-bog-500/50 bg-bog-800/40 p-5">
            <ProgressBar value={game.progress} />
          </div>
          {game.genres.length > 0 && (
            <div className="border border-bog-500/50 bg-bog-800/40 p-5">
              <h3 className="font-display text-sm text-bone-200">Turler</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {game.genres.map((genre) => (
                  <li
                    key={genre}
                    className="rounded-sm border border-bog-500/50 px-2 py-0.5 text-xs text-bone-400"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link
            href="/games"
            className="block text-center text-sm text-bone-500 hover:text-rune-300"
          >
            ← Tum oyunlara don
          </Link>
        </aside>
      </div>
    </div>
  );
}
