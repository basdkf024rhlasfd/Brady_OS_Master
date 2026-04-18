import { NextRequest, NextResponse } from "next/server";
import {
  processGlobalChat,
  type ProjectContext,
} from "@/lib/chat/global-chat-engine";

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const { sessionId, message, projectContext } = (await request.json()) as {
      sessionId?: string;
      message?: string;
      projectContext?: ProjectContext;
    };

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId required" },
        { status: 400 }
      );
    }
    if (!message) {
      return NextResponse.json(
        { error: "message required" },
        { status: 400 }
      );
    }
    if (!projectContext?.project) {
      return NextResponse.json(
        { error: "projectContext.project required" },
        { status: 400 }
      );
    }

    const result = await processGlobalChat(sessionId, message, projectContext);

    return NextResponse.json({ response: result.response });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Global chat API error:", msg);
    return NextResponse.json(
      { error: msg || "Failed to process message" },
      { status: 500 }
    );
  }
}
