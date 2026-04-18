import { AppShell } from "@/components/portal/AppShell";
import { getPortalAccess } from "@/lib/portal-access";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, projects } = await getPortalAccess();

  return <AppShell isAdmin={isAdmin} projects={projects}>{children}</AppShell>;
}
