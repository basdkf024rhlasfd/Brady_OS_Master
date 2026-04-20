"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertTriangle,
  Truck,
  ExternalLink,
  Plus,
  Check,
  X,
} from "lucide-react";
import {
  SUBSCRIPTION_ITEMS,
  nextDeliveryDate,
  cutoffTime,
  formatCountdown,
  weeklyEquivalent,
  walmartSearchUrl,
} from "@/lib/subscription-data";
import { walmartItems } from "@/lib/grocery-data";

interface AdhocItem {
  id: string;
  name: string;
  checked: boolean;
}

const ADHOC_KEY = "groceryDashboard_adhocList";

type SortKey = "name" | "purchases" | "totalSpend" | "lastPurchase";
type SortDir = "asc" | "desc";

function formatShortDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function GroceryDashboard() {
  const [now, setNow] = useState(() => new Date());
  const [adhocItems, setAdhocItems] = useState<AdhocItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("totalSpend");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

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
      adhocItems.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  }

  function removeAdhoc(id: string) {
    saveAdhoc(adhocItems.filter((i) => i.id !== id));
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  const delivery = nextDeliveryDate(now);
  const cutoff = cutoffTime(delivery);
  const msUntilCutoff = cutoff.getTime() - now.getTime();
  const cutoffPassed = msUntilCutoff <= 0;
  const cutoffImminent = !cutoffPassed && msUntilCutoff < 24 * 60 * 60 * 1000;
  const cutoffUrgent = !cutoffPassed && msUntilCutoff < 3 * 60 * 60 * 1000;

  const totalWeeklyCost = weeklyEquivalent(SUBSCRIPTION_ITEMS);
  const uncheckedAdhoc = adhocItems.filter((i) => !i.checked);

  // Status state machine
  type StatusTone = "ok" | "warn" | "urgent" | "locked";
  let tone: StatusTone;
  let headline: string;
  const deliveryDateStr = delivery.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  if (cutoffPassed) {
    tone = "locked";
    headline = "Order locked for this delivery";
  } else if (cutoffUrgent) {
    tone = "urgent";
    headline = `Cutoff in ${formatCountdown(msUntilCutoff)} — finalize order now`;
  } else if (cutoffImminent) {
    tone = "warn";
    headline = `Cutoff in ${formatCountdown(msUntilCutoff)} — review order`;
  } else if (uncheckedAdhoc.length > 0) {
    tone = "warn";
    headline = `${uncheckedAdhoc.length} ad hoc item${uncheckedAdhoc.length > 1 ? "s" : ""} pending`;
  } else {
    tone = "ok";
    headline = "You're on track";
  }

  const secondary = `Delivery ${deliveryDateStr}, 10am–12pm · Cutoff ${cutoff.toLocaleDateString(
    "en-US",
    { weekday: "short" }
  )} 8am`;

  // Table rows
  const rows = [...walmartItems].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
    if (sortKey === "purchases") return (a.purchases - b.purchases) * dir;
    if (sortKey === "totalSpend") return (a.totalSpend - b.totalSpend) * dir;
    if (sortKey === "lastPurchase")
      return (a.lastPurchase ?? "").localeCompare(b.lastPurchase ?? "") * dir;
    return 0;
  });

  if (!loaded) return null;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Smallwood Family
          </p>
          <h1 className="text-xl font-semibold text-foreground">
            Grocery Dashboard
          </h1>
        </div>

        {/* Status banner */}
        <div
          className={cn(
            "rounded-lg border p-4 flex items-start gap-3",
            tone === "ok" && "border-emerald-500/30 bg-emerald-500/[0.04]",
            tone === "warn" && "border-yellow-500/40 bg-yellow-500/[0.06]",
            tone === "urgent" && "border-red-500/50 bg-red-500/[0.08]",
            tone === "locked" && "border-white/[0.08] bg-white/[0.02]"
          )}
        >
          {tone === "ok" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
          ) : tone === "locked" ? (
            <Truck className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          ) : (
            <AlertTriangle
              className={cn(
                "h-5 w-5 mt-0.5 flex-shrink-0",
                tone === "urgent" ? "text-red-400" : "text-yellow-400"
              )}
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{headline}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{secondary}</p>
          </div>
          <div className="text-right flex-shrink-0 hidden sm:block">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Weekly spend
            </p>
            <p className="text-sm font-medium tabular-nums text-foreground">
              ~${totalWeeklyCost.toFixed(0)}
            </p>
          </div>
        </div>

        {/* Ad hoc items */}
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Ad hoc buy list{" "}
              {uncheckedAdhoc.length > 0 && (
                <span className="text-foreground">({uncheckedAdhoc.length})</span>
              )}
            </p>
          </div>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAdhocItem()}
              placeholder="Add item..."
              className="flex-1 bg-white/[0.04] rounded-md px-3 py-1.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <button
              onClick={addAdhocItem}
              disabled={!newItemName.trim()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
          {adhocItems.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {adhocItems.map((item) => (
                <span
                  key={item.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] pl-2 pr-1.5 py-1 text-xs",
                    item.checked
                      ? "bg-white/[0.01] text-muted-foreground line-through"
                      : "bg-white/[0.04] text-foreground"
                  )}
                >
                  <button
                    onClick={() => toggleAdhoc(item.id)}
                    className={cn(
                      "h-3.5 w-3.5 rounded border flex items-center justify-center transition-colors flex-shrink-0",
                      item.checked
                        ? "bg-primary border-primary"
                        : "border-white/[0.3] hover:border-primary/60"
                    )}
                  >
                    {item.checked && <Check className="h-2.5 w-2.5 text-white" />}
                  </button>
                  <span>{item.name}</span>
                  <a
                    href={walmartSearchUrl(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                    title="Search on Walmart"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={() => removeAdhoc(item.id)}
                    className="text-muted-foreground hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Nothing needed beyond subscriptions.
            </p>
          )}
        </div>

        {/* Purchase history table */}
        <div className="rounded-lg border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] border-b border-white/[0.08]">
                <tr className="text-left">
                  <Th
                    sortable
                    active={sortKey === "name"}
                    dir={sortDir}
                    onClick={() => toggleSort("name")}
                  >
                    Item
                  </Th>
                  <Th>Category</Th>
                  <Th
                    align="right"
                    sortable
                    active={sortKey === "purchases"}
                    dir={sortDir}
                    onClick={() => toggleSort("purchases")}
                  >
                    # Purch
                  </Th>
                  <Th align="right">Units</Th>
                  <Th align="right">AUR</Th>
                  <Th
                    align="right"
                    sortable
                    active={sortKey === "totalSpend"}
                    dir={sortDir}
                    onClick={() => toggleSort("totalSpend")}
                  >
                    Total Spend
                  </Th>
                  <Th
                    sortable
                    active={sortKey === "lastPurchase"}
                    dir={sortDir}
                    onClick={() => toggleSort("lastPurchase")}
                  >
                    Last
                  </Th>
                  <Th align="right">Avg/wk</Th>
                  <Th align="right">Remaining</Th>
                  <Th align="right">Low Point</Th>
                  <Th />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {rows.map((item) => (
                  <tr key={item.name} className="hover:bg-white/[0.02]">
                    <td
                      className="px-3 py-2 text-foreground max-w-[280px] truncate"
                      title={item.name}
                    >
                      {item.name}
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-block rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-muted-foreground uppercase tracking-wide">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {item.purchases}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {item.totalUnits}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      ${item.averageUnitRetail.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-foreground">
                      ${item.totalSpend.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                      {formatShortDate(item.lastPurchase)}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground/40">
                      —
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground/40">
                      —
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground/40">
                      —
                    </td>
                    <td className="px-3 py-2">
                      <a
                        href={walmartSearchUrl(item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 flex items-center"
                        title="Search on Walmart"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer context */}
        <p className="text-[11px] text-muted-foreground">
          {SUBSCRIPTION_ITEMS.length} active subscriptions · {walmartItems.length}{" "}
          tracked items · Avg/wk, Remaining, and Low Point forecasts coming when
          inventory data is wired in.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table header cell
// ---------------------------------------------------------------------------

function Th({
  children,
  align = "left",
  sortable = false,
  active = false,
  dir,
  onClick,
}: {
  children?: React.ReactNode;
  align?: "left" | "right";
  sortable?: boolean;
  active?: boolean;
  dir?: SortDir;
  onClick?: () => void;
}) {
  const content = (
    <span className="inline-flex items-center gap-1">
      {children}
      {sortable && active && (
        <span className="text-foreground">{dir === "asc" ? "↑" : "↓"}</span>
      )}
    </span>
  );
  return (
    <th
      className={cn(
        "px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground whitespace-nowrap",
        align === "right" && "text-right"
      )}
    >
      {sortable ? (
        <button onClick={onClick} className="hover:text-foreground transition-colors">
          {content}
        </button>
      ) : (
        content
      )}
    </th>
  );
}
