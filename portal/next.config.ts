import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude the repo's top-level OS directories from the Next.js function trace.
  // They sit next to /portal in the monorepo and are not referenced by the app,
  // but Vercel's file tracer would otherwise pull them into serverless function
  // bundles (blowing the 250 MB limit once docs/images accumulate).
  outputFileTracingExcludes: {
    "*": [
      "../0-agents/**/*",
      "../1-execution/**/*",
      "../2-memory/**/*",
      "../3-reference/**/*",
    ],
  },
};

export default nextConfig;
