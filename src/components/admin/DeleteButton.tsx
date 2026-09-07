"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteButton({
  endpoint,
  confirmText = "Bunu silmek istedigine emin misin?",
}: {
  endpoint: string;
  confirmText?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm(confirmText)) return;
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      window.alert("Silme islemi basarisiz oldu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-sm border border-wound-500/40 px-2.5 py-1.5 text-xs text-wound-400 transition-colors hover:bg-wound-600/20 disabled:opacity-50"
    >
      <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
      Sil
    </button>
  );
}
