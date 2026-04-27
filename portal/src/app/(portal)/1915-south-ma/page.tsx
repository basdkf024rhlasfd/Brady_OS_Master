import { requireProjectAccess } from "@/lib/portal-access";
import { EngagementHub } from "@/components/engagement/EngagementHub";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

const config: EngagementHubConfig = {
  clientName: "1915 South — M&A and Capital Workspace",
  bradyRole: "Roll-up thesis · valuation anchors · target operators · capital partners",
  phase: "Phase 2 — Problem Frame",
  phaseSteps: ["Research", "Problem Frame", "Scope Negotiation", "SOW", "Engagement"],
  currentPhaseIndex: 1,
  deliverables: [
    {
      id: "001",
      name: "M&A Deep Research Brief",
      format: "HTML + PDF",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "Holstered",
    },
    {
      id: "002",
      name: "Named Target Operator Pool (public sources)",
      format: "Brief",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "Holstered",
    },
    {
      id: "003",
      name: "Capital Partner Universe",
      format: "Brief",
      dateSent: undefined,
      sentTo: "Justin Woods",
      acknowledged: "Holstered",
    },
  ],
  nextTouch: {
    label: "M&A working session — TBD",
    isoDate: "2026-04-29",
  },
  projectSlug: "1915-south-ma",
};

export default async function NineteenFifteenSouthMaPage() {
  await requireProjectAccess("1915-south-ma");
  return (
    <div className="h-full overflow-y-auto bg-gray-950">
      <EngagementHub {...config} />
      <div className="border-t border-gray-800 px-6 pt-8 pb-2">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            M&amp;A Workspace
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Roll-up thesis, valuation anchors, named target operators (public sources only), and capital partner universe.
          </p>
        </div>
      </div>
      <div className="h-screen bg-gray-950 p-4">
        <ProjectFrame
          baseUrl="/1915-south-ma/viewer"
          path="/index.html"
          title="1915 South M&A"
        />
      </div>
    </div>
  );
}
