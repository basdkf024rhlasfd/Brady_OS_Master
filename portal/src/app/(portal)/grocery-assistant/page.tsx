"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Truck,
  Clock,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Plus,
  Check,
  Trash2,
  RefreshCw,
  ShoppingCart,
  Repeat,
  Lightbulb,
} from "lucide-react";
import {
  SUBSCRIPTION_ITEMS,
  CADENCE_LABELS,
  CADENCE_ORDER,
  nextDeliveryDate,
  cutoffTime,
  formatCountdown,
  weeklyEquivalent,
  walmartSearchUrl,
} from "@/lib/subscription-data";
import type { Cadence } from "@/lib/subscription-data";
import { walmartItems } from "@/lib/grocery-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AdhocItem {
  id: string;
  name: string;
  checked: boolean;
}

const ADHOC_KEY = "groceryDashboard_adhocList";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Items bought 2+ times that aren't already on subscription */
function suggestedSubscriptions() {
  const subNames = new Set(
    SUBSCRIPTION_ITEMS.map((s) => s.name.toLowerCase())
  );
  return walmartItems
    .filter(
      (item) =>
        item.purchases >= 2 &&
        item.category === "Grocery" &&
        !subNames.has(item.name.toLowerCase())
    )
    .sort((a, b) => b.purchases - a.purchases || b.totalSpend - a.totalSpend)
    .slice(0, 15);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GroceryDashboard() {
  const [now, setNow] = useState(() => new Date());
  const [adhocItems, setAdhocItems] = useState<AdhocItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<Cadence>>(
    () => new Set<Cadence>(["biweekly", "3-week", "4-week", "6-week"])
  );
  const [suggestionsCollapsed, setSuggestionsCollapsed] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Refresh countdown every 60s
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Load ad hoc list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(ADHOC_KEY);
    if (saved) setAdhocItems(JSON.parse(saved));
    setLoaded(true);
  }, []);

  function saveAdhoc(items: AdhocItem[]) {
    setAdhocItems(items);
    localStorage.setItem(ADHOC_KEY, JSON.stringify(items));
  }

  function addAdhocItem() {
    const name = newItemName.trim();
    if (!name) return;
    saveAdhoc([...adhocItems, { id: crypto.randomUUID(), name, checked: false }]);
    setNewItemName("");
  }

  function toggleAdhoc(id: string) {
    saveAdhoc(
      adhocItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function removeAdhoc(id: string) {
    saveAdhoc(adhocItems.filter((item) => item.id !== id));
  }

  function clearChecked() {
    saveAdhoc(adhocItems.filter((item) => !item.checked));
  }

  function toggleGroup(cadence: Cadence) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(cadence)) next.delete(cadence);
      else next.add(cadence);
      return next;
    });
  }

  // Computed
  const delivery = nextDeliveryDate(now);
  const cutoff = cutoffTime(delivery);
  const msUntilCutoff = cutoff.getTime() - now.getTime();
  const msUntilDelivery = delivery.getTime() - now.getTime();
  const cutoffImminent = msUntilCutoff > 0 && msUntilCutoff < 24 * 60 * 60 * 1000;
  const cutoffPassed = msUntilCutoff <= 0;

  const grouped = useMemo(() => {
    const map = new Map<Cadence, typeof SUBSCRIPTION_ITEMS>();
    for (const c of CADENCE_ORDER) map.set(c, []);
    for (const item of SUBSCRIPTION_ITEMS) {
      map.get(item.cadence)!.push(item);
    }
    return map;
  }, []);

  const suggestions = useMemo(() => suggestedSubscriptions(), []);
  const totalWeeklyCost = weeklyEquivalent(SUBSCRIPTION_ITEMS);
  const checkedAdhoc = adhocItems.filter((i) => i.checked).length;

  if (!loaded) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          Smallwood Family
        </p>
        <h1 className="text-xl font-semibold text-foreground">
          Grocery Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Walmart+ Delivery &middot; Tuesdays 10am&ndash;12pm
        </p>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Delivery Banner */}
      {/* ----------------------------------------------------------------- */}
      <div
        className={cn(
          "rounded-lg border p-4",
          cutoffImminent
            ? "border-yellow-500/40 bg-yellow-500/[0.06]"
            : cutoffPassed
              ? "border-white/[0.08] bg-white/[0.02]"
              : "border-white/[0.08] bg-white/[0.02]"
        )}
      >
        <div className="flex items-start gap-3">
          {cutoffImminent ? (
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          ) : (
            <Truck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              Next delivery:{" "}
              {delivery.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              , 10am&ndash;12pm
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Delivery in {formatCountdown(msUntilDelivery)}
              </p>
              <p
                className={cn(
                  "text-xs flex items-center gap-1",
                  cutoffImminent
                    ? "text-yellow-400 font-medium"
                    : cutoffPassed
                      ? "text-muted-foreground"
                      : "text-muted-foreground"
                )}
              >
                {cutoffPassed ? (
                  <>Order cutoff passed</>
                ) : (
                  <>
                    <AlertTriangle className="h-3 w-3" />
                    Cutoff in {formatCountdown(msUntilCutoff)}
                    {cutoffImminent && " — add items now!"}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Summary Card */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">
            ~${totalWeeklyCost.toFixed(0)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Est. weekly spend</p>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">
            {SUBSCRIPTION_ITEMS.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Subscription items</p>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">
            {adhocItems.filter((i) => !i.checked).length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Ad hoc items</p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Ad Hoc Buy List */}
      {/* ----------------------------------------------------------------- */}
      <section className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary" />
            Ad Hoc Buy List
            {adhocItems.length > 0 && (
              <span className="text-xs font-normal text-muted-foreground">
                ({adhocItems.filter((i) => !i.checked).length} remaining)
              </span>
            )}
          </h2>
          {checkedAdhoc > 0 && (
            <button
              onClick={clearChecked}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Clear checked
            </button>
          )}
        </div>

        {/* Add item */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addAdhocItem()}
            placeholder="Add item..."
            className="flex-1 bg-white/[0.04] rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
          />
          <button
            onClick={addAdhocItem}
            disabled={!newItemName.trim()}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>

        {/* Item list */}
        {adhocItems.length === 0 ? (
          <div className="text-center py-6 rounded-lg border border-dashed border-white/[0.12]">
            <p className="text-sm text-muted-foreground">
              No ad hoc items. Add items you need outside your subscriptions.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-white/[0.06] divide-y divide-white/[0.04]">
            {adhocItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 transition-colors",
                  item.checked && "opacity-50"
                )}
              >
                <button
                  onClick={() => toggleAdhoc(item.id)}
                  className={cn(
                    "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                    item.checked
                      ? "bg-primary border-primary"
                      : "border-white/[0.2] hover:border-primary/50"
                  )}
                >
                  {item.checked && <Check className="h-3 w-3 text-white" />}
                </button>

                <span
                  className={cn(
                    "flex-1 text-sm",
                    item.checked
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  )}
                >
                  {item.name}
                </span>

                <a
                  href={walmartSearchUrl(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 bg-primary/10 px-2 py-1 rounded transition-colors"
                >
                  Walmart
                  <ExternalLink className="h-3 w-3" />
                </a>

                <button
                  onClick={() => removeAdhoc(item.id)}
                  className="text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Subscriptions */}
      {/* ----------------------------------------------------------------- */}
      <section className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Repeat className="h-4 w-4 text-primary" />
            Subscriptions
          </h2>
          <span className="text-xs text-muted-foreground">
            {SUBSCRIPTION_ITEMS.length} items &middot; ~${totalWeeklyCost.toFixed(0)}/week
          </span>
        </div>

        <div className="space-y-2">
          {CADENCE_ORDER.map((cadence) => {
            const items = grouped.get(cadence)!;
            if (items.length === 0) return null;
            const collapsed = collapsedGroups.has(cadence);
            const groupWeekly = weeklyEquivalent(items);

            return (
              <div
                key={cadence}
                className="rounded-lg border border-white/[0.06]"
              >
                <button
                  onClick={() => toggleGroup(cadence)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    {CADENCE_LABELS[cadence]}
                    <span className="text-[11px] font-normal text-muted-foreground bg-white/[0.06] px-1.5 py-0.5 rounded">
                      {items.length}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      ~${groupWeekly.toFixed(0)}/wk
                    </span>
                    {collapsed ? (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </span>
                </button>

                {!collapsed && (
                  <div className="border-t border-white/[0.06] divide-y divide-white/[0.04]">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between px-4 py-2"
                      >
                        <span className="text-sm text-foreground truncate mr-3">
                          {item.name}
                        </span>
                        <span className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs tabular-nums text-muted-foreground w-12 text-right">
                            ${item.price.toFixed(2)}
                          </span>
                          <a
                            href={walmartSearchUrl(item.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 bg-primary/10 px-2 py-1 rounded transition-colors"
                          >
                            Walmart
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Consider Subscribing */}
      {/* ----------------------------------------------------------------- */}
      {suggestions.length > 0 && (
        <section className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <button
            onClick={() => setSuggestionsCollapsed(!suggestionsCollapsed)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              Consider Subscribing
              <span className="text-[11px] font-normal text-muted-foreground bg-white/[0.06] px-1.5 py-0.5 rounded">
                {suggestions.length}
              </span>
            </h2>
            {suggestionsCollapsed ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {!suggestionsCollapsed && (
            <div className="rounded-lg border border-white/[0.06] divide-y divide-white/[0.04] mt-4">
              {suggestions.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-4 py-2"
                >
                  <div className="min-w-0 mr-3">
                    <span className="text-sm text-foreground truncate block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {item.purchases} purchases &middot; ${item.totalSpend.toFixed(0)} total
                    </span>
                  </div>
                  <a
                    href={walmartSearchUrl(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 bg-primary/10 px-2 py-1 rounded transition-colors flex-shrink-0"
                  >
                    Walmart
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

    </div>
  );
}
