import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { statusBadge, techList } from "@/lib/format";

export default function ProjectCard({ project }) {
  const badge = statusBadge(project.status);
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="workshop-panel group flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-b from-goblin-deep/25 to-surface">
        <Image
          src={project.cover_image}
          alt={project.name}
          width={140}
          height={140}
          className="h-36 w-36 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl text-parchment">{project.name}</h3>
          <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.color}`}>
            {badge.label}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-text">{project.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {techList(project.tech_stack).map((t) => (
            <span
              key={t}
              className="rounded-md border border-surface-line bg-surface px-2 py-0.5 text-[11px] font-semibold text-goblin-bright"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-2 flex items-center gap-1.5 text-sm font-bold text-brass-bright">
          Detayları gör <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
