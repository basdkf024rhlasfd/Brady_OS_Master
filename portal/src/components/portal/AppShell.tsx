"use client";

import { Sidebar } from "./Sidebar";
// import { GlobalChatPanel } from "./GlobalChatPanel";  // hidden until further notice
// import { ConfigPanel } from "./ConfigPanel";           // hidden until further notice
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import type { ProjectId } from "@/lib/access";

export interface ProjectNav {
  slug: string;
  label: string;
  short: string;
  href: string;
}

export function AppShell({
  children,
  isAdmin,
  projects,
  projectConfigs,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
  projects: ProjectId[];
  projectConfigs: ProjectNav[];
}) {
  return (
    <WorkspaceProvider isAdmin={isAdmin} projects={projects}>
      <div className="flex h-screen bg-background">
        <Sidebar isAdmin={isAdmin} projects={projects} projectConfigs={projectConfigs} />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </WorkspaceProvider>
  );
}
