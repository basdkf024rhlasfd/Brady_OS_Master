import { requireProjectAccess } from "@/lib/portal-access";
import { EngagementHub } from "@/components/engagement/EngagementHub";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

const config: EngagementHubConfig = {
  clientName: "1915 South — CFO + Applied AI Role",
  bradyRole: "Role design · scope of accountability · AI decision layer · finance modernization",
  phase: "Phase 2 — Problem Frame",
  phaseSteps: ["Research", "Problem Frame", "Scope Negotiation", "SOW", "Engagement"],
  currentPhaseIndex: 1,
  deliverables: [
    {
      id: "001",
      name: "CFO + Applied AI Role Definition",
      format: "Brief",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "Holstered",
    },
    {
      id: "002",
      name: "Applied AI Roadmap (Year 1 outline)",
      format: "Brief",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "Holstered",
    },
    {
      id: "003",
      name: "GMROI Improvement Lever Map",
      format: "Brief",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "Holstered",
    },
  ],
  nextTouch: {
    label: "Role-design working session — TBD",
    isoDate: "2026-04-29",
  },
  projectSlug: "1915-south-cfo",
};

export default async function NineteenFifteenSouthCfoPage() {
  await requireProjectAccess("1915-south-cfo");
  return (
    <div className="h-full overflow-y-auto bg-gray-950">
      <EngagementHub {...config} />
      <div className="border-t border-gray-800 px-6 pt-8 pb-2">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            CFO + Applied AI Workspace
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Role design, scope of accountability, AI decision layer above Zapsight, GMROI lever map, and finance modernization.
          </p>
        </div>
      </div>
      <div className="h-screen bg-gray-950 p-4">
        <ProjectFrame
          baseUrl="/1915-south-cfo/viewer"
          path="/index.html"
          title="1915 South CFO"
        />
      </div>
    </div>
  );
}
