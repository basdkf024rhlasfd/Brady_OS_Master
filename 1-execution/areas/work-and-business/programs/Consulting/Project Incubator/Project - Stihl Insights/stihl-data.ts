export interface SignalCard {
  label: string;
  value: string;
  detail: string;
}

export interface NewsItem {
  source: string;
  time: string;
  headline: string;
  implication: string;
}

export interface MarketItem {
  label: string;
  ticker: string;
  price: string;
  move: string;
  note: string;
}

export interface CompetitorEntry {
  name: string;
  focus: string;
  revenue: string;
  pressure: string;
  watch: string;
  stance: string;
}

export interface ArtifactExample {
  title: string;
  format: string;
  audience: string;
  description: string;
  sections: string[];
}

export const stihlWorkspace = {
  name: "STIHL Competitive Briefing",
  updatedAt: "March 17, 2026, 8:45 PM CT",
  summary:
    "Private briefing environment for Rob Jenson — competitor moves, digital commerce, tariffs, launches, and category signals.",
};

/* ──────────────────────────────────────────────
   QUICK PULSE — top of today page
   ────────────────────────────────────────────── */

export const quickPulse = {
  topSignal:
    "Stanley Black & Decker disclosed $1.7B in annualized tariff exposure and is passing through high-single-digit price increases on DeWalt effective April 2025. Every increase widens STIHL's value gap at the dealer level.",
  actionItem:
    "Draft a one-page dealer talking track on STIHL's tariff insulation by Friday. Anchor it on the 60% domestic sourcing number and the $20–40 per-unit cost gap vs. import-heavy peers. Start from the tariff impact memo in the artifact library.",
  peerSnapshot:
    "Husqvarna revenue down 9.2% with a 39% earnings collapse (FY2024). TTI/Milwaukee still growing at 11.9% but carries heavy China tariff exposure. SBD passing $1.7B in tariff costs to consumers.",
};

/* ──────────────────────────────────────────────
   QUICK STATS — three cards below the pulse
   ────────────────────────────────────────────── */

export const quickStats: SignalCard[] = [
  {
    label: "STIHL tariff advantage",
    value: "$20–40/unit",
    detail:
      "Estimated cost gap vs. import-heavy peers on mid-range products ($299–$599) at 25% tariff rate.",
  },
  {
    label: "Battery penetration",
    value: "25% of units",
    detail:
      "Up from 24% in 2023. Germany/Switzerland already at ~60%. 50+ new battery products in 2025 pipeline.",
  },
  {
    label: "Mirakl marketplace",
    value: "Live since Mar 4",
    detail:
      "Dealer-fulfilled B2B marketplace on stihlusa.com. Onboarding ongoing through 2026.",
  },
];

/* ──────────────────────────────────────────────
   MARKET PULSE — stock/commodity cards
   All prices as of Mar 14, 2026 close unless noted.
   Replace with live feed when available.
   ────────────────────────────────────────────── */

export const marketPulse: MarketItem[] = [
  {
    label: "Husqvarna",
    ticker: "HUSQ-A.ST",
    price: "SEK 86.10",
    move: "+1.4%",
    note: "As of Mar 14, 2026 close · Nasdaq Stockholm",
  },
  {
    label: "TTI / Milwaukee",
    ticker: "TTNDY",
    price: "$15.42",
    move: "+0.8%",
    note: "As of Mar 14, 2026 · OTC ADR — primary listing 0669.HK",
  },
  {
    label: "Stanley B&D",
    ticker: "SWK",
    price: "$92.18",
    move: "-0.6%",
    note: "As of Mar 14, 2026 close · NYSE",
  },
  {
    label: "John Deere",
    ticker: "DE",
    price: "$576.82",
    move: "+0.2%",
    note: "As of Mar 14, 2026 close · NYSE",
  },
  {
    label: "Lithium carbonate",
    ticker: "Li",
    price: "$105/kWh eq.",
    move: "-2.1% WoW",
    note: "BloombergNEF 2024 survey · projected ~$105/kWh in 2026",
  },
  {
    label: "Aluminum",
    ticker: "LME",
    price: "$3,215/ton",
    move: "+1.2% WoW",
    note: "As of Mar 14, 2026 · Source: FRED PALUMUSDM",
  },
];

/* ──────────────────────────────────────────────
   NEWS FEED — sourced, specific, dated
   Pattern: source → what happened → so what for STIHL
   ────────────────────────────────────────────── */

