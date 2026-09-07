"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Game } from "@prisma/client";
import { toSlug, platformLabels } from "@/lib/utils";

const statusOptions = [
  { value: "PLANLANIYOR", label: "Planlaniyor" },
  { value: "GELISTIRILIYOR", label: "Gelistiriliyor" },
  { value: "ERKEN_ERISIM", label: "Erken Erisim" },
  { value: "YAYINDA", label: "Yayinda" },
  { value: "ARSIVLENDI", label: "Arsivlendi" },
];

const platformOptions = Object.keys(platformLabels) as Array<
  keyof typeof platformLabels
>;

function toCsv(arr: string[]) {
  return arr.join(", ");
}

function fromCsv(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export default function GameForm({ game }: { game?: Game }) {
  const router = useRouter();
  const isEdit = Boolean(game);

  const [title, setTitle] = useState(game?.title || "");
  const [slug, setSlug] = useState(game?.slug || "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [tagline, setTagline] = useState(game?.tagline || "");
  const [description, setDescription] = useState(game?.description || "");
  const [status, setStatus] = useState(game?.status || "GELISTIRILIYOR");
  const [coverImage, setCoverImage] = useState(game?.coverImage || "");
  const [gallery, setGallery] = useState(toCsv(game?.gallery || []));
  const [genres, setGenres] = useState(toCsv(game?.genres || []));
  const [platforms, setPlatforms] = useState<string[]>(game?.platforms || []);
  const [playUrl, setPlayUrl] = useState(game?.playUrl || "");
  const [downloadUrl, setDownloadUrl] = useState(game?.downloadUrl || "");
  const [trailerUrl, setTrailerUrl] = useState(game?.trailerUrl || "");
  const [version, setVersion] = useState(game?.version || "");
  const [progress, setProgress] = useState(game?.progress ?? 0);
  const [featured, setFeatured] = useState(game?.featured ?? false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(toSlug(value));
  }

  function togglePlatform(platform: string) {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title,
      slug,
      tagline,
      description,
      status,
      coverImage,
      gallery: fromCsv(gallery),
      genres: fromCsv(genres),
      platforms,
      playUrl,
      downloadUrl,
      trailerUrl,
      version,
      progress: Number(progress),
      featured,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/games/${game!.id}` : "/api/admin/games",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kaydedilemedi");

      router.push("/admin/games");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kaydedilemedi");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Baslik">
          <input
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Slug (URL)">
          <input
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Kisa tanim (tagline)">
        <input
          required
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Aciklama">
        <textarea
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Durum">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Game["status"])}
            className={inputClass}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Surum (orn. 0.3.0)">
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label={`Gelistirme ilerlemesi: %${progress}`}>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-hex-500"
        />
      </Field>

      <Field label="Platformlar">
        <div className="mt-1.5 flex flex-wrap gap-2">
          {platformOptions.map((platform) => (
            <label
              key={platform}
              className={`cursor-pointer rounded-sm border px-3 py-1.5 text-xs transition-colors ${
                platforms.includes(platform)
                  ? "border-hex-500 bg-hex-900/40 text-hex-200"
                  : "border-ink-500/60 text-parchment-500 hover:border-ink-400"
              }`}
            >
              <input
                type="checkbox"
                checked={platforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
                className="sr-only"
              />
              {platformLabels[platform]}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Kapak gorseli URL">
        <input
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      </Field>

      <Field label="Galeri gorselleri (virgulle ayirarak URL gir)">
        <textarea
          rows={2}
          value={gallery}
          onChange={(e) => setGallery(e.target.value)}
          placeholder="https://..., https://..."
          className={inputClass}
        />
      </Field>

      <Field label="Turler (virgulle ayir)">
        <input
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          placeholder="Strateji, Bulmaca"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Oyna URL (web ise)">
          <input
            value={playUrl}
            onChange={(e) => setPlayUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
        <Field label="Indirme URL">
          <input
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
        <Field label="Fragman URL">
          <input
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            className={inputClass}
          />
        </Field>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-parchment-300">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 accent-hex-500"
        />
        Ana sayfada one cikar
      </label>

      {error && <p className="text-sm text-wound-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-sm bg-hex-600 px-5 py-2.5 text-sm font-medium text-parchment-100 hover:bg-hex-500 disabled:opacity-60"
        >
          {loading ? "Kaydediliyor..." : isEdit ? "Guncelle" : "Olustur"}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-sm border border-ink-500/60 bg-ink-800 px-3 py-2.5 text-parchment-200 focus:border-hex-500";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-parchment-300">{label}</label>
      {children}
    </div>
  );
}
