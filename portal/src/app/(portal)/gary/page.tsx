import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function GaryPage() {
  await requireProjectAccess("gary");

  return (
    <ProjectFrame
      baseUrl="https://basdkf024rhlasfd.github.io/ivfh"
      path="/"
      title="Gary / IVFH"
    />
  );
}
