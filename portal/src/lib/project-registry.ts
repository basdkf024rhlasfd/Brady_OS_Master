export interface ProjectMeta {
  id: string;
  label: string;
}

const REGISTRY: ProjectMeta[] = [
  { id: "portal", label: "Portal" },
  { id: "moving", label: "Moving Calculator" },
  { id: "stihl", label: "STIHL USA" },
  { id: "orlando", label: "Orlando RE KB" },
  { id: "mark-schmulen", label: "Mark Schmulen" },
  { id: "pauletteai", label: "PauletteAI" },
  { id: "gary", label: "Gary / IVFH" },
  { id: "baden-bagley", label: "Baden Bagley" },
];

const labelMap = new Map(REGISTRY.map((p) => [p.id, p.label]));

export function getProjectLabel(scope: string): string {
  return labelMap.get(scope) ?? scope;
}
