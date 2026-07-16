import { requireProjectAccess } from "@/lib/portal-access";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

export default async function FamilyBudgetPage() {
  await requireProjectAccess("family-budget");
  return (
    <div className="h-full w-full bg-gray-950">
      <ProjectFrame
        baseUrl="/family-budget/viewer"
        path="/index.html"
        title="Family Budget"
      />
    </div>
  );
}
