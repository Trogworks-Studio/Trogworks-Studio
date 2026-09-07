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
  PLANLANIYOR: "Planlaniyor",
  GELISTIRILIYOR: "Gelistiriliyor",
  ERKEN_ERISIM: "Erken Erisim",
  YAYINDA: "Yayinda",
  ARSIVLENDI: "Arsivlendi",
};

export const statusColors: Record<string, string> = {
  PLANLANIYOR: "bg-bone-400/20 text-bone-300 border-bone-400/40",
  GELISTIRILIYOR: "bg-rune-500/20 text-rune-200 border-rune-500/40",
  ERKEN_ERISIM: "bg-ember-400/20 text-ember-200 border-ember-400/40",
  YAYINDA: "bg-ooze-500/20 text-ooze-200 border-ooze-500/40",
  ARSIVLENDI: "bg-bog-500/40 text-bone-400 border-bog-400/40",
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
