import type { SignalCard, NewsItem, MarketItem, CompetitorEntry, ArtifactExample, RSSFeedItem, IntelSummary } from './stihl-types';

export const quickPulse = {
  topSignal: "Tariff pressure remains one of the cleanest structural wedges for STIHL while peer brands absorb more imported component cost.",
  actionItem: "Draft a one-page dealer talking track on STIHL's tariff insulation by Friday. Anchor it on the 60% domestic sourcing number and the $20-40 per-unit cost gap.",
  peerSnapshot: "Husqvarna remains operationally pressured, Stanley Black & Decker is still passing through cost, and battery ecosystem momentum continues to favor brands with a clearer platform story.",
};

export const quickStats: SignalCard[] = [
  { label: "STIHL tariff advantage", value: "$20-40/unit", detail: "Estimated cost gap vs. import-heavy peers on mid-range products ($299-$599) at current tariff rates." },
  { label: "Battery penetration", value: "25% of units", detail: "Up from 24% in 2023. Germany/Switzerland at ~60%. 50+ new battery products in 2025 pipeline." },
  { label: "Mirakl marketplace", value: "Live since Mar 4", detail: "Dealer-fulfilled B2B marketplace on stihlusa.com. Onboarding ongoing through 2026." },
];

export const marketPulse: MarketItem[] = [
  { label: "Husqvarna", ticker: "HUSQ-A.ST", price: "SEK 86.10", move: "+1.4%", note: "As of Mar 14, 2026 close" },
  { label: "TTI / Milwaukee", ticker: "TTNDY", price: "$15.42", move: "+0.8%", note: "OTC ADR" },
  { label: "Stanley B&D", ticker: "SWK", price: "$92.18", move: "-0.6%", note: "DeWalt price pressure proxy" },
  { label: "John Deere", ticker: "DE", price: "$576.82", move: "+0.2%", note: "Dealer sentiment proxy" },
  { label: "Lithium carbonate", ticker: "Li", price: "$105/kWh eq.", move: "-2.1% WoW", note: "Battery margin tailwind" },
  { label: "Aluminum", ticker: "LME", price: "$3,215/ton", move: "+1.2% WoW", note: "Input cost watch" },
];

export const newsFeed: NewsItem[] = [
  { source: "Trade watch", time: "2h ago", headline: "SBD CEO confirmed high-single-digit price increases on power tools effective May 1. DeWalt outdoor line included.", implication: "Every SBD price move creates a STIHL value-positioning opportunity at point of sale." },
  { source: "Battery market", time: "5h ago", headline: "CATL announced next-gen sodium-ion cells for power tools at 30% lower cost than current lithium packs.", implication: "Battery cost decline accelerates the transition story. STIHL should get ahead with platform compatibility messaging." },
  { source: "Competitive scan", time: "Today", headline: "Milwaukee launched 'ONE SYSTEM' campaign pushing M18 battery cross-compatibility from jobsite into yard.", implication: "Platform lock-in is Milwaukee's play. STIHL's counter is total cost of ownership and the dealer service moat." },
  { source: "Retail channel", time: "Today", headline: "Lowe's expanding dedicated outdoor power endcaps with battery-first merchandising in 800 stores.", implication: "Mass channel is training customers to expect battery-first. STIHL needs stronger battery education on its own site." },
];

export const competitors: CompetitorEntry[] = [
  { name: "Husqvarna", focus: "Outdoor category peer with brand overlap and battery credibility", revenue: "SEK 48.35B", pressure: "Execution and demand pressure create window for share capture", watch: "Category page quality, battery narrative, promo stance", stance: "Wounded but still dangerous" },
  { name: "Milwaukee / TTI", focus: "Platform-driven battery challenger with jobsite halo", revenue: "US$15.3B group", pressure: "Tariff and import exposure remain meaningful", watch: "Outdoor expansion, battery ecosystem storytelling", stance: "Biggest storytelling threat" },
  { name: "DeWalt / SBD", focus: "Brand power plus pricing and promo activity", revenue: "US$15.4B", pressure: "Tariffs and price pass-through create vulnerability", watch: "Price increases, outdoor depth, seasonal promos", stance: "Every price move = STIHL talking point" },
  { name: "John Deere", focus: "Broader outdoor and dealer signal benchmark", revenue: "US$51.7B", pressure: "Farm/turf cycles matter more than handheld OPE", watch: "Dealer health, regional demand, mower crossover", stance: "Useful macro proxy" },
];

