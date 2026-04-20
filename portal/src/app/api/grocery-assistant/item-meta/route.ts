import { NextRequest, NextResponse } from "next/server";
import {
  getItemMeta,
  upsertItemMeta,
  updateScrapeTimestamp,
} from "@/lib/grocery-notion";

export async function GET() {
  try {
    const data = await getItemMeta();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message, items: {}, lastScrapedAt: null }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, remaining, comments, scrapeTimestamp } = body as {
      name?: string;
      remaining?: number | null;
      comments?: string;
      scrapeTimestamp?: boolean;
    };

    if (scrapeTimestamp) {
      await updateScrapeTimestamp();
      return NextResponse.json({ ok: true });
    }

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    await upsertItemMeta(name, {
      ...(remaining !== undefined && { remaining }),
      ...(comments !== undefined && { comments }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
