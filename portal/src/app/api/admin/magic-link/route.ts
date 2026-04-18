import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createMagicLink } from "@/lib/magic-link";
import { resolvePortalAccess } from "@/lib/access";

export async function POST(req: Request) {
  await auth.protect();
  const user = await currentUser();
  const access = resolvePortalAccess(user);

  if (!access.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { project, recipient, expiresInDays } = body;

  if (!project || !recipient) {
    return NextResponse.json(
      { error: "project and recipient are required" },
      { status: 400 }
    );
  }

  try {
    const token = await createMagicLink({ project, recipient, expiresInDays });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://mception.ai";
    const url = `${baseUrl}/share/${token}`;

    return NextResponse.json({ url, token, expiresInDays: expiresInDays ?? 7 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create link";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
