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
  // --- Sensitive static content — SPEC-008 trust lockdown (2026-07-18, #299) ---
  // These paths serve confidential engagement / family / financial files from
  // public/. The matcher below normally exempts static files (.html/.csv/images)
  // from Clerk, so these were fetchable unauthenticated. Client-safe magic-link
  // viewers (1915-south-execs / -ma / -cfo, /panda/viewer, /orlando) are
  // deliberately NOT matched here so their tours keep working.
  "/1915-south", // Brady-only engagement hub (viewer + files/)
  "/1915-south/(.*)",
  "/1915-south-map", // Brady-only operator map
  "/1915-south-map/(.*)",
  "/family/(.*)", // family KB (school access codes, calendar)
  "/panda/kb/(.*)", // engagement KB — leaves /panda/viewer for magic-link tours
  "/healthcare/kb/(.*)", // family benefits KB
  // --- SPEC-008 follow-up (2026-07-19, #300): close remaining financial holes ---
  // #299 gated only /financial-assistant/kb and left the VIEWER public, but the
  // viewer loads /financial-assistant/data.js which carries net worth + account
  // numbers (verified live-exposed 2026-07-19: data.js, bucket-system, and
  // family-budget all returned HTTP 200 to anonymous requests after #299 shipped).
  // Gate the whole prefixes. None are magic-link shared (magic_link: false in
  // projects.yml), so a full Clerk gate breaks no legitimate access — signed-in
  // Brady/family still pass.
  "/financial-assistant", // net worth / account numbers in data.js + viewer
  "/financial-assistant/(.*)",
  "/family-budget",
  "/family-budget/(.*)",
  "/bucket-system",
  "/bucket-system/(.*)",
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
    // SPEC-008 (#299): force middleware to run for sensitive static content the
    // default matcher would otherwise exempt by extension (.html/.pdf/.csv/images).
    // Pairs with the sensitive prefixes in isProtectedRoute above. Scoped so it
    // does NOT catch client-safe siblings (1915-south-execs, etc.).
    "/1915-south/:path*",
    "/1915-south-map/:path*",
    "/family/:path*",
    "/panda/kb/:path*",
    "/healthcare/kb/:path*",
    // SPEC-008 follow-up (2026-07-19, #300): the .js/.html viewer holes #299 left.
    "/financial-assistant/:path*",
    "/family-budget/:path*",
    "/bucket-system/:path*",
  ],
};
