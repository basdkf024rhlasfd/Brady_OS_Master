interface Stage {
  index: number;
  label: string;
  date: string;
  built: string;
  saved: string;
  axes: { platform: number; research: number; data: number };
}

const STAGES: Stage[] = [
  {
    index: 1,
    label: "Random idea",
    date: "Early April 2026",
    built: "A note in working notes — operator-grade brainstorming as a discipline, not a vibe.",
    saved: "Working notes only.",
    axes: { platform: 1, research: 1, data: 1 },
  },
  {
    index: 2,
    label: "Research report",
    date: "Pre-April 15",
    built: "First applied research run — a peer operator's pricing crisis, traced source-by-source.",
    saved: "First operator-wisdom seeds. The shape of a method starts forming.",
    axes: { platform: 2, research: 3, data: 2 },
  },
  {
    index: 3,
    label: "Workshop + web tool",
    date: "April 15",
    built: "Innovation Workshop becomes a repeatable skill. Live web surface generates, scores, and pitches ideas with research backing.",
    saved: "Method-performance learning log. Idea catalog. Method scoring across runs.",
    axes: { platform: 5, research: 5, data: 4 },
  },
  {
    index: 4,
    label: "Ops engine morph",
    date: "April 16",
    built: "Same engine, ops side. Problem-first framing. Operator wisdom library — TOC, VSM, PR/FAQ, Hoshin, Chipotle, CFA, Foran.",
    saved: "Wisdom library reusable across engagements. Ops-side recursive learning log.",
    axes: { platform: 7, research: 7, data: 6 },
  },
  {
    index: 5,
    label: "Live engagement application",
    date: "April 22",
    built: "Same workshop, same ops engine, applied to a real client. 39 ideas, 60+ research sources, M&A brief, custom visuals, client-safe hub.",
    saved: "Context Vault rows. Research Library entries. Closed data requests. Decision log.",
    axes: { platform: 10, research: 10, data: 10 },
  },
];

const MAX = 10;

function CompoundingBar({ value, label, color }: { value: number; label: string; color: string }) {
  const pct = (value / MAX) * 100;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">{label}</span>
        <span className="font-mono text-[10px] text-gray-400">{value}/{MAX}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-800">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function RecursiveLearningArc() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      {/* Stage cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {STAGES.map((stage) => (
          <div
            key={stage.index}
            className="relative flex flex-col rounded-lg border border-gray-800 bg-gray-950/60 p-4"
          >
            <div className="mb-3 flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-500/80">
                Stage {stage.index}
              </span>
              <span className="font-mono text-[10px] text-gray-600">{stage.date}</span>
            </div>
            <h3 className="mb-2 text-sm font-semibold text-white">{stage.label}</h3>
            <p className="mb-4 text-xs leading-relaxed text-gray-400">{stage.built}</p>

            <div className="mt-auto space-y-2.5">
              <CompoundingBar value={stage.axes.platform} label="Platform" color="bg-amber-500/70" />
              <CompoundingBar value={stage.axes.research} label="Research" color="bg-blue-400/70" />
              <CompoundingBar value={stage.axes.data} label="Data" color="bg-emerald-400/70" />
            </div>

            <p className="mt-4 border-t border-gray-800 pt-3 text-[11px] italic leading-relaxed text-gray-500">
              {stage.saved}
            </p>
          </div>
        ))}
      </div>

      {/* The loop */}
      <div className="mt-8 rounded-lg border border-amber-900/40 bg-amber-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          The loop
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">
          Every stage&apos;s outputs feed the next as inputs. Workshop method becomes ops method becomes engagement method.
          Saved data narrows the next ask and deepens the next answer. Twelve days — five iterations — and the platform
          gets sharper each time.
        </p>
      </div>
    </div>
  );
}
