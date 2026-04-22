import "server-only";

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { queryDataSource } from "@/lib/notion-client";
import {
  consultingRubric,
  familyRubric,
  financeRubric,
  pipelineRubric,
  velocityRubric,
  type DomainTile,
} from "@/lib/traffic-light/rubric";

const CLIENT_PROJECTS_DB = "c8a6b2d70d9343839a16c950c95a6066";
const INTERNAL_PROJECTS_DB = "2c2ed43b89c580afac9bededd48b98e7";
const STREAMING_NOTES_DB = "2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83";
const ROUTING_LOG_DB = "344ed43b-89c5-816a-ab54-ca49ca239748";

const COCKPIT_PATH = join(
  process.cwd(),
  "public/financial-assistant/data.js",
);

const FAMILY_OPEN_LOOPS_PATH = join(
  process.cwd(),
  "public/family/kb/12-open-loops.md",
);

// ---- Active Consulting ----
async function fetchConsultingTile(): Promise<DomainTile> {
  try {
    const [client, internal] = await Promise.all([
      queryDataSource(CLIENT_PROJECTS_DB, { pageSize: 50 }),
      queryDataSource(INTERNAL_PROJECTS_DB, { pageSize: 50 }),
    ]);
    const isActive = (s: string | null) =>
      s && ["Active", "In Progress", "In Flight", "Live"].includes(s);
    const active = [
      ...client.filter((r) => isActive(r.status)),
      ...internal.filter((r) => isActive(r.status)),
    ];
    const { color, headline } = consultingRubric(active.length);
    const signals = active
      .slice(0, 3)
      .map((r) => `${r.title} (${r.status ?? "—"})`);
    return {
      id: "consulting",
      name: "Active Consulting",
      color,
      headline,
      signals,
    };
  } catch (err) {
    return {
      id: "consulting",
      name: "Active Consulting",
      color: "unknown",
      headline: "Notion unreachable",
      signals: [err instanceof Error ? err.message : "unknown error"],
    };
  }
}

// ---- Personal Finance ----
function fetchFinanceTile(): DomainTile {
  try {
    const raw = readFileSync(COCKPIT_PATH, "utf-8");
    const start = raw.indexOf("window.COCKPIT_DATA");
    if (start < 0) throw new Error("COCKPIT_DATA marker not found");
    const jsonStart = raw.indexOf("{", start);
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd < 0 || jsonEnd < jsonStart) {
      throw new Error("data.js format unexpected");
    }
    const cockpit = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));

    const alerts = (cockpit.alerts ?? []) as Array<{
      level?: string;
      title?: string;
    }>;
    const hasCriticalAlert = alerts.some((a) => a.level === "critical");
    const hasWarningAlert = alerts.some(
      (a) => a.level === "warning" || a.level === "yellow",
    );
    const runwayMonths = cockpit.runway?.months ?? null;

    const { color, headline } = financeRubric({
      hasCriticalAlert,
      hasWarningAlert,
      runwayMonths,
    });

    const burn = cockpit.burnRate;
    const signals = [
      burn
        ? `Burn $${Math.round(burn.fourWeekWeekly).toLocaleString()}/wk (trend ${burn.trend})`
        : "Burn: —",
      cockpit.runway?.liquidAssets
        ? `Liquid $${Math.round(cockpit.runway.liquidAssets).toLocaleString()}`
        : "Liquid: update liquid-assets.md",
      alerts.length
        ? `${alerts.length} active alert${alerts.length === 1 ? "" : "s"}`
        : "No alerts",
    ];

    return {
      id: "finance",
      name: "Personal Finance",
      color,
      headline,
      signals,
    };
  } catch (err) {
    return {
      id: "finance",
      name: "Personal Finance",
      color: "unknown",
      headline: "Cockpit data unavailable",
      signals: [err instanceof Error ? err.message : "unknown error"],
    };
  }
}

