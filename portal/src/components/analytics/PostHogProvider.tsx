"use client";

/**
 * SPEC-008 — mception capture layer (Phase A instrumentation).
 *
 * Env-gated PostHog client provider. Does NOTHING unless
 * `NEXT_PUBLIC_POSTHOG_KEY` is present — when the key is absent this component
 * renders its children unchanged (pure no-op), so the build compiles and runs
 * with no PostHog credentials configured.
 *
 * Privacy floor (SPEC-008 acceptance criteria #3/#4):
 *  - `persistence: "memory"` is the cookieless safe default — nothing is ever
 *    written to cookies or localStorage, so public/preview (magic-link) surfaces
 *    stay cookieless while identify() can still attribute events within an
 *    authenticated session.
 *  - `session_recording.maskAllInputs: true` — every form input is masked before
 *    a replay leaves the browser, so family/financial data can never land in a
 *    recording.
 *
 * `cookieless_mode` (PostHog's fully server-side-hashed cookieless mode) is left
 * OFF by default and exposed only via `NEXT_PUBLIC_POSTHOG_COOKIELESS_MODE`,
 * because setting it to "always" disables identify() and session replay — which
 * this portal needs behind the Clerk gate. Turn it on only for a pure-public
 * surface that never identifies users.
 */

import { useEffect } from "react";
import type { ReactNode } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PostHogClientProvider } from "posthog-js/react";
import { PostHogIdentify } from "./PostHogIdentify";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const COOKIELESS_MODE = process.env.NEXT_PUBLIC_POSTHOG_COOKIELESS_MODE as
  | "always"
  | "on_reject"
  | undefined;

// Module-scoped guard so React strict-mode's double-invoked effects (and any
// remount) only ever call posthog.init once.
let didInit = false;

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY || didInit) return;
    didInit = true;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      // Opt into modern posthog-js defaults (history-change pageviews, etc.).
      defaults: "2025-05-24",
      // Cookieless safe default — never persist to cookies/localStorage.
      persistence: "memory",
      ...(COOKIELESS_MODE ? { cookieless_mode: COOKIELESS_MODE } : {}),
      autocapture: true,
      capture_pageview: "history_change",
      capture_pageleave: true,
      session_recording: {
        // Never record the contents of any form input.
        maskAllInputs: true,
      },
    });
  }, []);

  // No key configured → transparent pass-through (no analytics, no provider).
  if (!POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PostHogClientProvider client={posthog}>
      <PostHogIdentify />
      {children}
    </PostHogClientProvider>
  );
}
