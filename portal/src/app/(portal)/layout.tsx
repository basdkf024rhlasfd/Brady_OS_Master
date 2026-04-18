import { AppShell } from "@/components/portal/AppShell";
import { getPortalAccess } from "@/lib/portal-access";
import { loadProjects } from "@/config/load-projects";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, projects } = await getPortalAccess();
  const projectConfigs = loadProjects().map((p) => ({
    slug: p.slug,
    label: p.label,
    short: p.short,
    href: p.href,
  }));

  return (
    <AppShell isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs}>
      {children}
    </AppShell>
  );
}
