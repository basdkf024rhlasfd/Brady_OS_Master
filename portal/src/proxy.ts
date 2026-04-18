import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    await auth.protect({ unauthenticatedUrl: signInUrl.toString() });
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
