import { loadProjects, getEnvVarName } from "@/config/load-projects";

const DEFAULT_PLATFORM_OWNER_EMAIL = "brady.smallwood@gmail.com";
const DEFAULT_RESERVED_TEST_EMAIL = "bradysmallz@gmail.com";

const projectConfigs = loadProjects();
const ALL_PROJECTS = projectConfigs.map((p) => p.slug);
export type ProjectId = string;

// Curated set of slugs that the `preview` tier can see. Adding an email to
// MCEPTION_PREVIEW_EMAILS grants access to exactly this list, no more.
// Keep this list tight — preview is the externally-shared tour surface.
const PREVIEW_PROJECTS: readonly string[] = [
  "agent-ecosystem",
  "1915-south-execs",
  "panda",
  "shellprint",
  "innovation-lab",
];

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
  isAdmin: boolean,
  isPreview: boolean,
  publicMetadata?: Record<string, unknown>
): string[] {
  if (isAdmin) return [...ALL_PROJECTS];

  const allProjectsEmails = readCsvEnv("MCEPTION_ALL_PROJECTS_EMAILS");
  if (emailAddresses.some((email) => allProjectsEmails.includes(email))) {
    return [...ALL_PROJECTS];
  }

  const projects = new Set<string>();

  // Preview tier: seed with the curated tour list (only slugs that exist)
  if (isPreview) {
    for (const slug of PREVIEW_PROJECTS) {
      if (ALL_PROJECTS.includes(slug)) projects.add(slug);
    }
  }

  // Per-project env-var allowlists
  for (const slug of ALL_PROJECTS) {
    const allowed = readCsvEnv(getEnvVarName(slug));
    if (emailAddresses.some((email) => allowed.includes(email))) {
      projects.add(slug);
    }
  }

  // Clerk metadata grants — managed via /admin/access UI, no redeploy needed
  const metadataProjects = publicMetadata?.allowedProjects;
  if (Array.isArray(metadataProjects)) {
    for (const slug of metadataProjects) {
      if (typeof slug === "string" && ALL_PROJECTS.includes(slug)) {
        projects.add(slug);
      }
    }
  }

  return [...projects];
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

  const previewEmails = readCsvEnv("MCEPTION_PREVIEW_EMAILS");
  const isPreviewEmail = emailAddresses.some((email) =>
    previewEmails.includes(email)
  );
  const isPreview = !isAdmin && !isReservedTestAccount && isPreviewEmail;

  const projects = resolveProjects(
    emailAddresses,
    isAdmin,
    isPreview,
    user?.publicMetadata ?? undefined
  );

  // ─── User tier ───
  // owner   = Brady (full access, all features, debug surfaces)
  // test    = reserved test account or explicit metadata.tier="test" (pre-prod
  //           client experience validation; scoped to assigned projects only)
  // preview = email in MCEPTION_PREVIEW_EMAILS (curated tour surface; AppShell
  //           renders a "Working preview" banner; access scoped to PREVIEW_PROJECTS)
  // client  = everyone else (read-only, no debug, client-facing personas)
  const explicitTier =
    typeof user?.publicMetadata?.tier === "string"
      ? user.publicMetadata.tier
      : typeof user?.privateMetadata?.tier === "string"
        ? user.privateMetadata.tier
        : undefined;

  let tier: "owner" | "test" | "preview" | "client";
  if (isOwner || isAdmin) {
    tier = "owner";
  } else if (isReservedTestAccount || explicitTier === "test") {
    tier = "test";
  } else if (isPreview) {
    tier = "preview";
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
