"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { GroupChatBar } from "@/components/portal/GroupChatBar";
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
  family:               { banner: "from-sky-500/10 border-sky-200",       badge: "bg-sky-50 text-sky-700 border-sky-200" },
  "vc-startup":         { banner: "from-violet-500/10 border-violet-200", badge: "bg-violet-50 text-violet-700 border-violet-200" },
  "panda-engagement":   { banner: "from-amber-500/10 border-amber-200",   badge: "bg-amber-50 text-amber-700 border-amber-200" },
  incubator:            { banner: "from-slate-500/10 border-slate-200",   badge: "bg-slate-50 text-slate-600 border-slate-200" },
};

const LAYOUT_KEY = "group-chat-layout";

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
  "brady": "Brady",
  "chrome-agent": "Chrome Agent",
  "claude-desktop": "Claude Desktop",
  "conductor": "Conductor.Build",
};

const actorColors: Record<NonNullable<DataSource["nextStepActor"]>, string> = {
  "brady": "text-sky-600",
  "chrome-agent": "text-purple-600",
  "claude-desktop": "text-orange-600",
  "conductor": "text-emerald-600",
};

const dataTypeLabels: Record<DataSource["type"], string> = {
  "notion-db": "Notion DB",
  "notion-page": "Notion Page",
  "notion-wiki": "Notion Wiki",
  "google-calendar": "Calendar",
  "kb-directory": "KB Files",
  "skill": "Skill",
  "external": "Project",
};

const statusDots: Record<DataSource["status"], string> = {
  "ready": "bg-emerald-400",
  "partial": "bg-amber-400",
  "not-started": "bg-red-400",
  "recommended": "bg-slate-300",
};

const statusLabels: Record<DataSource["status"], string> = {
  "ready": "Ready",
  "partial": "Partial",
  "not-started": "Not started",
  "recommended": "Recommended",
};

const statusBorders: Record<DataSource["status"], string> = {
  "ready": "border-emerald-200 hover:border-emerald-300",
  "partial": "border-amber-200 hover:border-amber-300",
  "not-started": "border-red-200 hover:border-red-300",
  "recommended": "border-border",
};

