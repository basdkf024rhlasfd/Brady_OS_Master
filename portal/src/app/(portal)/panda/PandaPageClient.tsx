"use client";

import { EngagementHub } from "@/components/engagement/EngagementHub";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";

export function PandaPageClient({
  config,
}: {
  config: EngagementHubConfig;
  showResearchBrief?: boolean;
}) {
  return <EngagementHub {...config} />;
}
