import { requireProjectAccess } from "@/lib/portal-access";
import { EngagementHub } from "@/components/engagement/EngagementHub";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

const config: EngagementHubConfig = {
  clientName: "1915 South — Ashley HomeStore",
  bradyRole: "Advisor — Innovation Workshop + M&A Preparation",
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
      name: "M&A Workshop Output",
      format: "TBD",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "—",
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
    label: "Await Justin Woods signal — Apr 29",
    isoDate: "2026-04-29",
  },
  projectSlug: "1915-south",
};

export default async function NineteenFifteenSouthPage() {
  await requireProjectAccess("1915-south");
  return (
    <div className="h-full overflow-y-auto bg-gray-950">
      <EngagementHub {...config} />
      <div className="border-t border-gray-800 px-6 pt-8 pb-2">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Research Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Full 1915 South research corpus — Innovation Workshop, M&A thesis, scenario matrix, talk track.
          </p>
        </div>
      </div>
      <div className="h-screen bg-gray-950 p-4">
        <ProjectFrame
          baseUrl="/1915-south/viewer"
          path="/index.html"
          title="1915 South Research Dashboard"
        />
      </div>
    </div>
  );
}
