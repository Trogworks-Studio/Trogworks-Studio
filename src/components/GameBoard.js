"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faBolt, faLock, faLockOpen, faGem } from "@fortawesome/free-solid-svg-icons";
import XPBar from "@/components/XPBar";
import { REWARD_INTERVAL } from "@/lib/gameLogic";

let floatId = 0;

export default function GameBoard({ initialUser, initialXpForNext, initialRewards, allRewards }) {
  const { update } = useSession();
  const [user, setUser] = useState(initialUser);
  const [xpForNext, setXpForNext] = useState(initialXpForNext);
  const [unlockedRewardIds, setUnlockedRewardIds] = useState(
    new Set(initialRewards.map((r) => r.id))
  );
  const [floaters, setFloaters] = useState([]);
  const [toast, setToast] = useState(null);
  const [pressed, setPressed] = useState(false);
  const busyRef = useRef(false);

  const click = useCallback(
    async (e) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setPressed(true);
      setTimeout(() => setPressed(false), 120);

      try {
        const res = await fetch("/api/game/click", { method: "POST" });
        const data = await res.json();
        if (!res.ok) {
          setToast(data.error || "Bir hata oluştu.");
          return;
        }
        if (data.rateLimited) return;

        setUser(data.user);
        setXpForNext(data.xpForNext);

        const id = floatId++;
        const rect = e?.currentTarget?.getBoundingClientRect?.();
        const x = rect ? Math.random() * rect.width : 50;
        setFloaters((f) => [
          ...f,
          { id, xp: data.gainedXp, crit: data.isCrit, x },
        ]);
        setTimeout(() => {
          setFloaters((f) => f.filter((fl) => fl.id !== id));
        }, 900);

        if (data.unlockedRewards?.length > 0) {
          setUnlockedRewardIds((prev) => {
            const next = new Set(prev);
            data.unlockedRewards.forEach((r) => next.add(r.id));
            return next;
          });
          setToast(
            `🎉 Seviye ${data.levelsGained.at(-1)}! Özel ödül kilidi açıldı: "${data.unlockedRewards[0].title}"`
          );
        } else if (data.leveledUp) {
          setToast(`Seviye atladın! Şimdi seviye ${data.user.level}.`);
        }
      } finally {
        busyRef.current = false;
      }
    },
    []
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // Kontrol panelindeki oturum bilgisini de tazele (sadece level değiştiyse)
  const lastLevel = useRef(user.level);
  useEffect(() => {
    if (user.level !== lastLevel.current) {
      lastLevel.current = user.level;
      update();
    }
  }, [user.level, update]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="workshop-panel relative overflow-hidden rounded-2xl p-6 sm:p-8">
        {toast && (
          <div className="absolute left-1/2 top-4 z-20 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-brass/40 bg-ink/95 px-4 py-3 text-center text-sm font-bold text-brass-bright shadow-xl">
            {toast}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={44}
              height={44}
              className="rounded-full ring-2 ring-brass/50"
            />
            <div>
              <p className="text-sm font-bold text-ink-text">{user.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-text">
                <FontAwesomeIcon icon={faCoins} className="text-brass" /> {user.gearCoins} Dişli
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <XPBar level={user.level} xp={user.xp} xpForNext={xpForNext} />
        </div>

        <div className="relative mt-10 flex justify-center">
          <button
            onClick={click}
            className={`relative select-none rounded-full transition-transform ${
              pressed ? "scale-95" : "scale-100 hover:scale-105"
            }`}
            aria-label="Atölyeye tıkla, XP kazan"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-goblin/20 blur-2xl" />
            <Image
              src="/images/mascots/mascot-tinkerer.png"
              alt="Atölye goblin'i"
              width={260}
              height={260}
              className="w-56 drop-shadow-[0_16px_30px_rgba(0,0,0,0.55)] sm:w-64"
              priority
            />
            {floaters.map((f) => (
              <span
                key={f.id}
                className={`pointer-events-none absolute top-1/3 animate-[floatUp_0.9s_ease-out_forwards] text-lg font-extrabold ${
                  f.crit ? "text-crimson" : "text-brass-bright"
                }`}
                style={{ left: `${f.x}px` }}
              >
                +{f.xp} XP{f.crit ? " ✨" : ""}
              </span>
            ))}
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-muted-text">
          Goblin&apos;e tıkla, dişli topla. Kritik tıklamalarda XP 3 katına çıkar!
        </p>

        <style>{`
          @keyframes floatUp {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-70px); }
          }
        `}</style>
      </div>

      <div className="workshop-panel rounded-2xl p-6">
        <h3 className="flex items-center gap-2 font-display text-xl text-parchment">
          <FontAwesomeIcon icon={faGem} className="text-brass" />
          Seviye Ödülleri
        </h3>
        <p className="mt-1 text-xs text-muted-text">
          Her {REWARD_INTERVAL} seviyede bir özel bir ödülün kilidi açılır.
        </p>
        <div className="mt-4 space-y-3">
          {allRewards.map((r) => {
            const unlocked = unlockedRewardIds.has(r.id);
            return (
              <div
                key={r.id}
                className={`flex items-start gap-3 rounded-xl border p-3 ${
                  unlocked
                    ? "border-brass/40 bg-brass/10"
                    : "border-surface-line bg-surface"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    unlocked ? "bg-brass/20 text-brass-bright" : "bg-surface-line/40 text-muted-text"
                  }`}
                >
                  <FontAwesomeIcon icon={unlocked ? faLockOpen : faLock} className="text-sm" />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-bold ${unlocked ? "text-parchment" : "text-muted-text"}`}>
                    Sv. {r.level} — {r.title}
                  </p>
                  {unlocked && (
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-text">{r.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl border border-surface-line bg-surface px-3 py-2.5 text-xs text-muted-text">
          <FontAwesomeIcon icon={faBolt} className="text-brass" />
          Sonraki ödül: Seviye{" "}
          {allRewards.find((r) => !unlockedRewardIds.has(r.id))?.level ?? "—"}
        </div>
      </div>
    </div>
  );
}
