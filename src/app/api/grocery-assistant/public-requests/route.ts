import { NextRequest, NextResponse } from "next/server";

// In-memory store for public requests (persists across requests within a function instance)
// In production, this would be a database. For now, it accumulates until Brady pulls them.
const pendingRequests: Array<{
  item: string;
  requestedBy: string;
  requestedAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const { requests } = await request.json();
    if (!Array.isArray(requests)) {
      return NextResponse.json({ error: "Invalid requests" }, { status: 400 });
    }

    for (const req of requests) {
      if (req.item && req.requestedBy) {
        pendingRequests.push({
          item: String(req.item),
          requestedBy: String(req.requestedBy),
          requestedAt: req.requestedAt || new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: requests.length,
      totalPending: pendingRequests.length,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// Brady pulls pending requests from the portal
export async function GET() {
  const items = [...pendingRequests];
  pendingRequests.length = 0; // Clear after pull
  return NextResponse.json({ requests: items });
}
