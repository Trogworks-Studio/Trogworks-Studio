import { statusLabels, statusColors } from "@/lib/utils";

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2.5 py-1 text-xs font-medium tracking-wide ${
        statusColors[status] || "border-bog-400/40 text-bone-400"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