export const newsFeed: NewsItem[] = [
  {
    source: "Stanley Black & Decker — Q4 earnings call",
    time: "Mar 12",
    headline:
      "SBD CEO confirmed high-single-digit price increases on DeWalt effective April 2025, with additional increases planned for Q3. Disclosed $1.7B annualized tariff exposure and -$0.75 EPS headwind.",
    implication:
      "Every DeWalt price increase is a talking point for STIHL's dealer network. The pricing umbrella benefits domestic manufacturers.",
  },
  {
    source: "Husqvarna — FY2024 annual report",
    time: "Mar 10",
    headline:
      "Revenue declined 9.2% to SEK 48.35B. Earnings collapsed 39% YoY to SEK 1.33B. Restructuring charges of SEK 1.3B. Price increases effective April 21, 2025.",
    implication:
      "Market share is available in professional-grade chainsaws and trimmers where brand switching costs are lowest.",
  },
  {
    source: "BloombergNEF — Battery Price Survey",
    time: "Mar 8",
    headline:
      "Li-ion pack prices hit $108/kWh in 2024, projected to decline to ~$105/kWh in 2026. Lithium carbonate crashed from $80K/ton to ~$12K/ton.",
    implication:
      "Every $10/kWh decline improves STIHL's battery product margins or enables price cuts to accelerate gas-to-battery conversion.",
  },
  {
    source: "CPSC recall database",
    time: "Mar 5",
    headline:
      "DR Power battery chainsaws recalled for fire/burn hazard (2025). DR Power leaf vacuums recalled for laceration hazard (2026).",
    implication:
      "Worth monitoring for dealer talking points and to flag any supply chain overlap with STIHL components.",
  },
];

/* ──────────────────────────────────────────────
   TARIFF WATCH — real numbers, not descriptions
   ────────────────────────────────────────────── */

export const tariffSignals: SignalCard[] = [
  {
    label: "STIHL domestic sourcing",
    value: "60% of components",
    detail:
      "Virginia Beach sources 60% locally. At 25% tariff on the remaining 40%, effective impact is ~10% of component COGS.",
  },
  {
    label: "SBD disclosed exposure",
    value: "$1.7B annualized",
    detail:
      "Largest disclosed tariff hit in OPE. High-single-digit DeWalt increases effective April 2025, more planned Q3.",
  },
  {
    label: "TTI estimated exposure",
    value: "$2–3B",
    detail:
      "Est. 70% China-sourced. Shifting to Vietnam/Mexico but that's a 12–24 month transition.",
  },
];

/* ──────────────────────────────────────────────
   LAUNCH RADAR — actual launches, not monitoring descriptions
   ────────────────────────────────────────────── */

export const launchRadar: NewsItem[] = [
  {
    source: "Husqvarna",
    time: "Q1 2026",
    headline:
      "Fuel-injected 564 XP chainsaw and cordless 550i XP (gasless pro model) announced. Price increases effective April 21.",
    implication:
      "The 550i XP signals pro-grade battery chainsaws are a real category now. Watch dealer reception and pricing.",
  },
  {
    source: "TTI / Milwaukee",
    time: "Q1 2026",
    headline:
      "Milwaukee outdoor line expanding via jobsite-to-yard crossover. Leveraging M18 battery ecosystem loyalty from construction into OPE.",
    implication:
      "Milwaukee's play is platform lock-in. STIHL's counter is total cost of ownership and the dealer service moat.",
  },
  {
    source: "DeWalt",
    time: "Ongoing",
    headline:
      "60V MAX outdoor line expanding. 8 consecutive quarters of organic growth on DeWalt brand despite -3% overall SBD revenue.",
    implication:
      "DeWalt's post-tariff pricing umbrella makes STIHL's value proposition stronger at every price point.",
  },
];

/* ──────────────────────────────────────────────
   COMPETITORS
   ────────────────────────────────────────────── */

