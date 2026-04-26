import { requireProjectAccess } from "@/lib/portal-access";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";
import { PandaPageClient } from "./PandaPageClient";

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
  return <PandaPageClient config={config} />;
}
