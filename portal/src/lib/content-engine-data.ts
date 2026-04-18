import type { ContentPiece, ContentStatus, Channel, Series } from "./content-engine-types";

export const initialPieces: ContentPiece[] = [
  {
    id: "001",
    title: "Why I'm Building This System Now",
    series: "The COO Who Quit",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "Family-facing language about leaving COO role. 'I'd rather spend time now building adaptability than scramble later.'",
  },
  {
    id: "002",
    title: "Isla on My Childhood — Quick Note from Stairs",
    series: "Dad Journal",
    channels: ["LinkedIn"],
    priority: "High",
    status: "Idea",
    sourceText:
      "Short-form gold. 'Bro you had an awesome life when you were a kid.' Isla said this while sitting on the stairs. Pure kid wisdom about perspective.",
  },
  {
    id: "003",
    title: "OS Structure & Philosophy",
    series: "Building with ADHD",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "'Any system that only works on good days is not a system.' Ready-made series starter about building personal operating systems.",
  },
  {
    id: "004",
    title: "Hierarchical Agent Orchestration Thesis",
    series: "AI for the Rest of Us",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "Original framework: McKinsey vs Gas Town vs Brady approach to AI agent governance. Thread + essay potential.",
  },
  {
    id: "005",
    title: "Narrative as Architecture — Story Is Not Decoration",
    series: "AI for the Rest of Us",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "'You're not debugging, you're editing. You're not configuring, you're casting.' Story as system design, not just communication.",
  },
  {
    id: "006",
    title: "Number2.AI + Salt/Umami Framework",
    series: "The COO Who Quit",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "'I am the umami.' Identity as product. ADHD + #2 seat operator positioning.",
  },
  {
    id: "007",
    title: "Morning Mantra — Handwritten",
    series: "Building with ADHD",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "'I can be good at anything, though not everything.' Permission manifesto. Handwritten morning ritual.",
  },
  {
    id: "008",
    title: "Batman — What Happens When a Hero Quits Too Early?",
    series: "Building with ADHD",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "Reframes burnout as rehab not verdict. Dark Knight as mirror for career transition.",
  },
  {
    id: "009",
    title: "Daddy Passed Away — 12/10/14",
    series: "Dad Journal",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "'The only thing I ever really wanted from him was more.' Universally resonant piece about fatherhood and loss.",
  },
  {
    id: "010",
    title: "Umami Operator Origin Story",
    series: "The COO Who Quit",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "WSJ-caliber origin story. LinkedIn About rewrite. One-liner. 4 polished deliverables from one source.",
  },
  {
    id: "011",
    title: "North Star Articulation — Brady's Real Goal",
    series: "The COO Who Quit",
    channels: ["LinkedIn", "Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "'The end game is thought leadership with a credible story behind it.' Articulating what the whole thing is for.",
  },
  {
    id: "012",
    title: "The Most Non-Controversial Manifesto Ever",
    series: "Building with ADHD",
    channels: ["Substack"],
    priority: "High",
    status: "Idea",
    sourceText:
      "Most complete philosophical doc in system. Extract frameworks only. Very personal — needs heavy editing before publishing.",
  },
];

export function getSeriesColor(series: Series): string {
  switch (series) {
    case "The COO Who Quit":
      return "text-orange-400 bg-orange-400/15";
    case "AI for the Rest of Us":
      return "text-blue-400 bg-blue-400/15";
    case "Building with ADHD":
      return "text-purple-400 bg-purple-400/15";
    case "Dad Journal":
      return "text-pink-400 bg-pink-400/15";
    case "Arm the Rebels":
      return "text-red-400 bg-red-400/15";
    default:
      return "text-gray-400 bg-gray-400/15";
  }
}

export function getStatusColor(status: ContentStatus): string {
  switch (status) {
    case "Idea":
      return "text-gray-400 bg-gray-400/15";
    case "Drafting":
      return "text-cyan-400 bg-cyan-400/15";
    case "Ready":
      return "text-sky-400 bg-sky-400/15";
    case "Published":
      return "text-emerald-400 bg-emerald-400/15";
    default:
      return "text-gray-400 bg-gray-400/15";
  }
}

export function getChannelColor(channel: Channel): string {
  switch (channel) {
    case "LinkedIn":
      return "text-blue-400 bg-blue-400/15";
    case "Substack":
      return "text-orange-400 bg-orange-400/15";
    default:
      return "text-gray-400 bg-gray-400/15";
  }
}
