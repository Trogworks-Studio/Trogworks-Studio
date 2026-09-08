import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug, published: true } });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.coverImage || undefined,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {post.publishedAt && (
        <p className="text-sm text-parchment-500">{formatDate(post.publishedAt)}</p>
      )}
      <h1 className="mt-2 font-display text-3xl text-parchment-100 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-lg text-parchment-400">{post.excerpt}</p>

      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="hud-tag bg-hex-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-hex-300"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}

      {post.coverImage && (
        <div className="hud-panel relative mt-8 h-72 w-full overflow-hidden sm:h-96">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose-trog mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-14 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src="/trog/couch-laptop.webp"
            alt="Rahat oturan Trog maskotu"
            fill
            className="object-contain"
          />
        </div>
        <Link
          href="/blog"
          className="text-sm text-parchment-500 hover:text-vex-400"
        >
          ← Tüm kayıtlara dön
        </Link>
      </div>
    </article>
  );
}
