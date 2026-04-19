import { readFileSync } from "fs";
import { join } from "path";
import { getChatConfig, type ChatConfig } from "./chat-config";
import { loadKBFiles, loadUnifiedKB } from "./kb-loader";

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
}

export function buildSystemPrompt(
  config: ChatConfig,
  projectContext: ProjectContext,
  userMessage?: string
): string {
  let systemPrompt = loadProjectPrompt(config.prompt);

  // KB injection — config-driven, works for any project
  if (config.kb?.enabled && userMessage) {
    const kbContent = loadKBFiles(userMessage, config.kb);
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
  userMessage?: string
): string {
  const authorizedProjects = projectContext.authorizedProjects ?? [];
  const activeProject = projectContext.project !== "portal" ? projectContext.project : null;

  // Start with the meta-prompt
  let systemPrompt = loadProjectPrompt("portal.md");

  // Append each authorized project's prompt as a labeled section
  for (const slug of authorizedProjects) {
    const config = getChatConfig(slug);
    if (!config.enabled) continue;

    const projectPrompt = loadProjectPrompt(config.prompt);
    if (projectPrompt && config.prompt !== "portal.md") {
      systemPrompt += `\n\n--- Project: ${slug} ---\n${projectPrompt}`;
    }
  }

  // Note the active page
  if (activeProject) {
    systemPrompt += `\n\nThe user is currently viewing the "${activeProject}" project page.`;
  }

  // Unified KB injection
  if (userMessage && authorizedProjects.length > 0) {
    const kbContent = loadUnifiedKB(userMessage, authorizedProjects, activeProject);
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

  // Admin context
  if (projectContext.isAdmin) {
    systemPrompt +=
      "\n\nThis user is an admin/platform owner. You can be more technical and detailed in your responses.";
  }

  // Operator mode — check active project's config
  if (activeProject && projectContext.mode === "operator" && projectContext.isAdmin) {
    const activeConfig = getChatConfig(activeProject);
    if (activeConfig.operatorMode) {
      const operatorPrompt = loadProjectPrompt("operator.md");
      systemPrompt += "\n\n--- Operator Context ---\n" + operatorPrompt;
    }
  }

  return systemPrompt;
}

/** Re-export for convenience */
export { getChatConfig };
