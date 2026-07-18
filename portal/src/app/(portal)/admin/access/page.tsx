import { requireAdminAccess } from "@/lib/portal-access";
import { loadProjects } from "@/config/load-projects";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-groups";
import { AccessControlClient } from "./AccessControlClient";

export const metadata = { title: "Access Control — mception.ai" };

export default async function AccessControlPage() {
  await requireAdminAccess();

  const projects = loadProjects().map((p) => ({
    slug: p.slug,
    label: p.label,
    short: p.short ?? p.slug.slice(0, 2).toUpperCase(),
  }));

  const groups = SIDEBAR_GROUPS.map((g) => ({ id: g.id, label: g.label, slugs: g.slugs }));

  // Projects not in any group (ungrouped)
  const groupedSlugs = new Set(groups.flatMap((g) => g.slugs));
  const ungroupedSlugs = projects.map((p) => p.slug).filter((s) => !groupedSlugs.has(s));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Access Control</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage who can see what. Changes apply instantly — no deployment needed.
        </p>
      </div>
      <AccessControlClient
        projects={projects}
        groups={groups}
        ungroupedSlugs={ungroupedSlugs}
      />
    </div>
  );
}
