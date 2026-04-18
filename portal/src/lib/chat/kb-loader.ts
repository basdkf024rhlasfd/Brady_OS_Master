import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import type { KBConfig } from "./chat-config";

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
  kbConfig: KBConfig
): string[] {
  const lower = query.toLowerCase();
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

export function loadKBFiles(query: string, kbConfig: KBConfig): string {
  if (!kbConfig.enabled || !kbConfig.directory) return "";

  const kbDir = join(process.cwd(), kbConfig.directory);
  const files =
    kbConfig.routing === "all"
      ? routeAll(kbConfig)
      : routeByKeywords(query, kbConfig);

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
