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
      className="group flex flex-col overflow-hidden rounded-sm border border-bog-500/50 bg-bog-800/60 transition-colors hover:border-ooze-600/60"
    >
      <div className="relative h-40 w-full overflow-hidden bg-bog-700">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-bog-400">
            <FontAwesomeIcon icon={faCode} className="h-8 w-8" />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-bone-100 group-hover:text-ooze-300">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-bone-500">
          {project.tagline}
        </p>
        {project.techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-bog-500/50 px-2 py-0.5 text-xs text-bone-500"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-4 flex items-center gap-1.5 text-sm text-ooze-400">
          Incele
          <FontAwesomeIcon
            icon={faArrowRight}
            className="h-3 w-3 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
