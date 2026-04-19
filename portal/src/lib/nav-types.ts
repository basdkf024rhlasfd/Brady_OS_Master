export interface ProjectNav {
  slug: string;
  label: string;
  short: string;
  href: string;
}

export interface AccessEntry {
  email: string;
  role: "owner" | "admin" | "all-projects" | "viewer";
}

export type AccessMap = Record<string, AccessEntry[]>;
