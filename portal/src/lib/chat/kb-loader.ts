import { readFileSync } from "fs";
import { join } from "path";

// ─── KB Routing (ported from public/orlando/viewer/chat.js) ───

interface RouteRule {
  keywords: string[];
  ids: string[];
}

const ROUTE_RULES: RouteRule[] = [
  { keywords: ['neighborhood', 'where to live', 'area', 'location', 'zip code', 'best place', 'family friendly', 'commute'], ids: ['neighborhoods'] },
  { keywords: ['cost', 'afford', 'tax', 'insurance', 'hoa', 'cdd', 'closing cost', 'how much', 'monthly', 'property tax'], ids: ['taxes'] },
  { keywords: ['buy', 'buying', 'process', 'step', 'first time', 'offer', 'closing', 'inspection', 'appraisal'], ids: ['buying'] },
  { keywords: ['brazil', 'brazilian', 'foreign', 'international', 'firpta', 'itin', 'visa', 'immigrant'], ids: ['brazilian'] },
  { keywords: ['invest', 'rental', 'cap rate', 'cash flow', 'str', 'airbnb', 'roi', 'pro forma'], ids: ['investment', 'casestudies'] },
  { keywords: ['brazilian business', 'brazilian restaurant', 'brazilian community', 'portuguese'], ids: ['directory'] },
  { keywords: ['utility', 'onboard', 'concierge', 'settle', 'moving', 'relocat', 'first 90', 'healthcare', 'doctor'], ids: ['concierge'] },
  { keywords: ['school', 'district', 'education', 'kid', 'children'], ids: ['schools'] },
  { keywords: ['hurricane', 'flood', 'sinkhole', 'risk', 'insurance crisis'], ids: ['risks'] },
  { keywords: ['finance', 'loan', 'fha', 'va', 'usda', 'down payment', 'mortgage', 'interest rate'], ids: ['financing'] },
  { keywords: ['new construction', 'builder', 'new build', 'new home', '55+', 'retirement'], ids: ['construction'] },
  { keywords: ['luxury', 'million', 'high end', 'isleworth', 'golden oak', 'windermere'], ids: ['luxury'] },
  { keywords: ['market', 'trend', 'price', 'median', 'inventory', 'appreciation'], ids: ['market'] },
  { keywords: ['agent', 'commission', 'mls', 'listing', 'transaction'], ids: ['agent'] },
  { keywords: ['economy', 'job', 'employer', 'salary', 'cost of living', 'population'], ids: ['economy'] },
  { keywords: ['commute', 'sunrail', 'brightline', 'traffic', 'highway', 'i-4', 'turnpike'], ids: ['infrastructure'] },
];

// ─── File manifest (ported from public/orlando/viewer/index.html) ───

interface KBEntry {
  file: string;
  label: string;
}

const KB_FILE_MAP: Record<string, KBEntry> = {
  market:         { file: '01-market-overview.md',            label: 'Market Overview' },
  neighborhoods:  { file: '02-neighborhoods.md',              label: 'Neighborhoods' },
  taxes:          { file: '03-taxes-insurance-costs.md',      label: 'Taxes & Insurance' },
  laws:           { file: '04-florida-laws-regulations.md',   label: 'Laws & Regulations' },
  construction:   { file: '05-new-construction.md',           label: 'New Construction' },
  investment:     { file: '06-investment-rentals.md',         label: 'Investment & Rentals' },
  economy:        { file: '07-economy-demographics.md',       label: 'Economy & Demographics' },
  infrastructure: { file: '08-infrastructure-transportation.md', label: 'Infrastructure' },
  schools:        { file: '09-schools-quality-of-life.md',    label: 'Schools & QoL' },
  risks:          { file: '10-risks-considerations.md',       label: 'Risks & Considerations' },
  financing:      { file: '11-financing-programs.md',         label: 'Financing & Programs' },
  luxury:         { file: '12-luxury-market.md',              label: 'Luxury Market' },
  buying:         { file: '13-buying-process.md',             label: 'Buying Process' },
  agent:          { file: '14-agent-transaction-guide.md',    label: 'Agent Guide' },
  brazilian:      { file: '15-brazilian-buyer-guide.md',      label: 'Brazilian Buyers' },
  casestudies:    { file: '16-investment-case-studies.md',    label: 'Case Studies' },
  directory:      { file: '17-brazilian-business-directory.md', label: 'Brazilian Directory' },
  datasources:    { file: '18-data-sources.md',               label: 'Data Sources' },
  templates:      { file: '19-agent-templates.md',            label: 'Agent Templates' },
  pricing:        { file: '20-pricing-methodology.md',        label: 'Pricing Methodology' },
  nurture:        { file: '21-nurture-system.md',             label: 'Nurture System' },
  sphere:         { file: '22-sphere-referral.md',            label: 'Sphere & Referral' },
  concierge:      { file: '23-community-concierge.md',       label: 'Community Concierge' },
  profiles:       { file: 'buyer-profiles.md',                label: 'Buyer Profiles' },
};

const KB_DIR = join(process.cwd(), "public/orlando/kb");

// ─── Routing ───

export function routeMessage(text: string): string[] {
  const lower = text.toLowerCase();
  const matched = new Set<string>();

  for (const rule of ROUTE_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        rule.ids.forEach((id) => matched.add(id));
        break;
      }
    }
  }

  // Fallback: broad context if nothing matched
  if (matched.size === 0) {
    matched.add("market");
    matched.add("neighborhoods");
    matched.add("buying");
  }

  // Cap at 4 files to control prompt size
  return [...matched].slice(0, 4);
}

// ─── Loading ───

export function loadKBFiles(query: string): string {
  const ids = routeMessage(query);
  const sections: string[] = [];

  for (const id of ids) {
    const entry = KB_FILE_MAP[id];
    if (!entry) continue;

    try {
      const content = readFileSync(join(KB_DIR, entry.file), "utf-8");
      sections.push(`--- ${entry.label} ---\n${content}`);
    } catch (err) {
      console.warn(`[KB_LOADER] Failed to read ${entry.file}:`, err);
    }
  }

  return sections.join("\n\n");
}
