import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function IncubatorPage() {
  await requireProjectAccess("incubator");

  return (
    <ProjectFrame
      baseUrl="https://basdkf024rhlasfd.github.io/incubator"
      path="/"
      title="Project Incubator"
    />
  );
}
