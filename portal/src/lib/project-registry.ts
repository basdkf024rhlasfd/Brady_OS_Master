import { loadProjects } from "@/config/load-projects";

export interface ProjectMeta {
  id: string;
  label: string;
}

const labelMap = new Map(loadProjects().map((p) => [p.slug, p.label]));

export function getProjectLabel(scope: string): string {
  return labelMap.get(scope) ?? scope;
}
