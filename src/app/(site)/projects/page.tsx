import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Trogworks Studio tarafindan gelistirilen yazilim araclari ve projeleri.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        kicker="Tezgahtaki her şey"
        title="Görevler"
        description="Geliştirdiğimiz bütün yazılım araçları, kütüphaneler ve uygulamalar burada. Durumuna göre ilerlemesini takip et."
      />

      {projects.length === 0 ? (
        <p className="mt-10 text-parchment-500">
          Henüz yayınlanmış bir görev yok, çok yakında burada olacak.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
