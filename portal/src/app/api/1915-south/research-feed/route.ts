import { NextResponse } from "next/server";
import { queryDataSource } from "@/lib/notion-client";

export const dynamic = "force-dynamic";

// 1915 South Projects DB entry ID — filters Context Vault to this engagement only
const PROJECT_ID = "34bed43b-89c5-8109-b0e3-d15f9f1601f6";

export async function GET() {
  const dbId = process.env.NOTION_CONTEXT_VAULT_DB_ID;
  if (!dbId) return NextResponse.json({ items: [] });

  try {
    const rows = await queryDataSource(dbId, {
      filter: {
        property: "Project",
        relation: { contains: PROJECT_ID },
      },
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
      pageSize: 20,
      titleProp: "Name",
      statusProp: "Type",
      tagsProp: "Tags",
    });

    const items = rows.map((r) => ({
      id: r.id,
      title: r.title,
      type: r.status,
      tags: r.tags.filter((t) => t !== "Research"),
      date: r.lastEdited,
    }));

    return NextResponse.json({ items });
  } catch (e) {
    console.error("[1915-south/research-feed]", e);
    return NextResponse.json({ items: [], error: "query failed" });
  }
}
