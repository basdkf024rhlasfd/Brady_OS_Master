import "server-only";
import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { Client } from "@notionhq/client";
import { google } from "googleapis";
import type { DataSourceConfig } from "./chat/chat-config";

const PORTAL_ROOT = process.cwd();
const REPO_ROOT = join(PORTAL_ROOT, "..");
const APP_DIR = join(PORTAL_ROOT, "src/app/(portal)");
const STREAMING_NOTES_DB_ID = "2e9ed43b-89c5-80f4-8c21-000b4cfe812e";
const TTL_MS = 5 * 60 * 1000;

type Status = DataSourceConfig["status"];
type Actor = NonNullable<DataSourceConfig["nextStepActor"]>;

interface ProbeResult {
  status: Status;
  nextStep?: string;
  nextStepActor?: Actor;
  lastActivity?: string;
  lastActivitySource?: string;
}

// ─── Cache ───

const cacheStore = new Map<string, { value: unknown; expiresAt: number }>();

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = cacheStore.get(key);
  if (hit && hit.expiresAt > Date.now()) return hit.value as T;
  const value = await fn();
  cacheStore.set(key, { value, expiresAt: Date.now() + TTL_MS });
  return value;
}

// ─── Notion client (lazy) ───

let notionClient: Client | null = null;
function notion(): Client | null {
  if (notionClient) return notionClient;
  const auth = process.env.NOTION_API_KEY;
  if (!auth) return null;
  notionClient = new Client({ auth });
  return notionClient;
}

// ─── Streaming Notes scan ───

interface StreamingNotesIndex {
  entries: { text: string; time: string }[];
}

function norm(s: string): string {
  return s.toLowerCase().replace(/-/g, "");
}

function pageSearchableText(page: unknown): string {
  const p = page as { properties?: Record<string, unknown> };
  const props = p.properties ?? {};
  const parts: string[] = [];
  for (const prop of Object.values(props)) {
    const pr = prop as {
      type?: string;
      title?: { plain_text?: string }[];
      rich_text?: { plain_text?: string }[];
      select?: { name?: string };
      status?: { name?: string };
    };
    if (!pr || typeof pr !== "object") continue;
    if (pr.type === "title" && Array.isArray(pr.title)) parts.push(pr.title.map((t) => t.plain_text ?? "").join(""));
    if (pr.type === "rich_text" && Array.isArray(pr.rich_text)) parts.push(pr.rich_text.map((t) => t.plain_text ?? "").join(""));
    if (pr.type === "select") parts.push(pr.select?.name ?? "");
    if (pr.type === "status") parts.push(pr.status?.name ?? "");
  }
  return norm(parts.join(" "));
}

async function fetchStreamingNotesIndex(): Promise<StreamingNotesIndex> {
  return cached("streaming-notes:30d", async () => {
    const client = notion();
    if (!client) return { entries: [] };
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    try {
      const res = await client.dataSources.query({
        data_source_id: STREAMING_NOTES_DB_ID,
        filter: { timestamp: "last_edited_time", last_edited_time: { on_or_after: thirtyDaysAgo } },
        sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
        page_size: 100,
      });
      const entries: { text: string; time: string }[] = [];
      for (const page of res.results) {
        if (!("last_edited_time" in page)) continue;
        entries.push({ text: pageSearchableText(page), time: (page as { last_edited_time: string }).last_edited_time });
      }
      return { entries };
    } catch (e) {
      console.warn("[group-health] Streaming Notes query failed:", e instanceof Error ? e.message : e);
      return { entries: [] };
    }
  });
}

function identifiersFor(ds: DataSourceConfig): string[] {
  const ids: string[] = [ds.label];
  if (ds.id) ids.push(ds.id);
  if (ds.url) ids.push(ds.url);
  return ids.filter(Boolean);
}

function streamingNotesMatch(index: StreamingNotesIndex, identifiers: string[]): { time: string; source: string } | null {
  const normed = identifiers.map(norm).filter((s) => s.length > 3);
  let best: { time: string; source: string } | null = null;
  for (const entry of index.entries) {
    for (const id of normed) {
      if (entry.text.includes(id)) {
        if (!best || best.time < entry.time) best = { time: entry.time, source: "Streaming Notes" };
        break;
      }
    }
  }
  return best;
}

// ─── Per-type probes ───

