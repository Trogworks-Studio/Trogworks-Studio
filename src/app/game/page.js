import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faGamepad } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/SectionHeading";
import GameBoard from "@/components/GameBoard";
import { auth } from "@/lib/auth";
import { getUserById, publicUser, getUserRewards, getAllRewards } from "@/lib/queries/users";
import { xpToNextLevel } from "@/lib/gameLogic";

export const metadata = { title: "Atölye Oyunu — Trogworks Studio" };

export default async function GamePage() {
  const session = await auth();
  const allRewards = getAllRewards();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Atölye Oyunu"
        title="Dişli Avcısı"
        description="Tıkla, XP ve Gear Coin topla, seviye atla. Basit ama bağımlılık yapan bir atölye döngüsü."
      />

      <div className="mt-10">
        {session ? (
          <GameContent userId={session.user.id} allRewards={allRewards} />
        ) : (
          <div className="workshop-panel flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
            <Image
              src="/images/mascots/mascot-electric-thumbsup.png"
              alt="Giriş gerekli"
              width={110}
              height={110}
              className="h-28 w-28 object-contain"
            />
            <h3 className="font-display text-2xl text-parchment">İlerlemeni kaydetmek ister misin?</h3>
            <p className="max-w-sm text-sm text-muted-text">
              Oyunu oynamak ve XP/seviye ilerlemeni kaydetmek için bir hesap
              oluşturman gerekiyor.
            </p>
            <div className="mt-2 flex gap-3">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-brass px-5 py-2.5 text-sm font-bold text-ink hover:bg-brass-bright"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                Hesap Oluştur
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl border border-surface-line px-5 py-2.5 text-sm font-bold text-ink-text hover:border-goblin/60"
              >
                <FontAwesomeIcon icon={faGamepad} />
                Giriş Yap
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GameContent({ userId, allRewards }) {
  const user = getUserById(userId);
  const rewards = getUserRewards(userId);
  const xpForNext = xpToNextLevel(user.level);

  return (
    <GameBoard
      initialUser={publicUser(user)}
      initialXpForNext={xpForNext}
      initialRewards={rewards}
      allRewards={allRewards}
    />
  );
}
