import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCode } from "@fortawesome/free-solid-svg-icons";
import StatusBadge from "./StatusBadge";
import type { Project } from "@prisma/client";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="mission-card hud-panel hud-panel-hover group flex flex-col overflow-hidden"
    >
      <div className="mission-card__media relative h-40 w-full overflow-hidden bg-ink-700">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-500">
            <FontAwesomeIcon icon={faCode} className="h-8 w-8" />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink-950/80 to-transparent" />
        <span className="absolute bottom-2 right-3 font-display text-[9px] uppercase tracking-[0.2em] text-parchment-300/70">Mission log</span>
        <div className="absolute left-3 top-3">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-parchment-100 group-hover:text-vex-300">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-parchment-500">
          {project.tagline}
        </p>
        {project.techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="hud-tag border border-ink-500/60 px-2 py-0.5 text-[10px] uppercase tracking-wide text-parchment-500"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-4 flex items-center gap-1.5 font-display text-sm text-vex-400">
          Göreve Bak
          <FontAwesomeIcon
            icon={faArrowRight}
            className="h-3 w-3 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
