import { requireProjectAccess } from "@/lib/portal-access";
import { ContentEngineShell } from "@/components/content-engine/AppShell";

export default async function ContentEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProjectAccess("content-engine");
  return <ContentEngineShell>{children}</ContentEngineShell>;
}
