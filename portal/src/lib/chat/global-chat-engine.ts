import { readFileSync } from "fs";
import { join } from "path";
import { getChatConfig, type ChatConfig } from "./chat-config";
import { loadKBFiles, loadUnifiedKB } from "./kb-loader";
import { loadAgentPrompt } from "./agent-loader";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-groups";

// ─── Effective prompt resolver ───
// When a config has `agent: <slug>`, the agent profile (synced from repo) is
// the source of truth. Falls back to the legacy `prompt:` file if the agent
// file is missing or `agent` isn't set.
function loadEffectivePrompt(config: ChatConfig): string | null {
  if (config.agent) {
    const agentPrompt = loadAgentPrompt(config.agent);
    if (agentPrompt) return agentPrompt;
  }
  if (config.prompt && config.prompt !== "portal.md") {
    return loadProjectPrompt(config.prompt);
  }
  return null;
}

// ─── Project prompt loading (file-based, cached) ───

const promptCache = new Map<string, string>();
const PROMPTS_DIR = join(process.cwd(), "src/lib/chat/project-prompts");

function loadProjectPrompt(filename: string): string {
  if (promptCache.has(filename)) return promptCache.get(filename)!;
  try {
    const content = readFileSync(join(PROMPTS_DIR, filename), "utf-8").trim();
    promptCache.set(filename, content);
    return content;
  } catch {
    if (filename !== "portal.md") return loadProjectPrompt("portal.md");
    const fallback = "You are a helpful assistant for the mception.ai portal. Be concise and friendly.";
    promptCache.set(filename, fallback);
    return fallback;
  }
}

// ─── System prompt builder ───

export interface ProjectContext {
  project: string;
  authorizedProjects?: string[];
  route: string;
  configState: Record<string, unknown>;
  isAdmin: boolean;
  mode?: "client" | "operator";
  tier?: "owner" | "test" | "preview" | "client";
}

export function buildSystemPrompt(
  config: ChatConfig,
  projectContext: ProjectContext,
  userMessage?: string,
  conversationContext?: string
): string {
  let systemPrompt = loadProjectPrompt(config.prompt);

  // KB injection — config-driven, works for any project
  if (config.kb?.enabled && userMessage) {
    const kbContent = loadKBFiles(userMessage, config.kb, conversationContext);
    if (kbContent) {
      systemPrompt += "\n\n" + kbContent;
    }
  }

  // Inject user config state if enabled
  if (config.configAware) {
    const configEntries = Object.entries(projectContext.configState).filter(
      ([, v]) => v !== null && v !== undefined && v !== ""
    );
    if (configEntries.length > 0) {
      const configStr = configEntries
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      systemPrompt += `\n\nUser's current configuration: ${configStr}`;
    }
  }

  // Admin context
  if (projectContext.isAdmin) {
    systemPrompt +=
      "\n\nThis user is an admin/platform owner. You can be more technical and detailed in your responses.";
  }

  // Operator mode: append cross-project operational context
  if (
    config.operatorMode &&
    projectContext.mode === "operator" &&
    projectContext.isAdmin
  ) {
    const operatorPrompt = loadProjectPrompt("operator.md");
    systemPrompt += "\n\n--- Operator Context ---\n" + operatorPrompt;
  }

  return systemPrompt;
}

// ─── Unified system prompt (multi-project) ───

export function buildUnifiedSystemPrompt(
  projectContext: ProjectContext,
  userMessage?: string,
  conversationContext?: string
): string {
  const authorizedProjects = projectContext.authorizedProjects ?? [];
  const activeProject = projectContext.project !== "portal" ? projectContext.project : null;

  // Group routes lead with the group's persona prompt (e.g., OC Optimus for
  // panda-engagement) instead of the generic portal meta-prompt. Single-project
  // routes keep the existing behavior — portal.md base + project sections.
  const isGroupRoute = activeProject ? SIDEBAR_GROUPS.some((g) => g.id === activeProject) : false;
  const activeConfig = activeProject ? getChatConfig(activeProject) : null;

  let systemPrompt: string;
  const groupLeadPrompt = isGroupRoute && activeConfig?.enabled ? loadEffectivePrompt(activeConfig) : null;
  if (groupLeadPrompt) {
    systemPrompt = groupLeadPrompt;
  } else {
    systemPrompt = loadProjectPrompt("portal.md");
  }

  // Append each authorized project's prompt as a labeled section
  for (const slug of authorizedProjects) {
    const config = getChatConfig(slug);
    if (!config.enabled) continue;

    const projectPrompt = loadEffectivePrompt(config);
    if (projectPrompt) {
      systemPrompt += `\n\n--- Project: ${slug} ---\n${projectPrompt}`;
    }
  }

  // Note the active page
  if (activeProject) {
    systemPrompt += `\n\nThe user is currently viewing the "${activeProject}" project page.`;
  }

  // Unified KB injection
  if (userMessage && authorizedProjects.length > 0) {
    const kbContent = loadUnifiedKB(userMessage, authorizedProjects, activeProject, 6, conversationContext);
    if (kbContent) {
      systemPrompt += "\n\n" + kbContent;
    }
  }

  // Inject user config state for active project if enabled
  if (activeProject) {
    const activeConfig = getChatConfig(activeProject);
    if (activeConfig.configAware) {
      const configEntries = Object.entries(projectContext.configState).filter(
        ([, v]) => v !== null && v !== undefined && v !== ""
      );
      if (configEntries.length > 0) {
        const configStr = configEntries
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
        systemPrompt += `\n\nUser's current configuration: ${configStr}`;
      }
    }
  }

  // Tier-gated context. Client tier never gets admin/operator surfaces, even
  // if isAdmin somehow leaks through — server-side hard floor.
  const tier = projectContext.tier ?? (projectContext.isAdmin ? "owner" : "client");

  if (tier === "owner") {
    systemPrompt +=
      "\n\nThis user is the platform owner. You can be more technical and detailed in your responses.";
  }

  // Operator mode — owner tier only, requires explicit operator mode + active project's config
  if (
    tier === "owner" &&
    activeProject &&
    projectContext.mode === "operator"
  ) {
    const activeOperatorConfig = getChatConfig(activeProject);
    if (activeOperatorConfig.operatorMode) {
      const operatorPrompt = loadProjectPrompt("operator.md");
      systemPrompt += "\n\n--- Operator Context ---\n" + operatorPrompt;
    }
  }

  return systemPrompt;
}

/** Re-export for convenience */
export { getChatConfig };
