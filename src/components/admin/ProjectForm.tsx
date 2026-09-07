"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@prisma/client";
import { toSlug } from "@/lib/utils";

const statusOptions = [
  { value: "PLANLANIYOR", label: "Planlaniyor" },
  { value: "GELISTIRILIYOR", label: "Gelistiriliyor" },
  { value: "ERKEN_ERISIM", label: "Erken Erisim" },
  { value: "YAYINDA", label: "Yayinda" },
  { value: "ARSIVLENDI", label: "Arsivlendi" },
];

function toCsv(arr: string[]) {
  return arr.join(", ");
}

function fromCsv(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const isEdit = Boolean(project);

  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [tagline, setTagline] = useState(project?.tagline || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState(project?.status || "GELISTIRILIYOR");
  const [coverImage, setCoverImage] = useState(project?.coverImage || "");
  const [gallery, setGallery] = useState(toCsv(project?.gallery || []));
  const [techStack, setTechStack] = useState(toCsv(project?.techStack || []));
  const [features, setFeatures] = useState(toCsv(project?.features || []));
  const [websiteUrl, setWebsiteUrl] = useState(project?.websiteUrl || "");
  const [downloadUrl, setDownloadUrl] = useState(project?.downloadUrl || "");
  const [sourceUrl, setSourceUrl] = useState(project?.sourceUrl || "");
  const [version, setVersion] = useState(project?.version || "");
  const [progress, setProgress] = useState(project?.progress ?? 0);
  const [featured, setFeatured] = useState(project?.featured ?? false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(toSlug(value));
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
      techStack: fromCsv(techStack),
      features: fromCsv(features),
      websiteUrl,
      downloadUrl,
      sourceUrl,
      version,
      progress: Number(progress),
      featured,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/projects/${project!.id}` : "/api/admin/projects",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kaydedilemedi");

      router.push("/admin/projects");
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
            onChange={(e) => setStatus(e.target.value as Project["status"])}
            className={inputClass}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Surum (orn. 0.4.0)">
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
          className="w-full accent-ooze-500"
        />
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Teknoloji yigin (virgulle ayir)">
          <input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="TypeScript, Next.js"
            className={inputClass}
          />
        </Field>
        <Field label="Ozellikler (virgulle ayir)">
          <input
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Hizli kurulum, ..."
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Website URL">
          <input
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
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
        <Field label="Kaynak kod URL">
          <input
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </Field>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-bone-300">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 accent-ooze-500"
        />
        Ana sayfada one cikar
      </label>

      {error && <p className="text-sm text-ember-300">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-sm bg-ooze-600 px-5 py-2.5 text-sm font-medium text-bog-900 hover:bg-ooze-500 disabled:opacity-60"
        >
          {loading ? "Kaydediliyor..." : isEdit ? "Guncelle" : "Olustur"}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-sm border border-bog-500/60 bg-bog-800 px-3 py-2.5 text-bone-200 focus:border-ooze-500";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-bone-300">{label}</label>
      {children}
    </div>
  );
}