export const launchRadar: NewsItem[] = [
  { source: "Husqvarna", time: "Q1 2026", headline: "Fuel-injected 564 XP chainsaw and cordless 550i XP announced. Price increases effective April 21.", implication: "Pro-grade battery chainsaws are a real category now. Watch dealer reception and pricing." },
  { source: "TTI / Milwaukee", time: "Q1 2026", headline: "M18 battery ecosystem expanding from construction into outdoor via jobsite-to-yard crossover.", implication: "Platform lock-in play. STIHL's counter is TCO and dealer service moat." },
  { source: "DeWalt", time: "Ongoing", headline: "60V MAX outdoor expanding. 8 consecutive quarters organic growth despite -3% overall SBD revenue.", implication: "DeWalt's post-tariff pricing umbrella makes STIHL's value proposition stronger at every price point." },
];

export const tariffSignals: SignalCard[] = [
  { label: "Structural edge", value: "60% domestic sourcing", detail: "Virginia Beach operation gives STIHL a simpler cost story than China-heavy peers." },
  { label: "Competitor pressure", value: "High for import-heavy brands", detail: "Price increases at peers create room for STIHL to defend value." },
  { label: "TTI estimated exposure", value: "$2-3B", detail: "Est. 70% China-sourced. Shifting to Vietnam/Mexico but 12-24 months out." },
];

// Digital page data
export const digitalSignals: SignalCard[] = [
  { label: "Strongest surface", value: "YouTube", detail: "Pro reviews and tutorials drive consideration. Comment sentiment runs 80%+ positive." },
  { label: "Highest priority fix", value: "Category browse UX", detail: "stihlusa.com category pages underperform competitor sites on mobile conversion." },
  { label: "Marketplace opportunity", value: "Mirakl B2B", detail: "Dealer-fulfilled marketplace live since March 4. Onboarding critical through 2026." },
];

export const digitalFixes = [
  { priority: 1, area: "Browse experience", detail: "Mobile category page speed and filter UX lag behind Husqvarna and Home Depot." },
  { priority: 2, area: "Marketplace onboarding", detail: "Mirakl B2B adoption needs dealer activation push in Q2." },
  { priority: 3, area: "Battery story", detail: "Landing pages don't clearly communicate battery platform compatibility and TCO." },
];

export const socialMonitoring = [
  { platform: "YouTube", theme: "Pro reviews", sentiment: "Positive", insight: "Dealer service mentioned as key differentiator vs. big-box brands." },
  { platform: "Reddit", theme: "r/Chainsaw, r/landscaping", sentiment: "Mixed", insight: "Price concerns offset by durability praise. Battery skepticism remains." },
  { platform: "Reviews", theme: "Amazon, HD", sentiment: "Positive", insight: "4.5+ star averages. Common complaint: accessory availability." },
];

export const geoLens = [
  { region: "Southeast", conditions: "Early spring, high growth season", opportunity: "Peak demand window for spring cleanup equipment." },
  { region: "Midwest", conditions: "Late thaw, delayed start", opportunity: "Compressed buying window—focus on ready-to-ship inventory." },
  { region: "West", conditions: "Fire season prep", opportunity: "Chainsaw and clearing equipment messaging resonates." },
];

