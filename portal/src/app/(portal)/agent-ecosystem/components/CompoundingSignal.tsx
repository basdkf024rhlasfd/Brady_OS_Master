interface Axis {
  title: string;
  measure: string;
  example: string;
  detail: string;
}

const AXES: Axis[] = [
  {
    title: "Platform",
    measure: "Code, skills, portal pages, integrations",
    example: "Workshop became a skill. The skill became a web tool. The web tool became an embedded research feed.",
    detail: "Each engagement reuses what the last one hardened. The next one inherits the result, not the work.",
  },
  {
    title: "Research",
    measure: "Sources cited, named entities tracked, data requests closed",
    example: "First applied run: a handful of sources. Five iterations later: 60+ sources, named targets, traced precedents.",
    detail: "The same questions get asked faster, deeper, and with more context every time.",
  },
  {
    title: "Data",
    measure: "Saved findings, referenced entries, decision history",
    example: "Context vault rows accumulate. The research library cross-references itself. Decisions log their rationale.",
    detail: "What got learned in run N is durable for run N+1. The system gets smarter even when the operator is asleep.",
  },
];

export function CompoundingSignal() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {AXES.map((axis) => (
        <div
          key={axis.title}
          className="rounded-lg border border-gray-800 bg-gray-900/40 p-5"
        >
          <h3 className="text-base font-semibold text-white">{axis.title}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-wider text-gray-500">
            {axis.measure}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-gray-300">{axis.example}</p>
          <p className="mt-3 border-t border-gray-800 pt-3 text-xs italic leading-relaxed text-gray-500">
            {axis.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
