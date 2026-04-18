import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function InnovationLabPage() {
  await requireProjectAccess("innovation-lab");
  return (
    <ProjectFrame
      baseUrl="https://innovation-lab-silk.vercel.app"
      path="/"
      title="Innovation Lab"
    />
  );
}