function getDataSourceUrl(ds: DataSource): string | null {
  if (ds.url) return ds.url;
  if (ds.type === "notion-db" && ds.id) return `https://www.notion.so/${ds.id.replace(/-/g, "")}`;
  if (ds.type === "notion-page" && ds.id) return `https://www.notion.so/${ds.id.replace(/-/g, "")}`;
  return null;
}

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
  const pathname = usePathname();
  const { chatOpen, toggleChat } = useWorkspace();
  const [layout, setLayout] = useState<"bar" | "panel">("bar");
  const [mounted, setMounted] = useState(false);
  const [agentExpanded, setAgentExpanded] = useState(false);
  const [activePanel, setActivePanel] = useState<"uat" | "summarize" | null>(null);
  const [uatResults, setUatResults] = useState<{ name: string; status: "pass" | "fail" | "warn"; detail: string }[]>([]);
  const [uatRunning, setUatRunning] = useState(false);
  const [copiedActor, setCopiedActor] = useState<string | null>(null);

  function handleActionButton(action: "uat" | "summarize") {
    if (activePanel === action) { setActivePanel(null); return; }
    setActivePanel(action);
    if (action === "uat") runUat();
  }

  async function runUat() {
    setUatRunning(true);
    setUatResults([]);
    const results: typeof uatResults = [];

    // 1. Chat bar exists
    const chatInput = document.querySelector('input[placeholder*="Ask"]') as HTMLInputElement | null;
    results.push(chatInput
      ? { name: "Chat input", status: "pass", detail: "Input field found and accessible" }
      : { name: "Chat input", status: "fail", detail: "Chat input field not found in DOM" }
    );

    // 2. Shortcut chips
    const chips = document.querySelectorAll('button');
    const shortcutChips = Array.from(chips).filter(b => shortcuts.some(s => b.textContent?.trim() === s.label));
    results.push(shortcutChips.length === shortcuts.length
      ? { name: "Shortcut chips", status: "pass", detail: `${shortcutChips.length}/${shortcuts.length} chips rendered` }
      : shortcutChips.length > 0
        ? { name: "Shortcut chips", status: "warn", detail: `${shortcutChips.length}/${shortcuts.length} chips found — some missing` }
        : { name: "Shortcut chips", status: "fail", detail: "No shortcut chips found" }
    );

    // 3. Welcome message
    const welcomeEl = document.querySelector('.max-h-72');
    const hasWelcome = welcomeEl?.textContent?.includes(welcomeMessage.slice(0, 20));
    results.push(hasWelcome
      ? { name: "Welcome message", status: "pass", detail: "Welcome text displayed in chat area" }
      : { name: "Welcome message", status: "fail", detail: "Welcome message not found in chat area" }
    );

    // 4. Project card links
    const cardLinks = document.querySelectorAll('h2 a');
    const projectLinks = Array.from(cardLinks).filter(a => projects.some(p => a.getAttribute('href') === p.href));
    results.push(projectLinks.length === projects.length
      ? { name: "Project card links", status: "pass", detail: `${projectLinks.length} project titles are clickable links` }
      : { name: "Project card links", status: "fail", detail: `${projectLinks.length}/${projects.length} project title links found` }
    );

    // 5. Connected data section
    const dsCards = document.querySelectorAll('[class*="statusDot"], .rounded-full.bg-emerald-400, .rounded-full.bg-amber-400, .rounded-full.bg-red-400, .rounded-full.bg-slate-300');
    const connectedHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.includes('Connected Data'));
    results.push(connectedHeading && dataSources.length > 0
      ? { name: "Connected Data", status: "pass", detail: `Section rendered with ${dataSources.length} data sources` }
      : { name: "Connected Data", status: "fail", detail: "Connected Data section not found" }
    );

    // 6. Agent context button
    const agentBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Browser Agent Context'));
    results.push(agentBtn
      ? { name: "Agent context button", status: "pass", detail: "Browser Agent Context toggle found" }
      : agentInstructions
        ? { name: "Agent context button", status: "fail", detail: "Agent instructions configured but button not rendered" }
        : { name: "Agent context button", status: "warn", detail: "No agent instructions configured" }
    );

    // 7. Chat API reachable
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'ping', parts: [{ type: 'text', text: 'ping' }] }],
          projectContext: { project: id, route: `/group/${id}`, configState: {}, isAdmin: false, mode: 'client' }
        }),
      });
      results.push(res.ok || res.status === 200
        ? { name: "Chat API", status: "pass", detail: `POST /api/chat responded ${res.status}` }
        : { name: "Chat API", status: "warn", detail: `POST /api/chat responded ${res.status} — may need auth` }
      );
    } catch (e) {
      results.push({ name: "Chat API", status: "fail", detail: `POST /api/chat failed: ${e instanceof Error ? e.message : "network error"}` });
    }

    // 8. KB files accessible
    try {
      const kbRes = await fetch('/family/kb/01-family-roster.md');
      results.push(kbRes.ok
        ? { name: "KB files", status: "pass", detail: "family/kb/01-family-roster.md accessible" }
        : { name: "KB files", status: "fail", detail: `KB file returned ${kbRes.status}` }
      );
    } catch {
      results.push({ name: "KB files", status: "fail", detail: "Could not fetch KB files from /family/kb/" });
    }

    setUatResults(results);
    setUatRunning(false);
  }

  // Compute next-steps summary from dataSources
  const nextStepsByActor = (() => {
    const groups: Record<string, { action: string; source: string; status: DataSource["status"] }[]> = {};
    const actorOrder: NonNullable<DataSource["nextStepActor"]>[] = ["brady", "chrome-agent", "claude-desktop", "conductor"];
    for (const actor of actorOrder) groups[actor] = [];
    for (const ds of dataSources) {
      if (ds.status === "ready" || !ds.nextStep || !ds.nextStepActor) continue;
      groups[ds.nextStepActor].push({ action: ds.nextStep, source: ds.label, status: ds.status });
    }
    // Sort each group: red first, then yellow, then grey
    const statusOrder: Record<DataSource["status"], number> = { "not-started": 0, "partial": 1, "recommended": 2, "ready": 3 };
    for (const actor of actorOrder) {
      groups[actor].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    }
    return { groups, actorOrder };
  })();

  function buildHandoffPrompt(actor: NonNullable<DataSource["nextStepActor"]>): string {
    const items = nextStepsByActor.groups[actor];
    if (items.length === 0) return "";

    const statusLabel = (s: DataSource["status"]) =>
      s === "not-started" ? "NOT STARTED" : s === "partial" ? "PARTIAL" : "RECOMMENDED";

    const taskList = items
      .map((it, i) => `${i + 1}. [${statusLabel(it.status)}] ${it.action}\n   Source: ${it.source}`)
      .join("\n\n");

    const preambles: Record<string, string> = {
      brady: `Here are the manual tasks only you can do for the Family command center on mception.ai.\nNo agent can do these — they require your input or decisions.\n\nTasks:\n\n${taskList}`,

      "chrome-agent": `You are the Chrome browser agent on mception.ai/group/family — Brady's Family command center.

Context:
- This is a Next.js portal at mception.ai with a family chatbot, KB files, and connected Notion data.
- The Family group has 3 projects: Grocery Assistant, School Hub, Financial Cockpit.
- Brady has 5 kids: Lily Kay (17, BHS), Faith Riley (14, BHS), Isla/Luke/Quinn (9, Apple Glen Elementary).
- The chatbot is powered by KB markdown files in portal/public/family/kb/.

Execute these tasks in order. For each, confirm completion before moving to the next:

${taskList}

After completing all tasks, summarize what was done and what needs follow-up.`,

      "claude-desktop": `You are in a Claude Desktop (CoWork) session. Brady needs you to complete tasks for the Family command center on mception.ai.

Context:
- Brady OS repo: brady-os-master/rabat/
- Portal KB files: portal/public/family/kb/ (13 markdown files)
- Sweep skills: 3-reference/skills/{morning,weekly,evening}-sweep/SKILL.md
- Notion Streaming Notes DB: 2e9ed43b-89c5-80f4-8c21-000b4cfe812e
- Notion Rules & Preferences page: 344ed43b-89c5-813d-bded-f1d5689510e2
- Notion Projects DB: 2c2ed43b-89c5-80af-ac9b-ededd48b98e7
- Family calendar ID: family13834007621771747799@group.calendar.google.com

Execute these tasks in order:

${taskList}

After completing all tasks, summarize what was done and flag anything that needs Brady's input.`,

      conductor: `You are a Conductor.Build agent working on the mception.ai portal (brady-os-master/rabat/portal/).

Context:
- Next.js App Router, AI SDK v6, @ai-sdk/anthropic
- Chat API: portal/src/app/api/chat/route.ts — uses streamText() with system prompt + KB injection
- Chat config: portal/src/config/chat-configs/family.yml
- System prompt: portal/src/lib/chat/project-prompts/family.md
- KB loader: portal/src/lib/chat/kb-loader.ts (keyword routing)
- Chat config types: portal/src/lib/chat/chat-config.ts (ToolConfig interface exists but unused)
- Group page: portal/src/app/(portal)/group/[id]/GroupPageClient.tsx
- GroupChatBar: portal/src/components/portal/GroupChatBar.tsx

Execute these tasks:

${taskList}

Run \`npx tsc --noEmit\` after each code change to verify. Summarize what was built and what needs testing.`,
    };

    return preambles[actor] ?? taskList;
  }

  function copyHandoff(actor: NonNullable<DataSource["nextStepActor"]>) {
    const prompt = buildHandoffPrompt(actor);
    navigator.clipboard.writeText(prompt).then(() => {
      setCopiedActor(actor);
      setTimeout(() => setCopiedActor(null), 2000);
    });
  }

  useEffect(() => {
    const saved = localStorage.getItem(LAYOUT_KEY);
    if (saved === "panel") setLayout("panel");
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

  const accent = groupAccents[id] ?? {
    banner: "from-slate-500/10 border-slate-200",
    badge: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page header */}
      <div className={`bg-gradient-to-b ${accent.banner} to-transparent border-b px-8 py-8 shrink-0`}>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
          Group overview
        </p>
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{groupLabel}</h1>
              {dataSources.length > 0 && (
                <>
                  <button
                    onClick={() => handleActionButton("uat")}
                    className={`rounded-full px-4 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors ${
                      activePanel === "uat" ? "bg-orange-700 ring-2 ring-orange-300" : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"
                    }`}
                  >
                    {uatRunning ? "Running..." : activePanel === "uat" ? "Close UAT" : "UAT"}
                  </button>
                  <button
                    onClick={() => handleActionButton("summarize")}
                    className={`rounded-full px-4 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors ${
                      activePanel === "summarize" ? "bg-orange-700 ring-2 ring-orange-300" : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"
                    }`}
                  >
                    {activePanel === "summarize" ? "Close" : "Summarize Next Steps"}
                  </button>
                </>
              )}
            </div>
            <div className="mt-1 flex items-center gap-3">
              <p className="text-sm text-text-secondary">
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </p>
              {agentInstructions && (
                <button
                  onClick={() => setAgentExpanded((v) => !v)}
                  className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] font-medium text-text-muted hover:text-foreground transition-colors"
                >
                  <span className="text-[9px]">{agentExpanded ? "▼" : "▶"}</span>
                  Browser Agent Context
                </button>
              )}
            </div>
          </div>
          {/* Layout toggle — only show after mount to avoid hydration flash */}
          {mounted && (
            <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1 text-[11px]">
              <button
                onClick={switchToBar}
                className={`rounded-md px-3 py-1 font-medium transition ${
                  layout === "bar"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                Inline chat
              </button>
              <button
                onClick={switchToPanel}
                className={`rounded-md px-3 py-1 font-medium transition ${
                  layout === "panel"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                Side panel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Agent instructions — collapsible */}
      {agentExpanded && agentInstructions && (
        <div className="shrink-0 border-b border-border bg-surface-active/50">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Message to Browser Agent
              </h3>
              <button
                onClick={() => setAgentExpanded(false)}
                className="text-[10px] text-text-hint hover:text-foreground transition-colors"
              >
                Collapse
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-xs text-text-secondary leading-relaxed font-mono bg-background border border-border rounded-lg p-4 max-h-64 overflow-y-auto">
              {agentInstructions}
            </pre>
          </div>
        </div>
      )}

      {/* UAT results panel */}
      {activePanel === "uat" && (
        <div className="shrink-0 border-b border-border bg-surface">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                UAT Results
              </h3>
              <div className="flex items-center gap-3">
                <button onClick={runUat} disabled={uatRunning} className="text-[10px] text-accent hover:underline disabled:opacity-50">
                  Re-run
                </button>
                <button onClick={() => setActivePanel(null)} className="text-[10px] text-text-hint hover:text-foreground">
                  Close
                </button>
              </div>
            </div>
            {uatRunning && (
              <p className="text-xs text-text-muted animate-pulse">Running checks...</p>
            )}
            {uatResults.length > 0 && (
              <div className="space-y-1.5">
                {uatResults.map((r) => (
                  <div key={r.name} className="flex items-start gap-2 text-xs">
                    <span className={`shrink-0 mt-0.5 h-2 w-2 rounded-full ${
                      r.status === "pass" ? "bg-emerald-400" : r.status === "fail" ? "bg-red-400" : "bg-amber-400"
                    }`} />
                    <span className="font-medium text-foreground w-36 shrink-0">{r.name}</span>
                    <span className={`${r.status === "pass" ? "text-text-muted" : r.status === "fail" ? "text-red-600" : "text-amber-600"}`}>
                      {r.detail}
                    </span>
                  </div>
                ))}
                <div className="mt-3 pt-2 border-t border-border-light flex items-center gap-4 text-[11px]">
                  <span className="text-emerald-600 font-medium">{uatResults.filter(r => r.status === "pass").length} passed</span>
                  {uatResults.filter(r => r.status === "warn").length > 0 && (
                    <span className="text-amber-600 font-medium">{uatResults.filter(r => r.status === "warn").length} warnings</span>
                  )}
                  {uatResults.filter(r => r.status === "fail").length > 0 && (
                    <span className="text-red-600 font-medium">{uatResults.filter(r => r.status === "fail").length} failed</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next steps summary panel */}
      {activePanel === "summarize" && (
        <div className="shrink-0 border-b border-border bg-surface">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Next Steps by Actor
              </h3>
              <button onClick={() => setActivePanel(null)} className="text-[10px] text-text-hint hover:text-foreground">
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {nextStepsByActor.actorOrder.map((actor) => {
                const items = nextStepsByActor.groups[actor];
                if (items.length === 0) return null;
                return (
                  <div key={actor} className="rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`text-[11px] font-semibold uppercase tracking-wider ${actorColors[actor]}`}>
                        {actorLabels[actor]}
                      </h4>
                      {actor !== "brady" && (
                        <button
                          onClick={() => copyHandoff(actor as NonNullable<DataSource["nextStepActor"]>)}
                          className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold transition-colors ${
                            copiedActor === actor
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                          }`}
                        >
                          {copiedActor === actor ? "Copied!" : "Copy handoff prompt"}
                        </button>
                      )}
                    </div>
                    <ul className="space-y-1.5">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px]">
                          <span className={`shrink-0 mt-1 h-1.5 w-1.5 rounded-full ${statusDots[item.status]}`} />
                          <span className="text-text-secondary">
                            {item.action}
                            <span className="ml-1.5 text-text-hint">— {item.source}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            {Object.values(nextStepsByActor.groups).every(g => g.length === 0) && (
              <p className="text-xs text-text-muted">All data sources are fully set up.</p>
            )}
          </div>
        </div>
      )}

      {/* Inline chat bar — default layout */}
      {layout === "bar" && (
        <GroupChatBar groupId={id} groupLabel={groupLabel} shortcuts={shortcuts} welcomeMessage={welcomeMessage} />
      )}

      {/* Cards + Connected Data */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.slug}
              className="flex flex-col rounded-xl border border-border bg-surface shadow-sm overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 border-b border-border-light px-5 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-active text-sm font-bold text-foreground ring-1 ring-border">
                  {p.short}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold truncate">
                    <Link href={p.href} className="text-foreground hover:text-accent hover:underline transition-colors">
                      {p.label}
                    </Link>
                  </h2>
                  <p className="text-[11px] text-text-hint">/{p.slug}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 shrink-0">
                  <span className={`h-1.5 w-1.5 rounded-full ${typeDots[p.type]}`} />
                  <span className="text-[10px] text-text-muted">{typeLabels[p.type]}</span>
                </div>
              </div>

              {/* Description */}
              {p.description && (
                <div className="px-5 pt-4 pb-1">
                  <p className="text-sm text-text-secondary leading-relaxed">{p.description}</p>
                </div>
              )}

              {/* Sub-pages */}
              {p.subPages.length > 0 && (
                <div className="px-5 pt-3 pb-1">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-hint">
                    Pages
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.subPages.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition hover:shadow-sm ${accent.badge}`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer CTA */}
              <div className="mt-auto flex items-center justify-between border-t border-border-light px-5 py-3">
                <span className="text-[11px] text-text-muted">
                  {p.magic_link ? "Magic link enabled" : ""}
                </span>
                <Link
                  href={p.href}
                  className="text-[11px] font-semibold text-accent hover:underline"
                >
                  Open →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Connected Data Sources */}
        {dataSources.length > 0 && (
          <div className="mt-10">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-4">
              Connected Data
            </h2>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
              {dataSources.map((ds) => {
                const href = getDataSourceUrl(ds);
                const isRecommended = ds.status === "recommended";
                const inner = (
                  <div className={isRecommended ? "opacity-50" : ""}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`h-2 w-2 rounded-full shrink-0 ${statusDots[ds.status]}`} />
                      <span className={`text-xs font-medium truncate ${isRecommended ? "text-text-muted" : "text-foreground"}`}>{ds.label}</span>
                      <span className="rounded-full bg-surface-active px-1.5 py-0.5 text-[9px] font-medium text-text-hint shrink-0">
                        {dataTypeLabels[ds.type]}
                      </span>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium shrink-0 ${
                        ds.status === "ready" ? "bg-emerald-50 text-emerald-700" :
                        ds.status === "partial" ? "bg-amber-50 text-amber-700" :
                        ds.status === "not-started" ? "bg-red-50 text-red-700" :
                        "bg-slate-50 text-slate-500"
                      }`}>
                        {statusLabels[ds.status]}
                      </span>
                    </div>
                    <p className={`mt-1 pl-4 text-[11px] leading-snug ${isRecommended ? "text-text-hint" : "text-text-muted"}`}>{ds.description}</p>
                    {ds.id && (
                      <p className="mt-0.5 pl-4 text-[9px] font-mono text-text-hint truncate">{ds.id}</p>
                    )}
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
                  <a
                    key={ds.label}
                    href={href}
                    target={href.startsWith("/") ? undefined : "_blank"}
                    rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
                    className={`block rounded-lg border bg-surface px-4 py-3 transition-colors ${statusBorders[ds.status]} ${isRecommended ? "hover:opacity-75" : "hover:bg-surface-active/50"}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={ds.label}
                    className={`rounded-lg border bg-surface px-4 py-3 ${statusBorders[ds.status]}`}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
