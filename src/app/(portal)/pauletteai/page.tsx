import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function PauletteAIPage() {
  await requireProjectAccess("pauletteai");

  return (
    <ProjectFrame
      baseUrl="/pauletteai/viewer"
      path="/index.html"
      title="PauletteAI"
    />
  );
}
