export type ReleaseStatus =
  | "PLANLANIYOR"
  | "GELISTIRILIYOR"
  | "ERKEN_ERISIM"
  | "YAYINDA"
  | "ARSIVLENDI";

export type GamePlatform =
  | "WEB"
  | "WINDOWS"
  | "MACOS"
  | "LINUX"
  | "ANDROID"
  | "IOS";

export interface ProjectFormData {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  status: ReleaseStatus;
  coverImage?: string;
  gallery: string[];
  techStack: string[];
  features: string[];
  websiteUrl?: string;
  downloadUrl?: string;
  sourceUrl?: string;
  version?: string;
  progress: number;
  featured: boolean;
}

export interface GameFormData {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  status: ReleaseStatus;
  coverImage?: string;
  gallery: string[];
  genres: string[];
  platforms: GamePlatform[];
  playUrl?: string;
  downloadUrl?: string;
  trailerUrl?: string;
  version?: string;
  progress: number;
  featured: boolean;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
}
