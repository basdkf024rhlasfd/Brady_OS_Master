import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function MarkSchmulenPage() {
  await requireProjectAccess("mark-schmulen");

  return (
    <ProjectFrame
      baseUrl="https://basdkf024rhlasfd.github.io/mark-schmulen-ai-os"
      path="/viewer/"
      title="Mark Schmulen AI OS"
    />
  );
}
