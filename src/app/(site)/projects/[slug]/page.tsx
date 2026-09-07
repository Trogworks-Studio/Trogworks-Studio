import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faDownload,
  faCode,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { updates: { orderBy: { createdAt: "desc" } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "DeveloperApplication",
    softwareVersion: project.version || undefined,
    url:
      project.websiteUrl ||
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/projects/${project.slug}`,
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        {project.version && (
          <span className="text-xs text-parchment-500">v{project.version}</span>
        )}
      </div>

      <h1 className="mt-4 font-display text-4xl text-parchment-100 sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-parchment-400">{project.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-hud flex items-center gap-2 bg-vex-600 px-4 py-2.5 text-sm font-display text-ink-950"
          >
            Siteye Git
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
          </a>
        )}
        {project.downloadUrl && (
          <a
            href={project.downloadUrl}
            className="btn-hud flex items-center gap-2 border border-bronze-400/50 bg-ink-800 px-4 py-2.5 text-sm font-display text-bronze-300"
          >
            <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5" />
            İndir
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-hud flex items-center gap-2 border border-ink-500/60 bg-ink-800 px-4 py-2.5 text-sm font-display text-parchment-300"
          >
            <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
            Kaynak Kod
          </a>
        )}
      </div>

      {project.coverImage && (
        <div className="hud-panel relative mt-10 h-72 w-full overflow-hidden sm:h-96">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_260px]">
        <div>
          <h2 className="font-display text-xl text-parchment-100">Görev hakkında</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-parchment-400">
            {project.description}
          </p>

          {project.features.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-parchment-100">Özellikler</h2>
              <ul className="mt-3 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-parchment-400">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-vex-400"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-parchment-100">Galeri</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {project.gallery.map((img, i) => (
                  <div key={img + i} className="hud-panel relative h-40 overflow-hidden">
                    <Image
                      src={img}
                      alt={`${project.title} görsel ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.updates.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl text-parchment-100">
                Gelişme kayıtları
              </h2>
              <ol className="mt-4 space-y-6 border-l border-bronze-700/50 pl-5">
                {project.updates.map((update) => (
                  <li key={update.id} className="relative">
                    <span className="absolute -left-[1.36rem] top-1.5 h-2 w-2 rounded-full bg-vex-500" />
                    <p className="text-xs text-parchment-500">
                      {formatDate(update.createdAt)}
                    </p>
                    <h3 className="mt-1 font-display text-base text-parchment-200">
                      {update.title}
                    </h3>
                    <p className="mt-1 whitespace-pre-line text-sm text-parchment-500">
                      {update.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="hud-panel p-5">
            <ProgressBar value={project.progress} />
          </div>
          {project.techStack.length > 0 && (
            <div className="hud-panel p-5">
              <h3 className="flex items-center gap-2 font-display text-xs uppercase tracking-wider text-bronze-400">
                <FontAwesomeIcon icon={faCode} className="h-3.5 w-3.5 text-vex-400" />
                Teknoloji Yığını
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="hud-tag border border-ink-500/60 px-2 py-0.5 text-[10px] uppercase tracking-wide text-parchment-400"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link
            href="/projects"
            className="block text-center text-sm text-parchment-500 hover:text-vex-400"
          >
            ← Tüm görevlere dön
          </Link>
        </aside>
      </div>
    </div>
  );
}
