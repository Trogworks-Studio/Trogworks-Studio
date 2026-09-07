const statusLabels: Record<string, string> = {
  PLANLANIYOR: "Planlanıyor",
  GELISTIRILIYOR: "Geliştiriliyor",
  ERKEN_ERISIM: "Erken Erişim",
  YAYINDA: "Yayında",
  ARSIVLENDI: "Arşivlendi",
};

const statusStyles: Record<string, string> = {
  PLANLANIYOR: "border-parchment-500/50 text-parchment-300 bg-parchment-500/10",
  GELISTIRILIYOR: "border-hex-400/60 text-hex-300 bg-hex-500/10",
  ERKEN_ERISIM: "border-bronze-400/60 text-bronze-300 bg-bronze-500/10",
  YAYINDA: "border-vex-400/60 text-vex-300 bg-vex-500/10",
  ARSIVLENDI: "border-ink-500/60 text-parchment-500 bg-ink-700/40",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`hud-tag inline-flex items-center border px-2.5 py-1 text-[11px] font-display uppercase tracking-wider ${
        statusStyles[status] || "border-ink-500/40 text-parchment-400"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
