#!/usr/bin/env node
/**
 * Telly Archive Script
 *
 * Scans Streaming Notes for entries marked "🔒 PENDING ARCHIVE",
 * downloads the files to ~/telly-archive/, deletes the public blob,
 * and updates the Notion block to say "✅ Archived locally".
 *
 * Run from any sweep or manually:
 *   node 3-reference/scripts/telly-archive.mjs
 *
 * Requires env vars (from ~/telly-bot/.env.production.local):
 *   NOTION_API_KEY — Notion integration token
 *   BLOB_READ_WRITE_TOKEN — Vercel Blob token (for deletion)
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const ARCHIVE_DIR = join(homedir(), "telly-archive");
const STREAMING_NOTES_DB = "2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83";
const NOTION_VERSION = "2022-06-28";

// Load env from telly-bot
function loadEnv() {
  const envPath = join(homedir(), "telly-bot", ".env.production.local");
  if (!existsSync(envPath)) {
    console.log("No .env.production.local found. Run: cd ~/telly-bot && npx vercel env pull .env.production.local --environment production");
    process.exit(1);
  }
  const lines = execSync(`cat "${envPath}"`).toString().split("\n");
  for (const line of lines) {
    const match = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
    if (match) process.env[match[1]] = match[2];
  }
}

async function notionFetch(path, options = {}) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION,
      ...options.headers,
    },
  });
  return res.json();
}

async function findPendingArchivePages() {
  // Query recent Streaming Notes and look for pages with PENDING ARCHIVE blocks
  const result = await notionFetch(`/databases/${STREAMING_NOTES_DB}/query`, {
    method: "POST",
    body: JSON.stringify({
      page_size: 50,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    }),
  });
  return result.results || [];
}

async function getPageBlocks(pageId) {
  const result = await notionFetch(`/blocks/${pageId}/children?page_size=100`);
  return result.results || [];
}

async function updateBlock(blockId, newText) {
  await notionFetch(`/blocks/${blockId}`, {
    method: "PATCH",
    body: JSON.stringify({
      paragraph: {
        rich_text: [{ text: { content: newText } }],
      },
    }),
  });
}

async function deleteBlock(blockId) {
  await notionFetch(`/blocks/${blockId}`, { method: "DELETE" });
}

async function deleteBlobUrl(url) {
  const res = await fetch(`https://blob.vercel-storage.com/delete`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls: [url] }),
  });
  return res.ok;
}

async function downloadFile(url, fileName) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const buffer = Buffer.from(await res.arrayBuffer());
  const date = new Date().toISOString().slice(0, 10);
  const dir = join(ARCHIVE_DIR, date);
  mkdirSync(dir, { recursive: true });
  const filePath = join(dir, fileName);
  writeFileSync(filePath, buffer);
  return filePath;
}

function extractBlobUrl(text) {
  const match = text.match(/(https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/[^\s)]+)/);
  return match ? match[1] : null;
}

function extractFileName(url) {
  const decoded = decodeURIComponent(url.split("/").pop().split("?")[0]);
  // Strip the random suffix Vercel adds (e.g., -tDwNq35p4C3ODcQTLTDIliVvnpiOxQ)
  return decoded.replace(/-[a-zA-Z0-9]{20,}\.([\w]+)$/, ".$1");
}

async function main() {
  loadEnv();

  if (!process.env.NOTION_API_KEY || !process.env.BLOB_READ_WRITE_TOKEN) {
    console.log("Missing NOTION_API_KEY or BLOB_READ_WRITE_TOKEN");
    process.exit(1);
  }

  console.log("Scanning Streaming Notes for pending archives...");
  const pages = await findPendingArchivePages();
  let archived = 0;

  for (const page of pages) {
    const blocks = await getPageBlocks(page.id);

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.type !== "paragraph") continue;

      const text = block.paragraph?.rich_text?.map(r => r.plain_text).join("") || "";
      if (!text.includes("🔒 PENDING ARCHIVE")) continue;

      const blobUrl = extractBlobUrl(text);
      if (!blobUrl) {
        console.log(`  ⚠ No blob URL found in block ${block.id}`);
        continue;
      }

      const fileName = extractFileName(blobUrl);
      const pageTitle = page.properties?.Name?.title?.[0]?.text?.content || "untitled";
      console.log(`  📥 Archiving: ${fileName} (from "${pageTitle}")`);

      // Download locally
      const localPath = await downloadFile(blobUrl, fileName);
      if (!localPath) {
        console.log(`  ❌ Failed to download ${blobUrl}`);
        continue;
      }
      console.log(`  💾 Saved: ${localPath}`);

      // Delete the blob
      const deleted = await deleteBlobUrl(blobUrl);
      console.log(`  🗑 Blob deleted: ${deleted ? "yes" : "FAILED"}`);

      // Update the Notion block
      await updateBlock(block.id, `✅ Archived locally: ~/telly-archive/${localPath.split("telly-archive/")[1]}`);
      console.log(`  ✏️ Notion updated`);

      // Also delete the inline image block above if it exists
      if (i > 0 && blocks[i - 1].type === "image") {
        const imgBlock = blocks[i - 1];
        const imgUrl = imgBlock.image?.external?.url || "";
        if (imgUrl === blobUrl) {
          await deleteBlock(imgBlock.id);
          console.log(`  🗑 Removed inline image block`);
        }
      }

      archived++;
    }
  }

  console.log(`\nDone. Archived ${archived} file${archived !== 1 ? "s" : ""}.`);
}

main().catch(e => { console.error(e); process.exit(1); });
