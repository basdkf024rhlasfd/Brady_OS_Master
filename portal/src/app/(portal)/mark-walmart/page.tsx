import { requireProjectAccess } from "@/lib/portal-access";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

export default async function MarkWalmartPage() {
  await requireProjectAccess("mark-walmart");
  return (
    <div className="h-full w-full bg-gray-950">
      <ProjectFrame
        baseUrl="/mark-walmart/viewer"
        path="/index.html"
        title="Mark - Walmart | Insourcing the Build"
      />
    </div>
  );
}
