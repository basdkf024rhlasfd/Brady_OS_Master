import { NextRequest, NextResponse } from "next/server";

const STREAMING_NOTES_DB = "2e9ed43b-89c5-80f4-8c21-000b4cfe812e";
const NOTION_VERSION = "2022-06-28";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, source, projectSlug } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: "Message too long (max 2000 chars)" }, { status: 400 });
    }

    const token = process.env.NOTION_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Notion not configured" }, { status: 500 });
    }

    const truncated = message.slice(0, 60).replace(/\n/g, " ");
    const slug = projectSlug ?? "portal";
    const name = `Intake: ${slug} — ${truncated}${message.length > 60 ? "…" : ""}`;
    const timestamp = new Date().toISOString();

    const notionBody = {
      parent: { database_id: STREAMING_NOTES_DB },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Type: { select: { name: "Note" } },
        Status: { status: { name: "Not Started" } },
        Priority: { select: { name: "Should" } },
        Source: { select: { name: "Execution" } },
        "Next Action": { rich_text: [{ text: { content: "Brady review — from portal intake form" } }] },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: `${message}\n\n---\nSource: ${source ?? "portal"} | Project: ${slug} | Submitted: ${timestamp}`,
                },
              },
            ],
          },
        },
      ],
    };

    const notionRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify(notionBody),
    });

    if (!notionRes.ok) {
      const err = await notionRes.text();
      console.error("Notion API error:", err);
      return NextResponse.json({ error: "Failed to write to Notion" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Intake route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
