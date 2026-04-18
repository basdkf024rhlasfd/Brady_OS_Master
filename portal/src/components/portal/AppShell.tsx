"use client";

import { Sidebar } from "./Sidebar";
// import { GlobalChatPanel } from "./GlobalChatPanel";  // hidden until further notice
// import { ConfigPanel } from "./ConfigPanel";           // hidden until further notice
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import type { ProjectId } from "@/lib/access";

export function AppShell({
  children,
  isAdmin,
  projects,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
  projects: ProjectId[];
}) {
  return (
    <WorkspaceProvider isAdmin={isAdmin} projects={projects}>
      <div className="flex h-screen bg-background">
        <Sidebar isAdmin={isAdmin} projects={projects} />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </WorkspaceProvider>
  );
}
