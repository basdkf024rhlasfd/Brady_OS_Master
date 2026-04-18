import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type { ProjectId } from "./access";

const ALL_PROJECTS: readonly string[] = [
  "stihl",
  "orlando",
  "moving",
  "mark-schmulen",
  "pauletteai",
  "kroger",
];

export interface MagicLinkPayload extends JWTPayload {
  project: ProjectId;
  sub: string;
}

function getSecret(): Uint8Array {
  const secret = process.env.MAGIC_LINK_SECRET;
  if (!secret) throw new Error("MAGIC_LINK_SECRET env var is not set");
  return new TextEncoder().encode(secret);
}

export async function createMagicLink(opts: {
  project: ProjectId;
  recipient: string;
  expiresInDays?: number;
}): Promise<string> {
  const { project, recipient, expiresInDays = 7 } = opts;
  if (!ALL_PROJECTS.includes(project)) {
    throw new Error(`Invalid project: ${project}`);
  }

  return new SignJWT({ project, sub: recipient })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expiresInDays}d`)
    .sign(getSecret());
}

export async function verifyMagicLink(
  token: string
): Promise<MagicLinkPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  if (!payload.project || !ALL_PROJECTS.includes(payload.project as string)) {
    throw new Error("Invalid token: missing or invalid project");
  }
  return payload as MagicLinkPayload;
}
