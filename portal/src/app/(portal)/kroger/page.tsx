import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function KrogerPage() {
  await requireProjectAccess("kroger");

  return (
    <ProjectFrame
      baseUrl="/kroger/viewer"
      path="/index.html"
      title="Kroger"
    />
  );
}
