import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faGamepad,
  faListCheck,
  faLockOpen,
  faLock,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/SectionHeading";
import XPBar from "@/components/XPBar";
import { auth } from "@/lib/auth";
import { getUserById, publicUser, getUserRewards, getAllRewards } from "@/lib/queries/users";
import { getQuestsForUser } from "@/lib/queries/quests";
import { xpToNextLevel } from "@/lib/gameLogic";

export const metadata = { title: "Kontrol Paneli — Trogworks Studio" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/dashboard");

  const dbUser = getUserById(session.user.id);
  const user = publicUser(dbUser);
  const rewards = getUserRewards(user.id);
  const allRewards = getAllRewards();
  const quests = getQuestsForUser(user.id);
  const xpForNext = xpToNextLevel(user.level);

  const activeQuests = quests.filter((q) => q.status !== "claimed").length;
  const completedQuests = quests.filter((q) => q.status !== "in_progress").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading eyebrow="Kontrol Paneli" title={`Selam, ${user.name}!`} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="workshop-panel rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full ring-2 ring-brass/50"
              />
              <div>
                <p className="font-display text-2xl text-parchment">{user.name}</p>
                <p className="text-sm text-muted-text">{user.email}</p>
              </div>
            </div>
            <div className="mt-6">
              <XPBar level={user.level} xp={user.xp} xpForNext={xpForNext} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <MiniStat icon={faCoins} label="Gear Coin" value={user.gearCoins} />
              <MiniStat icon={faLayerGroup} label="Toplam XP" value={user.totalXp} />
              <MiniStat icon={faListCheck} label="Aktif Görev" value={activeQuests} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/game"
                className="flex items-center gap-2 rounded-xl bg-brass px-4 py-2.5 text-sm font-bold text-ink hover:bg-brass-bright"
              >
                <FontAwesomeIcon icon={faGamepad} />
                Oyunu Oyna
              </Link>
              <Link
                href="/quests"
                className="flex items-center gap-2 rounded-xl border border-surface-line px-4 py-2.5 text-sm font-bold text-ink-text hover:border-goblin/60"
              >
                <FontAwesomeIcon icon={faListCheck} />
                Görevlere Git
              </Link>
            </div>
          </div>

          <div className="workshop-panel rounded-2xl p-6">
            <h3 className="font-display text-xl text-parchment">Görev Özeti</h3>
            <p className="mt-1 text-sm text-muted-text">
              {completedQuests} görev tamamlandı / {quests.length} toplam görev.
            </p>
            <div className="mt-4 space-y-2">
              {quests.slice(0, 5).map((q) => (
                <div key={q.user_quest_id} className="flex items-center justify-between text-sm">
                  <span className="text-ink-text">{q.title}</span>
                  <span
                    className={
                      q.status === "claimed"
                        ? "text-muted-text"
                        : q.status === "completed"
                        ? "font-bold text-brass-bright"
                        : "text-goblin-bright"
                    }
                  >
                    {q.status === "claimed"
                      ? "Alındı"
                      : q.status === "completed"
                      ? "Ödül bekliyor"
                      : `${q.progress}/${q.target}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="workshop-panel rounded-2xl p-6">
          <h3 className="font-display text-xl text-parchment">Ödül Rafın</h3>
          <div className="mt-4 space-y-3">
            {allRewards.map((r) => {
              const unlocked = rewards.some((ur) => ur.id === r.id);
              return (
                <div
                  key={r.id}
                  className={`flex items-start gap-3 rounded-xl border p-3 ${
                    unlocked ? "border-brass/40 bg-brass/10" : "border-surface-line bg-surface"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={unlocked ? faLockOpen : faLock}
                    className={unlocked ? "mt-1 text-brass-bright" : "mt-1 text-muted-text"}
                  />
                  <div>
                    <p className={`text-sm font-bold ${unlocked ? "text-parchment" : "text-muted-text"}`}>
                      Sv. {r.level} — {r.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-surface-line bg-surface p-3">
      <FontAwesomeIcon icon={icon} className="text-brass" />
      <p className="mt-1 font-display text-xl text-parchment">{value}</p>
      <p className="text-[11px] text-muted-text">{label}</p>
    </div>
  );
}
