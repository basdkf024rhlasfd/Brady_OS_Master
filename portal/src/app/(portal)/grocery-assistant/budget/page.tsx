"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Truck,
  Sparkles,
  Loader2,
  Upload,
  ClipboardPaste,
} from "lucide-react";
import type { WeeklyBudget, SpendEntry, BudgetSummary } from "@/lib/grocery-types";
import { SPEND_CATEGORIES, STORES } from "@/lib/grocery-types";
import orderSummary from "@/data/grocery/order-summary.json";

const STORAGE_KEY = "groceryAssistant_budget";
const DEFAULT_WEEKLY_TARGET = 250;

function getMonday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(now.setDate(diff)).toISOString().split("T")[0];
}

function emptyBudget(): WeeklyBudget {
  return { weekOf: getMonday(), target: DEFAULT_WEEKLY_TARGET, entries: [] };
}

function computeSummary(budget: WeeklyBudget): BudgetSummary {
  const byCategory: Record<string, number> = {};
  const byStore: Record<string, number> = {};
  let deliveryFees = 0;

  for (const entry of budget.entries) {
    byCategory[entry.category] = (byCategory[entry.category] || 0) + entry.amount;
    byStore[entry.store] = (byStore[entry.store] || 0) + entry.amount;
    if (entry.category === "delivery-fee") deliveryFees += entry.amount;
  }

  const totalSpent = budget.entries.reduce((s, e) => s + e.amount, 0);
  const mealsThisWeek = budget.entries.filter(
    (e) => e.category === "groceries" || e.category === "dining"
  ).length || 1;

  return {
    weekOf: budget.weekOf,
    target: budget.target,
    totalSpent,
    remaining: budget.target - totalSpent,
    overBudget: totalSpent > budget.target,
    byCategory: byCategory as BudgetSummary["byCategory"],
    byStore,
    deliveryFees,
    avgPerMeal: totalSpent / Math.max(mealsThisWeek, 1),
    avgPerPerson: totalSpent / 6,
  };
}