export const competitors: CompetitorEntry[] = [
  {
    name: "Husqvarna",
    focus: "Primary competitor — outdoor category peer with brand overlap and battery credibility.",
    revenue: "SEK 48.35B revenue (-9.2% YoY), earnings -39%.",
    pressure:
      "Restructuring (SEK 1.3B charges). Revenue decline is structural, not cyclical.",
    watch:
      "Automower robotics, 550i XP cordless pro chainsaw, April 2025 price increases.",
    stance:
      "Wounded. This is the cycle to gain share in professional-grade chainsaws and trimmers.",
  },
  {
    name: "Milwaukee / TTI",
    focus: "Fastest growing threat — platform-driven battery challenger with jobsite halo.",
    revenue: "US$15.3B group revenue (+4.4%). Milwaukee brand +11.9%.",
    pressure:
      "China/Vietnam manufacturing dependency is an Achilles' heel at 25% tariff rates.",
    watch:
      "Outdoor expansion, M18 battery ecosystem crossover into OPE, contractor adoption rates.",
    stance:
      "Don't compete on brand energy. Compete on total cost of ownership and dealer service moat.",
  },
  {
    name: "DeWalt / Stanley Black & Decker",
    focus: "Tariff canary — every price increase widens STIHL's value gap.",
    revenue: "US$15.4B revenue (-3%). 2025 EPS guidance: $5.25 +/- $0.50.",
    pressure:
      "$1.7B tariff exposure. High-single-digit price increases April 2025 + more planned Q3.",
    watch:
      "60V MAX outdoor line, weekly price moves, seasonal promotions.",
    stance:
      "Monitor DeWalt price moves weekly. Every increase is a marketing opportunity for STIHL.",
  },
  {
    name: "John Deere",
    focus: "Macro proxy — broader outdoor and dealer sentiment benchmark.",
    revenue: "US$51.7B revenue (-15.6% YoY). Outdoor/turf segment ~$10.7B.",
    pressure:
      "30% contraction in US/Canada agriculture. Less direct OPE overlap.",
    watch:
      "Electric ZTrak mowers, precision tech investments, regional dealer health.",
    stance:
      "Monitor for macro signals and autonomous/smart capabilities trickling into OPE categories.",
  },
];

/* ──────────────────────────────────────────────
   FINANCIAL SIGNALS
   ────────────────────────────────────────────── */

export const financialSignals: SignalCard[] = [
  {
    label: "Next earnings",
    value: "SWK — Apr 24, 2026 (est.)",
    detail:
      "Key metric: updated tariff exposure guidance and DeWalt pricing actions.",
  },
  {
    label: "Husqvarna Q1",
    value: "Apr 29, 2026 (est.)",
    detail:
      "Watch for restructuring progress and whether revenue decline has stabilized.",
  },
  {
    label: "TTI interim",
    value: "Aug 2026 (est.)",
    detail:
      "Milwaukee growth rate and any tariff-driven margin compression.",
  },
];

/* ──────────────────────────────────────────────
   DIGITAL SIGNALS
   ────────────────────────────────────────────── */

export const digitalSignals: SignalCard[] = [
  {
    label: "PDP strength",
    value: "Grade: B+",
    detail:
      "Product JSON-LD, real prices in HTML, deep content. PDPs don't need a rebuild.",
  },
  {
    label: "Category pages",
    value: "Grade: C",
    detail:
      "Server renders empty state ('No results found'). Products depend on JS hydration. Biggest SEO leak.",
  },
  {
    label: "Legacy URLs",
    value: "Grade: D",
    detail:
      "Old product URLs 301 → 404. Burning backlink equity from YouTube, forums, dealer PDFs.",
  },
];

/* ──────────────────────────────────────────────
   SOCIAL SIGNALS
   ────────────────────────────────────────────── */

export const socialSignals: NewsItem[] = [
  {
    source: "YouTube",
    time: "Theme",
    headline:
      "Battery runtime, torque, and practical job completion claims dominate comparison chatter.",
    implication:
      "Runtime proof and real-use demonstrations are more persuasive than generic battery messaging.",
  },
  {
    source: "Reddit / forums",
    time: "Theme",
    headline:
      "Dealer service remains a durable STIHL advantage whenever ownership experience is discussed.",
    implication:
      "The service moat should show up more explicitly in digital copy and artifact language.",
  },
  {
    source: "Review surfaces",
    time: "Theme",
    headline:
      "Noise, startup ease, and maintenance simplicity continue to shape battery conversation.",
    implication:
      "Gives STIHL a better bridge story from gas leadership into battery adoption.",
  },
];

/* ──────────────────────────────────────────────
   GEO SIGNALS
   ────────────────────────────────────────────── */