// ---- Family / Kids ----
function fetchFamilyTile(): DomainTile {
  try {
    const raw = readFileSync(FAMILY_OPEN_LOOPS_PATH, "utf-8");
    const items = raw
      .split("\n")
      .filter((l) => l.trim().startsWith("- "))
      .map((l) => l.replace(/^- /, "").trim());
    const upcomingEventsWithGaps = items.length;
    const hasEventWithin7Days = /within\s+7\s*days|this week|tomorrow|today/i.test(
      raw,
    );
    const { color, headline } = familyRubric({
      upcomingEventsWithGaps,
      hasEventWithin7Days,
    });
    return {
      id: "family",
      name: "Family / Kids",
      color,
      headline,
      signals: items.slice(0, 3).map((i) => i.slice(0, 80)),
    };
  } catch (err) {
    return {
      id: "family",
      name: "Family / Kids",
      color: "unknown",
      headline: "Family KB unavailable",
      signals: [err instanceof Error ? err.message : "unknown error"],
    };
  }
}

// ---- Build Velocity ----
async function fetchVelocityTile(): Promise<DomainTile> {
  let commits7d = 0;
  let gitAvailable = false;
  let recentCommits: string[] = [];
  try {
    const out = execFileSync(
      "git",
      ["log", "--since=7.days", "--pretty=format:%h %s"],
      { encoding: "utf-8", cwd: process.cwd() },
    );
    const lines = out.split("\n").filter(Boolean);
    commits7d = lines.length;
    gitAvailable = true;
    recentCommits = lines.slice(0, 3);
  } catch {
    // Vercel deploys don't expose git; fall through with gitAvailable=false
  }

  let routingLog7d = 0;
  try {
    const rows = await queryDataSource(ROUTING_LOG_DB, {
      pageSize: 50,
      titleProp: "original_title",
    });
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    routingLog7d = rows.filter(
      (r) => r.lastEdited && new Date(r.lastEdited) >= cutoff,
    ).length;
  } catch {
    // Routing Log may not exist yet (post-Build 1) — treat as 0
  }

  const { color, headline } = velocityRubric({
    commits7d,
    routingLog7d,
    gitAvailable,
  });

  const signals: string[] =
    recentCommits.length > 0
      ? recentCommits.map((c) => c.slice(0, 80))
      : [`Git log ${gitAvailable ? "empty" : "unavailable"}`, `Routing Log: ${routingLog7d} entries 7d`];

  return {
    id: "velocity",
    name: "Build Velocity",
    color,
    headline,
    signals,
  };
}

// ---- Pipeline / BD ----
async function fetchPipelineTile(): Promise<DomainTile> {
  try {
    const rows = await queryDataSource(STREAMING_NOTES_DB, {
      pageSize: 100,
      tagsProp: "Tags",
    });
    const pipelineItems = rows.filter((r) => r.tags.includes("Pipeline"));
    const activeProspects = pipelineItems.filter(
      (r) => r.status !== "Complete" && r.status !== "Rejected",
    ).length;

    const cutoff14d = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const movementLast14d = pipelineItems.filter(
      (r) => r.lastEdited && new Date(r.lastEdited) >= cutoff14d,
    ).length;

    const { color, headline } = pipelineRubric({
      activeProspects,
      movementLast14d,
    });

    const signals = pipelineItems
      .slice(0, 3)
      .map((r) => `${r.title} (${r.status ?? "—"})`);

    return {
      id: "pipeline",
      name: "Pipeline / BD",
      color,
      headline,
      signals: signals.length
        ? signals
        : ["No Pipeline-tagged items in Streaming Notes"],
    };
  } catch (err) {
    return {
      id: "pipeline",
      name: "Pipeline / BD",
      color: "unknown",
      headline: "Notion unreachable",
      signals: [err instanceof Error ? err.message : "unknown error"],
    };
  }
}

// ---- Orchestrator ----
export async function getTrafficLightTiles(): Promise<DomainTile[]> {
  const [consulting, velocity, pipeline] = await Promise.all([
    fetchConsultingTile(),
    fetchVelocityTile(),
    fetchPipelineTile(),
  ]);
  const finance = fetchFinanceTile();
  const family = fetchFamilyTile();
  return [consulting, finance, family, velocity, pipeline];
}
