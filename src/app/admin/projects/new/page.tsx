import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-bone-100">Yeni Proje</h1>
      <div className="mt-8 max-w-2xl">
        <ProjectForm />
      </div>
    </div>
  );
}
