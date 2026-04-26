import type { Tool } from "ai";
import type { ToolConfig } from "../chat-config";
import { createCalendarTool } from "./query-calendar";
import { createNotionTool } from "./query-notion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToolFactory = (params?: Record<string, string>) => Tool<any, any> | null;

export type UserTier = "owner" | "test" | "client";

/**
 * Each tool declares the minimum tier required to invoke it. Server-side
 * filtering happens here in resolveTools — clients literally cannot see or
 * call tools they don't have tier access for.
 *
 * Tier rationale:
 *   owner  — full execution rights (Brady)
 *   test   — Tier 2 structured ops only (generate report, run synthesis, etc.)
 *   client — Tier 2 allowlisted client-safe actions only ("schedule a review")
 *
 * Keep `client` access reserved for tools that operate on the client's own
 * data and have no side effects on Brady's infrastructure.
 */
interface ToolEntry {
  factory: ToolFactory;
  requiredTier: UserTier;
  category: "query" | "structured" | "agentic";
}

const TIER_RANK: Record<UserTier, number> = { owner: 3, test: 2, client: 1 };

const toolRegistry: Record<string, ToolEntry> = {
  queryCalendar: {
    factory: createCalendarTool,
    requiredTier: "owner", // queries Brady's personal calendar
    category: "query",
  },
  queryNotion: {
    factory: createNotionTool,
    requiredTier: "owner", // queries Brady's Notion workspace
    category: "query",
  },
};

/**
 * Resolve an array of tool configs into a record of AI SDK tools, filtered by
 * the requesting user's tier. Tools whose factories return null (missing
 * credentials) and tools whose requiredTier exceeds the user's tier are
 * silently skipped — the model never sees them.
 */
export function resolveTools(
  toolConfigs: ToolConfig[],
  userTier: UserTier = "client"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, Tool<any, any>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: Record<string, Tool<any, any>> = {};
  const userRank = TIER_RANK[userTier];

  for (const config of toolConfigs) {
    const entry = toolRegistry[config.name];
    if (!entry) {
      console.warn(`[TOOLS] Unknown tool: ${config.name}`);
      continue;
    }

    if (userRank < TIER_RANK[entry.requiredTier]) {
      // Tier insufficient — silently drop. Do not expose tool's existence.
      continue;
    }

    const t = entry.factory(config.params);
    if (t) {
      tools[config.name] = t;
    }
  }

  return tools;
}
