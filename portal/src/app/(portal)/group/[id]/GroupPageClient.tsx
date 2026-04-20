"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { GroupChatBar } from "@/components/portal/GroupChatBar";
import type { GroupChatBarHandle } from "@/components/portal/GroupChatBar";
import type { ProjectConfig } from "@/config/load-projects";

export interface GroupProject {
  slug: string;
  label: string;
  short: string;
  href: string;
  description?: string;
  type: ProjectConfig["type"];
  magic_link: boolean;
  subPages: { label: string; href: string }[];
}

// ─── Lookup tables ───

const typeLabels: Record<ProjectConfig["type"], string> = {
  native: "Built-in",
  "iframe-external": "External",
  "iframe-local": "Local app",
};

const typeDots: Record<ProjectConfig["type"], string> = {
  native: "bg-emerald-400",
  "iframe-external": "bg-blue-400",
  "iframe-local": "bg-violet-400",
};

const groupAccents: Record<string, { banner: string; badge: string }> = {
  family:             { banner: "from-sky-500/10 border-sky-200",       badge: "bg-sky-50 text-sky-700 border-sky-200" },
  "vc-startup":       { banner: "from-violet-500/10 border-violet-200", badge: "bg-violet-50 text-violet-700 border-violet-200" },
  "panda-engagement": { banner: "from-amber-500/10 border-amber-200",   badge: "bg-amber-50 text-amber-700 border-amber-200" },
  incubator:          { banner: "from-slate-500/10 border-slate-200",   badge: "bg-slate-50 text-slate-600 border-slate-200" },
};

interface DataSource {
  label: string;
  type: "notion-db" | "notion-page" | "notion-wiki" | "google-calendar" | "kb-directory" | "skill" | "external";
  status: "ready" | "partial" | "not-started" | "recommended";
  id?: string;
  url?: string;
  description: string;
  nextStep?: string;
  nextStepActor?: "brady" | "chrome-agent" | "claude-desktop" | "conductor";
}

const actorLabels: Record<NonNullable<DataSource["nextStepActor"]>, string> = {
  brady: "Brady",
  "chrome-agent": "Chrome Agent",
  "claude-desktop": "Claude Desktop",
  conductor: "Conductor.Build",
};

const actorColors: Record<NonNullable<DataSource["nextStepActor"]>, string> = {
  brady: "text-sky-600",
  "chrome-agent": "text-purple-600",
  "claude-desktop": "text-orange-600",
  conductor: "text-emerald-600",
};

const dataTypeLabels: Record<DataSource["type"], string> = {
  "notion-db": "Notion DB",
  "notion-page": "Notion Page",
  "notion-wiki": "Notion Wiki",
  "google-calendar": "Calendar",
  "kb-directory": "KB Files",
  skill: "Skill",
  external: "Project",
};

const statusDots: Record<DataSource["status"], string> = {
  ready: "bg-emerald-400",
  partial: "bg-amber-400",
  "not-started": "bg-red-400",
  recommended: "bg-slate-300",
};

const statusLabels: Record<DataSource["status"], string> = {
  ready: "Ready",
  partial: "Partial",
  "not-started": "Not started",
  recommended: "Recommended",
};

const statusBorders: Record<DataSource["status"], string> = {
  ready: "border-emerald-200 hover:border-emerald-300",
  partial: "border-amber-200 hover:border-amber-300",
  "not-started": "border-red-200 hover:border-red-300",
  recommended: "border-border",
};

function getDataSourceUrl(ds: DataSource): string | null {
  if (ds.url) return ds.url;
  if ((ds.type === "notion-db" || ds.type === "notion-page") && ds.id)
    return `https://www.notion.so/${ds.id.replace(/-/g, "")}`;
  return null;
}

// ─── Tabs ───

type Tab = "overview" | "data" | "ops";

const LAYOUT_KEY = "group-chat-layout";
const TAB_KEY = "group-tab";

// ─── Component ───

