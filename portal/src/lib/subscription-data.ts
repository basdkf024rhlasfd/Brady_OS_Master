export type Cadence = "weekly" | "biweekly" | "3-week" | "4-week" | "6-week";

export interface SubscriptionItem {
  name: string;
  price: number;
  cadence: Cadence;
}

/** Delivery window: Tuesday 10am–12pm CT */
export const DELIVERY = {
  dayOfWeek: 2, // Tuesday
  startHour: 10,
  endHour: 12,
  cutoffHoursBefore: 2, // cutoff at 8am Tuesday
} as const;

export function walmartSearchUrl(item: string): string {
  return `https://www.walmart.com/search?q=${encodeURIComponent(item)}`;
}

/** Next upcoming Tuesday delivery date (or today if it's Tuesday before the window) */
export function nextDeliveryDate(now = new Date()): Date {
  const d = new Date(now);
  const day = d.getDay();
  // days until Tuesday (0=Sun,1=Mon,2=Tue...)
  let daysUntil = (DELIVERY.dayOfWeek - day + 7) % 7;
  // if it's Tuesday but past the delivery window, go to next week
  if (daysUntil === 0 && d.getHours() >= DELIVERY.endHour) {
    daysUntil = 7;
  }
  d.setDate(d.getDate() + daysUntil);
  d.setHours(DELIVERY.startHour, 0, 0, 0);
  return d;
}

/** Cutoff time = delivery start minus cutoffHoursBefore */
export function cutoffTime(deliveryDate: Date): Date {
  const cutoff = new Date(deliveryDate);
  cutoff.setHours(cutoff.getHours() - DELIVERY.cutoffHoursBefore);
  return cutoff;
}

/** Human-readable countdown string */
export function formatCountdown(ms: number): string {
  if (ms <= 0) return "PASSED";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours >= 48) {
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return `${days}d ${remHours}h`;
  }
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export const CADENCE_LABELS: Record<Cadence, string> = {
  weekly: "Weekly",
  biweekly: "Every 2 Weeks",
  "3-week": "Every 3 Weeks",
  "4-week": "Every 4 Weeks",
  "6-week": "Every 6 Weeks",
};

export const CADENCE_ORDER: Cadence[] = ["weekly", "biweekly", "3-week", "4-week", "6-week"];

/** Weekly cost equivalent for a cadence */
function weeksPerCycle(c: Cadence): number {
  switch (c) {
    case "weekly": return 1;
    case "biweekly": return 2;
    case "3-week": return 3;
    case "4-week": return 4;
    case "6-week": return 6;
  }
}

export function weeklyEquivalent(items: SubscriptionItem[]): number {
  return items.reduce((sum, item) => sum + item.price / weeksPerCycle(item.cadence), 0);
}

// ---------------------------------------------------------------------------
// All 67 subscription items from Walmart+ auto-ship
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Subscription matching helpers
// ---------------------------------------------------------------------------

const CADENCE_DAYS: Record<Cadence, number> = {
  weekly: 7,
  biweekly: 14,
  "3-week": 21,
  "4-week": 28,
  "6-week": 42,
};

const MATCH_STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "of", "in", "at", "by", "for", "with", "to",
  "oz", "ct", "lb", "lbs", "fl", "pk", "bag", "box", "each", "fresh",
  "great", "value", "all", "purpose", "enriched", "boneless", "skinless",
  "natural", "reduced", "fat", "everyday", "disposable", "half", "gallon",
  "low", "original", "style", "ready", "serve", "sweet", "cream", "salted",
  "free", "gluten",
]);

function tokenize(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !MATCH_STOP_WORDS.has(t));
}

function findSubscriptionMatch(itemName: string): SubscriptionItem | null {
  const tokens = new Set(tokenize(itemName));
  if (tokens.size === 0) return null;

  let bestMatch: SubscriptionItem | null = null;
  let bestScore = 0;

  for (const sub of SUBSCRIPTION_ITEMS) {
    const subTokens = tokenize(sub.name);
    const overlap = subTokens.filter((t) => tokens.has(t)).length;
    if (overlap > bestScore) {
      bestScore = overlap;
      bestMatch = sub;
    }
  }

  return bestScore >= 1 ? bestMatch : null;
}

export function isSubscribed(itemName: string): boolean {
  return findSubscriptionMatch(itemName) !== null;
}

export function nextSubOrderDate(
  itemName: string,
  lastPurchase: string | null
): Date | null {
  const match = findSubscriptionMatch(itemName);
  if (!match) return null;

  const cadenceDays = CADENCE_DAYS[match.cadence];

  if (!lastPurchase) return nextDeliveryDate();

  const last = new Date(lastPurchase);
  if (isNaN(last.getTime())) return nextDeliveryDate();

  const now = new Date();
  const next = new Date(last);
  next.setDate(next.getDate() + cadenceDays);

  while (next <= now) {
    next.setDate(next.getDate() + cadenceDays);
  }

  return next;
}

// ---------------------------------------------------------------------------

