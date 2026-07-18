import { requireProjectAccess } from "@/lib/portal-access";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

export default async function NineteenFifteenSouthMaPage() {
  await requireProjectAccess("1915-south-ma");
  return (
    <div className="h-full w-full bg-gray-950">
      <ProjectFrame
        baseUrl="/1915-south-ma/viewer"
        path="/index.html"
        title="1915 South M&A"
      />
    </div>
  );
}
