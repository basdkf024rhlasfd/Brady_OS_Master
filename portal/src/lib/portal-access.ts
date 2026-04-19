import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import { type ProjectId, resolvePortalAccess } from "@/lib/access";

const isDevBypass =
  process.env.NODE_ENV === "development" &&
  process.env.MCEPTION_DEV_BYPASS === "true";

export const getPortalAccess = cache(async () => {
  if (isDevBypass) {
    return resolvePortalAccess({
      emailAddresses: [
        { emailAddress: process.env.MCEPTION_PLATFORM_OWNER_EMAIL ?? "brady.smallwood@gmail.com" },
      ],
      publicMetadata: { role: "owner" },
      privateMetadata: {},
    });
  }
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
