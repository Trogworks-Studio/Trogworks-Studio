import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlay, faDice } from "@fortawesome/free-solid-svg-icons";
import { getGameBySlug, getGames } from "@/lib/queries/content";
import { statusBadge } from "@/lib/format";

export function generateStaticParams() {
  return getGames().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  return { title: game ? `${game.name} — Trogworks Studio` : "Oyun bulunamadı" };
}

export default async function GameDetailPage({ params }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const badge = statusBadge(game.status);

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/games" className="flex items-center gap-2 text-sm font-semibold text-muted-text hover:text-brass-bright">
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Tüm oyunlar
      </Link>

      <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Image
          src={game.cover_image}
          alt={game.name}
          width={140}
          height={140}
          className="h-32 w-32 shrink-0 object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.color}`}>
              {badge.label}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-surface-line px-2.5 py-0.5 text-xs font-semibold text-muted-text">
              <FontAwesomeIcon icon={faDice} /> {game.genre}
            </span>
          </div>
          <h1 className="mt-2 font-display text-4xl text-parchment">{game.name}</h1>
          <p className="mt-2 text-lg text-muted-text">{game.summary}</p>
        </div>
      </div>

      <div className="workshop-panel mt-8 rounded-2xl p-6 sm:p-8">
        <p className="whitespace-pre-line text-base leading-relaxed text-ink-text">
          {game.description}
        </p>
      </div>

      <div className="mt-8">
        {game.play_url ? (
          <Link
            href={game.play_url}
            className="flex w-fit items-center gap-2 rounded-xl bg-brass px-5 py-3 font-bold text-ink hover:bg-brass-bright"
          >
            <FontAwesomeIcon icon={faPlay} />
            Şimdi Oyna
          </Link>
        ) : (
          <p className="text-sm text-muted-text">Bu oyun henüz oynanabilir değil — geliştirme sürüyor.</p>
        )}
      </div>
    </article>
  );
}
