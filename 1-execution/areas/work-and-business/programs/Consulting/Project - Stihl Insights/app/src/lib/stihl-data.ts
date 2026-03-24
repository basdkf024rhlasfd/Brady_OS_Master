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
    "Private briefing environment for Rob Jenson focused on competitor moves, digital commerce, tariffs, launches, and category signals.",
};

export const quickPulse = {
  topSignal:
    "Tariff pressure remains one of the cleanest structural wedges for STIHL while peer brands absorb more imported component cost.",
  actionItem:
    "Turn tariff advantage into a direct commercial narrative: pricing discipline, domestic sourcing proof points, and dealer talking tracks.",
  peerSnapshot:
    "Husqvarna remains operationally pressured, Stanley Black & Decker is still passing through cost, and battery ecosystem momentum continues to favor brands with a clearer platform story.",
};

export const quickStats: SignalCard[] = [
  {
    label: "STIHL tariff advantage",
    value: "$20–40/unit",
    detail:
      "Estimated cost gap vs. import-heavy peers on mid-range products ($299–$599) at current tariff rates.",
  },
  {
    label: "Battery penetration",
    value: "25% of units",
    detail:
      "Up from 24% in 2023. Germany and Switzerland already at ~60%. 50+ new battery products in 2025 pipeline.",
  },
  {
    label: "Mirakl marketplace",
    value: "Live since Mar 4",
    detail:
      "Dealer-fulfilled B2B marketplace on stihlusa.com. Onboarding ongoing through 2026.",
  },
];

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
    note: "Relevant for DeWalt price pressure and promo posture.",
  },
  {
    label: "John Deere",
    ticker: "DE",
    price: "$576.82",
    move: "+0.2%",
    note: "Useful for broad outdoor demand and dealer sentiment context.",
  },
  {
    label: "Lithium carbonate",
    ticker: "Li",
    price: "$105/kWh eq.",
    move: "-2.1% WoW",
    note: "Battery margin tailwind if the decline holds.",
  },
  {
    label: "Aluminum",
    ticker: "LME",
    price: "$3,215/ton",
    move: "+1.2% WoW",
    note: "Input cost watch for battery and handheld tools.",
  },
];

export const newsFeed: NewsItem[] = [
  {
    source: "Trade watch",
    time: "2h ago",
    headline: "Tariff chatter remains focused on China-exposed tooling and outdoor equipment supply chains.",
    implication: "This strengthens STIHL's ability to frame domestic sourcing as both margin protection and channel stability.",
  },
  {
    source: "Battery market",
    time: "5h ago",
    headline: "Battery cost commentary continues to point toward lower pack economics over the next several quarters.",
    implication: "The battery transition story gets easier to tell if STIHL can package performance parity and quieter operation more aggressively.",
  },
  {
    source: "Competitive scan",
    time: "Today",
    headline: "Peers continue using product launches, promo language, and content depth to occupy search and consideration space.",
    implication: "Digital storytelling remains one of the easiest surfaces for STIHL to tighten without changing the dealer model.",
  },
  {
    source: "Retail channel",
    time: "Today",
    headline: "Mass channel brands are still training customers to expect broader online discovery and richer product comparison.",
    implication: "STIHL has to win the direct path with better navigation, stronger browse pages, and more explicit battery education.",
  },
];

export const tariffSignals: SignalCard[] = [
  {
    label: "Structural edge",
    value: "60% domestic sourcing",
    detail: "The Virginia Beach operation gives STIHL a simpler cost story than China-heavy peers.",
  },
  {
    label: "Competitor pressure",
    value: "High for import-heavy brands",
    detail: "Price increases at peers create room for STIHL to defend value without racing to the bottom.",
  },
  {
    label: "TTI estimated exposure",
    value: "$2–3B",
    detail:
      "Est. 70% China-sourced. Shifting to Vietnam/Mexico but transition is 12–24 months out.",
  },
];

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

export const competitors: CompetitorEntry[] = [
  {
    name: "Husqvarna",
    focus: "Outdoor category peer with brand overlap and battery credibility.",
    revenue: "SEK 48.35B revenue, pressured profitability.",
    pressure: "Execution and demand pressure create a window for share capture.",
    watch: "Category page quality, battery narrative, promo stance.",
    stance: "Wounded but still dangerous. Track every sign of recovery.",
  },
  {
    name: "Milwaukee / TTI",
    focus: "Platform-driven battery challenger with jobsite halo.",
    revenue: "US$15.3B group revenue with strong battery-led positioning.",
    pressure: "Tariff and import exposure remain meaningful.",
    watch: "Outdoor expansion, battery ecosystem storytelling, contractor adoption.",
    stance: "The biggest storytelling threat, not the closest channel analog.",
  },
  {
    name: "DeWalt / Stanley Black & Decker",
    focus: "Brand power plus pricing and promo activity.",
    revenue: "US$15.4B revenue, still managing cost and margin recovery.",
    pressure: "Tariffs and price pass-through create vulnerability.",
    watch: "Price increases, outdoor assortment depth, seasonal promotions.",
    stance: "Every price move should be translated into a STIHL sales talking point.",
  },
  {
    name: "John Deere",
    focus: "Broader outdoor and dealer signal benchmark.",
    revenue: "US$51.7B revenue with category adjacency rather than direct overlap.",
    pressure: "Farm and turf demand cycles matter more than handheld OPE.",
    watch: "Dealer health, regional demand, mower crossover behavior.",
    stance: "A useful macro proxy even when direct product overlap is limited.",
  },
];

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

