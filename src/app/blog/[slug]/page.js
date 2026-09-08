import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { getBlogPostBySlug, getBlogPosts, getCommentsForPost } from "@/lib/queries/content";
import { categoryBadge, formatDate } from "@/lib/format";
import CommentSection from "@/components/CommentSection";
import { auth } from "@/lib/auth";
import { progressQuest, getQuestsForUser } from "@/lib/queries/quests";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  return { title: post ? `${post.title} — Trogworks Studio` : "Yazı bulunamadı" };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const comments = getCommentsForPost(post.id);
  const badge = categoryBadge(post.category);

  // Girişli kullanıcılar için "Duyuruları Takip Et" görevini otomatik ilerlet
  const session = await auth();
  if (session?.user?.id) {
    try {
      const quests = getQuestsForUser(session.user.id);
      const readQuest = quests.find((q) => q.icon === "scroll" && q.status === "in_progress");
      if (readQuest) progressQuest(session.user.id, readQuest.id, 1);
    } catch {
      // sessizce yok say
    }
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-muted-text hover:text-brass-bright">
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Tüm yazılar
      </Link>

      <div className="mt-6 flex items-center gap-2 text-xs">
        <span className={`rounded-full border px-2.5 py-0.5 font-semibold ${badge.color}`}>
          {badge.label}
        </span>
        <span className="text-muted-text">{formatDate(post.published_at)}</span>
      </div>

      <h1 className="mt-3 font-display text-4xl leading-tight text-parchment sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-3 flex items-center gap-2 text-sm text-muted-text">
        <FontAwesomeIcon icon={faUser} className="text-xs" />
        {post.author}
      </p>

      <div className="relative mt-8 flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-surface-line bg-gradient-to-b from-goblin-deep/25 to-surface sm:h-72">
        <Image
          src={post.cover_image}
          alt={post.title}
          width={200}
          height={200}
          className="h-48 w-48 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        />
      </div>

      <div className="mt-8 whitespace-pre-line text-base leading-relaxed text-ink-text">
        {post.content}
      </div>

      <CommentSection postId={post.id} initialComments={comments} />
    </article>
  );
}
