// STIHL Competitive Intelligence Briefing Types

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
  move: string; // "+1.4%" or "-0.6%"
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

export interface ArtifactRun {
  id: string;
  runDate: string;
  status: "completed" | "running" | "failed";
  link: string;
  isNew?: boolean;
}

export interface ArtifactExample {
  id: string;
  title: string;
  format: string;
  audience: string;
  description: string;
  sections: string[];
  schedule?: {
    enabled: boolean;
    time: string; // e.g., "6:00 AM ET"
    frequency: string; // e.g., "Daily", "Weekly", "Monthly"
  };
  runs: ArtifactRun[];
}

export interface Request {
  id: string;
  category: string;
  urgency: string;
  description: string;
  timestamp: string;
}

export interface RSSFeedItem {
  id: string;
  source: string;
  category: "competitor" | "market" | "digital" | "trade" | "regulatory";
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  isSaved?: boolean;
  isIndexed?: boolean;
}

export interface IntelSummary {
  competitors: {
    headline: string;
    bullets: string[];
  };
  digital: {
    headline: string;
    bullets: string[];
  };
}