export const digitalSignals: SignalCard[] = [
  {
    label: "Strongest current surface",
    value: "Product detail pages",
    detail: "PDP hygiene appears materially stronger than browse and discovery surfaces.",
  },
  {
    label: "Highest priority fix",
    value: "Category and search pages",
    detail: "The biggest digital risk is a weak crawlable browse layer, not a lack of product detail.",
  },
  {
    label: "Marketplace opportunity",
    value: "Mirakl onboarding story",
    detail: "Use the site to explain how digital commerce strengthens dealers instead of bypassing them.",
  },
];

export const socialSignals: NewsItem[] = [
  {
    source: "YouTube",
    time: "Theme",
    headline: "Battery runtime, torque, and practical job completion claims dominate comparison chatter.",
    implication: "Runtime proof and real-use demonstrations are more persuasive than generic battery messaging.",
  },
  {
    source: "Reddit / forums",
    time: "Theme",
    headline: "Dealer service remains a durable STIHL advantage whenever ownership experience is discussed.",
    implication: "The service moat should show up more explicitly in digital copy and artifact language.",
  },
  {
    source: "Review surfaces",
    time: "Theme",
    headline: "Noise, startup ease, and maintenance simplicity continue to shape battery conversation.",
    implication: "That gives STIHL a better bridge story from gas leadership into battery adoption.",
  },
];

export const geoSignals: NewsItem[] = [
  {
    source: "Mid-Atlantic",
    time: "Seasonal lens",
    headline: "Early spring activity often makes this region a useful leading indicator for handheld demand.",
    implication: "Tie dealer outreach and content refreshes to the first real weather break, not just the calendar.",
  },
  {
    source: "Southeast",
    time: "Weather lens",
    headline: "Storm events and cleanup cycles can create sharp, localized surges in chainsaw and blower demand.",
    implication: "A simple weather overlay can make regional briefs feel materially more actionable.",
  },
  {
    source: "Upper Midwest",
    time: "Demand lens",
    headline: "Delayed warmth pushes spring reset behavior later and compresses buying windows.",
    implication: "Weather-aware planning is a low-effort way to explain sales timing without pretending to predict perfectly.",
  },
];

export const artifactExamples: ArtifactExample[] = [
  {
    title: "Morning Brief",
    format: "One-page daily briefing",
    audience: "Rob and direct reports",
    description:
      "The first screen every morning: top signal, what changed, market pulse, launch watch, and one recommended move.",
    sections: ["Quick pulse", "Market pulse", "Tariff watch", "Launch radar", "What to do today"],
  },
  {
    title: "Kantar-style Category Snapshot",
    format: "Visual one-pager",
    audience: "Executive and commercial stakeholders",
    description:
      "A polished category view with competitor posture, pricing pressure, launch activity, and the bottom-line implication for STIHL.",
    sections: ["Category headline", "Peer scorecards", "Promo watch", "Implications", "Recommended response"],
  },
  {
    title: "Tariff Impact Memo",
    format: "Board-ready memo",
    audience: "US and German leadership",
    description:
      "Explains tariff developments in plain business terms with competitor exposure and STIHL's structural advantage.",
    sections: ["What changed", "Cost exposure", "Peer comparison", "Scenario math", "Action recommendation"],
  },
  {
    title: "Competitive Battlecard",
    format: "Two-page field document",
    audience: "Sales, eCommerce, leadership",
    description:
      "Tight dossier on one competitor with positioning, watchouts, pricing posture, and talk tracks.",
    sections: ["Overview", "What they are saying", "What to watch", "How STIHL should respond"],
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
    sections: ["Regional setup", "Weather signal", "Category implication", "Dealer response"],
  },
];

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
    items: ["USITC DataWeb", "HTS schedules", "USTR actions", "Customs and import datasets"],
  },
  {
    title: "Financial and company signals",
    items: ["Annual reports", "Earnings transcripts", "Investor presentations", "Public market data feeds"],
  },
  {
    title: "Digital and category monitoring",
    items: ["stihlusa.com crawls", "competitor site checks", "search result monitoring", "content diffs"],
  },
  {
    title: "Social and voice of customer",
    items: ["Reddit", "YouTube", "forums", "public review surfaces"],
  },
  {
    title: "Geography and weather",
    items: ["NOAA", "regional weather APIs", "storm activity", "seasonality overlays"],
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
