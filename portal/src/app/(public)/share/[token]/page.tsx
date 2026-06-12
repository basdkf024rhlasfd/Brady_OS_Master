import { notFound } from "next/navigation";
import { verifyMagicLink } from "@/lib/magic-link";
import { getMagicLinkProjects } from "@/config/load-projects";
import { ShareTourClient, type ShareTourProject } from "./ShareTourClient";

const projectMap = new Map(
  getMagicLinkProjects().map((p) => {
    const frame = p.share_frame ?? p.frame!;
    let baseUrl = frame.baseUrl;
    // Resolve env var references like ${NEXT_PUBLIC_STIHL_APP_URL}
    const envMatch = baseUrl.match(/^\$\{(.+)\}$/);
    if (envMatch) {
      baseUrl = process.env[envMatch[1]] ?? "http://localhost:4100";
    }
    return [
      p.slug,
      { slug: p.slug, short: p.short, baseUrl, path: frame.path, title: p.label },
    ] as const;
  })
);

export default async function SharedProjectPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let projects: string[];
  try {
    ({ projects } = await verifyMagicLink(token));
  } catch {
    notFound();
  }

  const content: ShareTourProject[] = projects
    .map((slug) => projectMap.get(slug))
    .filter((p): p is ShareTourProject => !!p);

  if (content.length === 0) notFound();

  return <ShareTourClient projects={content} />;
}
