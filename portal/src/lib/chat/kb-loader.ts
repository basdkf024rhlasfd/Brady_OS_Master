import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import type { KBConfig } from "./chat-config";
import { getChatConfig } from "./chat-config";

export type KBTier = "owner" | "test" | "preview" | "client";

/**
 * Fail-closed tier filter. Owner sees every routed file. Every other tier
 * (test/preview/client) is restricted to `clientSafeFiles` when that allowlist
 * is defined on the KB config — anything not on the list is dropped, including
 * files added later. `test` is intentionally restricted too so Brady's test
 * account validates exactly what a shared/family user sees.
 */
function restrictForTier(
  files: string[],
  kbConfig: KBConfig,
  tier: KBTier
): string[] {
  if (tier === "owner") return files;
  if (!kbConfig.clientSafeFiles) return files;
  const safe = new Set(kbConfig.clientSafeFiles);
  return files.filter((f) => safe.has(f));
}

/**
 * Config-driven KB loader. Reads markdown files from a project's KB directory
 * and returns relevant sections based on the routing strategy.
 *
 * Supports two routing modes:
 * - "keyword": match user query against keyword routes, return matched files
 * - "all": return all markdown files in the directory (up to maxFiles)
 */

// ─── Keyword routing ───

function routeByKeywords(
  query: string,
  kbConfig: KBConfig,
  conversationContext?: string
): string[] {
  const combinedQuery = conversationContext
    ? `${query} ${conversationContext}`
    : query;
  const lower = combinedQuery.toLowerCase();
  const matched = new Set<string>();

  for (const route of kbConfig.routes ?? []) {
    for (const kw of route.keywords) {
      if (lower.includes(kw)) {
        route.files.forEach((f) => matched.add(f));
        break;
      }
    }
  }

  // Fallback: if nothing matched and routes exist, use first 3 routes' files
  if (matched.size === 0 && kbConfig.routes && kbConfig.routes.length > 0) {
    for (const route of kbConfig.routes.slice(0, 3)) {
      route.files.forEach((f) => matched.add(f));
    }
  }

  return [...matched].slice(0, kbConfig.maxFiles);
}

// ─── "All" routing ───

function routeAll(kbConfig: KBConfig): string[] {
  const kbDir = join(process.cwd(), kbConfig.directory);
  try {
    return readdirSync(kbDir)
      .filter((f) => f.endsWith(".md"))
      .sort()
      .slice(0, kbConfig.maxFiles);
  } catch {
    return [];
  }
}

// ─── Public API ───

export function loadKBFiles(
  query: string,
  kbConfig: KBConfig,
  conversationContext?: string,
  tier: KBTier = "owner"
): string {
  if (!kbConfig.enabled || !kbConfig.directory) return "";

  const kbDir = join(process.cwd(), kbConfig.directory);
  const routed =
    kbConfig.routing === "all"
      ? routeAll(kbConfig)
      : routeByKeywords(query, kbConfig, conversationContext);
  const files = restrictForTier(routed, kbConfig, tier);

  const sections: string[] = [];

  for (const file of files) {
    try {
      const content = readFileSync(join(kbDir, file), "utf-8");
      // Use filename (without extension) as label
      const label = file.replace(/^\d+-/, "").replace(/\.md$/, "").replace(/-/g, " ");
      sections.push(`--- ${label} ---\n${content}`);
    } catch (err) {
      console.warn(`[KB_LOADER] Failed to read ${file}:`, err);
    }
  }

  return sections.join("\n\n");
}

// ─── Unified KB (multi-project) ───

export function loadUnifiedKB(
  query: string,
  authorizedProjects: string[],
  activeProject: string | null,
  maxTotalFiles: number = 6,
  conversationContext?: string,
  tier: KBTier = "owner"
): string {
  // Process active project first so its matches get priority
  const ordered = activeProject
    ? [activeProject, ...authorizedProjects.filter((p) => p !== activeProject)]
    : authorizedProjects;

  const allSections: string[] = [];
  const seen = new Set<string>();

  for (const slug of ordered) {
    if (allSections.length >= maxTotalFiles) break;

    const config = getChatConfig(slug);
    if (!config.kb?.enabled || !config.kb.directory) continue;

    const kbDir = join(process.cwd(), config.kb.directory);
    const routed = routeByKeywords(query, config.kb, conversationContext);
    const files = restrictForTier(routed, config.kb, tier);
    const remaining = maxTotalFiles - allSections.length;
    const capped = files.slice(0, remaining);

    for (const file of capped) {
      const key = `${slug}/${file}`;
      if (seen.has(key)) continue;
      seen.add(key);

      try {
        const content = readFileSync(join(kbDir, file), "utf-8");
        const label = file.replace(/^\d+-/, "").replace(/\.md$/, "").replace(/-/g, " ");
        allSections.push(`--- [${slug}] ${label} ---\n${content}`);
      } catch (err) {
        console.warn(`[KB_LOADER] Failed to read ${slug}/${file}:`, err);
      }
    }
  }

  // Fallback: if nothing matched, use active project's first 3 routes
  if (allSections.length === 0 && activeProject) {
    const config = getChatConfig(activeProject);
    if (config.kb?.enabled && config.kb.directory && config.kb.routes?.length) {
      const kbDir = join(process.cwd(), config.kb.directory);
      const fallbackFiles = new Set<string>();
      for (const route of config.kb.routes.slice(0, 3)) {
        route.files.forEach((f) => fallbackFiles.add(f));
      }
      const safeFallback = restrictForTier([...fallbackFiles], config.kb, tier);
      for (const file of safeFallback.slice(0, maxTotalFiles)) {
        try {
          const content = readFileSync(join(kbDir, file), "utf-8");
          const label = file.replace(/^\d+-/, "").replace(/\.md$/, "").replace(/-/g, " ");
          allSections.push(`--- [${activeProject}] ${label} ---\n${content}`);
        } catch {
          // skip
        }
      }
    }
  }

  return allSections.join("\n\n");
}
