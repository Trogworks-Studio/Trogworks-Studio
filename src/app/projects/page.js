import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/queries/content";

export const metadata = { title: "Yazılım Projeleri — Trogworks Studio" };

export default async function ProjectsPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || "all";
  const projects = getProjects({ status });

  const filters = [
    { value: "all", label: "Tümü" },
    { value: "yayinda", label: "Yayında" },
    { value: "gelistiriliyor", label: "Geliştiriliyor" },
    { value: "arsiv", label: "Arşiv" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Vitrin"
        title="Yazılım Projelerimiz"
        description="Atölyenin iç araçlarından açık kaynak projelerine kadar üzerinde çalıştığımız tüm yazılımlar."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <a
            key={f.value}
            href={f.value === "all" ? "/projects" : `/projects?status=${f.value}`}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              status === f.value
                ? "border-brass bg-brass/15 text-brass-bright"
                : "border-surface-line text-muted-text hover:border-goblin/50 hover:text-ink-text"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {projects.length === 0 ? (
        <p className="mt-12 text-center text-muted-text">Bu filtrede henüz proje yok.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
