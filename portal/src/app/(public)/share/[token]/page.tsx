import { notFound } from "next/navigation";
import { verifyMagicLink } from "@/lib/magic-link";
import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { getMagicLinkProjects } from "@/config/load-projects";

const projectMap = new Map(
  getMagicLinkProjects().map((p) => {
    const frame = p.share_frame ?? p.frame!;
    let baseUrl = frame.baseUrl;
    // Resolve env var references like ${NEXT_PUBLIC_STIHL_APP_URL}
    const envMatch = baseUrl.match(/^\$\{(.+)\}$/);
    if (envMatch) {
      baseUrl = process.env[envMatch[1]] ?? "http://localhost:4100";
    }
    return [p.slug, { baseUrl, path: frame.path, title: p.label }];
  })
);

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

  const content = projectMap.get(payload.project);
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
