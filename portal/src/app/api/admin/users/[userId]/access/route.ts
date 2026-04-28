import { clerkClient } from "@clerk/nextjs/server";
import { getPortalAccess } from "@/lib/portal-access";
import { loadProjects } from "@/config/load-projects";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const access = await getPortalAccess();
  if (!access.isAdmin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;
  const body = await req.json();
  const { allowedProjects } = body as { allowedProjects: unknown };

  if (!Array.isArray(allowedProjects)) {
    return Response.json({ error: "allowedProjects must be an array" }, { status: 400 });
  }

  const allSlugs = new Set(loadProjects().map((p) => p.slug));
  const validProjects = (allowedProjects as unknown[]).filter(
    (s): s is string => typeof s === "string" && allSlugs.has(s)
  );

  const clerk = await clerkClient();
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { allowedProjects: validProjects },
  });

  return Response.json({ ok: true, allowedProjects: validProjects });
}
