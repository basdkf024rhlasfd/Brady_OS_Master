import { requireProjectAccess } from "@/lib/portal-access";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";
import { NineteenFifteenSouthPageClient } from "./NineteenFifteenSouthPageClient";

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
  return <NineteenFifteenSouthPageClient config={config} />;
}
