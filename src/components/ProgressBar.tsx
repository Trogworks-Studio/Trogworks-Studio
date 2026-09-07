export default function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="flex items-center justify-between font-display text-xs uppercase tracking-wider text-parchment-500">
        <span>Kazı İlerlemesi</span>
        <span className="text-vex-400">%{clamped}</span>
      </div>
      <div
        className="stat-bar-track mt-2"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="stat-bar-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
