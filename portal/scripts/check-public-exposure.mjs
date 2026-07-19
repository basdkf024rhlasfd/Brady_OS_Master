#!/usr/bin/env node
/**
 * SPEC-008 exposure invariant.
 *
 * Fails the build if any known-sensitive public/ directory is not gated by the
 * Clerk middleware in src/proxy.ts. This is the machine-enforced version of the
 * trust lockdown: "zero unauthenticated sensitive files" must be checked, not
 * trusted, because the default matcher exempts static files by extension and a
 * future edit could silently re-expose them.
 *
 * A sensitive prefix is considered protected only if it appears BOTH in the
 * isProtectedRoute list (so auth.protect() runs) AND in config.matcher (so the
 * middleware runs at all for static requests under it).
 *
 * Run: node scripts/check-public-exposure.mjs   (also wired as npm prebuild)
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const proxyPath = join(root, "src", "proxy.ts");

// Each entry: the public/ directory that must not be world-readable, and the
// route prefix that must gate it. Keep in sync with SPEC-008 / the strategy doc.
const SENSITIVE = [
  { dir: "public/1915-south/files", prefix: "/1915-south" },
  { dir: "public/1915-south-map", prefix: "/1915-south-map" },
  { dir: "public/family/kb", prefix: "/family" },
  { dir: "public/financial-assistant/kb", prefix: "/financial-assistant/kb" },
  { dir: "public/panda/kb", prefix: "/panda/kb" },
  { dir: "public/healthcare/kb", prefix: "/healthcare/kb" },
];

const proxy = readFileSync(proxyPath, "utf-8");
const failures = [];

for (const { dir, prefix } of SENSITIVE) {
  // Only enforce for dirs that actually exist in this checkout.
  if (!existsSync(join(root, dir))) continue;

  // Must appear as a protected route (auth.protect runs) — accept the bare
  // prefix or its "(.*)" wildcard form.
  const protectedRoute =
    proxy.includes(`"${prefix}"`) || proxy.includes(`"${prefix}/(.*)"`);

  // Must appear in the matcher so middleware runs for static requests under it.
  const inMatcher = proxy.includes(`"${prefix}/:path*"`);

  if (!protectedRoute) {
    failures.push(`${dir} → prefix ${prefix} is NOT in isProtectedRoute`);
  }
  if (!inMatcher) {
    failures.push(`${dir} → prefix ${prefix} is NOT in config.matcher (:path*)`);
  }
}

if (failures.length > 0) {
  console.error("\n✖ SPEC-008 exposure check FAILED — sensitive content is not gated:\n");
  for (const f of failures) console.error(`  - ${f}`);
  console.error("\nFix src/proxy.ts (isProtectedRoute + config.matcher) before deploying.\n");
  process.exit(1);
}

console.log("✓ SPEC-008 exposure check passed — all sensitive public/ dirs are gated.");
