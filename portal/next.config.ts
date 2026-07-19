import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Confine Next's file tracer to the portal app. The sibling OS directories
  // (../0-agents, ../1-execution, ../2-memory, ../3-reference) are hundreds of
  // MB of docs/research not referenced by the app. Without this, the tracer
  // (triggered by dynamic process.cwd() fs reads, e.g. group/[id]) pulls them
  // into serverless function bundles — group/[id] hit 429MB, over the 250MB
  // limit, breaking every production deploy. This replaces the earlier
  // outputFileTracingExcludes globs, which Turbopack rejected because they
  // navigate above the project root with "../".
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
