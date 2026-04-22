import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function Page1915South() {
  await requireProjectAccess("1915-south");

  return (
    <ProjectFrame
      baseUrl="/1915-south/viewer"
      path="/index.html"
      title="1915 South"
    />
  );
}
