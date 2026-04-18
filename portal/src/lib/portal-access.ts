import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import { type ProjectId, resolvePortalAccess } from "@/lib/access";

export const getPortalAccess = cache(async () => {
  await auth.protect();
  const user = await currentUser();
  return resolvePortalAccess(user);
});

export async function requireAdminAccess() {
  const access = await getPortalAccess();

  if (!access.isAdmin) {
    redirect("/portal");
  }

  return access;
}

export async function requireProjectAccess(project: ProjectId) {
  const access = await getPortalAccess();

  if (!access.projects.includes(project)) {
    redirect("/portal");
  }

  return access;
}
