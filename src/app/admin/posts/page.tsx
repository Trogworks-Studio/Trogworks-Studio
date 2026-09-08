import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faCircle } from "@fortawesome/free-solid-svg-icons";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDate } from "@/lib/utils";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl text-parchment-100">Blog Yazilari</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 rounded-sm border border-ink-400/50 px-4 py-2 text-sm font-medium text-parchment-200 hover:bg-ink-700"
        >
          <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5" />
          Yeni Yazi
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-parchment-500">Henuz yazi eklenmedi.</p>
      ) : (
        <div className="mt-6 divide-y divide-ink-500/40 border border-ink-500/40">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-display text-base text-parchment-100">
                  {post.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-parchment-500">
                  /blog/{post.slug} · {formatDate(post.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1.5 text-xs ${
                    post.published ? "text-vex-400" : "text-parchment-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faCircle} className="h-2 w-2" />
                  {post.published ? "Yayinda" : "Taslak"}
                </span>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="flex items-center gap-1.5 rounded-sm border border-ink-400/50 px-2.5 py-1.5 text-xs text-parchment-300 hover:bg-ink-700"
                >
                  <FontAwesomeIcon icon={faPen} className="h-3 w-3" />
                  Duzenle
                </Link>
                <DeleteButton
                  endpoint={`/api/admin/posts/${post.id}`}
                  confirmText={`"${post.title}" yazisini silmek istedigine emin misin?`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
