import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { loadProjects, type ProjectConfig } from "@/config/load-projects";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-groups";
import { getChatConfig } from "@/lib/chat/chat-config";
import { applyProbes } from "@/lib/group-health";
import { GroupPageClient, type GroupProject } from "./GroupPageClient";

function getSubPages(slug: string): { label: string; href: string }[] {
  const portalDir = path.join(process.cwd(), "src", "app", "(portal)", slug);
  if (!fs.existsSync(portalDir)) return [];
  const entries = fs.readdirSync(portalDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .filter((e) => fs.existsSync(path.join(portalDir, e.name, "page.tsx")))
    .filter((e) => !e.name.startsWith("["))
    .map((e) => ({
      label: e.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href: `/${slug}/${e.name}`,
    }));
}

export default async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const group = SIDEBAR_GROUPS.find((g) => g.id === id);
  if (!group) notFound();

  const allProjects = loadProjects();
  const groupProjects: GroupProject[] = group.slugs
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is ProjectConfig => !!p)
    .map((p) => ({
      slug: p.slug,
      label: p.label,
      short: p.short,
      href: p.href,
      description: p.description,
      type: p.type,
      magic_link: p.magic_link,
      subPages: p.type === "native" ? getSubPages(p.slug) : [],
    }));

  const chatConfig = getChatConfig(id);
  const shortcuts = chatConfig.shortcuts ?? [];
  const welcomeMessage = chatConfig.enabled ? chatConfig.welcomeMessage : "";
  const dataSources = await applyProbes(chatConfig.dataSources ?? []);
  const agentInstructions = chatConfig.agentInstructions ?? "";
  const agentName = chatConfig.agentName;
  const agentAvatar = chatConfig.agentAvatar;

  return (
    <GroupPageClient
      id={id}
      groupLabel={group.label}
      projects={groupProjects}
      shortcuts={shortcuts}
      welcomeMessage={welcomeMessage}
      dataSources={dataSources}
      agentInstructions={agentInstructions}
      agentName={agentName}
      agentAvatar={agentAvatar}
    />
  );
}
