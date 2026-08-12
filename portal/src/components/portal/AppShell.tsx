"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { GlobalChatPanel } from "./GlobalChatPanel";
import { WorkspaceProvider, useWorkspace, type AgentMap } from "@/contexts/WorkspaceContext";
import type { ProjectId } from "@/lib/access";
import type { ProjectNav } from "@/lib/nav-types";

export type { ProjectNav };

export type AccessTier = "owner" | "test" | "preview" | "client";

/**
 * Phone-only top bar. Below md the sidebar is an off-canvas drawer, so this is
 * the only way to reach navigation and the chat panel. Carries the status-bar
 * inset because the app paints under the notch in standalone mode.
 */
function MobileTopBar({ onOpenNav }: { onOpenNav: () => void }) {
  const { toggleChat } = useWorkspace();

  return (
    <header className="sidebar-dark pt-safe shrink-0 border-b border-border bg-background md:hidden">
      <div className="flex h-12 items-center gap-1 px-2">
        <button
          onClick={onOpenNav}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition hover:bg-surface-active hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/portal" className="text-sm font-bold text-foreground">
          mception<span className="text-accent-brand">.ai</span>
        </Link>
        <button
          onClick={toggleChat}
          aria-label="Toggle chat"
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition hover:bg-surface-active hover:text-foreground"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

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
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  // Navigating from the drawer should close it. Adjusted during render rather
  // than in an effect so the drawer never paints open on the new route.
  const [navPath, setNavPath] = useState(pathname);
  if (pathname !== navPath) {
    setNavPath(pathname);
    setNavOpen(false);
  }

  return (
    <WorkspaceProvider isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs} agentMap={agentMap}>
      {/* h-dvh, not h-screen: 100vh on iOS Safari includes the collapsing
          toolbar, which pushes the bottom of the app out of view. */}
      <div className="flex h-dvh overflow-hidden bg-background">
        <Sidebar
          isAdmin={isAdmin}
          projects={projects}
          projectConfigs={projectConfigs}
          mobileOpen={navOpen}
          onMobileClose={() => setNavOpen(false)}
        />

        {/* Scrim behind the mobile drawer */}
        {navOpen && (
          <div
            onClick={() => setNavOpen(false)}
            aria-hidden
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <MobileTopBar onOpenNav={() => setNavOpen(true)} />
          {isPreview && (
            <div
              role="status"
              className="flex shrink-0 items-center justify-center gap-2 border-b border-amber-700/40 bg-amber-950/40 px-4 py-1.5 text-center text-xs font-medium tracking-wide text-amber-200"
            >
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
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
