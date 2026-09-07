import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GameForm from "@/components/admin/GameForm";

export default async function EditGamePage({
  params,
}: {
  params: { id: string };
}) {
  const game = await prisma.game.findUnique({ where: { id: params.id } });
  if (!game) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-bone-100">
        Oyunu Duzenle: {game.title}
      </h1>
      <div className="mt-8 max-w-2xl">
        <GameForm game={game} />
      </div>
    </div>
  );
}
