"use client";

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

  return (
    <WorkspaceProvider isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs} agentMap={agentMap}>
      <div className="flex h-screen bg-background">
        <Sidebar isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs} />
        <div className="flex flex-1 flex-col overflow-hidden">
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
