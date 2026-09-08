export default function XPBar({ level, xp, xpForNext }) {
  const pct = Math.min(100, Math.round((xp / xpForNext) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-brass-bright">Seviye {level}</span>
        <span className="text-muted-text">
          {xp} / {xpForNext} XP
        </span>
      </div>
      <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full border border-surface-line bg-surface">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brass-deep via-brass to-brass-bright transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
