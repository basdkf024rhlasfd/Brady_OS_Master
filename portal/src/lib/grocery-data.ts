import type { WalmartItem, WalmartOrder } from "./grocery-types";
import itemSummaryJson from "@/data/grocery/item-summary.json";
import orderSummaryJson from "@/data/grocery/order-summary.json";

export const walmartItems: WalmartItem[] = itemSummaryJson as WalmartItem[];
export const walmartOrders: WalmartOrder[] = orderSummaryJson as WalmartOrder[];

/** Total spend across all tracked items */
export const totalHistoricalSpend = walmartItems.reduce(
  (sum, item) => sum + item.totalSpend,
  0
);

/** Top items by total spend */
export function topItemsBySpend(n = 10): WalmartItem[] {
  return [...walmartItems].sort((a, b) => b.totalSpend - a.totalSpend).slice(0, n);
}

/** Orders sorted newest first */
export function recentOrders(): WalmartOrder[] {
  return [...walmartOrders].sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? "")
  );
}
