import SectionHeading from "@/components/SectionHeading";
import GameCard from "@/components/GameCard";
import { getGames } from "@/lib/queries/content";

export const metadata = { title: "Oyunlar — Trogworks Studio" };

export default async function GamesPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || "all";
  const games = getGames({ status });

  const filters = [
    { value: "all", label: "Tümü" },
    { value: "yayinda", label: "Yayında" },
    { value: "gelistiriliyor", label: "Geliştiriliyor" },
    { value: "arsiv", label: "Arşiv" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Vitrin"
        title="Oyunlarımız"
        description="Tarayıcı içi tıklama oyunumuzdan geliştirme aşamasındaki maceralara kadar tüm oyun projelerimiz."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <a
            key={f.value}
            href={f.value === "all" ? "/games" : `/games?status=${f.value}`}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              status === f.value
                ? "border-brass bg-brass/15 text-brass-bright"
                : "border-surface-line text-muted-text hover:border-goblin/50 hover:text-ink-text"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {games.length === 0 ? (
        <p className="mt-12 text-center text-muted-text">Bu filtrede henüz oyun yok.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </div>
  );
}