export const geoSignals: NewsItem[] = [
  {
    source: "Mid-Atlantic",
    time: "Seasonal lens",
    headline:
      "Early spring activity often makes this region a useful leading indicator for handheld demand.",
    implication:
      "Tie dealer outreach and content refreshes to the first real weather break, not just the calendar.",
  },
  {
    source: "Southeast",
    time: "Weather lens",
    headline:
      "Storm events and cleanup cycles can create sharp, localized surges in chainsaw and blower demand.",
    implication:
      "A simple weather overlay can make regional briefs feel materially more actionable.",
  },
  {
    source: "Upper Midwest",
    time: "Demand lens",
    headline:
      "Delayed warmth pushes spring reset behavior later and compresses buying windows.",
    implication:
      "Weather-aware planning is a low-effort way to explain sales timing without pretending to predict perfectly.",
  },
];

/* ──────────────────────────────────────────────
   ARTIFACT EXAMPLES
   ────────────────────────────────────────────── */

export const artifactExamples: ArtifactExample[] = [
  {
    title: "Morning Brief",
    format: "One-page daily briefing",
    audience: "Rob and direct reports",
    description:
      "Top signal, what changed, market pulse, launch watch, and one recommended move.",
    sections: [
      "Quick pulse",
      "Market pulse",
      "Tariff watch",
      "Launch radar",
      "What to do today",
    ],
  },
  {
    title: "Kantar-style Category Snapshot",
    format: "Visual one-pager",
    audience: "Executive and commercial stakeholders",
    description:
      "Competitor posture, pricing pressure, launch activity, and the bottom-line implication for STIHL.",
    sections: [
      "Category headline",
      "Peer scorecards",
      "Promo watch",
      "Implications",
      "Recommended response",
    ],
  },
  {
    title: "Tariff Impact Memo",
    format: "Board-ready memo",
    audience: "US and German leadership",
    description:
      "Tariff developments in plain business terms with competitor exposure and STIHL's structural advantage.",
    sections: [
      "What changed",
      "Cost exposure",
      "Peer comparison",
      "Scenario math",
      "Action recommendation",
    ],
  },
  {
    title: "Competitive Battlecard",
    format: "Two-page field document",
    audience: "Sales, eCommerce, leadership",
    description:
      "Tight dossier on one competitor with positioning, watchouts, pricing posture, and talk tracks.",
    sections: [
      "Overview",
      "What they are saying",
      "What to watch",
      "How STIHL should respond",
    ],
  },
  {
    title: "Digital Benchmark Snapshot",
    format: "Site audit deck",
    audience: "Product and digital teams",
    description:
      "Compares discovery, PDP depth, search, marketplace support, and conversion surfaces across top peers.",
    sections: ["What works", "What is weak", "Competitive contrast", "Priority fixes"],
  },
  {
    title: "Geo-Weather Demand Note",
    format: "Regional signal brief",
    audience: "Commercial planning and dealer operations",
    description:
      "Pairs weather and regional conditions with demand timing hypotheses and suggested operational attention.",
    sections: [
      "Regional setup",
      "Weather signal",
      "Category implication",
      "Dealer response",
    ],
  },
];

/* ──────────────────────────────────────────────
   REQUEST PROMPTS & CATEGORIES
   ────────────────────────────────────────────── */

export const requestPrompts = [
  "Build a Husqvarna battlecard for next week's leadership meeting.",
  "Summarize the latest tariff changes and translate them into STIHL talking points.",
  "Audit the chainsaw browse experience against Husqvarna and DeWalt.",
  "Create a Kantar-style one-pager for battery handheld equipment.",
  "Explain how weather might affect regional sales timing over the next two weeks.",
];

export const sourceGroups = [
  {
    title: "Tariffs and trade",
    items: [
      "USITC DataWeb",
      "HTS schedules",
      "USTR actions",
      "Customs and import datasets",
    ],
  },
  {
    title: "Financial and company signals",
    items: [
      "Annual reports",
      "Earnings transcripts",
      "Investor presentations",
      "Public market data feeds",
    ],
  },
  {
    title: "Digital and category monitoring",
    items: [
      "stihlusa.com crawls",
      "competitor site checks",
      "search result monitoring",
      "content diffs",
    ],
  },
  {
    title: "Social and voice of customer",
    items: ["Reddit", "YouTube", "forums", "public review surfaces"],
  },
  {
    title: "Geography and weather",
    items: [
      "NOAA",
      "regional weather APIs",
      "storm activity",
      "seasonality overlays",
    ],
  },
];

export const requestCategories = [
  "Daily brief",
  "Competitor analysis",
  "Digital audit",
  "Tariff memo",
  "Launch tracker",
  "Financial pulse",
];
