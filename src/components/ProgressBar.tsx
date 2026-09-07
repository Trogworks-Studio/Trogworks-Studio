export default function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-bone-500">
        <span>Kazi ilerlemesi</span>
        <span className="text-ooze-400">%{clamped}</span>
      </div>
      <div
        className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bog-700"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-ooze-600 to-ooze-400"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
