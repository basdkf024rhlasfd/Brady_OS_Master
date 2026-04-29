import { requireProjectAccess } from "@/lib/portal-access";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

export default async function PandaPage() {
  await requireProjectAccess("panda");
  return (
    <div className="h-full w-full bg-gray-950">
      <ProjectFrame
        baseUrl="/panda/viewer"
        path="/index.html"
        title="Panda Research"
      />
    </div>
  );
}
