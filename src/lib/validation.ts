import { z } from "zod";

const releaseStatusEnum = z.enum([
  "PLANLANIYOR",
  "GELISTIRILIYOR",
  "ERKEN_ERISIM",
  "YAYINDA",
  "ARSIVLENDI",
]);

const gamePlatformEnum = z.enum([
  "WEB",
  "WINDOWS",
  "MACOS",
  "LINUX",
  "ANDROID",
  "IOS",
]);

const urlOrEmpty = z
  .string()
  .trim()
  .refine((v) => v === "" || z.string().url().safeParse(v).success, {
    message: "Gecerli bir URL gir",
  })
  .transform((v) => (v === "" ? undefined : v))
  .optional();

export const projectSchema = z.object({
  title: z.string().min(1, "Baslik gerekli").max(200),
  slug: z.string().min(1, "Slug gerekli").max(200),
  tagline: z.string().min(1, "Kisa tanim gerekli").max(300),
  description: z.string().min(1, "Aciklama gerekli"),
  status: releaseStatusEnum,
  coverImage: urlOrEmpty,
  gallery: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  websiteUrl: urlOrEmpty,
  downloadUrl: urlOrEmpty,
  sourceUrl: urlOrEmpty,
  version: z.string().max(50).optional(),
  progress: z.number().int().min(0).max(100).default(0),
  featured: z.boolean().default(false),
});

export const gameSchema = z.object({
  title: z.string().min(1, "Baslik gerekli").max(200),
  slug: z.string().min(1, "Slug gerekli").max(200),
  tagline: z.string().min(1, "Kisa tanim gerekli").max(300),
  description: z.string().min(1, "Aciklama gerekli"),
  status: releaseStatusEnum,
  coverImage: urlOrEmpty,
  gallery: z.array(z.string()).default([]),
  genres: z.array(z.string()).default([]),
  platforms: z.array(gamePlatformEnum).default([]),
  playUrl: urlOrEmpty,
  downloadUrl: urlOrEmpty,
  trailerUrl: urlOrEmpty,
  version: z.string().max(50).optional(),
  progress: z.number().int().min(0).max(100).default(0),
  featured: z.boolean().default(false),
});

export const postSchema = z.object({
  title: z.string().min(1, "Baslik gerekli").max(200),
  slug: z.string().min(1, "Slug gerekli").max(200),
  excerpt: z.string().min(1, "Ozet gerekli").max(400),
  content: z.string().min(1, "Icerik gerekli"),
  coverImage: urlOrEmpty,
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

export const projectUpdateSchema = z.object({
  title: z.string().min(1, "Baslik gerekli").max(200),
  body: z.string().min(1, "Icerik gerekli"),
});
