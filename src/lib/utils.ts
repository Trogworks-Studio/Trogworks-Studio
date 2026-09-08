import slugify from "slugify";

export function toSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: "tr" });
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export const statusLabels: Record<string, string> = {
  PLANLANIYOR: "Planlanıyor",
  GELISTIRILIYOR: "Geliştiriliyor",
  ERKEN_ERISIM: "Erken Erişim",
  YAYINDA: "Yayında",
  ARSIVLENDI: "Arşivlendi",
};

export const statusColors: Record<string, string> = {
  PLANLANIYOR: "border-parchment-500/50 text-parchment-300 bg-parchment-500/10",
  GELISTIRILIYOR: "border-hex-400/60 text-hex-300 bg-hex-500/10",
  ERKEN_ERISIM: "border-bronze-400/60 text-bronze-300 bg-bronze-500/10",
  YAYINDA: "border-vex-400/60 text-vex-300 bg-vex-500/10",
  ARSIVLENDI: "border-ink-500/60 text-parchment-500 bg-ink-700/40",
};

export const platformLabels: Record<string, string> = {
  WEB: "Web",
  WINDOWS: "Windows",
  MACOS: "macOS",
  LINUX: "Linux",
  ANDROID: "Android",
  IOS: "iOS",
};

export const platformIcons: Record<string, string> = {
  WEB: "globe",
  WINDOWS: "windows",
  MACOS: "apple",
  LINUX: "linux",
  ANDROID: "android",
  IOS: "apple",
};

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
