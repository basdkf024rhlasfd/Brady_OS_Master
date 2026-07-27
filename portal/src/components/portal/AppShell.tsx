"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { GlobalChatPanel } from "./GlobalChatPanel";
import { WorkspaceProvider, type AgentMap } from "@/contexts/WorkspaceContext";
import type { ProjectId } from "@/lib/access";
import type { ProjectNav } from "@/lib/nav-types";

export type { ProjectNav };

export type AccessTier = "owner" | "test" | "preview" | "client";

export function AppShell({
  children,
  isAdmin,
  tier,
  projects,
  projectConfigs,
  agentMap,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
  tier: AccessTier;
  projects: ProjectId[];
  projectConfigs: ProjectNav[];
  agentMap?: AgentMap;
}) {
  const isPreview = tier === "preview";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  return (
    <WorkspaceProvider isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs} agentMap={agentMap}>
      <div className="flex h-screen bg-background">
        {mobileNavOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />
        )}

        <div
          className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <Sidebar isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs} />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-3 md:hidden">
            <button
              type="button"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition hover:bg-surface-active hover:text-foreground"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/portal" className="text-sm font-bold text-foreground">
              mception<span className="text-accent-brand">.ai</span>
            </Link>
          </div>

          {isPreview && (
            <div
              role="status"
              className="flex shrink-0 items-center justify-center gap-2 border-b border-amber-700/40 bg-amber-950/40 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-200"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              Working preview · shared 1:1 · please don&apos;t forward
            </div>
          )}
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
        <GlobalChatPanel />
      </div>
    </WorkspaceProvider>
  );
}