export default function BudgetPage() {
  const [budget, setBudget] = useState<WeeklyBudget | null>(null);
  const [addingEntry, setAddingEntry] = useState(false);
  const [editingTarget, setEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [importMode, setImportMode] = useState<"none" | "monarch" | "receipt">("none");
  const [importText, setImportText] = useState("");
  const [importing, setImporting] = useState(false);

  // New entry form state
  const [entryAmount, setEntryAmount] = useState("");
  const [entryCategory, setEntryCategory] = useState<SpendEntry["category"]>("groceries");
  const [entryStore, setEntryStore] = useState<string>("Walmart");
  const [entryDesc, setEntryDesc] = useState("");
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setBudget(parsed);
      setTargetInput(String(parsed.target));
    } else {
      // Seed from Walmart order history on first load
      const seeded = emptyBudget();
      seeded.entries = orderSummary
        .filter((o) => o.date)
        .map((o) => ({
          id: crypto.randomUUID(),
          date: o.date!,
          amount: o.total,
          category: "groceries" as const,
          store: "Walmart",
          description: o.details || `Walmart ${o.type}`,
          items: o.itemCount,
        }));
      setBudget(seeded);
      setTargetInput(String(seeded.target));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    }
  }, []);

  function saveBudget(updated: WeeklyBudget) {
    setBudget(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function addEntry() {
    if (!budget || !entryAmount) return;
    const entry: SpendEntry = {
      id: crypto.randomUUID(),
      date: entryDate,
      amount: parseFloat(entryAmount),
      category: entryCategory,
      store: entryStore,
      description: entryDesc || `${entryStore} ${entryCategory}`,
    };
    saveBudget({ ...budget, entries: [...budget.entries, entry] });
    setEntryAmount("");
    setEntryDesc("");
    setAddingEntry(false);
  }

  function removeEntry(id: string) {
    if (!budget) return;
    saveBudget({ ...budget, entries: budget.entries.filter((e) => e.id !== id) });
  }

  function updateTarget() {
    if (!budget) return;
    const newTarget = parseFloat(targetInput);
    if (isNaN(newTarget) || newTarget <= 0) return;
    saveBudget({ ...budget, target: newTarget });
    setEditingTarget(false);
  }

  async function runAnalysis() {
    if (!budget) return;
    setAnalyzing(true);
    try {
      const res = await fetch("/api/grocery-assistant/budget-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget }),
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data.analysis);
      }
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleImport() {
    if (!budget || !importText.trim()) return;
    setImporting(true);
    try {
      const res = await fetch("/api/grocery-assistant/parse-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: importText,
          source: importMode === "monarch" ? "monarch" : "receipt",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.entries && Array.isArray(data.entries)) {
          const newEntries: SpendEntry[] = data.entries.map(
            (e: { date: string; amount: number; category: string; store: string; description: string }) => ({
              id: crypto.randomUUID(),
              date: e.date,
              amount: e.amount,
              category: e.category as SpendEntry["category"],
              store: e.store,
              description: e.description,
            })
          );
          // Add delivery fee as separate entry if present
          if (data.deliveryFee && data.deliveryFee > 0) {
            newEntries.push({
              id: crypto.randomUUID(),
              date: new Date().toISOString().split("T")[0],
              amount: data.deliveryFee,
              category: "delivery-fee",
              store: "Walmart",
              description: "Delivery fee",
            });
          }
          saveBudget({ ...budget, entries: [...budget.entries, ...newEntries] });
          setImportText("");
          setImportMode("none");
        }
      }
    } finally {
      setImporting(false);
    }
  }

  async function pullKidRequests() {
    try {
      const res = await fetch("/api/grocery-assistant/public-requests");
      if (res.ok) {
        const data = await res.json();
        if (data.requests && data.requests.length > 0) {
          // Add to the requests localStorage for the requests page to pick up
          const existingRaw = localStorage.getItem("groceryAssistant_requests");
          const existing = existingRaw ? JSON.parse(existingRaw) : [];
          const newReqs = data.requests.map((r: { item: string; requestedBy: string; requestedAt: string }) => ({
            id: crypto.randomUUID(),
            item: r.item,
            requestedBy: r.requestedBy,
            requestedAt: r.requestedAt,
            status: "pending",
            note: "",
          }));
          localStorage.setItem("groceryAssistant_requests", JSON.stringify([...newReqs, ...existing]));
          return data.requests.length;
        }
      }
    } catch { /* silent */ }
    return 0;
  }

  const summary = useMemo(
    () => (budget ? computeSummary(budget) : null),
    [budget]
  );

  if (!budget || !summary) return null;

  const spentPct = Math.min((summary.totalSpent / summary.target) * 100, 100);
  const overPct = summary.overBudget
    ? ((summary.totalSpent - summary.target) / summary.target) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Weekly Food Budget
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Week of{" "}
            {new Date(budget.weekOf + "T12:00:00").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}{" "}
            — Groceries + Dining + School Lunch + Delivery
          </p>
        </div>
        <button
          onClick={runAnalysis}
          disabled={analyzing || budget.entries.length === 0}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {analyzing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          {analyzing ? "Analyzing..." : "AI Analysis"}
        </button>
      </div>

      {/* Budget bar */}
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {summary.overBudget ? (
              <AlertTriangle className="h-5 w-5 text-red-400" />
            ) : summary.remaining < summary.target * 0.2 ? (
              <TrendingUp className="h-5 w-5 text-yellow-400" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-400" />
            )}
            <div>
              <span className="text-2xl font-bold text-foreground">
                ${summary.totalSpent.toFixed(2)}
              </span>
              <span className="text-muted-foreground text-sm"> spent</span>
            </div>
          </div>
          <div className="text-right">
            {editingTarget ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Target: $</span>
                <input
                  type="number"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && updateTarget()}
                  className="w-20 bg-white/[0.04] rounded px-2 py-1 text-sm text-foreground outline-none"
                  autoFocus
                />
                <button
                  onClick={updateTarget}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingTarget(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Target: ${summary.target.toFixed(0)}/week
              </button>
            )}
            <p
              className={cn(
                "text-xs mt-0.5",
                summary.overBudget ? "text-red-400" : "text-green-400"
              )}
            >
              {summary.overBudget
                ? `$${(summary.totalSpent - summary.target).toFixed(2)} over`
                : `$${summary.remaining.toFixed(2)} remaining`}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              summary.overBudget
                ? "bg-red-500"
                : spentPct > 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
            )}
            style={{ width: `${Math.min(spentPct + overPct, 100)}%` }}
          />
        </div>

        {/* Category breakdown */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SPEND_CATEGORIES.map((cat) => {
            const amount = summary.byCategory[cat.key] || 0;
            return (
              <div
                key={cat.key}
                className="rounded-lg bg-white/[0.03] px-3 py-2"
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {cat.label}
                </p>
                <p className={cn("text-sm font-semibold mt-0.5", cat.color)}>
                  ${amount.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Per-person / delivery stats */}
        <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            ${summary.avgPerPerson.toFixed(2)}/person this week
          </span>
          {summary.deliveryFees > 0 && (
            <span className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              ${summary.deliveryFees.toFixed(2)} delivery fees
            </span>
          )}
        </div>
      </div>

      {/* AI Analysis */}
      {analysis && (
        <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-4">
          <h3 className="text-sm font-medium text-primary mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Budget Analysis
          </h3>
          <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
            {analysis}
          </div>
        </div>
      )}

      {/* Import section */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setImportMode(importMode === "monarch" ? "none" : "monarch")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            importMode === "monarch"
              ? "bg-green-500/15 text-green-400"
              : "border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
          )}
        >
          <Upload className="h-3 w-3" />
          Monarch CSV
        </button>
        <button
          onClick={() => setImportMode(importMode === "receipt" ? "none" : "receipt")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            importMode === "receipt"
              ? "bg-blue-500/15 text-blue-400"
              : "border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
          )}
        >
          <ClipboardPaste className="h-3 w-3" />
          Paste Receipt
        </button>
      </div>

      {importMode !== "none" && (
        <div className={cn(
          "rounded-lg border p-4 space-y-3",
          importMode === "monarch" ? "border-green-500/20 bg-green-500/[0.03]" : "border-blue-500/20 bg-blue-500/[0.03]"
        )}>
          <div>
            <p className="text-xs font-medium text-foreground mb-1">
              {importMode === "monarch"
                ? "Paste your Monarch Money CSV export"
                : "Paste your Walmart receipt email"}
            </p>
            <p className="text-[10px] text-muted-foreground mb-2">
              {importMode === "monarch"
                ? "AI will find food-related transactions and auto-categorize them."
                : "AI will parse line items, delivery fees, tax, and tip."}
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={importMode === "monarch"
                ? "Date,Description,Category,Amount\n2026-04-15,Walmart,Groceries,-45.67\n..."
                : "Your Walmart order receipt...\nItem 1  $3.99\nItem 2  $5.49\n..."}
              rows={6}
              className="w-full bg-white/[0.04] rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground font-mono"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleImport}
              disabled={importing || !importText.trim()}
              className="flex items-center gap-1.5 bg-primary/20 text-primary text-xs font-medium px-4 py-1.5 rounded hover:bg-primary/30 transition-colors disabled:opacity-50"
            >
              {importing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
              {importing ? "Parsing..." : "Import"}
            </button>
            <button
              onClick={() => { setImportMode("none"); setImportText(""); }}
              className="text-xs text-muted-foreground hover:text-foreground px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add entry */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Transactions</h3>
        <button
          onClick={() => setAddingEntry(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
        >
          <Plus className="h-3 w-3" />
          Add Spend
        </button>
      </div>

      {addingEntry && (
        <div className="rounded-lg border border-primary/30 bg-white/[0.03] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-muted-foreground">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                value={entryAmount}
                onChange={(e) => setEntryAmount(e.target.value)}
                placeholder="0.00"
                autoFocus
                className="w-full bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Date</label>
              <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="w-full bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-muted-foreground">Category</label>
              <select
                value={entryCategory}
                onChange={(e) =>
                  setEntryCategory(e.target.value as SpendEntry["category"])
                }
                className="w-full bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none"
              >
                {SPEND_CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Store</label>
              <select
                value={entryStore}
                onChange={(e) => setEntryStore(e.target.value)}
                className="w-full bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none"
              >
                {STORES.map((store) => (
                  <option key={store} value={store}>
                    {store}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-muted-foreground">
              Description (optional)
            </label>
            <input
              type="text"
              value={entryDesc}
              onChange={(e) => setEntryDesc(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEntry()}
              placeholder="Weekly grocery run, pizza night, etc."
              className="w-full bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={addEntry}
              className="bg-primary/20 text-primary text-xs font-medium px-4 py-1.5 rounded hover:bg-primary/30 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setAddingEntry(false)}
              className="text-xs text-muted-foreground hover:text-foreground px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Transaction list */}
      {budget.entries.length > 0 ? (
        <div className="rounded-lg border border-white/[0.08]">
          <div className="divide-y divide-white/[0.04]">
            {[...budget.entries]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((entry) => {
                const catConfig = SPEND_CATEGORIES.find(
                  (c) => c.key === entry.category
                );
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">
                        {entry.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.store} &middot;{" "}
                        {new Date(entry.date + "T12:00:00").toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded",
                        catConfig?.color || "text-muted-foreground",
                        "bg-white/[0.04]"
                      )}
                    >
                      {catConfig?.label || entry.category}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      ${entry.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="text-muted-foreground hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 rounded-lg border border-dashed border-white/[0.12]">
          <TrendingDown className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No spending logged yet. Add your first transaction to start tracking.
          </p>
        </div>
      )}
    </div>
  );
}
