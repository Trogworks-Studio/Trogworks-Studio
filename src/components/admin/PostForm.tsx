"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Post } from "@prisma/client";
import { toSlug } from "@/lib/utils";

function toCsv(arr: string[]) {
  return arr.join(", ");
}

function fromCsv(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [tags, setTags] = useState(toCsv(post?.tags || []));
  const [published, setPublished] = useState(post?.published ?? false);
  const [showPreview, setShowPreview] = useState(false);

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
      excerpt,
      content,
      coverImage,
      tags: fromCsv(tags),
      published,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/posts/${post!.id}` : "/api/admin/posts",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kaydedilemedi");

      router.push("/admin/posts");
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

      <Field label="Ozet">
        <textarea
          required
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={inputClass}
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

      <Field label="Etiketler (virgulle ayir)">
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="duyuru, guncelleme"
          className={inputClass}
        />
      </Field>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-bone-300">Icerik (Markdown)</label>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="text-xs text-ooze-400 hover:text-ooze-300"
          >
            {showPreview ? "Duzenlemeye don" : "Onizle"}
          </button>
        </div>
        {showPreview ? (
          <div className="prose-trog mt-1.5 min-h-[16rem] rounded-sm border border-bog-500/60 bg-bog-800 p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "*Henuz icerik yok*"}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            required
            rows={16}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Baslik&#10;&#10;Yazini buraya Markdown olarak yaz..."
            className={`${inputClass} font-mono text-sm`}
          />
        )}
      </div>

      <label className="flex items-center gap-2.5 text-sm text-bone-300">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 accent-ooze-500"
        />
        Yayinla
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
