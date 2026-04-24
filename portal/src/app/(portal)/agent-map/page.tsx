import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function AgentMapPage() {
  await requireProjectAccess("agent-map");

  return (
    <ProjectFrame
      baseUrl=""
      path="/os/agent-ecosystem.html"
      title="Agent Ecosystem"
    />
  );
}
