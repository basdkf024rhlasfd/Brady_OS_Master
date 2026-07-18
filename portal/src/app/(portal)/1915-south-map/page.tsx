import { requireProjectAccess } from "@/lib/portal-access";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

export default async function NineteenFifteenSouthMapPage() {
  await requireProjectAccess("1915-south-map");
  return (
    <div className="h-full w-full bg-gray-950">
      <ProjectFrame
        baseUrl="/1915-south-map/viewer"
        path="/index.html"
        title="Ashley HomeStore Operator Map"
      />
    </div>
  );
}
