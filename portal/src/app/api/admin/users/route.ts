import { clerkClient } from "@clerk/nextjs/server";
import { getPortalAccess } from "@/lib/portal-access";
import { getPlatformOwnerEmail, getReservedTestEmail } from "@/lib/access";

export async function GET() {
  const access = await getPortalAccess();
  if (!access.isAdmin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const clerk = await clerkClient();
  const { data: users } = await clerk.users.getUserList({ limit: 500, orderBy: "-created_at" });

  const ownerEmail = getPlatformOwnerEmail();
  const reservedTestEmail = getReservedTestEmail();

  const result = users.map((user) => {
    const primaryEmail =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? "";
    const email = primaryEmail.toLowerCase();

    return {
      id: user.id,
      email: primaryEmail,
      firstName: user.firstName,
      lastName: user.lastName,
      isOwner: email === ownerEmail,
      isTest: email === reservedTestEmail,
      allowedProjects:
        (user.publicMetadata?.allowedProjects as string[] | undefined) ?? [],
    };
  });

  return Response.json({ users: result });
}
