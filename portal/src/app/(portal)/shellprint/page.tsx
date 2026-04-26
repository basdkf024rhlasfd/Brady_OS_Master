import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function ShellPrintPage() {
  await requireProjectAccess("shellprint");
  return (
    <ProjectFrame
      baseUrl="https://shellprint-web.vercel.app"
      path="/"
      title="ShellPrint"
    />
  );
}
