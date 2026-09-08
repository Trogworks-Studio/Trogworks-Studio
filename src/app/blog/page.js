import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { getBlogPosts } from "@/lib/queries/content";

export const metadata = { title: "Blog & Duyurular — Trogworks Studio" };

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "all";
  const posts = getBlogPosts({ category });

  const filters = [
    { value: "all", label: "Tümü" },
    { value: "duyuru", label: "Duyuru" },
    { value: "gelisme", label: "Gelişme" },
    { value: "topluluk", label: "Topluluk" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Blog"
        title="Duyurular & Gelişmeler"
        description="Projelerimizle ilgili gelişmeleri, duyuruları ve topluluk haberlerini buradan takip et."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <a
            key={f.value}
            href={f.value === "all" ? "/blog" : `/blog?category=${f.value}`}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              category === f.value
                ? "border-brass bg-brass/15 text-brass-bright"
                : "border-surface-line text-muted-text hover:border-goblin/50 hover:text-ink-text"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-muted-text">Bu kategoride henüz yazı yok.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
