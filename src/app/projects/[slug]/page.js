import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub as faGithubReg } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faArrowUpRightFromSquare, faCode } from "@fortawesome/free-solid-svg-icons";
import { getProjectBySlug, getProjects } from "@/lib/queries/content";
import { statusBadge, techList } from "@/lib/format";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.name} — Trogworks Studio` : "Proje bulunamadı" };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const badge = statusBadge(project.status);

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-muted-text hover:text-brass-bright">
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Tüm projeler
      </Link>

      <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Image
          src={project.cover_image}
          alt={project.name}
          width={140}
          height={140}
          className="h-32 w-32 shrink-0 object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]"
        />
        <div>
          <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.color}`}>
            {badge.label}
          </span>
          <h1 className="mt-2 font-display text-4xl text-parchment">{project.name}</h1>
          <p className="mt-2 text-lg text-muted-text">{project.summary}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {techList(project.tech_stack).map((t) => (
          <span
            key={t}
            className="flex items-center gap-1.5 rounded-lg border border-surface-line bg-surface-raised px-3 py-1.5 text-sm font-semibold text-goblin-bright"
          >
            <FontAwesomeIcon icon={faCode} className="text-xs" />
            {t}
          </span>
        ))}
      </div>

      <div className="workshop-panel mt-8 rounded-2xl p-6 sm:p-8">
        <p className="whitespace-pre-line text-base leading-relaxed text-ink-text">
          {project.description}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.repo_url && (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-surface-line bg-surface-raised px-5 py-3 font-bold text-ink-text hover:border-brass/60"
          >
            <FontAwesomeIcon icon={faGithubReg} />
            Kaynak Kodu
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-brass px-5 py-3 font-bold text-ink hover:bg-brass-bright"
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            Canlı Önizleme
          </a>
        )}
      </div>
    </article>
  );
}
