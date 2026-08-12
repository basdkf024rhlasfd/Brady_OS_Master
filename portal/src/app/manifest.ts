import type { MetadataRoute } from "next";

/**
 * PWA manifest — served at /manifest.webmanifest.
 *
 * The `.webmanifest` extension and the `/icons/*.png` assets are both exempted
 * from the Clerk matcher in src/proxy.ts, so an unauthenticated iOS/Android
 * install prompt can read them. `start_url` is the Clerk-protected /portal, so
 * launching the installed app while signed out lands on /sign-in as usual.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "mception.ai",
    short_name: "mception",
    description: "AI-powered tools for the next generation of builders",
    start_url: "/portal",
    scope: "/",
    display: "standalone",
    background_color: "#111827",
    theme_color: "#111827",
    // The mark fits inside the maskable safe zone, so the same rendering serves
    // both purposes — see scripts/generate-pwa-icons.mjs. Next's manifest type
    // takes one purpose per entry, hence the duplicated srcs.
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
