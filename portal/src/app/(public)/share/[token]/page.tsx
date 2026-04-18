import { notFound } from "next/navigation";
import { verifyMagicLink } from "@/lib/magic-link";
import { ProjectFrame } from "@/components/portal/ProjectFrame";
import type { ProjectId } from "@/lib/access";

const PROJECT_CONTENT: Partial<Record<
  ProjectId,
  { baseUrl: string; path: string; title: string }
>> = {
  "mark-schmulen": {
    baseUrl: "https://basdkf024rhlasfd.github.io/mark-schmulen-ai-os",
    path: "/viewer/",
    title: "Mark Schmulen AI OS",
  },
  stihl: {
    baseUrl: process.env.NEXT_PUBLIC_STIHL_APP_URL ?? "http://localhost:4100",
    path: "/",
    title: "STIHL USA",
  },
  orlando: {
    baseUrl: "",
    path: "/orlando/viewer/index.html",
    title: "Orlando Real Estate Knowledge Base",
  },
  moving: {
    baseUrl: "",
    path: "/apps/moving-calculator/index.html",
    title: "Moving Calculator",
  },
  pauletteai: {
    baseUrl: "",
    path: "/pauletteai/shared/index.html",
    title: "DAHS",
  },
  kroger: {
    baseUrl: "",
    path: "/kroger/viewer/index.html",
    title: "Kroger Management Operating System",
  },
};

export default async function SharedProjectPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let payload;
  try {
    payload = await verifyMagicLink(token);
  } catch {
    notFound();
  }

  const content = PROJECT_CONTENT[payload.project];
  if (!content) notFound();

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex h-12 shrink-0 items-center border-b border-border px-4">
        <span className="text-sm font-bold text-foreground">
          mception<span className="text-accent-brand">.ai</span>
        </span>
        <span className="ml-3 text-xs text-text-muted">{content.title}</span>
      </header>
      <main className="flex-1 overflow-hidden">
        <ProjectFrame
          baseUrl={content.baseUrl}
          path={content.path}
          title={content.title}
        />
      </main>
    </div>
  );
}
