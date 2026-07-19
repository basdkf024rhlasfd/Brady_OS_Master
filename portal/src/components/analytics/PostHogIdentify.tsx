"use client";

/**
 * SPEC-008 — mception capture layer (Phase A instrumentation).
 *
 * Binds PostHog identity to Clerk. On sign-in it calls posthog.identify with the
 * Clerk user id as the distinct id plus { email, role } person-properties (role
 * derived from publicMetadata, else "unknown"), so N=1 visits are attributable.
 * On sign-out it calls posthog.reset(). Guarded so identify fires once per user
 * and only when PostHog is initialized (this component only renders under the
 * PostHogProvider tree, which only mounts when NEXT_PUBLIC_POSTHOG_KEY is set).
 */

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { usePostHog } from "posthog-js/react";

export function PostHogIdentify() {
  const posthog = usePostHog();
  const { isLoaded, isSignedIn, user } = useUser();
  // Tracks the Clerk user id we last identified, so we don't re-identify on
  // every render / metadata refresh.
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    // usePostHog() can return an uninitialized stub before init resolves; bail
    // until PostHog is actually capturing and Clerk has loaded.
    if (!posthog || !posthog.__loaded || !isLoaded) return;

    if (isSignedIn && user) {
      if (identifiedUserId.current === user.id) return;

      const email = user.primaryEmailAddress?.emailAddress ?? undefined;
      const role =
        typeof user.publicMetadata?.role === "string"
          ? user.publicMetadata.role
          : "unknown";

      posthog.identify(user.id, { email, role });
      identifiedUserId.current = user.id;
    } else if (!isSignedIn && identifiedUserId.current) {
      // Signed out — clear identity so the next visitor isn't merged in.
      posthog.reset();
      identifiedUserId.current = null;
    }
  }, [posthog, isLoaded, isSignedIn, user]);

  return null;
}