export function GroupPageClient({
  id,
  groupLabel,
  projects,
  shortcuts = [],
  welcomeMessage = "",
  dataSources = [],
  agentInstructions = "",
}: {
  id: string;
  groupLabel: string;
  projects: GroupProject[];
  shortcuts?: { label: string; command: string }[];
  welcomeMessage?: string;
  dataSources?: DataSource[];
  agentInstructions?: string;
}) {
  const { chatOpen, toggleChat } = useWorkspace();
  const [layout, setLayout] = useState<"bar" | "panel">("bar");
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");

  // Chat bar ref for programmatic messaging
  const chatBarRef = useRef<GroupChatBarHandle>(null);

  // Ops panel state
  const [uatResults, setUatResults] = useState<{ name: string; status: "pass" | "fail" | "warn"; detail: string }[]>([]);
  const [uatRunning, setUatRunning] = useState(false);
  const [copiedActor, setCopiedActor] = useState<string | null>(null);
  const [agentExpanded, setAgentExpanded] = useState(false);
  const [actionStates, setActionStates] = useState<Record<string, "idle" | "sent" | "copied">>({});

  useEffect(() => {
    const savedLayout = localStorage.getItem(LAYOUT_KEY);
    if (savedLayout === "panel") setLayout("panel");
    setMounted(true);
  }, []);

  function switchToPanel() {
    setLayout("panel");
    localStorage.setItem(LAYOUT_KEY, "panel");
    if (!chatOpen) toggleChat();
  }

  function switchToBar() {
    setLayout("bar");
    localStorage.setItem(LAYOUT_KEY, "bar");
    if (chatOpen) toggleChat();
  }

  // ─── Status summary for tabs ───

  const readyCount = dataSources.filter((d) => d.status === "ready").length;
  const actionCount = dataSources.filter((d) => d.status !== "ready" && d.status !== "recommended").length;

  // ─── UAT ───

  async function runUat() {
    setUatRunning(true);
    setUatResults([]);
    const results: typeof uatResults = [];

    const chatInput = document.querySelector('input[placeholder*="Ask"]') as HTMLInputElement | null;
    results.push(chatInput
      ? { name: "Chat input", status: "pass", detail: "Input field found" }
      : { name: "Chat input", status: "fail", detail: "Not found in DOM" }
    );

    const chips = document.querySelectorAll("button");
    const shortcutChips = Array.from(chips).filter((b) => shortcuts.some((s) => b.textContent?.trim() === s.label));
    results.push(shortcutChips.length === shortcuts.length
      ? { name: "Shortcut chips", status: "pass", detail: `${shortcutChips.length}/${shortcuts.length} rendered` }
      : shortcutChips.length > 0
        ? { name: "Shortcut chips", status: "warn", detail: `${shortcutChips.length}/${shortcuts.length} found` }
        : { name: "Shortcut chips", status: "fail", detail: "None found" }
    );

    const welcomeEl = document.querySelector(".max-h-72");
    const hasWelcome = welcomeEl?.textContent?.includes(welcomeMessage.slice(0, 20));
    results.push(hasWelcome
      ? { name: "Welcome message", status: "pass", detail: "Displayed" }
      : { name: "Welcome message", status: "fail", detail: "Not found" }
    );

    const cardLinks = document.querySelectorAll("h2 a");
    const projectLinks = Array.from(cardLinks).filter((a) => projects.some((p) => a.getAttribute("href") === p.href));
    results.push(projectLinks.length === projects.length
      ? { name: "Project links", status: "pass", detail: `${projectLinks.length} clickable` }
      : { name: "Project links", status: "fail", detail: `${projectLinks.length}/${projects.length}` }
    );

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "ping", parts: [{ type: "text", text: "ping" }] }],
          projectContext: { project: id, route: `/group/${id}`, configState: {}, isAdmin: false, mode: "client" },
        }),
      });
      results.push(res.ok
        ? { name: "Chat API", status: "pass", detail: `${res.status}` }
        : { name: "Chat API", status: "warn", detail: `${res.status}` }
      );
    } catch (e) {
      results.push({ name: "Chat API", status: "fail", detail: e instanceof Error ? e.message : "failed" });
    }

    try {
      const kbRes = await fetch("/family/kb/01-family-roster.md");
      results.push(kbRes.ok
        ? { name: "KB files", status: "pass", detail: "Accessible" }
        : { name: "KB files", status: "fail", detail: `${kbRes.status}` }
      );
    } catch {
      results.push({ name: "KB files", status: "fail", detail: "Unreachable" });
    }

    setUatResults(results);
    setUatRunning(false);
  }

  // ─── Next steps by actor ───

  const nextStepsByActor = (() => {
    const groups: Record<string, { action: string; source: string; status: DataSource["status"] }[]> = {};
    const actorOrder: NonNullable<DataSource["nextStepActor"]>[] = ["brady", "chrome-agent", "claude-desktop", "conductor"];
    for (const actor of actorOrder) groups[actor] = [];
    for (const ds of dataSources) {
      if (ds.status === "ready" || !ds.nextStep || !ds.nextStepActor) continue;
      groups[ds.nextStepActor].push({ action: ds.nextStep, source: ds.label, status: ds.status });
    }
    const statusOrder: Record<DataSource["status"], number> = { "not-started": 0, partial: 1, recommended: 2, ready: 3 };
    for (const actor of actorOrder) groups[actor].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    return { groups, actorOrder };
  })();

  function buildHandoffPrompt(actor: NonNullable<DataSource["nextStepActor"]>): string {
    const items = nextStepsByActor.groups[actor];
    if (items.length === 0) return "";
    const sl = (s: DataSource["status"]) => (s === "not-started" ? "NOT STARTED" : s === "partial" ? "PARTIAL" : "RECOMMENDED");
    const taskList = items.map((it, i) => `${i + 1}. [${sl(it.status)}] ${it.action}\n   Source: ${it.source}`).join("\n\n");

    const ctx: Record<string, string> = {
      brady: `Manual tasks for the Family command center — only you can do these.\n\n${taskList}`,
      "chrome-agent": `You are the Chrome browser agent on mception.ai/group/family.\nFamily: Brady + 5 kids (Lily Kay 17, Faith 14, triplets 9). 3 projects: Grocery, School, Financial.\nKB: portal/public/family/kb/ (13 files).\n\nTasks:\n\n${taskList}\n\nConfirm each before moving on.`,
      "claude-desktop": `CoWork session — Family command center tasks.\nRepo: brady-os-master/rabat/\nKB: portal/public/family/kb/\nSweeps: 3-reference/skills/{morning,weekly,evening}-sweep/SKILL.md\nNotion: Streaming Notes 2e9ed43b, Rules 344ed43b, Projects 2c2ed43b\nCalendar: family13834007621771747799@group.calendar.google.com\n\nTasks:\n\n${taskList}\n\nFlag anything needing Brady's input.`,
      conductor: `Conductor agent — mception.ai portal (brady-os-master/rabat/portal/).\nChat API: app/api/chat/route.ts\nConfig: config/chat-configs/family.yml\nPrompt: lib/chat/project-prompts/family.md\nKB loader: lib/chat/kb-loader.ts\nTypes: lib/chat/chat-config.ts\n\nTasks:\n\n${taskList}\n\nRun tsc --noEmit after each change.`,
    };
    return ctx[actor] ?? taskList;
  }

  function copyHandoff(actor: NonNullable<DataSource["nextStepActor"]>) {
    navigator.clipboard.writeText(buildHandoffPrompt(actor)).then(() => {
      setCopiedActor(actor);
      setTimeout(() => setCopiedActor(null), 2000);
    });
  }

  function executeAction(item: { action: string; source: string; status: DataSource["status"] }, actor: NonNullable<DataSource["nextStepActor"]>) {
    const key = `${actor}-${item.source}`;
    if (actor === "conductor") {
      // Send as a chat message for the chatbot to orchestrate
      chatBarRef.current?.sendMessage(item.action);
      setActionStates((prev) => ({ ...prev, [key]: "sent" }));
      setTimeout(() => setActionStates((prev) => ({ ...prev, [key]: "idle" })), 3000);
    } else if (actor === "brady") {
      // Open the related data source URL if available
      const ds = dataSources.find((d) => d.label === item.source);
      const href = ds ? getDataSourceUrl(ds) : null;
      if (href) window.open(href, "_blank");
    } else {
      // chrome-agent / claude-desktop — copy the single-item handoff
      const prompt = `${actorLabels[actor]} task:\n\n${item.action}\nSource: ${item.source}`;
      navigator.clipboard.writeText(prompt).then(() => {
        setActionStates((prev) => ({ ...prev, [key]: "copied" }));
        setTimeout(() => setActionStates((prev) => ({ ...prev, [key]: "idle" })), 2000);
      });
    }
  }

  const accent = groupAccents[id] ?? { banner: "from-slate-500/10 border-slate-200", badge: "bg-slate-50 text-slate-600 border-slate-200" };

  // ─── Render ───

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* ── Header ── */}
      <div className={`bg-gradient-to-b ${accent.banner} to-transparent border-b px-8 pt-6 pb-0 shrink-0`}>
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-text-muted">Group overview</p>
            <h1 className="text-3xl font-bold text-foreground">{groupLabel}</h1>
            <p className="mt-1 text-sm text-text-secondary">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
              {dataSources.length > 0 && (
                <span className="ml-2 text-text-hint">
                  · {readyCount}/{dataSources.length} sources ready
                  {actionCount > 0 && <span className="text-amber-600"> · {actionCount} need action</span>}
                </span>
              )}
            </p>
          </div>
          {mounted && (
            <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1 text-[11px]">
              <button onClick={switchToBar} className={`rounded-md px-3 py-1 font-medium transition ${layout === "bar" ? "bg-background text-foreground shadow-sm" : "text-text-muted hover:text-foreground"}`}>
                Inline chat
              </button>
              <button onClick={switchToPanel} className={`rounded-md px-3 py-1 font-medium transition ${layout === "panel" ? "bg-background text-foreground shadow-sm" : "text-text-muted hover:text-foreground"}`}>
                Side panel
              </button>
            </div>
          )}
        </div>

        {/* ── Tab bar ── */}
        <div className="flex items-center gap-0">
          {([
            { key: "overview" as Tab, label: "Projects" },
            { key: "data" as Tab, label: "Connected Data", count: dataSources.length > 0 ? dataSources.length : undefined },
            { key: "ops" as Tab, label: "Operations" },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-4 py-2 text-[12px] font-medium transition-colors ${
                tab === t.key
                  ? "text-foreground"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              {t.label}
              {t.count !== undefined && (
                <span className="ml-1.5 text-[10px] text-text-hint">{t.count}</span>
              )}
              {tab === t.key && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat bar ── */}
      {layout === "bar" && (
        <GroupChatBar ref={chatBarRef} groupId={id} groupLabel={groupLabel} shortcuts={shortcuts} welcomeMessage={welcomeMessage} />
      )}

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Projects tab ── */}
        {tab === "overview" && (
          <div className="p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {projects.map((p) => (
                <div key={p.slug} className="flex flex-col rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-border-light px-5 py-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-active text-sm font-bold text-foreground ring-1 ring-border">
                      {p.short}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-semibold truncate">
                        <Link href={p.href} className="text-foreground hover:text-accent hover:underline transition-colors">{p.label}</Link>
                      </h2>
                      <p className="text-[11px] text-text-hint">/{p.slug}</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 shrink-0">
                      <span className={`h-1.5 w-1.5 rounded-full ${typeDots[p.type]}`} />
                      <span className="text-[10px] text-text-muted">{typeLabels[p.type]}</span>
                    </div>
                  </div>
                  {p.description && (
                    <div className="px-5 pt-4 pb-1">
                      <p className="text-sm text-text-secondary leading-relaxed">{p.description}</p>
                    </div>
                  )}
                  {p.subPages.length > 0 && (
                    <div className="px-5 pt-3 pb-1">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-hint">Pages</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.subPages.map((sub) => (
                          <Link key={sub.href} href={sub.href} className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition hover:shadow-sm ${accent.badge}`}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between border-t border-border-light px-5 py-3">
                    <span className="text-[11px] text-text-muted">{p.magic_link ? "Magic link enabled" : ""}</span>
                    <Link href={p.href} className="text-[11px] font-semibold text-accent hover:underline">Open →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Connected Data tab ── */}
        {tab === "data" && (
          <div className="p-8">
            {dataSources.length === 0 ? (
              <p className="text-sm text-text-muted">No data sources configured for this group.</p>
            ) : (
              <>
                {/* Status legend */}
                <div className="flex items-center gap-4 mb-6 text-[10px] text-text-muted">
                  {(["ready", "partial", "not-started", "recommended"] as const).map((s) => {
                    const count = dataSources.filter((d) => d.status === s).length;
                    if (count === 0) return null;
                    return (
                      <span key={s} className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${statusDots[s]}`} />
                        {statusLabels[s]} ({count})
                      </span>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
                  {dataSources.map((ds) => {
                    const href = getDataSourceUrl(ds);
                    const isRecommended = ds.status === "recommended";
                    const inner = (
                      <div className={isRecommended ? "opacity-50" : ""}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`h-2 w-2 rounded-full shrink-0 ${statusDots[ds.status]}`} />
                          <span className={`text-xs font-medium truncate ${isRecommended ? "text-text-muted" : "text-foreground"}`}>{ds.label}</span>
                          <span className="rounded-full bg-surface-active px-1.5 py-0.5 text-[9px] font-medium text-text-hint shrink-0">{dataTypeLabels[ds.type]}</span>
                          <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium shrink-0 ${
                            ds.status === "ready" ? "bg-emerald-50 text-emerald-700" :
                            ds.status === "partial" ? "bg-amber-50 text-amber-700" :
                            ds.status === "not-started" ? "bg-red-50 text-red-700" :
                            "bg-slate-50 text-slate-500"
                          }`}>{statusLabels[ds.status]}</span>
                        </div>
                        <p className={`mt-1 pl-4 text-[11px] leading-snug ${isRecommended ? "text-text-hint" : "text-text-muted"}`}>{ds.description}</p>
                        {ds.id && <p className="mt-0.5 pl-4 text-[9px] font-mono text-text-hint truncate">{ds.id}</p>}
                        {ds.nextStep && ds.status !== "ready" && (
                          <div className="mt-1.5 pl-4 flex items-start gap-1.5">
                            <span className="text-[9px] text-text-hint mt-px shrink-0">Next:</span>
                            <p className="text-[10px] text-text-secondary leading-snug">
                              {ds.nextStep}
                              {ds.nextStepActor && (
                                <span className={`ml-1.5 inline-flex items-center rounded-full bg-surface-active px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider ${actorColors[ds.nextStepActor]}`}>
                                  {actorLabels[ds.nextStepActor]}
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    );

                    return href ? (
                      <a key={ds.label} href={href} target={href.startsWith("/") ? undefined : "_blank"} rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
                        className={`block rounded-lg border bg-surface px-4 py-3 transition-colors ${statusBorders[ds.status]} ${isRecommended ? "hover:opacity-75" : "hover:bg-surface-active/50"}`}>
                        {inner}
                      </a>
                    ) : (
                      <div key={ds.label} className={`rounded-lg border bg-surface px-4 py-3 ${statusBorders[ds.status]}`}>{inner}</div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Operations tab ── */}
        {tab === "ops" && (
          <div className="p-8 space-y-8">
            {/* UAT section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground">UAT Checks</h2>
                <button
                  onClick={runUat}
                  disabled={uatRunning}
                  className="rounded-full bg-orange-500 px-4 py-1 text-[11px] font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  {uatRunning ? "Running..." : uatResults.length > 0 ? "Re-run" : "Run UAT"}
                </button>
              </div>
              {uatResults.length > 0 && (
                <div className="rounded-lg border border-border bg-surface p-4 space-y-1.5">
                  {uatResults.map((r) => (
                    <div key={r.name} className="flex items-center gap-2 text-xs">
                      <span className={`shrink-0 h-2 w-2 rounded-full ${r.status === "pass" ? "bg-emerald-400" : r.status === "fail" ? "bg-red-400" : "bg-amber-400"}`} />
                      <span className="font-medium text-foreground w-32 shrink-0">{r.name}</span>
                      <span className={r.status === "pass" ? "text-text-muted" : r.status === "fail" ? "text-red-600" : "text-amber-600"}>{r.detail}</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-border-light flex items-center gap-4 text-[11px]">
                    <span className="text-emerald-600 font-medium">{uatResults.filter((r) => r.status === "pass").length} passed</span>
                    {uatResults.filter((r) => r.status === "warn").length > 0 && <span className="text-amber-600 font-medium">{uatResults.filter((r) => r.status === "warn").length} warnings</span>}
                    {uatResults.filter((r) => r.status === "fail").length > 0 && <span className="text-red-600 font-medium">{uatResults.filter((r) => r.status === "fail").length} failed</span>}
                  </div>
                </div>
              )}
              {uatResults.length === 0 && !uatRunning && (
                <p className="text-xs text-text-muted">Click "Run UAT" to check chat, shortcuts, KB files, and API connectivity.</p>
              )}
            </section>

            {/* Next steps section */}
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-4">Next Steps by Actor</h2>
              {Object.values(nextStepsByActor.groups).every((g) => g.length === 0) ? (
                <p className="text-xs text-text-muted">All data sources are fully set up.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {nextStepsByActor.actorOrder.map((actor) => {
                    const items = nextStepsByActor.groups[actor];
                    if (items.length === 0) return null;
                    return (
                      <div key={actor} className="rounded-lg border border-border bg-surface p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`text-[11px] font-semibold uppercase tracking-wider ${actorColors[actor]}`}>{actorLabels[actor]}</h3>
                          {actor !== "brady" && (
                            <button onClick={() => copyHandoff(actor)} className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold transition-colors ${copiedActor === actor ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`}>
                              {copiedActor === actor ? "Copied!" : "Copy handoff prompt"}
                            </button>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {items.map((item, i) => {
                            const key = `${actor}-${item.source}`;
                            const state = actionStates[key] ?? "idle";
                            const isConductor = actor === "conductor";
                            const isBrady = actor === "brady";
                            const btnLabel = state === "sent" ? "Sent!" : state === "copied" ? "Copied!" : isConductor ? "Execute" : isBrady ? "Open" : "Handoff";
                            const btnColor = state !== "idle"
                              ? "bg-emerald-100 text-emerald-700"
                              : isConductor
                                ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                : isBrady
                                  ? "bg-sky-100 text-sky-700 hover:bg-sky-200"
                                  : "bg-purple-100 text-purple-700 hover:bg-purple-200";
                            return (
                              <li key={i} className="flex items-start gap-2 text-[11px]">
                                <span className={`shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full ${statusDots[item.status]}`} />
                                <span className="flex-1 text-text-secondary">
                                  {item.action}
                                  <span className="ml-1.5 text-text-hint">— {item.source}</span>
                                </span>
                                <button
                                  onClick={() => executeAction(item, actor)}
                                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-semibold transition-colors ${btnColor}`}
                                >
                                  {btnLabel}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Agent context section */}
            {agentInstructions && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-foreground">Browser Agent Context</h2>
                  <button onClick={() => setAgentExpanded((v) => !v)} className="text-[10px] text-accent hover:underline">
                    {agentExpanded ? "Collapse" : "Expand"}
                  </button>
                </div>
                {agentExpanded && (
                  <pre className="whitespace-pre-wrap text-xs text-text-secondary leading-relaxed font-mono bg-surface border border-border rounded-lg p-4 max-h-64 overflow-y-auto">
                    {agentInstructions}
                  </pre>
                )}
                {!agentExpanded && (
                  <p className="text-xs text-text-muted">Structured instructions for the Claude Chrome agent to navigate and operate this page.</p>
                )}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
