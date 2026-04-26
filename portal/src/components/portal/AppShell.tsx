"use client";

import { Sidebar } from "./Sidebar";
import { GlobalChatPanel } from "./GlobalChatPanel";
import { WorkspaceProvider, type AgentMap } from "@/contexts/WorkspaceContext";
import type { ProjectId } from "@/lib/access";
import type { ProjectNav } from "@/lib/nav-types";

export type { ProjectNav };

export function AppShell({
  children,
  isAdmin,
  projects,
  projectConfigs,
  agentMap,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
  projects: ProjectId[];
  projectConfigs: ProjectNav[];
  agentMap?: AgentMap;
}) {
  return (
    <WorkspaceProvider isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs} agentMap={agentMap}>
      <div className="flex h-screen bg-background">
        <Sidebar isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs} />
        <main className="flex-1 overflow-hidden">{children}</main>
        <GlobalChatPanel />
      </div>
    </WorkspaceProvider>
  );
}