function probeKbDirectory(ds: DataSourceConfig): ProbeResult {
  if (!ds.id) return { status: "not-started", nextStep: "Add `id` (directory path) in family.yml", nextStepActor: "conductor" };
  const abs = join(REPO_ROOT, ds.id);
  if (!existsSync(abs)) return { status: "not-started", nextStep: `Create KB directory at ${ds.id}`, nextStepActor: "conductor" };
  const files = readdirSync(abs).filter((f) => f.endsWith(".md"));
  if (files.length === 0) return { status: "not-started", nextStep: `Populate ${ds.id} with markdown files`, nextStepActor: "conductor" };
  const newest = files.map((f) => statSync(join(abs, f)).mtimeMs).reduce((a, b) => Math.max(a, b), 0);
  const iso = new Date(newest).toISOString();
  const ageDays = (Date.now() - newest) / (1000 * 60 * 60 * 24);
  const maxAge = ds.evidence?.max_age_days ?? 14;
  if (ageDays > maxAge) return { status: "partial", nextStep: `KB stale (${Math.round(ageDays)}d) — run morning sweep to refresh`, nextStepActor: "brady", lastActivity: iso, lastActivitySource: "KB mtime" };
  return { status: "ready", lastActivity: iso, lastActivitySource: "KB mtime" };
}

function probeSkill(ds: DataSourceConfig): ProbeResult {
  if (!ds.id) return { status: "not-started", nextStep: "Add skill path to `id` in family.yml", nextStepActor: "conductor" };
  if (!existsSync(join(REPO_ROOT, ds.id))) return { status: "not-started", nextStep: `Create ${ds.id}`, nextStepActor: "conductor" };
  const evFile = ds.evidence?.file;
  if (!evFile) return { status: "partial", nextStep: "Declare evidence.file in YAML (a file this skill emits)", nextStepActor: "conductor" };
  const evAbs = join(REPO_ROOT, evFile);
  if (!existsSync(evAbs)) return { status: "partial", nextStep: `Expected output missing: ${evFile} — run ${ds.label}`, nextStepActor: "brady" };
  const mtime = statSync(evAbs).mtimeMs;
  const iso = new Date(mtime).toISOString();
  const ageDays = (Date.now() - mtime) / (1000 * 60 * 60 * 24);
  const maxAge = ds.evidence?.max_age_days ?? 7;
  if (ageDays > maxAge) return { status: "partial", nextStep: `${ds.label} hasn't emitted ${evFile} in ${Math.round(ageDays)}d — run it`, nextStepActor: "brady", lastActivity: iso, lastActivitySource: "evidence file" };
  return { status: "ready", lastActivity: iso, lastActivitySource: "evidence file" };
}

function probeExternal(ds: DataSourceConfig, notes: StreamingNotesIndex): ProbeResult {
  if (!ds.url || !ds.url.startsWith("/")) return { status: ds.status };
  const slug = ds.url.replace(/^\/+|\/+$/g, "");
  if (!existsSync(join(APP_DIR, slug, "page.tsx"))) {
    return { status: "not-started", nextStep: `Create page at src/app/(portal)/${slug}/page.tsx`, nextStepActor: "conductor" };
  }
  const evFile = ds.evidence?.file;
  if (evFile) {
    const evAbs = join(REPO_ROOT, evFile);
    if (existsSync(evAbs)) {
      const mtime = statSync(evAbs).mtimeMs;
      const ageDays = (Date.now() - mtime) / (1000 * 60 * 60 * 24);
      const maxAge = ds.evidence?.max_age_days ?? 14;
      if (ageDays <= maxAge) return { status: "ready", lastActivity: new Date(mtime).toISOString(), lastActivitySource: "evidence file" };
    }
  }
  const hit = streamingNotesMatch(notes, identifiersFor(ds));
  if (hit) return { status: "ready", lastActivity: hit.time, lastActivitySource: hit.source };
  return { status: "partial", nextStep: "Page exists but no recent activity — use it or add evidence.file in YAML", nextStepActor: "brady" };
}

