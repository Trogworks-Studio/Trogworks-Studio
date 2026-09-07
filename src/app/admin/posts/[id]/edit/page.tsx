import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-bone-100">
        Yaziyi Duzenle: {post.title}
      </h1>
      <div className="mt-8 max-w-3xl">
        <PostForm post={post} />
      </div>
    </div>
  );
}
