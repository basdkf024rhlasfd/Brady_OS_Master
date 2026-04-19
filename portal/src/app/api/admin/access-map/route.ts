import { getPortalAccess } from "@/lib/portal-access";
import { loadProjects, getEnvVarName } from "@/config/load-projects";
import { getPlatformOwnerEmail, getAdminEmails } from "@/lib/access";
import type { AccessEntry } from "@/lib/nav-types";

export interface AccessMapResponse {
  projects: Record<string, AccessEntry[]>;
  allProjectsCount: number;
}

function readCsvEnv(name: string): string[] {
  return (process.env[name] ?? "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

export async function GET() {
  const access = await getPortalAccess();

  if (!access.isAdmin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const ownerEmail = getPlatformOwnerEmail();
  const adminEmails = getAdminEmails();
  const allProjectsEmails = readCsvEnv("MCEPTION_ALL_PROJECTS_EMAILS");
  const projects = loadProjects();

  const projectMap: Record<string, AccessEntry[]> = {};

  for (const project of projects) {
    const envVar = getEnvVarName(project.slug);
    const projectEmails = readCsvEnv(envVar);

    const entries: AccessEntry[] = projectEmails.map((email) => {
      if (email === ownerEmail) return { email, role: "owner" as const };
      if (adminEmails.includes(email)) return { email, role: "admin" as const };
      if (allProjectsEmails.includes(email)) return { email, role: "all-projects" as const };
      return { email, role: "viewer" as const };
    });

    projectMap[project.slug] = entries;
  }

  return Response.json({
    projects: projectMap,
    allProjectsCount: allProjectsEmails.length,
  } satisfies AccessMapResponse);
}
