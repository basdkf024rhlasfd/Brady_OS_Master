"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Check,
  ExternalLink,
  Sparkles,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import type { GroceryItem, WeeklyPlan } from "@/lib/grocery-types";
import { GROCERY_CATEGORIES } from "@/lib/grocery-types";

const LIST_STORAGE_KEY = "groceryAssistant_shoppingList";
const PLAN_STORAGE_KEY = "groceryAssistant_mealPlan";

function walmartUrl(item: string): string {
  return `https://www.walmart.com/search?q=${encodeURIComponent(item)}`;
}

function newItem(name: string, quantity: string, category: string, fromMeal: string | null = null): GroceryItem {
  return {
    id: crypto.randomUUID(),
    name,
    quantity,
    category,
    checked: false,
    estimatedPrice: null,
    walmartSearchUrl: walmartUrl(name),
    fromMeal,
    fromPantry: false,
  };
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newCat, setNewCat] = useState<string>(GROCERY_CATEGORIES[0]);

  useEffect(() => {
    const savedList = localStorage.getItem(LIST_STORAGE_KEY);
    const savedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
    if (savedList) setItems(JSON.parse(savedList));
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    setLoaded(true);
  }, []);

  function saveItems(updated: GroceryItem[]) {
    setItems(updated);
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(updated));
  }

  function toggleItem(id: string) {
    saveItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  }

  function removeItem(id: string) {
    saveItems(items.filter((item) => item.id !== id));
  }

  function addItem() {
    if (!newName.trim()) return;
    saveItems([...items, newItem(newName.trim(), newQty.trim() || "1", newCat)]);
    setNewName("");
    setNewQty("");
    setAddingItem(false);
  }

  async function generateFromPlan() {
    if (!plan) return;
    setGenerating(true);
    try {
      const pantryRaw = localStorage.getItem("groceryAssistant_pantry");
      const pantry = pantryRaw ? JSON.parse(pantryRaw) : [];

      const res = await fetch("/api/grocery-assistant/generate-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate-list", plan, pantry }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.items) {
          const generated: GroceryItem[] = data.items.map(
            (item: { name: string; quantity: string; category: string; fromMeal: string }) =>
              newItem(item.name, item.quantity, item.category, item.fromMeal)
          );
          saveItems(generated);
        }
      }
    } finally {
      setGenerating(false);
    }
  }

  const grouped = useMemo(() => {
    const groups: Record<string, GroceryItem[]> = {};
    for (const item of items) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [items]);

  const checkedCount = items.filter((i) => i.checked).length;
  const totalEstCost = items.reduce((sum, i) => sum + (i.estimatedPrice ?? 0), 0);

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping List
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length > 0
              ? `${checkedCount} of ${items.length} items`
              : "No items yet — generate from meal plan or add manually"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAddingItem(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.08] text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
          {plan && (
            <button
              onClick={generateFromPlan}
              disabled={generating}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              {generating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              {generating ? "Generating..." : "Generate from Plan"}
            </button>
          )}
        </div>
      </div>

      {/* Quick add */}
      {addingItem && (
        <div className="rounded-lg border border-primary/30 bg-white/[0.03] p-4 space-y-3">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Item name..."
              autoFocus
              className="bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <input
              type="text"
              value={newQty}
              onChange={(e) => setNewQty(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Qty"
              className="w-20 bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none"
            >
              {GROCERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addItem}
              className="bg-primary/20 text-primary text-xs font-medium px-4 py-1.5 rounded hover:bg-primary/30 transition-colors"
            >
              Add Item
            </button>
            <button
              onClick={() => setAddingItem(false)}
              className="text-xs text-muted-foreground hover:text-foreground px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && !addingItem && (
        <div className="text-center py-12 rounded-lg border border-dashed border-white/[0.12]">
          <ShoppingCart className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            {plan
              ? 'Click "Generate from Plan" to build your list from this week\'s meal plan.'
              : "Start by creating a meal plan, then generate your list."}
          </p>
        </div>
      )}

      {/* Grouped items */}
      {Object.entries(grouped).map(([category, categoryItems]) => (
        <div key={category} className="rounded-lg border border-white/[0.08] bg-white/[0.01]">
          <div className="px-4 py-2.5 border-b border-white/[0.06]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
              {category}
            </h3>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors",
                  item.checked && "opacity-50"
                )}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                    item.checked
                      ? "bg-primary border-primary"
                      : "border-white/[0.2] hover:border-primary/50"
                  )}
                >
                  {item.checked && <Check className="h-3 w-3 text-white" />}
                </button>

                <span className={cn(
                  "flex-1 text-sm",
                  item.checked ? "line-through text-muted-foreground" : "text-foreground"
                )}>
                  {item.name}
                </span>

                <span className="text-xs text-muted-foreground bg-white/[0.04] px-2 py-0.5 rounded">
                  {item.quantity}
                </span>

                {item.fromMeal && (
                  <span className="text-[10px] text-muted-foreground">
                    {item.fromMeal}
                  </span>
                )}

                <a
                  href={item.walmartSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 bg-primary/10 px-2 py-1 rounded transition-colors"
                >
                  Walmart <ExternalLink className="h-3 w-3" />
                </a>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer stats */}
      {items.length > 0 && (
        <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
          <span>{checkedCount}/{items.length} checked</span>
          {totalEstCost > 0 && <span>Est. ${totalEstCost.toFixed(2)}</span>}
        </div>
      )}
    </div>
  );
}
