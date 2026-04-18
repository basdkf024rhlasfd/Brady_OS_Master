import fs from "fs";
import path from "path";
import { parse } from "yaml";

export interface ProjectConfig {
  slug: string;
  label: string;
  short: string;
  href: string;
  approved: string;
  type: "iframe-local" | "iframe-external" | "native";
  magic_link: boolean;
  frame?: { baseUrl: string; path: string };
  share_frame?: { baseUrl: string; path: string };
}

let _cache: ProjectConfig[] | null = null;

export function loadProjects(): ProjectConfig[] {
  if (_cache) return _cache;
  const raw = fs.readFileSync(
    path.join(process.cwd(), "src/config/projects.yml"),
    "utf-8"
  );
  _cache = parse(raw).projects as ProjectConfig[];
  return _cache;
}

export function getProjectSlugs(): string[] {
  return loadProjects().map((p) => p.slug);
}

export function getProjectBySlug(slug: string): ProjectConfig | undefined {
  return loadProjects().find((p) => p.slug === slug);
}

export function getMagicLinkProjects(): ProjectConfig[] {
  return loadProjects().filter((p) => p.magic_link && p.frame);
}

export function getEnvVarName(slug: string): string {
  return `MCEPTION_${slug.toUpperCase().replace(/-/g, "_")}_EMAILS`;
}
