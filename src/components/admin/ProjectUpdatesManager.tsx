"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import { formatDate } from "@/lib/utils";
import type { ProjectUpdate } from "@prisma/client";

export default function ProjectUpdatesManager({
  projectId,
  updates,
}: {
  projectId: string;
  updates: ProjectUpdate[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eklenemedi");
      setTitle("");
      setBody("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eklenemedi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-bog-500/50 bg-bog-800/40 p-5">
      <h3 className="font-display text-base text-bone-100">
        Gelisme Kayitlari
      </h3>

      {updates.length > 0 && (
        <ul className="mt-4 space-y-3">
          {updates.map((update) => (
            <li
              key={update.id}
              className="flex items-start justify-between gap-3 border-b border-bog-500/30 pb-3"
            >
              <div className="min-w-0">
                <p className="text-xs text-bone-500">
                  {formatDate(update.createdAt)}
                </p>
                <p className="text-sm font-medium text-bone-200">
                  {update.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-bone-500">
                  {update.body}
                </p>
              </div>
              <DeleteButton
                endpoint={`/api/admin/projects/${projectId}/updates/${update.id}`}
                confirmText="Bu gelisme kaydini silmek istedigine emin misin?"
              />
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          required
          placeholder="Kayit basligi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-sm border border-bog-500/60 bg-bog-900 px-3 py-2 text-sm text-bone-200 focus:border-ooze-500"
        />
        <textarea
          required
          rows={3}
          placeholder="Ne oldu, ne degisti?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full rounded-sm border border-bog-500/60 bg-bog-900 px-3 py-2 text-sm text-bone-200 focus:border-ooze-500"
        />
        {error && <p className="text-xs text-ember-300">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-sm border border-ooze-600/50 px-3 py-2 text-xs font-medium text-ooze-300 hover:bg-ooze-900/30 disabled:opacity-60"
        >
          <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
          Kayit Ekle
        </button>
      </form>
    </div>
  );
}