// Artifacts page data
export const artifacts: ArtifactExample[] = [
  {
    id: "morning-brief",
    title: "Morning Brief",
    format: "1-page PDF",
    audience: "Executive team",
    description: "Daily competitive signal summary with action items",
    sections: ["Top signal", "Market moves", "Competitor activity", "Recommended actions"],
    schedule: { enabled: true, time: "6:00 AM ET", frequency: "Daily" },
    runs: [
      { id: "mb-001", runDate: "Mar 29, 2026 6:00 AM", status: "completed", link: "#", isNew: true },
      { id: "mb-002", runDate: "Mar 28, 2026 6:00 AM", status: "completed", link: "#", isNew: false },
      { id: "mb-003", runDate: "Mar 27, 2026 6:00 AM", status: "completed", link: "#", isNew: false },
      { id: "mb-004", runDate: "Mar 26, 2026 6:00 AM", status: "completed", link: "#", isNew: false },
      { id: "mb-005", runDate: "Mar 25, 2026 6:00 AM", status: "completed", link: "#", isNew: false },
    ],
  },
  {
    id: "kantar-snapshot",
    title: "Kantar Snapshot",
    format: "Slide deck",
    audience: "Marketing leadership",
    description: "Monthly brand health and share-of-voice analysis",
    sections: ["Brand metrics", "SOV trends", "Competitor positioning", "Media efficiency"],
    schedule: { enabled: true, time: "8:00 AM ET", frequency: "Monthly (1st)" },
    runs: [
      { id: "ks-001", runDate: "Mar 1, 2026 8:00 AM", status: "completed", link: "#", isNew: true },
      { id: "ks-002", runDate: "Feb 1, 2026 8:00 AM", status: "completed", link: "#", isNew: false },
      { id: "ks-003", runDate: "Jan 1, 2026 8:00 AM", status: "completed", link: "#", isNew: false },
    ],
  },
  {
    id: "tariff-memo",
    title: "Tariff Memo",
    format: "1-page memo",
    audience: "Sales leadership",
    description: "Dealer talking track on STIHL tariff advantage",
    sections: ["Cost structure", "Competitor exposure", "Value messaging", "Objection handling"],
    schedule: { enabled: false, time: "9:00 AM ET", frequency: "Weekly" },
    runs: [
      { id: "tm-001", runDate: "Mar 15, 2026 9:00 AM", status: "completed", link: "#", isNew: false },
      { id: "tm-002", runDate: "Feb 28, 2026 9:00 AM", status: "completed", link: "#", isNew: false },
    ],
  },
  {
    id: "competitive-battlecard",
    title: "Competitive Battlecard",
    format: "2-page reference",
    audience: "Sales team",
    description: "Head-to-head positioning against key competitors",
    sections: ["Strengths/weaknesses", "Pricing comparison", "Feature matrix", "Win themes"],
    schedule: { enabled: true, time: "7:00 AM ET", frequency: "Weekly (Mon)" },
    runs: [
      { id: "cb-001", runDate: "Mar 25, 2026 7:00 AM", status: "completed", link: "#", isNew: true },
      { id: "cb-002", runDate: "Mar 18, 2026 7:00 AM", status: "completed", link: "#", isNew: false },
      { id: "cb-003", runDate: "Mar 11, 2026 7:00 AM", status: "completed", link: "#", isNew: false },
      { id: "cb-004", runDate: "Mar 4, 2026 7:00 AM", status: "completed", link: "#", isNew: false },
    ],
  },
  {
    id: "digital-audit",
    title: "Digital Audit",
    format: "Report",
    audience: "Digital team",
    description: "Quarterly competitive digital presence assessment",
    sections: ["Site performance", "SEO position", "Social presence", "Content gaps"],
    schedule: { enabled: true, time: "10:00 AM ET", frequency: "Quarterly" },
    runs: [
      { id: "da-001", runDate: "Mar 1, 2026 10:00 AM", status: "completed", link: "#", isNew: false },
      { id: "da-002", runDate: "Dec 1, 2025 10:00 AM", status: "completed", link: "#", isNew: false },
    ],
  },
  {
    id: "geo-weather-note",
    title: "Geo-Weather Note",
    format: "Weekly brief",
    audience: "Regional managers",
    description: "Regional demand signals based on weather patterns",
    sections: ["Weather outlook", "Demand forecast", "Inventory recommendations", "Promo timing"],
    schedule: { enabled: true, time: "5:00 AM ET", frequency: "Weekly (Mon)" },
    runs: [
      { id: "gw-001", runDate: "Mar 25, 2026 5:00 AM", status: "completed", link: "#", isNew: true },
      { id: "gw-002", runDate: "Mar 18, 2026 5:00 AM", status: "completed", link: "#", isNew: false },
      { id: "gw-003", runDate: "Mar 11, 2026 5:00 AM", status: "completed", link: "#", isNew: false },
    ],
  },
];

// Request categories
export const requestCategories = [
  "Competitive intel",
  "Market analysis",
  "Digital audit",
  "Battlecard",
  "Custom report",
  "Ad hoc research",
];

export const examplePrompts = [
  "What is Milwaukee's current outdoor strategy?",
  "Compare battery ecosystems across top 3 competitors",
  "Draft dealer talking points on tariff advantage",
  "Analyze Husqvarna's Q1 earnings implications",
  "Map Lowe's outdoor power merchandising changes",
];

// About page data
export const sourceGroups = [
  {
    name: "Financial & Market",
    sources: ["SEC filings", "Earnings transcripts", "Bloomberg", "S&P Capital IQ", "Company investor relations"],
  },
  {
    name: "Trade & Industry",
    sources: ["Trade publications", "Industry associations", "Conference proceedings", "Patent filings"],
  },
  {
    name: "Digital & Social",
    sources: ["Social listening platforms", "Review aggregators", "SEO tools", "Web analytics"],
  },
  {
    name: "Retail & Channel",
    sources: ["Retailer earnings", "Store checks", "Channel partner feedback", "Distributor reports"],
  },
  {
    name: "Primary Research",
    sources: ["Dealer interviews", "Customer surveys", "Expert networks", "Field observations"],
  },
];

// Earnings calendar
export const earningsCalendar = [
  { company: "Husqvarna", date: "Apr 25, 2026", watch: "Margin pressure, battery mix, North America performance" },
  { company: "Stanley Black & Decker", date: "May 1, 2026", watch: "Price realization, outdoor segment, tariff impact" },
  { company: "TTI Industries", date: "Mar 26, 2026", watch: "Milwaukee outdoor expansion, margin trajectory" },
  { company: "Deere & Company", date: "May 22, 2026", watch: "Dealer sentiment, turf segment health" },
];

