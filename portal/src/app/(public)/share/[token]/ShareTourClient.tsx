"use client";

import { useState } from "react";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

export interface ShareTourProject {
  slug: string;
  short: string;
  baseUrl: string;
  path: string;
  title: string;
}

export function ShareTourClient({
  projects,
}: {
  projects: ShareTourProject[];
}) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0];

  // Single-project link: keep the original simple full-frame layout.
  if (projects.length === 1) {
    return (
      <div className="flex h-dvh flex-col bg-background">
        <header className="pt-safe flex h-12 shrink-0 items-center border-b border-border px-4">
          <span className="text-sm font-bold text-foreground">
            mception<span className="text-accent-brand">.ai</span>
          </span>
          <span className="ml-3 text-xs text-text-muted">{active.title}</span>
        </header>
        <main className="flex-1 overflow-hidden">
          <ProjectFrame
            baseUrl={active.baseUrl}
            path={active.path}
            title={active.title}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col bg-background md:flex-row">
      {/* Project switcher: a horizontal strip on phones, a rail from md up. */}
      <aside className="pt-safe flex shrink-0 flex-col border-b border-border md:w-60 md:border-b-0 md:border-r md:pt-0">
        <div className="flex h-12 shrink-0 items-center border-b border-border px-4">
          <span className="text-sm font-bold text-foreground">
            mception<span className="text-accent-brand">.ai</span>
          </span>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-2 md:flex-1 md:flex-col md:gap-0 md:overflow-x-hidden md:overflow-y-auto">
          {projects.map((p) => {
            const isActive = p.slug === active.slug;
            return (
              <button
                key={p.slug}
                onClick={() => setActiveSlug(p.slug)}
                className={`flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors md:mb-1 md:w-full ${
                  isActive
                    ? "bg-accent-brand/10 text-foreground"
                    : "text-text-muted hover:bg-border/40 hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs ${
                    isActive
                      ? "bg-accent-brand text-background"
                      : "bg-border/60 text-text-muted"
                  }`}
                >
                  {p.short}
                </span>
                <span className="truncate">{p.title}</span>
              </button>
            );
          })}
        </nav>
        {/* Desktop keeps the note pinned under the rail. On phones the aside is
            just the switcher strip, so the note rides in the main header. */}
        <div className="hidden shrink-0 border-t border-border px-4 py-3 text-[11px] leading-relaxed text-text-muted md:block">
          Shared preview — please keep confidential.
        </div>
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-12 shrink-0 items-center border-b border-border px-4">
          <span className="truncate text-sm text-foreground">{active.title}</span>
          <span className="ml-auto shrink-0 pl-3 text-[11px] text-text-muted md:hidden">
            Confidential
          </span>
        </header>
        <div className="flex-1 overflow-hidden">
          {/* key forces a fresh frame per project so iframe state resets cleanly */}
          <ProjectFrame
            key={active.slug}
            baseUrl={active.baseUrl}
            path={active.path}
            title={active.title}
          />
        </div>
      </main>
    </div>
  );
}
