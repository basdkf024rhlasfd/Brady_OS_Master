import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { getMagicLinkProjects } from "@/config/load-projects";
import type { ProjectId } from "./access";

const validSlugs = getMagicLinkProjects().map((p) => p.slug);

export interface MagicLinkPayload extends JWTPayload {
  // New multi-project tokens carry `projects`. Legacy single-project tokens
  // carry `project` — both are still accepted on verify for backward compat.
  projects?: ProjectId[];
  project?: ProjectId;
  sub: string;
}

function getSecret(): Uint8Array {
  const secret = process.env.MAGIC_LINK_SECRET;
  if (!secret) throw new Error("MAGIC_LINK_SECRET env var is not set");
  return new TextEncoder().encode(secret);
}

export async function createMagicLink(opts: {
  projects: ProjectId | ProjectId[];
  recipient: string;
  expiresInDays?: number;
}): Promise<string> {
  const { projects, recipient, expiresInDays = 7 } = opts;
  const list = Array.isArray(projects) ? projects : [projects];
  if (list.length === 0) {
    throw new Error("At least one project is required");
  }
  for (const project of list) {
    if (!validSlugs.includes(project)) {
      throw new Error(`Invalid project: ${project}`);
    }
  }

  return new SignJWT({ projects: list, sub: recipient })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expiresInDays}d`)
    .sign(getSecret());
}

/**
 * Verify a magic-link token and return the validated list of project slugs it
 * grants. Accepts both new multi-project tokens (`projects: []`) and legacy
 * single-project tokens (`project: ""`). Throws if no valid project remains.
 */
export async function verifyMagicLink(
  token: string
): Promise<{ projects: ProjectId[]; sub: string }> {
  const { payload } = await jwtVerify(token, getSecret());
  const raw = payload as MagicLinkPayload;

  const requested: string[] = Array.isArray(raw.projects)
    ? raw.projects
    : raw.project
      ? [raw.project]
      : [];

  const projects = requested.filter((project) => validSlugs.includes(project));
  if (projects.length === 0) {
    throw new Error("Invalid token: missing or invalid project");
  }

  return { projects, sub: typeof raw.sub === "string" ? raw.sub : "" };
}