// RSS Feed data - content that can be saved/indexed for LLM use
export const rssFeed: RSSFeedItem[] = [
  {
    id: "rss-001",
    source: "Bloomberg",
    category: "market",
    title: "Stanley Black & Decker Announces Q2 Price Increases Across Power Tool Lines",
    summary: "SBD CEO confirms high-single-digit price increases effective May 1, citing tariff pass-through. DeWalt outdoor and professional lines included in scope.",
    url: "https://bloomberg.com/news/sbd-price-increases",
    publishedAt: "2h ago",
    isSaved: false,
    isIndexed: false,
  },
  {
    id: "rss-002",
    source: "Reuters",
    category: "trade",
    title: "US-China Tariff Rates Hold Steady as Trade Talks Stall",
    summary: "25% tariffs on power tools and components remain in place. No near-term resolution expected. Import-heavy manufacturers face continued margin pressure.",
    url: "https://reuters.com/trade-tariffs-update",
    publishedAt: "4h ago",
    isSaved: true,
    isIndexed: true,
  },
  {
    id: "rss-003",
    source: "Industry Week",
    category: "competitor",
    title: "Husqvarna Restructures North American Operations",
    summary: "Swedish OPE giant announces 200 headcount reduction in NA division. Focus shifting to battery-first product development and dealer consolidation.",
    url: "https://industryweek.com/husqvarna-restructuring",
    publishedAt: "6h ago",
    isSaved: false,
    isIndexed: false,
  },
  {
    id: "rss-004",
    source: "TechCrunch",
    category: "digital",
    title: "Milwaukee Tool Launches AI-Powered Product Configurator",
    summary: "ONE-KEY platform expansion includes new AI recommendation engine for contractor equipment selection. Mobile-first approach targets jobsite integration.",
    url: "https://techcrunch.com/milwaukee-ai-configurator",
    publishedAt: "8h ago",
    isSaved: false,
    isIndexed: false,
  },
  {
    id: "rss-005",
    source: "CATL Press",
    category: "market",
    title: "CATL Announces Sodium-Ion Battery Production for Power Tools",
    summary: "30% cost reduction vs lithium-ion. First partnerships expected with major OEMs in Q3 2026. Could accelerate battery adoption in price-sensitive segments.",
    url: "https://catl.com/press/sodium-ion",
    publishedAt: "12h ago",
    isSaved: true,
    isIndexed: false,
  },
  {
    id: "rss-006",
    source: "Retail Dive",
    category: "digital",
    title: "Lowe's Expands Battery-First Outdoor Power Merchandising",
    summary: "800 stores receiving dedicated endcaps for battery outdoor equipment. Spring 2026 reset emphasizes ecosystem compatibility and zero-emissions messaging.",
    url: "https://retaildive.com/lowes-battery-merchandising",
    publishedAt: "1d ago",
    isSaved: false,
    isIndexed: false,
  },
  {
    id: "rss-007",
    source: "SEC Filing",
    category: "regulatory",
    title: "TTI Industries 10-K: Supply Chain Risk Disclosure Updated",
    summary: "TTI acknowledges 70% China sourcing concentration. Vietnam/Mexico transition timeline pushed to 18-24 months. Tariff exposure estimated at $2-3B annually.",
    url: "https://sec.gov/tti-10k-2025",
    publishedAt: "1d ago",
    isSaved: true,
    isIndexed: true,
  },
  {
    id: "rss-008",
    source: "YouTube Analytics",
    category: "digital",
    title: "STIHL MS 500i Review Videos Trend in Pro Chainsaw Category",
    summary: "Independent creator reviews driving 40% of branded search traffic. Comment sentiment 85% positive. Dealer service mentioned as key differentiator.",
    url: "https://youtube.com/analytics/stihl-ms500i",
    publishedAt: "2d ago",
    isSaved: false,
    isIndexed: false,
  },
];

// Intel summary for Today page - combines Competitors + Digital
export const intelSummary: IntelSummary = {
  competitors: {
    headline: "Husqvarna pressured, Milwaukee expanding, DeWalt raising prices",
    bullets: [
      "Husqvarna NA restructuring creates share capture window",
      "Milwaukee ONE SYSTEM campaign pushing outdoor via jobsite halo",
      "DeWalt May price increases strengthen STIHL value position",
      "TTI tariff exposure ($2-3B) remains structural headwind",
    ],
  },
  digital: {
    headline: "YouTube strong, mobile UX needs work, Mirakl onboarding critical",
    bullets: [
      "Pro YouTube reviews driving 40% of branded search traffic",
      "Category page mobile conversion lags Husqvarna and HD benchmarks",
      "Mirakl B2B marketplace needs dealer activation push in Q2",
      "Battery landing pages missing TCO and compatibility messaging",
    ],
  },
};
