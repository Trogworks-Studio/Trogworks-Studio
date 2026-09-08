const STATUS_LABELS = {
  gelistiriliyor: { label: "Geliştiriliyor", color: "text-brass bg-brass/10 border-brass/30" },
  yayinda: { label: "Yayında", color: "text-goblin-bright bg-goblin/10 border-goblin/30" },
  arsiv: { label: "Arşiv", color: "text-muted-text bg-surface-line/40 border-surface-line" },
};

export function statusBadge(status) {
  return STATUS_LABELS[status] || STATUS_LABELS.gelistiriliyor;
}

const CATEGORY_LABELS = {
  duyuru: { label: "Duyuru", color: "text-brass bg-brass/10 border-brass/30" },
  gelisme: { label: "Gelişme", color: "text-goblin-bright bg-goblin/10 border-goblin/30" },
  topluluk: { label: "Topluluk", color: "text-emerald bg-emerald/10 border-emerald/30" },
};

export function categoryBadge(category) {
  return CATEGORY_LABELS[category] || CATEGORY_LABELS.duyuru;
}

const QUEST_TYPE_LABELS = {
  daily: "Günlük",
  weekly: "Haftalık",
  story: "Hikaye",
};

export function questTypeLabel(type) {
  return QUEST_TYPE_LABELS[type] || type;
}

export function formatDate(dateStr) {
  try {
    return new Date(dateStr.replace(" ", "T") + "Z").toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function techList(techStack) {
  return techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
