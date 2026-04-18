#!/usr/bin/env npx tsx
/**
 * Generate a magic link for client document sharing.
 *
 * Usage:
 *   npx tsx scripts/generate-magic-link.ts --project mark-schmulen --recipient "Mark" --days 30
 *
 * Reads MAGIC_LINK_SECRET from .env.local automatically.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { SignJWT } from "jose";
import { parseArgs } from "util";
import { parse } from "yaml";

// Load valid projects from config
const configPath = resolve(process.cwd(), "src/config/projects.yml");
const configRaw = readFileSync(configPath, "utf-8");
const VALID_PROJECTS = (parse(configRaw).projects as Array<{ slug: string; magic_link: boolean }>)
  .filter((p) => p.magic_link)
  .map((p) => p.slug);

// Load .env.local
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let value = trimmed.slice(eqIdx + 1).trim();
      // Strip surrounding quotes (single or double)
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local not found, rely on existing env
  }
}

async function main() {
  loadEnv();

  const { values } = parseArgs({
    options: {
      project: { type: "string", short: "p" },
      recipient: { type: "string", short: "r" },
      days: { type: "string", short: "d" },
      "base-url": { type: "string" },
    },
  });

  const project = values.project;
  const recipient = values.recipient ?? "client";
  const days = parseInt(values.days ?? "7", 10);
  const baseUrl = values["base-url"] ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://mception.ai";

  if (!project || !VALID_PROJECTS.includes(project)) {
    console.error(`Error: --project must be one of: ${VALID_PROJECTS.join(", ")}`);
    process.exit(1);
  }

  const secret = process.env.MAGIC_LINK_SECRET;
  if (!secret) {
    console.error("Error: MAGIC_LINK_SECRET not found in environment or .env.local");
    process.exit(1);
  }

  const secretBytes = new TextEncoder().encode(secret);
  const token = await new SignJWT({ project, sub: recipient })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${days}d`)
    .sign(secretBytes);

  const url = `${baseUrl}/share/${token}`;

  console.log("\nMagic Link Generated");
  console.log("====================");
  console.log(`Project:   ${project}`);
  console.log(`Recipient: ${recipient}`);
  console.log(`Expires:   ${days} days`);
  console.log(`\nURL:\n${url}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
