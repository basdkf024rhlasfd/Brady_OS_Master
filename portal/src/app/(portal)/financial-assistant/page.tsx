import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function FinancialAssistantPage() {
  await requireProjectAccess("financial-assistant");

  return (
    <ProjectFrame
      baseUrl="/financial-assistant"
      path="/index.html"
      title="Financial Cockpit"
    />
  );
}
