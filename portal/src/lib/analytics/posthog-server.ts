import "server-only";

/**
 * SPEC-008 — mception capture layer (Phase A instrumentation).
 *
 * Server-side chat-transcript capture via posthog-node. Fully env-gated: if
 * `POSTHOG_KEY` is absent, `captureChatAnswer` is a no-op and the module never
 * constructs a client — so the existing `[AUDIT]` console behavior is preserved
 * unchanged and the build compiles with no PostHog credentials present.
 *
 * `POSTHOG_KEY` here is the PostHog *project* ingest key (the same value as
 * `NEXT_PUBLIC_POSTHOG_KEY`), set server-side so server capture can be toggled
 * independently of the browser SDK. The Steward runner's read/query credential
 * (`POSTHOG_PERSONAL_API_KEY`) is a different key and is NOT used here.
 */

import { PostHog } from "posthog-node";

const SERVER_KEY = process.env.POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ??
  process.env.POSTHOG_HOST ??
  "https://us.i.posthog.com";

// Heuristic for "the chatbot couldn't confidently answer" — the core loop's
// highest-value signal (unanswered questions to close weekly).
const LOW_CONFIDENCE_RE =
  /i don'?t|i'?m not sure|i don'?t have|couldn'?t find|no information/i;

export function isServerCaptureEnabled(): boolean {
  return Boolean(SERVER_KEY);
}

export interface ChatAnswerCapture {
  project: string;
  userEmail: string;
  distinctId: string;
  question: string;
  answer: string;
  tokensIn: number;
  tokensOut: number;
  finishReason: string;
}

/**
 * Persist one chat Q&A turn to PostHog as a `chat_answer` event. Best-effort:
 * any failure is swallowed so it can never break the chat response. Flushes and
 * shuts down the per-request client so the event is delivered before the
 * serverless function is frozen.
 */
export async function captureChatAnswer(
  params: ChatAnswerCapture
): Promise<void> {
  if (!SERVER_KEY) return;

  const client = new PostHog(SERVER_KEY, {
    host: POSTHOG_HOST,
    // Short-lived serverless client: send on the first (only) event.
    flushAt: 1,
    flushInterval: 0,
  });

  try {
    client.capture({
      distinctId: params.distinctId,
      event: "chat_answer",
      properties: {
        project: params.project,
        userEmail: params.userEmail,
        question: params.question,
        answer: params.answer,
        lowConfidence: LOW_CONFIDENCE_RE.test(params.answer),
        tokensIn: params.tokensIn,
        tokensOut: params.tokensOut,
        finishReason: params.finishReason,
      },
    });
  } finally {
    // shutdown() flushes the queue and closes the client — the documented
    // serverless pattern for guaranteed delivery.
    await client.shutdown();
  }
}
