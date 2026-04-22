import "server-only";

export type TrafficColor = "green" | "yellow" | "red" | "unknown";

export type DomainId =
  | "consulting"
  | "finance"
  | "family"
  | "velocity"
  | "pipeline";

export type DomainTile = {
  id: DomainId;
  name: string;
  color: TrafficColor;
  headline: string;
  signals: string[];
};

export function consultingRubric(activeCount: number): { color: TrafficColor; headline: string } {
  if (activeCount >= 2) {
    return { color: "green", headline: `${activeCount} active engagements` };
  }
  if (activeCount === 1) {
    return { color: "yellow", headline: "1 active engagement — thin coverage" };
  }
  return { color: "red", headline: "No active engagements" };
}

export function financeRubric(input: {
  hasCriticalAlert: boolean;
  hasWarningAlert: boolean;
  runwayMonths: number | null;
}): { color: TrafficColor; headline: string } {
  const { hasCriticalAlert, hasWarningAlert, runwayMonths } = input;

  if (hasCriticalAlert) return { color: "red", headline: "Critical alert on cockpit" };
  if (runwayMonths != null && runwayMonths < 3)
    return { color: "red", headline: `Runway ${runwayMonths.toFixed(1)}mo — below 3-month floor` };

  if (hasWarningAlert)
    return { color: "yellow", headline: "Warning alerts on cockpit" };
  if (runwayMonths != null && runwayMonths < 6)
    return { color: "yellow", headline: `Runway ${runwayMonths.toFixed(1)}mo — watch` };

  if (runwayMonths == null) return { color: "unknown", headline: "Runway unknown — update liquid-assets.md" };

  return { color: "green", headline: `Runway ${runwayMonths.toFixed(1)}mo · no alerts` };
}

export function familyRubric(input: {
  upcomingEventsWithGaps: number;
  hasEventWithin7Days: boolean;
}): { color: TrafficColor; headline: string } {
  const { upcomingEventsWithGaps, hasEventWithin7Days } = input;
  if (upcomingEventsWithGaps >= 3 || (hasEventWithin7Days && upcomingEventsWithGaps > 0)) {
    return { color: "red", headline: `${upcomingEventsWithGaps} events with prep gaps` };
  }
  if (upcomingEventsWithGaps >= 1) {
    return { color: "yellow", headline: `${upcomingEventsWithGaps} event${upcomingEventsWithGaps === 1 ? "" : "s"} with gaps` };
  }
  return { color: "green", headline: "No prep gaps in next 30 days" };
}

export function velocityRubric(input: {
  commits7d: number;
  routingLog7d: number;
  gitAvailable: boolean;
}): { color: TrafficColor; headline: string } {
  const { commits7d, routingLog7d, gitAvailable } = input;
  if (!gitAvailable && routingLog7d === 0) {
    return { color: "unknown", headline: "Velocity data unavailable" };
  }
  if (commits7d >= 5) return { color: "green", headline: `${commits7d} commits · ${routingLog7d} routed last 7d` };
  if (commits7d >= 1) return { color: "yellow", headline: `${commits7d} commits · ${routingLog7d} routed last 7d` };
  return { color: "red", headline: `0 commits last 7d · ${routingLog7d} routed` };
}

export function pipelineRubric(input: {
  activeProspects: number;
  movementLast14d: number;
}): { color: TrafficColor; headline: string } {
  const { activeProspects, movementLast14d } = input;
  if (activeProspects >= 2 && movementLast14d > 0) {
    return { color: "green", headline: `${activeProspects} prospects · ${movementLast14d} moved 14d` };
  }
  if (activeProspects >= 1 && movementLast14d > 0) {
    return { color: "yellow", headline: `${activeProspects} prospect · ${movementLast14d} moved 14d` };
  }
  return { color: "red", headline: "No pipeline movement in 14 days" };
}
