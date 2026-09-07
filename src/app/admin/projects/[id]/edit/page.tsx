import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectUpdatesManager from "@/components/admin/ProjectUpdatesManager";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { updates: { orderBy: { createdAt: "desc" } } },
  });
  if (!project) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-bone-100">
        Projeyi Duzenle: {project.title}
      </h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="max-w-2xl">
          <ProjectForm project={project} />
        </div>
        <ProjectUpdatesManager projectId={project.id} updates={project.updates} />
      </div>
    </div>
  );
}
