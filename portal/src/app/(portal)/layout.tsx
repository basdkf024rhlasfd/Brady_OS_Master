import { AppShell } from "@/components/portal/AppShell";
import { getPortalAccess } from "@/lib/portal-access";
import { loadProjects } from "@/config/load-projects";
import { listChatConfigs, getChatConfig } from "@/lib/chat/chat-config";
import type { AgentMap } from "@/contexts/WorkspaceContext";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, projects, tier } = await getPortalAccess();
  const projectConfigs = loadProjects().map((p) => ({
    slug: p.slug,
    label: p.label,
    short: p.short,
    href: p.href,
  }));

  // Build agent map: slug → { agentName, agentAvatar } for any chat config
  // that declares an agent. Surfaces the persona to client components
  // (GlobalChatPanel) so the active project's agent renders without a fetch.
  const agentMap: AgentMap = {};
  for (const slug of listChatConfigs()) {
    const cfg = getChatConfig(slug);
    if (cfg.agentName) {
      agentMap[slug] = {
        agentName: cfg.agentName,
        agentAvatar: cfg.agentAvatar,
      };
    }
  }

  return (
    <AppShell
      isAdmin={isAdmin}
      tier={tier}
      projects={projects}
      projectConfigs={projectConfigs}
      agentMap={agentMap}
    >
      {children}
    </AppShell>
  );
}