async function probeNotion(ds: DataSourceConfig): Promise<ProbeResult> {
  if (!process.env.NOTION_API_KEY) return { status: "partial", nextStep: "Set NOTION_API_KEY env var on Vercel", nextStepActor: "brady" };
  if (!ds.id) return { status: "not-started", nextStep: "Add Notion id to family.yml", nextStepActor: "conductor" };
  const client = notion();
  if (!client) return { status: "partial", nextStep: "Set NOTION_API_KEY env var on Vercel", nextStepActor: "brady" };
  const key = `notion:${ds.type}:${ds.id}`;
  try {
    const result = await cached(key, async () =>
      ds.type === "notion-db"
        ? await client.databases.retrieve({ database_id: ds.id! })
        : await client.pages.retrieve({ page_id: ds.id! })
    );
    const lastEdited = (result as { last_edited_time?: string }).last_edited_time;
    if (!lastEdited) return { status: "partial", nextStep: "Notion returned no last_edited_time", nextStepActor: "conductor" };
    const ageDays = (Date.now() - new Date(lastEdited).getTime()) / (1000 * 60 * 60 * 24);
    const maxAge = ds.evidence?.max_age_days ?? 30;
    if (ageDays > maxAge) return { status: "partial", nextStep: `Not updated in ${Math.round(ageDays)}d — review or archive`, nextStepActor: "brady", lastActivity: lastEdited, lastActivitySource: "Notion" };
    return { status: "ready", lastActivity: lastEdited, lastActivitySource: "Notion" };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("object_not_found") || msg.includes("Could not find")) {
      return { status: "not-started", nextStep: `Notion id invalid or integration lacks access: ${ds.id}`, nextStepActor: "brady" };
    }
    return { status: "partial", nextStep: `Notion error: ${msg.slice(0, 80)}`, nextStepActor: "brady" };
  }
}

async function probeCalendar(ds: DataSourceConfig): Promise<ProbeResult> {
  const creds = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!creds) return { status: "partial", nextStep: "Set GOOGLE_SERVICE_ACCOUNT_JSON env var on Vercel", nextStepActor: "brady" };
  if (!ds.id) return { status: "not-started", nextStep: "Add calendar id to family.yml", nextStepActor: "conductor" };
  const key = `calendar:${ds.id}`;
  try {
    const events = await cached(key, async () => {
      const parsed = JSON.parse(creds);
      const auth = new google.auth.GoogleAuth({ credentials: parsed, scopes: ["https://www.googleapis.com/auth/calendar.readonly"] });
      const calendar = google.calendar({ version: "v3", auth });
      const res = await calendar.events.list({
        calendarId: ds.id!,
        timeMin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        timeMax: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
      return res.data.items ?? [];
    });
    const maxAge = ds.evidence?.max_age_days ?? 30;
    if (events.length === 0) return { status: "partial", nextStep: `No events in last ${maxAge}d — calendar may be inactive`, nextStepActor: "brady" };
    const now = Date.now();
    let mostRecent = 0;
    for (const ev of events) {
      const t = new Date(ev.start?.dateTime ?? ev.start?.date ?? 0).getTime();
      if (t && t <= now && t > mostRecent) mostRecent = t;
    }
    const lastActivity = new Date(mostRecent || now).toISOString();
    return { status: "ready", lastActivity, lastActivitySource: "Calendar" };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { status: "partial", nextStep: `Calendar error: ${msg.slice(0, 80)}`, nextStepActor: "brady" };
  }
}

// ─── Main entry ───

export async function applyProbes(sources: DataSourceConfig[]): Promise<DataSourceConfig[]> {
  const notes = await fetchStreamingNotesIndex();

  return Promise.all(
    sources.map(async (ds) => {
      if (ds.status === "recommended") return { ...ds };
      let probe: ProbeResult;
      switch (ds.type) {
        case "kb-directory": probe = probeKbDirectory(ds); break;
        case "skill": probe = probeSkill(ds); break;
        case "external": probe = probeExternal(ds, notes); break;
        case "notion-db":
        case "notion-page":
        case "notion-wiki": probe = await probeNotion(ds); break;
        case "google-calendar": probe = await probeCalendar(ds); break;
        default: probe = { status: ds.status };
      }
      if (!probe.lastActivity) {
        const hit = streamingNotesMatch(notes, identifiersFor(ds));
        if (hit) probe = { ...probe, lastActivity: hit.time, lastActivitySource: hit.source };
      }
      return {
        ...ds,
        status: probe.status,
        nextStep: probe.nextStep ?? ds.nextStep,
        nextStepActor: probe.nextStepActor ?? ds.nextStepActor,
        lastActivity: probe.lastActivity,
        lastActivitySource: probe.lastActivitySource,
      };
    })
  );
}
