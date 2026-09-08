import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faListCheck, faLayerGroup, faTrophy, faMedal } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import SectionHeading from "@/components/SectionHeading";
import { getLeaderboard, getCommunityStats } from "@/lib/queries/users";

export const metadata = { title: "Topluluk — Trogworks Studio" };

const MEDAL_COLORS = ["text-brass-bright", "text-muted-text", "text-[#b08d57]"];

export default function CommunityPage() {
  const leaderboard = getLeaderboard(25);
  const stats = getCommunityStats();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Topluluk"
        title="Zanaatkârlar Topluluğu"
        description="Atölyeyi büyüten herkesle tanış, skor tablosunda yerini gör, Discord'da sohbete katıl."
        align="center"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <StatCard icon={faUsers} label="Kayıtlı Zanaatkâr" value={stats.memberCount} />
        <StatCard icon={faLayerGroup} label="Toplam Seviye" value={stats.totalLevels} />
        <StatCard icon={faListCheck} label="Tamamlanan Görev" value={stats.questsClaimed} />
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="https://discord.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl bg-[#5865F2] px-6 py-3 font-bold text-white transition-colors hover:bg-[#4954d4]"
        >
          <FontAwesomeIcon icon={faDiscord} />
          Discord Sunucumuza Katıl
        </a>
      </div>

      <div className="workshop-panel mt-12 rounded-2xl p-6 sm:p-8">
        <h2 className="flex items-center gap-2 font-display text-2xl text-parchment">
          <FontAwesomeIcon icon={faTrophy} className="text-brass" />
          Skor Tablosu
        </h2>
        <div className="mt-5 divide-y divide-surface-line">
          {leaderboard.map((u, i) => (
            <div key={u.id} className="flex items-center gap-4 py-3">
              <span
                className={`flex w-7 shrink-0 justify-center font-display text-xl ${
                  i < 3 ? MEDAL_COLORS[i] : "text-muted-text"
                }`}
              >
                {i < 3 ? <FontAwesomeIcon icon={faMedal} /> : i + 1}
              </span>
              <Image
                src={u.avatar_url}
                alt={u.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink-text">{u.name}</p>
                <p className="text-xs text-muted-text">{u.total_xp} toplam XP</p>
              </div>
              <span className="shrink-0 rounded-full border border-goblin/30 bg-goblin/10 px-3 py-1 text-xs font-bold text-goblin-bright">
                Seviye {u.level}
              </span>
            </div>
          ))}
          {leaderboard.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-text">
              Henüz kimse skor tablosunda değil — kayıt ol ve ilk sen ol!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="workshop-panel rounded-2xl p-6 text-center">
      <FontAwesomeIcon icon={icon} className="text-2xl text-brass" />
      <p className="mt-3 font-display text-3xl text-parchment">{value}</p>
      <p className="mt-1 text-sm text-muted-text">{label}</p>
    </div>
  );
}
