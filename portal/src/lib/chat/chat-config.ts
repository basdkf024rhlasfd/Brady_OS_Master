import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

// ─── Types ───

export interface KBRoute {
  keywords: string[];
  files: string[];
}

export interface KBConfig {
  enabled: boolean;
  directory: string; // relative to portal root, e.g. "public/orlando/kb"
  maxFiles: number;
  routing: "keyword" | "all";
  routes?: KBRoute[];
}

export interface ToolConfig {
  name: string;
  description?: string;
  params?: Record<string, string>;
}

export interface ShortcutConfig {
  label: string;
  command: string;
}

export interface DataSourceEvidence {
  file?: string;          // file path relative to repo root; mtime must be fresh
  max_age_days?: number;  // override per-type default
}

export interface DataSourceConfig {
  label: string;
  type: "notion-db" | "notion-page" | "notion-wiki" | "google-calendar" | "kb-directory" | "skill" | "external";
  status: "ready" | "partial" | "not-started" | "recommended";
  id?: string;
  url?: string;
  description: string;
  nextStep?: string;
  nextStepActor?: "brady" | "chrome-agent" | "claude-desktop" | "conductor";
  evidence?: DataSourceEvidence;
  lastActivity?: string;  // ISO timestamp — set by probe, not in YAML
  lastActivitySource?: string; // short label: "sweep file", "Notion", "Calendar", "Streaming Notes"
}

export interface ChatConfig {
  enabled: boolean;
  prompt: string; // filename in project-prompts/ (e.g. "orlando.md") — fallback when `agent` is unset
  agent?: string; // slug in src/lib/chat/agents/ (e.g. "oc-optimus") — when set, takes precedence over `prompt`
  model: string;
  maxOutputTokens: number;
  streaming: boolean;
  welcomeMessage: string;
  operatorMode: boolean;
  configAware: boolean;
  kb?: KBConfig;
  tools?: ToolConfig[];
  shortcuts?: ShortcutConfig[];
  dataSources?: DataSourceConfig[];
  agentInstructions?: string;
}

// ─── Defaults ───

const DEFAULTS: ChatConfig = {
  enabled: false,
  prompt: "portal.md",
  model: "claude-sonnet-4-5",
  maxOutputTokens: 1024,
  streaming: true,
  welcomeMessage: "Welcome! I'm your assistant for this project. How can I help you today?",
  operatorMode: false,
  configAware: false,
};

// ─── Loader ───

const CONFIG_DIR = join(process.cwd(), "src/config/chat-configs");
const configCache = new Map<string, ChatConfig>();

function mergeWithDefaults(raw: Record<string, unknown>): ChatConfig {
  const config: ChatConfig = {
    enabled: (raw.enabled as boolean) ?? DEFAULTS.enabled,
    prompt: (raw.prompt as string) ?? DEFAULTS.prompt,
    model: (raw.model as string) ?? DEFAULTS.model,
    maxOutputTokens: (raw.maxOutputTokens as number) ?? DEFAULTS.maxOutputTokens,
    streaming: (raw.streaming as boolean) ?? DEFAULTS.streaming,
    welcomeMessage: (raw.welcomeMessage as string) ?? DEFAULTS.welcomeMessage,
    operatorMode: (raw.operatorMode as boolean) ?? DEFAULTS.operatorMode,
    configAware: (raw.configAware as boolean) ?? DEFAULTS.configAware,
  };

  if (raw.kb && typeof raw.kb === "object") {
    const kb = raw.kb as Record<string, unknown>;
    config.kb = {
      enabled: (kb.enabled as boolean) ?? false,
      directory: (kb.directory as string) ?? "",
      maxFiles: (kb.maxFiles as number) ?? 4,
      routing: (kb.routing as "keyword" | "all") ?? "keyword",
      routes: kb.routes as KBRoute[] | undefined,
    };
  }

  if (Array.isArray(raw.tools)) {
    config.tools = raw.tools as ToolConfig[];
  }

  if (Array.isArray(raw.shortcuts)) {
    config.shortcuts = raw.shortcuts as ShortcutConfig[];
  }

  if (Array.isArray(raw.dataSources)) {
    config.dataSources = raw.dataSources as DataSourceConfig[];
  }

  if (typeof raw.agentInstructions === "string") {
    config.agentInstructions = raw.agentInstructions;
  }

  if (typeof raw.agent === "string") {
    config.agent = raw.agent;
  }

  return config;
}

export function getChatConfig(slug: string): ChatConfig {
  if (configCache.has(slug)) return configCache.get(slug)!;

  try {
    const content = readFileSync(join(CONFIG_DIR, `${slug}.yml`), "utf-8");
    const raw = parse(content) as Record<string, unknown>;
    const config = mergeWithDefaults(raw);
    configCache.set(slug, config);
    return config;
  } catch {
    // No config file — return defaults (chat disabled)
    configCache.set(slug, DEFAULTS);
    return DEFAULTS;
  }
}

/** List all slugs that have chat configs */
export function listChatConfigs(): string[] {
  try {
    return readdirSync(CONFIG_DIR)
      .filter((f) => f.endsWith(".yml"))
      .map((f) => f.replace(".yml", ""));
  } catch {
    return [];
  }
}
