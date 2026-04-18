import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function OrlandoKBPage() {
  await requireProjectAccess("orlando");

  return (
    <ProjectFrame
      baseUrl=""
      path="/orlando/viewer/index.html"
      title="Orlando Real Estate Knowledge Base"
    />
  );
}
