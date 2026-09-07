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
      className="torn-card group relative flex flex-col border border-bog-500/50 bg-bog-800/60 p-5 transition-colors hover:border-rune-500/50"
    >
      {post.coverImage && (
        <div className="relative -mx-5 -mt-5 mb-4 h-36 w-[calc(100%+2.5rem)] overflow-hidden">
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-bone-500">
        <FontAwesomeIcon icon={faScroll} className="h-3 w-3 text-rune-400" />
        {post.publishedAt && formatDate(post.publishedAt)}
      </div>
      <h3 className="mt-2 font-display text-lg text-bone-100 group-hover:text-rune-300">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-bone-500">
        {post.excerpt}
      </p>
      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-rune-900/40 px-2 py-0.5 text-xs text-rune-300"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
