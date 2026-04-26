import { loadProjects, getEnvVarName } from "@/config/load-projects";

const DEFAULT_PLATFORM_OWNER_EMAIL = "brady.smallwood@gmail.com";
const DEFAULT_RESERVED_TEST_EMAIL = "bradysmallz@gmail.com";

const projectConfigs = loadProjects();
const ALL_PROJECTS = projectConfigs.map((p) => p.slug);
export type ProjectId = string;

interface UserLike {
  publicMetadata?: Record<string, unknown>;
  privateMetadata?: Record<string, unknown>;
  emailAddresses?: Array<{ emailAddress: string }> | null;
}

function normalizeEmail(value: string | undefined): string | undefined {
  const normalized = value?.trim().toLowerCase();
  return normalized || undefined;
}

function readCsvEnv(name: string): string[] {
  return (process.env[name] ?? "")
    .split(",")
    .map((value) => normalizeEmail(value))
    .filter((value): value is string => Boolean(value));
}

export function getPlatformOwnerEmail(): string {
  return (
    normalizeEmail(process.env.MCEPTION_PLATFORM_OWNER_EMAIL) ??
    DEFAULT_PLATFORM_OWNER_EMAIL
  );
}

export function getReservedTestEmail(): string {
  return (
    normalizeEmail(process.env.MCEPTION_RESERVED_TEST_EMAIL) ??
    DEFAULT_RESERVED_TEST_EMAIL
  );
}

export function getAdminEmails(): string[] {
  const ownerEmail = getPlatformOwnerEmail();
  const reservedTestEmail = getReservedTestEmail();

  return readCsvEnv("MCEPTION_ADMIN_EMAILS").filter(
    (email) => email !== ownerEmail && email !== reservedTestEmail
  );
}


function resolveProjects(
  emailAddresses: string[],
  isAdmin: boolean
): string[] {
  if (isAdmin) return [...ALL_PROJECTS];

  const allProjectsEmails = readCsvEnv("MCEPTION_ALL_PROJECTS_EMAILS");
  if (emailAddresses.some((email) => allProjectsEmails.includes(email))) {
    return [...ALL_PROJECTS];
  }

  const projects: string[] = [];
  for (const slug of ALL_PROJECTS) {
    const allowed = readCsvEnv(getEnvVarName(slug));
    if (emailAddresses.some((email) => allowed.includes(email))) {
      projects.push(slug);
    }
  }
  return projects;
}

export function resolvePortalAccess(user: UserLike | null | undefined) {
  const ownerEmail = getPlatformOwnerEmail();
  const reservedTestEmail = getReservedTestEmail();
  const adminEmails = getAdminEmails();

  const emailAddresses =
    user?.emailAddresses
      ?.map((entry) => normalizeEmail(entry.emailAddress))
      .filter((email): email is string => Boolean(email)) ?? [];

  const publicRole =
    typeof user?.publicMetadata?.role === "string"
      ? user.publicMetadata.role
      : undefined;
  const privateRole =
    typeof user?.privateMetadata?.role === "string"
      ? user.privateMetadata.role
      : undefined;

  const isOwner = emailAddresses.includes(ownerEmail);
  const isReservedTestAccount = emailAddresses.includes(reservedTestEmail);
  const hasAdminRole =
    publicRole === "owner" ||
    publicRole === "admin" ||
    privateRole === "owner" ||
    privateRole === "admin";
  const isEmailAdmin = emailAddresses.some((email) => adminEmails.includes(email));

  const isAdmin =
    !isReservedTestAccount && (isOwner || hasAdminRole || isEmailAdmin);

  const projects = resolveProjects(emailAddresses, isAdmin);

  // ─── User tier ───
  // owner  = Brady (full access, all features, debug surfaces)
  // test   = reserved test account or explicit metadata.tier="test" (pre-prod
  //          client experience validation; scoped to assigned projects only)
  // client = everyone else (read-only, no debug, client-facing personas)
  const explicitTier =
    typeof user?.publicMetadata?.tier === "string"
      ? user.publicMetadata.tier
      : typeof user?.privateMetadata?.tier === "string"
        ? user.privateMetadata.tier
        : undefined;

  let tier: "owner" | "test" | "client";
  if (isOwner || isAdmin) {
    tier = "owner";
  } else if (isReservedTestAccount || explicitTier === "test") {
    tier = "test";
  } else {
    tier = "client";
  }

  return {
    ownerEmail,
    reservedTestEmail,
    adminEmails,
    emailAddresses,
    publicRole,
    privateRole,
    isOwner,
    isReservedTestAccount,
    isAdmin,
    tier,
    projects,
  };
}
