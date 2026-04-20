// Types kept for grocery-data.ts (Walmart history) and public grocery-requests page

export interface WalmartItem {
  name: string;
  category: string;
  purchases: number;
  totalUnits: number;
  averageUnitRetail: number;
  totalSpend: number;
  lastPurchase: string | null;
}

export interface WalmartOrder {
  date: string | null;
  type: string;
  orderNumber: string;
  shipTo: string;
  who: string;
  itemCount: number;
  total: number;
  details: string;
}

// Used by public /grocery-requests page

export const KID_NAMES = ["Lily", "Faith", "Isla", "Quinn", "Luke"] as const;
export type KidName = (typeof KID_NAMES)[number];

export interface GroceryRequest {
  id: string;
  item: string;
  requestedBy: KidName | "Brady";
  requestedAt: string;
  status: "pending" | "approved" | "denied";
  note: string;
}

export const REQUEST_CATEGORIES = [
  { emoji: "🥩", label: "Meat", items: ["Chicken Nuggets", "Hot Dogs", "Ground Beef", "Bacon", "Deli Meat"] },
  { emoji: "🧀", label: "Dairy", items: ["Milk", "Cheese Sticks", "Yogurt", "Butter", "Cream Cheese"] },
  { emoji: "🍞", label: "Bread & Grains", items: ["Bread", "Tortillas", "Cereal", "Granola Bars", "Crackers"] },
  { emoji: "🍎", label: "Fruit", items: ["Apples", "Bananas", "Grapes", "Strawberries", "Oranges"] },
  { emoji: "🥕", label: "Veggies", items: ["Baby Carrots", "Broccoli", "Corn", "Potatoes", "Salad Mix"] },
  { emoji: "🍿", label: "Snacks", items: ["Goldfish", "Chips", "Popcorn", "Pretzels", "Fruit Snacks"] },
  { emoji: "🥤", label: "Drinks", items: ["Juice Boxes", "Capri Sun", "Gatorade", "Lemonade", "Chocolate Milk"] },
  { emoji: "🍦", label: "Frozen & Treats", items: ["Ice Cream", "Popsicles", "Pizza Rolls", "Frozen Waffles", "Corn Dogs"] },
  { emoji: "🧴", label: "Other", items: ["Shampoo", "Toothpaste", "Paper Towels", "Tissues", "Hand Soap"] },
] as const;
