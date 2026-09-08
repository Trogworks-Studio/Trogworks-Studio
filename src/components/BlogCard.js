import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { categoryBadge, formatDate } from "@/lib/format";

export default function BlogCard({ post }) {
  const badge = categoryBadge(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="workshop-panel group flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-b from-emerald/15 to-surface">
        <Image
          src={post.cover_image}
          alt={post.title}
          width={120}
          height={120}
          className="h-32 w-32 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className={`rounded-full border px-2.5 py-0.5 font-semibold ${badge.color}`}>
            {badge.label}
          </span>
          <span className="text-muted-text">{formatDate(post.published_at)}</span>
        </div>
        <h3 className="font-display text-xl leading-tight text-parchment">{post.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-text">{post.excerpt}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-1 text-sm font-bold text-brass-bright">
          Devamını oku <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
