import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDevBypass =
  process.env.NODE_ENV === "development" &&
  process.env.MCEPTION_DEV_BYPASS === "true";

// Routes NOT listed here are publicly accessible (e.g. /share/* for magic links)
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
  // SECURITY (2026-07-19): sensitive static assets under public/ were served to
  // the anonymous internet because (a) they were absent from this list and
  // (b) the matcher below skipped their file extensions, so the proxy never ran
  // on them. Page routes were auth-gated by the (portal) layout, but the raw
  // asset URLs (e.g. /family/kb/16-school-access-codes.md, /financial-assistant/
  // data.js, /1915-south/viewer/index.html) were not. These prefixes are
  // family- or Brady-only and are NEVER magic-link shared, so a plain Clerk gate
  // does not break any legitimate access (signed-in Brady/family still pass;
  // anonymous is blocked). Client-safe, magic-link-shared slugs (1915-south-execs
  // /-ma/-cfo, pauletteai, etc.) are deliberately NOT added here — gating them via
  // Clerk would break magic-link (non-Clerk) visitors; they need the separate
  // magic-link-aware fix tracked in docs/investigations/family-data-degit-plan.md.
  "/family",
  "/family/(.*)",
  "/family-budget",
  "/family-budget/(.*)",
  "/financial-assistant",
  "/financial-assistant/(.*)",
  "/bucket-system",
  "/bucket-system/(.*)",
  "/healthcare",
  "/healthcare/(.*)",
  "/grocery-assistant",
  "/grocery-assistant/(.*)",
  "/school-hub",
  "/school-hub/(.*)",
  "/1915-south",
  "/1915-south/(.*)",
  "/1915-south-map",
  "/1915-south-map/(.*)",
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
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    // SECURITY (2026-07-19): the first pattern above skips requests whose path
    // ends in an extension (.js, .html, .md is NOT skipped but .js/.html ARE),
    // so the proxy would never run on e.g. /financial-assistant/data.js or
    // /1915-south/viewer/index.html — leaving those static assets ungated.
    // These explicit prefix matchers force the proxy to run on EVERY file under
    // the sensitive prefixes regardless of extension, so isProtectedRoute can
    // gate them. Keep this list in sync with the sensitive-prefix block in
    // isProtectedRoute above.
    "/family/:path*",
    "/family-budget/:path*",
    "/financial-assistant/:path*",
    "/bucket-system/:path*",
    "/healthcare/:path*",
    "/grocery-assistant/:path*",
    "/school-hub/:path*",
    "/1915-south/:path*",
    "/1915-south-map/:path*",
  ],
};
