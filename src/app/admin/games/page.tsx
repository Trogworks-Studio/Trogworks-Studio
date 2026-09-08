import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faStar } from "@fortawesome/free-solid-svg-icons";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminGamesPage() {
  const games = await prisma.game.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl text-parchment-100">Oyunlar</h1>
        <Link
          href="/admin/games/new"
          className="flex items-center gap-2 rounded-sm bg-hex-600 px-4 py-2 text-sm font-medium text-parchment-100 hover:bg-hex-500"
        >
          <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
          Yeni Oyun
        </Link>
      </div>

      {games.length === 0 ? (
        <p className="mt-8 text-parchment-500">Henuz oyun eklenmedi.</p>
      ) : (
        <div className="mt-6 divide-y divide-ink-500/40 border border-ink-500/40">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {game.featured && (
                    <FontAwesomeIcon
                      icon={faStar}
                      className="h-3.5 w-3.5 text-bronze-300"
                      title="One cikan"
                    />
                  )}
                  <p className="truncate font-display text-base text-parchment-100">
                    {game.title}
                  </p>
                </div>
                <p className="mt-0.5 truncate text-xs text-parchment-500">
                  /games/{game.slug}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={game.status} />
                <span className="text-xs text-parchment-500">%{game.progress}</span>
                <Link
                  href={`/admin/games/${game.id}/edit`}
                  className="flex items-center gap-1.5 rounded-sm border border-ink-400/50 px-2.5 py-1.5 text-xs text-parchment-300 hover:bg-ink-700"
                >
                  <FontAwesomeIcon icon={faPen} className="h-3 w-3" />
                  Duzenle
                </Link>
                <DeleteButton
                  endpoint={`/api/admin/games/${game.id}`}
                  confirmText={`"${game.title}" oyununu silmek istedigine emin misin?`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
