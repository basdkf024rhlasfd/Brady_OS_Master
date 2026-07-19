import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDevBypass =
  process.env.NODE_ENV === "development" &&
  process.env.MCEPTION_DEV_BYPASS === "true";

// Routes NOT listed here are publicly accessible (e.g. /share/* for magic links).
const isProtectedRoute = createRouteMatcher([
  "/about(.*)",
  "/knowledge(.*)",
  "/orlando(.*)",
  "/portal(.*)",
  "/stihl(.*)",
  "/dashboards(.*)",
  "/calculators(.*)",
  "/notes(.*)",
  "/user-profile(.*)",
  // --- Sensitive static content — SPEC-008 trust lockdown (2026-07-18) ---
  // These paths serve confidential engagement / family / financial files from
  // public/. The matcher below normally exempts static files (.html/.csv/images)
  // from Clerk, so these were fetchable unauthenticated. Protection is scoped to
  // the KB/files subdirectories so client-safe magic-link viewers keep working:
  //   • 1915-south-execs / -ma / -cfo (client-safe views) are NOT matched here
  //   • /panda/viewer and /financial-assistant/<viewer> stay public; only /kb is gated
  //   • orlando/kb is intentionally left public — its viewer client-side-fetches it
  "/1915-south", // Brady-only engagement hub (viewer + files/)
  "/1915-south/(.*)",
  "/1915-south-map", // Brady-only operator map
  "/1915-south-map/(.*)",
  "/family/(.*)", // family KB (school access codes, calendar) — no project viewer here
  "/financial-assistant/kb/(.*)", // itemized balance sheet — leaves the viewer public
  "/panda/kb/(.*)", // engagement KB — leaves /panda/viewer for magic-link tours
  "/healthcare/kb/(.*)", // family benefits KB
]);

export default isDevBypass
  ? () => NextResponse.next()
  : clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        const signInUrl = new URL("/sign-in", req.url);
        await auth.protect({ unauthenticatedUrl: signInUrl.toString() });
      }
    });

export const config = {
  matcher: [
    // Default: run on everything except _next and common static assets.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    // SPEC-008: force middleware to run for sensitive static content that the
    // default matcher would otherwise exempt by extension (.html/.pdf/.csv/images).
    // Pairs with the sensitive prefixes in isProtectedRoute above. Scoped so it
    // does NOT catch sibling prefixes (e.g. /family-budget, /1915-south-execs).
    "/1915-south/:path*",
    "/1915-south-map/:path*",
    "/family/:path*",
    "/financial-assistant/kb/:path*",
    "/panda/kb/:path*",
    "/healthcare/kb/:path*",
  ],
};
