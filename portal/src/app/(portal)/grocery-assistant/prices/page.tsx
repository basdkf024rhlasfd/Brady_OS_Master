"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowLeftRight,
  Sparkles,
  Loader2,
  Truck,
  Trophy,
  ShoppingCart,
} from "lucide-react";
import type { GroceryItem } from "@/lib/grocery-types";

const LIST_STORAGE_KEY = "groceryAssistant_shoppingList";

interface StoreComparison {
  store: string;
  items: { name: string; price: number; unit: string }[];
  subtotal: number;
  deliveryFee: number;
  membershipCostPerWeek: number;
  totalWeeklyCost: number;
}

interface ComparisonResult {
  stores: StoreComparison[];
  bestStore: string;
  weeklySavings: number;
  recommendations: string[];
}

const STORE_INFO = [
  {
    name: "Walmart",
    delivery: "Walmart+ ($12.95/mo = ~$3.24/week)",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Sam's Club",
    delivery: "Membership ($50/yr = ~$0.96/week) + delivery fee",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    name: "Aldi",
    delivery: "Instacart delivery (~$7.99/order)",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export default function PricesPage() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [comparing, setComparing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LIST_STORAGE_KEY);
    if (saved) setItems(JSON.parse(saved));
    setLoaded(true);
  }, []);

  async function runComparison() {
    if (items.length === 0) return;
    setComparing(true);
    try {
      const res = await fetch("/api/grocery-assistant/budget-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "price-compare",
          items: items.map((i) => ({ name: i.name, quantity: i.quantity })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.stores) setComparison(data);
      }
    } finally {
      setComparing(false);
    }
  }

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
            Price Compare
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Compare total weekly cost across stores — including delivery fees
          </p>
        </div>
        <button
          onClick={runComparison}
          disabled={comparing || items.length === 0}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {comparing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          {comparing ? "Comparing..." : "Compare Prices"}
        </button>
      </div>

      {/* Store cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        {STORE_INFO.map((store) => {
          const storeData = comparison?.stores.find(
            (s) => s.store === store.name
          );
          const isBest = comparison?.bestStore === store.name;

          return (
            <div
              key={store.name}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                isBest
                  ? "border-green-500/30 bg-green-500/[0.04]"
                  : "border-white/[0.08] bg-white/[0.02]"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={cn("text-sm font-semibold", store.color)}>
                  {store.name}
                </h3>
                {isBest && <Trophy className="h-4 w-4 text-green-400" />}
              </div>

              {storeData ? (
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      ${storeData.totalWeeklyCost.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      total weekly cost
                    </p>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Groceries</span>
                      <span>${storeData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        Delivery
                      </span>
                      <span>${storeData.deliveryFee.toFixed(2)}</span>
                    </div>
                    {storeData.membershipCostPerWeek > 0 && (
                      <div className="flex justify-between">
                        <span>Membership/week</span>
                        <span>
                          ${storeData.membershipCostPerWeek.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {store.delivery}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    Run comparison to see prices
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Savings callout */}
      {comparison && comparison.weeklySavings > 0 && (
        <div className="rounded-lg border border-green-500/20 bg-green-500/[0.04] p-4 text-center">
          <p className="text-sm text-green-400 font-medium">
            Switching to {comparison.bestStore} saves ~$
            {comparison.weeklySavings.toFixed(2)}/week ($
            {(comparison.weeklySavings * 52).toFixed(0)}/year)
          </p>
        </div>
      )}

      {/* Recommendations */}
      {comparison?.recommendations && comparison.recommendations.length > 0 && (
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 space-y-2">
          <h3 className="text-sm font-medium text-foreground">
            Recommendations
          </h3>
          <ul className="space-y-1.5">
            {comparison.recommendations.map((rec, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-primary mt-0.5">-</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Current list reference */}
      {items.length === 0 ? (
        <div className="text-center py-8 rounded-lg border border-dashed border-white/[0.12]">
          <ShoppingCart className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Add items to your shopping list first, then come back to compare
            prices.
          </p>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground">
          Comparing {items.length} items from your shopping list
        </div>
      )}
    </div>
  );
}
