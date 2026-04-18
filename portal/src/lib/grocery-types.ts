export interface MealSlot {
  name: string;
  type: "cook" | "takeout" | "eat-out" | "leftovers";
  servings: number;
  estimatedCalories: number;
  estimatedCost: number;
  prepTime: number; // minutes
  notes: string;
}

export interface DayPlan {
  day: string; // "Monday", "Tuesday", etc.
  dinner: MealSlot | null;
}

export interface WeeklyPlan {
  weekOf: string; // ISO date of Monday
  days: DayPlan[];
  notes: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  estimatedPrice: number | null;
  walmartSearchUrl: string;
  fromMeal: string | null; // which meal needs this
  fromPantry: boolean; // true = already in pantry, skip
}

export interface PantryItem {
  name: string;
  quantity: string;
  category: string;
  scannedAt: string; // ISO date
  confidence: number; // 0-1 from vision API
}

export interface NutritionSummary {
  totalCalories: number;
  householdDailyTarget: number; // ~11,200
  householdWeeklyTarget: number; // ~78,400
  weeklyCalories: number;
  ratio: number; // weeklyCalories / weeklyTarget
  verdict: "under" | "on-track" | "over" | "way-over";
  notes: string[];
}

export const GROCERY_CATEGORIES = [
  "Meat & Protein",
  "Pasta & Grains",
  "Sauces & Soups",
  "Dairy",
  "Produce",
  "Frozen & Canned",
  "Baking & Dessert",
  "Snacks",
  "Beverages",
  "Household",
  "Other",
] as const;

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const HOUSEHOLD_DAILY_CALORIES = 11200;
export const HOUSEHOLD_WEEKLY_CALORIES = 78400;

export interface SpendEntry {
  id: string;
  date: string;
  amount: number;
  category: "groceries" | "dining" | "school-lunch" | "delivery-fee";
  store: string;
  description: string;
  items?: number;
}

export interface WeeklyBudget {
  weekOf: string;
  target: number;
  entries: SpendEntry[];
}

export interface BudgetSummary {
  weekOf: string;
  target: number;
  totalSpent: number;
  remaining: number;
  overBudget: boolean;
  byCategory: Record<SpendEntry["category"], number>;
  byStore: Record<string, number>;
  deliveryFees: number;
  avgPerMeal: number;
  avgPerPerson: number;
}

export const SPEND_CATEGORIES = [
  { key: "groceries" as const, label: "Groceries", color: "text-green-400" },
  { key: "dining" as const, label: "Dining Out / Takeout", color: "text-orange-400" },
  { key: "school-lunch" as const, label: "School Lunch Funds", color: "text-blue-400" },
  { key: "delivery-fee" as const, label: "Delivery Fees", color: "text-purple-400" },
] as const;

export const STORES = [
  "Walmart",
  "Sam's Club",
  "Aldi",
  "Harps",
  "DoorDash",
  "Domino's",
  "Chick-fil-A",
  "School",
  "Other",
] as const;

export const FAMILY_MEMBERS = [
  { name: "Brady", age: "adult", dailyCalories: 2400 },
  { name: "Lily", age: 17, dailyCalories: 2000 },
  { name: "Faith", age: 14, dailyCalories: 1800 },
  { name: "Isla", age: 9, dailyCalories: 1600 },
  { name: "Quinn", age: 9, dailyCalories: 1600 },
  { name: "Luke", age: 9, dailyCalories: 1800 },
] as const;

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

export interface MealScore {
  id: string;
  mealName: string;
  date: string;
  scores: Partial<Record<KidName, number>>; // 1-5
  avgScore: number;
  notes: string;
}

export interface TasteProfile {
  kid: KidName;
  favorites: string[]; // meals scored 4+
  disliked: string[]; // meals scored 2 or below
  avgScore: number;
  totalRatings: number;
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
