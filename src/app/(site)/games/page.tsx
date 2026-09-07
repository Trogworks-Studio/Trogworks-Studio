import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import GameCard from "@/components/GameCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Oyunlar",
  description: "Trogworks Studio tarafindan gelistirilen oyunlar.",
};

export default async function GamesPage() {
  const games = await prisma.game.findMany({
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        kicker="Kazanda kaynayanlar"
        title="Oyunlar"
        description="Gelistirdigimiz butun oyunlar; kimi web'de hemen oynanabilir, kimi henuz kazanda kaynaniyor."
      />

      {games.length === 0 ? (
        <p className="mt-10 text-bone-500">
          Henuz yayinlanmis bir oyun yok, cok yakinda burada olacak.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
