export type AppCategory = "notes" | "tools" | "external";
export type EmbedType = "iframe-static" | "iframe-proxy" | "native" | "external";

export interface AppEntry {
  id: string;
  name: string;
  description: string;
  category: AppCategory;
  route: string;
  icon: string;
  embedType: EmbedType;
  staticPath?: string;
  proxyPort?: number;
}

export const apps: AppEntry[] = [
  // Notes
  {
    id: "quick-notes",
    name: "Quick Notes",
    description: "Lightweight note-taking with clipboard integration",
    category: "notes",
    route: "/notes/quick",
    icon: "N",
    embedType: "iframe-static",
    staticPath: "/apps/notes/hello-world.html",
  },
  {
    id: "advanced-queue",
    name: "Advanced Queue",
    description: "Command queue with Notion execution engine",
    category: "notes",
    route: "/notes/advanced",
    icon: "Q",
    embedType: "iframe-static",
    staticPath: "/apps/notes/v_test.html",
  },

  // Tools & Workflows
  {
    id: "moving-cost",
    name: "Moving Cost",
    description: "Conversational AI moving cost estimator",
    category: "tools",
    route: "/calculators/moving",
    icon: "M",
    embedType: "native",
  },
  {
    id: "birthday-planner",
    name: "Birthday Planner",
    description: "Birthday party planning calculator",
    category: "tools",
    route: "/calculators/birthday",
    icon: "B",
    embedType: "iframe-proxy",
    proxyPort: 3003,
  },
  {
    id: "wedding-seating",
    name: "Wedding Seating",
    description: "Wedding seating chart tool",
    category: "tools",
    route: "/calculators/wedding",
    icon: "W",
    embedType: "iframe-proxy",
    proxyPort: 3004,
  },
  {
    id: "garage-sale",
    name: "Garage Sale Pricer",
    description: "AI-powered garage sale pricing",
    category: "tools",
    route: "/calculators/garage-sale",
    icon: "G",
    embedType: "iframe-proxy",
    proxyPort: 3006,
  },
  {
    id: "fence-bid",
    name: "Fence Bid Checker",
    description: "Fence bid comparison tool",
    category: "tools",
    route: "/calculators/fence-bid",
    icon: "F",
    embedType: "iframe-proxy",
    proxyPort: 3002,
  },

  // Dashboards
  {
    id: "portfolio",
    name: "Portfolio Scorecard",
    description: "Comprehensive portfolio tracking dashboard",
    category: "tools",
    route: "/dashboards/portfolio",
    icon: "P",
    embedType: "iframe-static",
    staticPath: "/apps/dashboards/portfolio-scorecard.html",
  },
  {
    id: "command-console",
    name: "Command Console",
    description: "Command execution interface",
    category: "tools",
    route: "/dashboards/command-console",
    icon: "C",
    embedType: "iframe-static",
    staticPath: "/apps/dashboards/command-console-beta.html",
  },
  {
    id: "vendor-portal",
    name: "Vendor Portal",
    description: "Vendor management dashboard",
    category: "tools",
    route: "/dashboards/vendor-portal",
    icon: "V",
    embedType: "iframe-static",
    staticPath: "/apps/dashboards/vendor-portal.html",
  },

  // Knowledge Bases
  {
    id: "orlando-kb",
    name: "Orlando RE KB",
    description: "Orlando real estate market knowledge base",
    category: "tools",
    route: "/orlando",
    icon: "R",
    embedType: "iframe-static",
    staticPath: "https://basdkf024rhlasfd.github.io/Orlando/",
  },

  // External
  {
    id: "bradyos",
    name: "BradyOS",
    description: "Meta-platform with NextAuth",
    category: "external",
    route: "http://localhost:3000",
    icon: "O",
    embedType: "external",
  },
];

export const categories: { key: AppCategory; label: string }[] = [
  { key: "notes", label: "Notes" },
  { key: "tools", label: "Tools & Workflows" },
  { key: "external", label: "External" },
];

export function getAppsByCategory(category: AppCategory): AppEntry[] {
  return apps.filter((app) => app.category === category);
}
