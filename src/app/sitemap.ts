import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/games`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.4 },
  ];

  try {
    const [projects, games, posts] = await Promise.all([
      prisma.project.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.game.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const gameRoutes: MetadataRoute.Sitemap = games.map((g) => ({
      url: `${siteUrl}/games/${g.slug}`,
      lastModified: g.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...projectRoutes, ...gameRoutes, ...postRoutes];
  } catch {
    // Veritabani henuz kurulmadiysa (ilk build) sadece statik rotalari don
    return staticRoutes;
  }
}
