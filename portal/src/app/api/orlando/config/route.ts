import { auth, currentUser } from "@clerk/nextjs/server";
import { resolvePortalAccess } from "@/lib/access";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  const access = resolvePortalAccess(user);

  if (!access.projects.includes("orlando")) {
    return new Response("Forbidden", { status: 403 });
  }

  const config = {
    apiKey: process.env.ORLANDO_API_KEY ?? "",
    clientName: process.env.ORLANDO_CLIENT_NAME ?? "Ana Thurman Realty",
    logoUrl: process.env.ORLANDO_LOGO_URL ?? "",
    adminMode: false,
    dailyTokenCap: 50000,
    agent: {
      name: process.env.ORLANDO_AGENT_NAME ?? "Ana Thurman",
      phone: process.env.ORLANDO_AGENT_PHONE ?? "",
      email: process.env.ORLANDO_AGENT_EMAIL ?? "",
    },
  };

  const js = `window.ORLANDO_CONFIG = ${JSON.stringify(config)};`;

  return new Response(js, {
    headers: {
      "Content-Type": "text/javascript",
      "Cache-Control": "private, no-store",
    },
  });
}
