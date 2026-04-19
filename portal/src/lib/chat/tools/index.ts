import type { Tool } from "ai";
import type { ToolConfig } from "../chat-config";
import { createCalendarTool } from "./query-calendar";
import { createNotionTool } from "./query-notion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToolFactory = (params?: Record<string, string>) => Tool<any, any> | null;

const toolRegistry: Record<string, ToolFactory> = {
  queryCalendar: createCalendarTool,
  queryNotion: createNotionTool,
};

/**
 * Resolve an array of tool configs into a record of AI SDK tools.
 * Tools whose factories return null (missing credentials) are silently skipped.
 */
export function resolveTools(
  toolConfigs: ToolConfig[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, Tool<any, any>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: Record<string, Tool<any, any>> = {};

  for (const config of toolConfigs) {
    const factory = toolRegistry[config.name];
    if (!factory) {
      console.warn(`[TOOLS] Unknown tool: ${config.name}`);
      continue;
    }

    const t = factory(config.params);
    if (t) {
      tools[config.name] = t;
    }
  }

  return tools;
}
