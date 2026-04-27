import { getPortalAccess, requireProjectAccess } from "@/lib/portal-access";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";
import { PandaPageClient } from "./PandaPageClient";

const config: EngagementHubConfig = {
  clientName: "QSR / Multi-Unit Foodservice Strategy Engagement",
  bradyRole: "Advisor — Ops Innovation Team Stand-Up",
  phase: "Phase 3 — Scope Negotiation",
  phaseSteps: ["Research", "Problem Frame", "Scope Negotiation", "SOW", "Engagement"],
  currentPhaseIndex: 2,
  deliverables: [
    {
      id: "001",
      name: "Problem Statements Brief",
      format: "HTML + PDF",
      dateSent: "2026-04-18",
      sentTo: "Client lead",
      acknowledged: "Pending",
    },
    {
      id: "002",
      name: "Research Brief (14 threads)",
      format: "PDF",
      dateSent: "2026-04-18",
      sentTo: "Client lead",
      acknowledged: "Pending",
    },
    {
      id: "003",
      name: "SOW / Engagement Description",
      format: "TBD",
      dateSent: undefined,
      sentTo: "Client lead",
      acknowledged: "—",
    },
  ],
  nextTouch: {
    label: "Awaiting client reply",
    isoDate: "2026-04-28",
  },
  projectSlug: "panda",
};

export default async function PandaPage() {
  await requireProjectAccess("panda");
  const { tier } = await getPortalAccess();
  const showResearchBrief = tier !== "preview";
  return <PandaPageClient config={config} showResearchBrief={showResearchBrief} />;
}
