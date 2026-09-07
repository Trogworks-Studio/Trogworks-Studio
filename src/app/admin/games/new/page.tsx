import GameForm from "@/components/admin/GameForm";

export default function NewGamePage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-parchment-100">Yeni Oyun</h1>
      <div className="mt-8 max-w-2xl">
        <GameForm />
      </div>
    </div>
  );
}
