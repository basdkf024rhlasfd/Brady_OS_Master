import { requireProjectAccess } from "@/lib/portal-access";
import { EngagementHub } from "@/components/engagement/EngagementHub";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

const config: EngagementHubConfig = {
  clientName: "1915 South — Ashley HomeStore (Execs)",
  bradyRole: "Engagement Overview — Innovation Workshop + M&A Preparation",
  phase: "Phase 2 — Problem Frame",
  phaseSteps: ["Research", "Problem Frame", "Scope Negotiation", "SOW", "Engagement"],
  currentPhaseIndex: 1,
  deliverables: [
    {
      id: "001",
      name: "Innovation Workshop Results",
      format: "HTML + PDF",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "Holstered",
    },
    {
      id: "002",
      name: "M&A / Investment / Partnership Brief",
      format: "HTML + PDF",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "Holstered",
    },
    {
      id: "003",
      name: "Engagement Scope Proposal",
      format: "TBD",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "—",
    },
  ],
  nextTouch: {
    label: "Working session — TBD",
    isoDate: "2026-04-29",
  },
  projectSlug: "1915-south-execs",
};

export default async function NineteenFifteenSouthExecsPage() {
  await requireProjectAccess("1915-south-execs");
  return (
    <div className="h-full overflow-y-auto bg-gray-950">
      <EngagementHub {...config} />
      <div className="border-t border-gray-800 px-6 pt-8 pb-2">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Engagement Overview
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Client-safe summary of the 1915 South engagement — Innovation Workshop highlights, M&amp;A thesis, and engagement context.
          </p>
        </div>
      </div>
      <div className="h-screen bg-gray-950 p-4">
        <ProjectFrame
          baseUrl="/1915-south-execs/viewer"
          path="/index.html"
          title="1915 South Execs"
        />
      </div>
    </div>
  );
}
