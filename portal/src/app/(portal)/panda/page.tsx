import { requireProjectAccess } from "@/lib/portal-access";
import { EngagementHub } from "@/components/engagement/EngagementHub";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

const config: EngagementHubConfig = {
  clientName: "Panda Restaurant Group",
  bradyRole: "Advisor — Ops Innovation Team Stand-Up",
  phase: "Phase 3 — Scope Negotiation",
  phaseSteps: ["Research", "Problem Frame", "Scope Negotiation", "SOW", "Engagement"],
  currentPhaseIndex: 2,
  deliverables: [
    {
      id: "001",
      name: "Panda Problem Statements Brief",
      format: "HTML + PDF",
      dateSent: "2026-04-18",
      sentTo: "James Ku (CDO)",
      acknowledged: "Pending",
    },
    {
      id: "002",
      name: "Panda Research Brief (14 threads)",
      format: "PDF",
      dateSent: "2026-04-18",
      sentTo: "James Ku (CDO)",
      acknowledged: "Pending",
    },
    {
      id: "003",
      name: "SOW / Engagement Description",
      format: "TBD",
      dateSent: undefined,
      sentTo: "James Ku (CDO)",
      acknowledged: "—",
    },
  ],
  nextTouch: {
    label: "Await James Ku reply — Apr 28",
    isoDate: "2026-04-28",
  },
  projectSlug: "panda",
};

export default async function PandaPage() {
  await requireProjectAccess("panda");
  return (
    <div className="h-full overflow-y-auto bg-gray-950">
      <EngagementHub {...config} />
      <div className="border-t border-gray-800 px-6 pt-8 pb-2">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Research Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Full Panda research corpus — 14 DR threads, KPI benchmarks, problem statements, knowledge gaps.
          </p>
        </div>
      </div>
      <div className="h-screen bg-gray-950 p-4">
        <ProjectFrame
          baseUrl="/panda/viewer"
          path="/index.html"
          title="Panda Research Dashboard"
        />
      </div>
    </div>
  );
}
