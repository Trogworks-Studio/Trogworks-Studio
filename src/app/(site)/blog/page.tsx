import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Trogworks Studio'dan duyurular, gelisme guncellemeleri ve teknik yazilar.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        kicker="Bataklık günlüğü"
        title="Günlük"
        description="Duyurular, gelişme güncellemeleri ve atölyeden notlar."
      />

      {posts.length === 0 ? (
        <p className="mt-10 text-parchment-500">Henüz bir kayıt düşülmedi.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
