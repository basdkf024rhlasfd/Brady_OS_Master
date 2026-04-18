const DEFAULT_PLATFORM_OWNER_EMAIL = "brady.smallwood@gmail.com";
const DEFAULT_RESERVED_TEST_EMAIL = "bradysmallz@gmail.com";

const ALL_PROJECTS = ["stihl", "orlando", "moving", "mark-schmulen", "pauletteai", "gary", "baden-bagley", "content-engine", "incubator", "kroger", "innovation-lab", "ops-lab", "panda", "grocery-assistant", "school-hub", "financial-assistant"] as const;
export type ProjectId = (typeof ALL_PROJECTS)[number];

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

/** Map of project → env var containing CSV of allowed emails */
const PROJECT_EMAIL_ENV: Record<ProjectId, string> = {
  stihl: "MCEPTION_STIHL_EMAILS",
  orlando: "MCEPTION_ORLANDO_EMAILS",
  moving: "MCEPTION_MOVING_EMAILS",
  "mark-schmulen": "MCEPTION_MARK_SCHMULEN_EMAILS",
  pauletteai: "MCEPTION_PAULETTEAI_EMAILS",
  gary: "MCEPTION_GARY_EMAILS",
  "baden-bagley": "MCEPTION_BADEN_BAGLEY_EMAILS",
  "content-engine": "MCEPTION_CONTENT_ENGINE_EMAILS",
  incubator: "MCEPTION_INCUBATOR_EMAILS",
  kroger: "MCEPTION_KROGER_EMAILS",
  "innovation-lab": "MCEPTION_INNOVATION_LAB_EMAILS",
  "ops-lab": "MCEPTION_OPS_LAB_EMAILS",
  panda: "MCEPTION_PANDA_EMAILS",
  "grocery-assistant": "MCEPTION_GROCERY_ASSISTANT_EMAILS",
  "school-hub": "MCEPTION_SCHOOL_HUB_EMAILS",
  "financial-assistant": "MCEPTION_FINANCIAL_ASSISTANT_EMAILS",
};

function resolveProjects(
  emailAddresses: string[],
  isAdmin: boolean
): ProjectId[] {
  if (isAdmin) return [...ALL_PROJECTS];

  const allProjectsEmails = readCsvEnv("MCEPTION_ALL_PROJECTS_EMAILS");
  if (emailAddresses.some((email) => allProjectsEmails.includes(email))) {
    return [...ALL_PROJECTS];
  }

  const projects: ProjectId[] = [];
  for (const project of ALL_PROJECTS) {
    const allowed = readCsvEnv(PROJECT_EMAIL_ENV[project]);
    if (emailAddresses.some((email) => allowed.includes(email))) {
      projects.push(project);
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
    projects,
  };
}
