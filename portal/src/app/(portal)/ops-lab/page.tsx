import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function OpsLabPage() {
  await requireProjectAccess("ops-lab");
  return (
    <ProjectFrame
      baseUrl="https://ops-lab-tau.vercel.app"
      path="/"
      title="Ops Lab"
    />
  );
}
