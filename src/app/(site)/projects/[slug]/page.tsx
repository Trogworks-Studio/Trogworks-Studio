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
          <span className="text-xs text-bone-500">v{project.version}</span>
        )}
      </div>

      <h1 className="mt-4 font-display text-4xl text-bone-100 sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-bone-400">{project.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-sm bg-ooze-600 px-4 py-2.5 text-sm font-medium text-bog-900 transition-colors hover:bg-ooze-500"
          >
            Siteye Git
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
          </a>
        )}
        {project.downloadUrl && (
          <a
            href={project.downloadUrl}
            className="flex items-center gap-2 rounded-sm border border-ember-400/50 px-4 py-2.5 text-sm font-medium text-ember-200 transition-colors hover:bg-ember-900/20"
          >
            <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5" />
            Indir
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-sm border border-bog-400/50 px-4 py-2.5 text-sm font-medium text-bone-300 transition-colors hover:bg-bog-700"
          >
            <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
            Kaynak Kod
          </a>
        )}
      </div>

      {project.coverImage && (
        <div className="relative mt-10 h-72 w-full overflow-hidden rounded-sm sm:h-96">
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
          <h2 className="font-display text-xl text-bone-100">Proje hakkinda</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-bone-400">
            {project.description}
          </p>

          {project.features.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-bone-100">Ozellikler</h2>
              <ul className="mt-3 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-bone-400">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-ooze-400"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl text-bone-100">Galeri</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {project.gallery.map((img, i) => (
                  <div
                    key={img + i}
                    className="relative h-40 overflow-hidden rounded-sm"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} gorsel ${i + 1}`}
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
              <h2 className="font-display text-xl text-bone-100">
                Gelisme kayitlari
              </h2>
              <ol className="mt-4 space-y-6 border-l border-bog-500/50 pl-5">
                {project.updates.map((update) => (
                  <li key={update.id} className="relative">
                    <span className="absolute -left-[1.36rem] top-1.5 h-2 w-2 rounded-full bg-ooze-500" />
                    <p className="text-xs text-bone-500">
                      {formatDate(update.createdAt)}
                    </p>
                    <h3 className="mt-1 font-display text-base text-bone-200">
                      {update.title}
                    </h3>
                    <p className="mt-1 whitespace-pre-line text-sm text-bone-500">
                      {update.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="border border-bog-500/50 bg-bog-800/40 p-5">
            <ProgressBar value={project.progress} />
          </div>
          {project.techStack.length > 0 && (
            <div className="border border-bog-500/50 bg-bog-800/40 p-5">
              <h3 className="flex items-center gap-2 font-display text-sm text-bone-200">
                <FontAwesomeIcon icon={faCode} className="h-3.5 w-3.5 text-ooze-400" />
                Teknoloji Yigin
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-bog-500/50 px-2 py-0.5 text-xs text-bone-400"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link
            href="/projects"
            className="block text-center text-sm text-bone-500 hover:text-ooze-400"
          >
            ← Tum projelere don
          </Link>
        </aside>
      </div>
    </div>
  );
}
