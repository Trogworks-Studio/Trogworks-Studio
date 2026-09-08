import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/lib/utils";
import type { Post } from "@prisma/client";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="hud-panel hud-panel-hover group flex flex-col overflow-hidden p-5"
    >
      {post.coverImage && (
        <div className="relative -mx-5 -mt-5 mb-4 h-36 w-[calc(100%+2.5rem)] overflow-hidden">
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink-950/70 to-transparent" />
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-parchment-500">
        <FontAwesomeIcon icon={faScroll} className="h-3 w-3 text-hex-400" />
        {post.publishedAt && formatDate(post.publishedAt)}
      </div>
      <h3 className="mt-2 font-display text-lg text-parchment-100 group-hover:text-hex-300">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-parchment-500">
        {post.excerpt}
      </p>
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
    </Link>
  );
}