export const SUBSCRIPTION_ITEMS: SubscriptionItem[] = [
  // Weekly (8 items)
  { name: "Fresh Banana, Each", price: 0.13, cadence: "weekly" },
  { name: "Fresh Strawberries, 1 lb", price: 2.48, cadence: "weekly" },
  { name: "Great Value Sweet Cream Salted Butter, 16 oz", price: 3.06, cadence: "weekly" },
  { name: "Great Value 1% Low-fat Chocolate Milk, Half Gallon", price: 2.10, cadence: "weekly" },
  { name: "Great Value Everyday Disposable Paper Bowls, 20 oz, 50 ct", price: 4.97, cadence: "weekly" },
  { name: "Great Value Disposable Paper Plates, 10\", 50 ct", price: 5.16, cadence: "weekly" },
  { name: "Great Value Milk, 2% Reduced Fat, Half Gallon", price: 1.94, cadence: "weekly" },
  { name: "Tyson All Natural Boneless Skinless Chicken Breasts, 1.75–3 lb", price: 8.21, cadence: "weekly" },

  // Biweekly (22 items)
  { name: "Marketside Gluten-Free Classic Hummus, 10 oz", price: 2.72, cadence: "biweekly" },
  { name: "Great Value Sourdough Bread, 24 oz", price: 2.74, cadence: "biweekly" },
  { name: "Thomas' Sourdough English Muffins, 6 ct, 12 oz", price: 3.77, cadence: "biweekly" },
  { name: "Pillsbury Bacon and Sausage Toaster Scrambles, 8 ct", price: 5.72, cadence: "biweekly" },
  { name: "Pillsbury Bacon Toaster Scrambles, 8 ct", price: 5.72, cadence: "biweekly" },
  { name: "Fresh Hass Avocados, Each", price: 0.60, cadence: "biweekly" },
  { name: "Fresh Slicing Tomato, Each", price: 1.42, cadence: "biweekly" },
  { name: "Fresh Petite Romaine Lettuce, 2 ct Bag", price: 2.27, cadence: "biweekly" },
  { name: "Great Value Restaurant Style Lightly Salted White Corn Tortilla Chips, 13 oz", price: 1.97, cadence: "biweekly" },
  { name: "Great Value Mild Cheddar Finely Shredded Cheese, 8 oz", price: 1.97, cadence: "biweekly" },
  { name: "Great Value Black Beans, 15 oz", price: 0.86, cadence: "biweekly" },
  { name: "Great Value Seasoned Black Beans, 15 oz", price: 0.86, cadence: "biweekly" },
  { name: "Great Value Cut Green Beans, 14.5 oz", price: 0.76, cadence: "biweekly" },
  { name: "Great Value Seasoned Croutons, 5 oz", price: 1.42, cadence: "biweekly" },
  { name: "Great Value Ready to Heat Long Grain White Rice Cups, 8.8 oz", price: 1.86, cadence: "biweekly" },
  { name: "VEETEE Gluten Free Sticky Rice, 10.6 oz", price: 2.72, cadence: "biweekly" },
  { name: "Tostitos Traditional Cantina Tortilla Chips, 11 oz", price: 2.97, cadence: "biweekly" },
  { name: "Minute Ready-to-Serve Jasmine Rice, 4.4 oz, 2 ct", price: 1.96, cadence: "biweekly" },
  { name: "Great Value All-Purpose Enriched Flour, 5 lb", price: 2.38, cadence: "biweekly" },
  { name: "Great Value Original Whipped Cream Cheese Spread, 12 oz", price: 2.92, cadence: "biweekly" },
  { name: "Great Value Large White Eggs, 18 ct", price: 2.47, cadence: "biweekly" },

  // Every 3 weeks (6 items)
  { name: "Cascade Platinum Dishwasher Pods, Fresh, 26 ct", price: 9.94, cadence: "3-week" },
  { name: "Mott's Zero Sugar Apple Juice Drink, 64 fl oz", price: 3.00, cadence: "3-week" },
  { name: "Dot's Homestyle Pretzels Original Seasoned, 16 oz", price: 6.17, cadence: "3-week" },
  { name: "Great Value Multi Purpose Cleaner, Lemon Scent, 32 fl oz", price: 2.97, cadence: "3-week" },
  { name: "Marketside Fresh Broccoli Florets, 32 oz", price: 5.98, cadence: "3-week" },
  { name: "Wonder Bread Classic Extra Soft Hot Dog Buns, 18 oz, 12 ct", price: 4.74, cadence: "3-week" },

  // Every 4 weeks (13 items)
  { name: "HERDEZ Carnitas Slow Cooked Pork, 15 oz", price: 8.48, cadence: "4-week" },
  { name: "Marketside Creamy Tomato Bisque, 16 oz", price: 2.97, cadence: "4-week" },
  { name: "HORMEL Turkey Pepperoni, 5 oz", price: 4.46, cadence: "4-week" },
  { name: "Great Value Small Fajita Flour Tortillas, 26 oz, 20 ct", price: 2.12, cadence: "4-week" },
  { name: "Great Value Creamy Peanut Butter, 40 oz", price: 3.98, cadence: "4-week" },
  { name: "Maruchan Ramen Noodle Soup, Chicken Flavor, 3 oz, 12-pack", price: 3.87, cadence: "4-week" },
  { name: "Great Value Fire Roasted Tomato Salsa, 14.5 oz", price: 1.42, cadence: "4-week" },
  { name: "bettergoods Buttermilk Protein Pancake & Waffle Mix, 20 oz", price: 4.47, cadence: "4-week" },
  { name: "Great Value Pure Granulated Sugar, 4 lbs", price: 3.12, cadence: "4-week" },
  { name: "Ball Park Beef Hot Dogs, 30 oz, 16 ct", price: 10.48, cadence: "4-week" },
  { name: "Dawn Ultra Dishwashing Liquid, Original Scent, 18 fl oz", price: 2.94, cadence: "4-week" },
  { name: "Freshness Guaranteed Garlic Bread, 16 oz", price: 2.46, cadence: "4-week" },
  { name: "Larabar Chocolate Variety Pack, Fruit & Nut Bars, 28.8 oz, 18 ct", price: 18.94, cadence: "4-week" },

  // Every 6 weeks (2 items)
  { name: "Russet Baking Potatoes Whole Fresh, Each", price: 0.75, cadence: "6-week" },
  { name: "S&B Golden Curry Mild Japanese Curry Mix, 3.2 oz", price: 2.92, cadence: "6-week" },
];
