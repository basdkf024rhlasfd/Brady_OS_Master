import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function PandaPage() {
  await requireProjectAccess("panda");

  return (
    <ProjectFrame
      baseUrl="/panda/viewer"
      path="/index.html"
      title="Panda Restaurant Group"
    />
  );
}
