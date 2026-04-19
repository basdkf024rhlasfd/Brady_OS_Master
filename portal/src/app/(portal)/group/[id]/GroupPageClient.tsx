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

export function GroupPageClient({
  id,
  groupLabel,
  projects,
}: {
  id: string;
  groupLabel: string;
  projects: GroupProject[];
}) {
  const pathname = usePathname();
  const { chatOpen, toggleChat } = useWorkspace();
  const [layout, setLayout] = useState<"bar" | "panel">("bar");
  const [mounted, setMounted] = useState(false);

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
            <h1 className="text-3xl font-bold text-foreground">{groupLabel}</h1>
            <p className="mt-1 text-sm text-text-secondary">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
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

      {/* Inline chat bar — default layout */}
      {layout === "bar" && (
        <GroupChatBar groupId={id} groupLabel={groupLabel} />
      )}

      {/* Cards */}
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
                  <h2 className="text-sm font-semibold text-foreground truncate">{p.label}</h2>
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
      </div>
    </div>
  );
}
