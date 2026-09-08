"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHammer,
  faMugHot,
  faScroll,
  faCompass,
  faUsers,
  faWrench,
  faCircleCheck,
  faGift,
  faBolt,
  faCoins,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { questTypeLabel } from "@/lib/format";

const ICONS = {
  hammer: faHammer,
  "mug-hot": faMugHot,
  scroll: faScroll,
  compass: faCompass,
  users: faUsers,
  wrench: faWrench,
};

const TYPE_ORDER = ["daily", "weekly", "story"];
const TYPE_TITLES = { daily: "Günlük Görevler", weekly: "Haftalık Görevler", story: "Hikaye Görevleri" };

export default function QuestBoard() {
  const { update } = useSession();
  const [quests, setQuests] = useState(null);
  const [claimingId, setClaimingId] = useState(null);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/quests");
    const data = await res.json();
    setQuests(data.quests || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function claim(userQuestId) {
    setClaimingId(userQuestId);
    try {
      const res = await fetch("/api/quests/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuestId }),
      });
      const data = await res.json();
      if (res.ok) {
        setToast(
          `+${data.xpGained} XP, +${data.coinsGained} Dişli kazandın!${
            data.leveledUp ? " Seviye atladın! 🎉" : ""
          }${data.unlockedRewards?.length ? " Özel ödül kilidi açıldı!" : ""}`
        );
        await load();
        await update();
      } else {
        setToast(data.error || "Bir hata oluştu.");
      }
    } finally {
      setClaimingId(null);
      setTimeout(() => setToast(null), 4000);
    }
  }

  if (!quests) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-text">
        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
        Görevler yükleniyor...
      </div>
    );
  }

  return (
    <div>
      {toast && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm font-semibold text-brass-bright">
          <FontAwesomeIcon icon={faGift} />
          {toast}
        </div>
      )}

      {TYPE_ORDER.map((type) => {
        const list = quests.filter((q) => q.type === type);
        if (list.length === 0) return null;
        return (
          <div key={type} className="mb-10">
            <h2 className="font-display text-2xl text-parchment">{TYPE_TITLES[type]}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {list.map((q) => (
                <QuestCard key={q.user_quest_id} quest={q} onClaim={claim} busy={claimingId === q.user_quest_id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuestCard({ quest, onClaim, busy }) {
  const icon = ICONS[quest.icon] || faScroll;
  const pct = Math.min(100, Math.round((quest.progress / quest.target) * 100));
  const claimed = quest.status === "claimed";
  const completed = quest.status === "completed";

  return (
    <div
      className={`workshop-panel flex flex-col gap-3 rounded-2xl p-5 ${
        claimed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-goblin/15 text-goblin-bright">
            <FontAwesomeIcon icon={icon} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-text">
              {questTypeLabel(quest.type)}
            </p>
            <h3 className="font-display text-lg text-parchment">{quest.title}</h3>
          </div>
        </div>
        {claimed && <FontAwesomeIcon icon={faCircleCheck} className="text-goblin-bright" />}
      </div>

      <p className="text-sm leading-relaxed text-muted-text">{quest.description}</p>

      <div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-gradient-to-r from-goblin to-goblin-bright transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-muted-text">
          {quest.progress} / {quest.target}
        </p>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="flex items-center gap-1 text-brass-bright">
            <FontAwesomeIcon icon={faBolt} /> {quest.xp_reward} XP
          </span>
          <span className="flex items-center gap-1 text-goblin-bright">
            <FontAwesomeIcon icon={faCoins} /> {quest.coin_reward}
          </span>
        </div>

        {claimed ? (
          <span className="text-xs font-bold text-muted-text">Alındı</span>
        ) : completed ? (
          <button
            onClick={() => onClaim(quest.user_quest_id)}
            disabled={busy}
            className="rounded-lg bg-brass px-3.5 py-1.5 text-xs font-bold text-ink hover:bg-brass-bright disabled:opacity-60"
          >
            {busy ? "..." : "Ödülü Al"}
          </button>
        ) : (
          <span className="text-xs font-semibold text-muted-text">Devam ediyor</span>
        )}
      </div>
    </div>
  );
}
