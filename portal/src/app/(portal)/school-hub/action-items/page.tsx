"use client";

import { useState, useEffect, useCallback } from "react";
import { ActionItemRow } from "@/components/school-hub/ActionItemRow";
import { KIDS, KID_IDS } from "@/lib/school-hub-data";
import type { ActionItem, KidId } from "@/lib/school-hub-types";
import { Plus, X } from "lucide-react";

const STORAGE_KEY = "school-hub-action-items";

function loadItems(): ActionItem[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveItems(items: ActionItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function ActionItemsPage() {
  const [items, setItems] = useState<ActionItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [filterKid, setFilterKid] = useState<KidId | "all">("all");

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ActionItem["category"]>("other");
  const [selectedKids, setSelectedKids] = useState<KidId[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setItems(loadItems());
  }, []);

  const persist = useCallback((updated: ActionItem[]) => {
    setItems(updated);
    saveItems(updated);
  }, []);

  const toggleStatus = (id: string) => {
    persist(
      items.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "done" ? "pending" : "done" }
          : item
      )
    );
  };

  const toggleSnooze = (id: string) => {
    persist(
      items.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "snoozed" ? "pending" : "snoozed" }
          : item
      )
    );
  };

  const addItem = () => {
    if (!title.trim()) return;
    const newItem: ActionItem = {
      id: crypto.randomUUID(),
      kidIds: selectedKids,
      title: title.trim(),
      category,
      status: "pending",
      dueDate: dueDate || undefined,
      source: "manual",
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    persist([newItem, ...items]);
    setTitle("");
    setCategory("other");
    setSelectedKids([]);
    setDueDate("");
    setNotes("");
    setShowAdd(false);
  };

  const filtered = items.filter(
    (item) => filterKid === "all" || item.kidIds.includes(filterKid)
  );
  const pending = filtered.filter((i) => i.status === "pending");
  const snoozed = filtered.filter((i) => i.status === "snoozed");
  const done = filtered.filter((i) => i.status === "done");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            School Hub
          </p>
          <h1 className="text-2xl font-semibold text-foreground">Action Items</h1>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-400 transition-colors"
        >
          {showAdd ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showAdd ? "Cancel" : "Add"}
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="p-5 rounded-xl bg-card border border-indigo-500/30 space-y-4">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-indigo-500/50"
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />

          <div className="flex flex-wrap gap-3">
            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ActionItem["category"])}
              className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none"
            >
              <option value="forms">Form / Permission</option>
              <option value="supplies">Supplies</option>
              <option value="fees">Fee / Payment</option>
              <option value="volunteer">Volunteer</option>
              <option value="other">Other</option>
            </select>

            {/* Due date */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none"
            />
          </div>

          {/* Kid selector */}
          <div className="flex flex-wrap gap-2">
            {KID_IDS.map((id) => {
              const selected = selectedKids.includes(id);
              return (
                <button
                  key={id}
                  onClick={() =>
                    setSelectedKids(
                      selected
                        ? selectedKids.filter((k) => k !== id)
                        : [...selectedKids, id]
                    )
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    selected
                      ? "border-white/20 bg-white/[0.08] text-foreground"
                      : "border-white/[0.06] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: KIDS[id].color }}
                  />
                  {KIDS[id].name}
                </button>
              );
            })}
          </div>

          {/* Notes */}
          <input
            type="text"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-transparent border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-muted-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-indigo-500/50"
          />

          <button
            onClick={addItem}
            disabled={!title.trim()}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-1.5 overflow-x-auto">
        <button
          onClick={() => setFilterKid("all")}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filterKid === "all"
              ? "bg-indigo-500/10 text-indigo-400"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All ({items.filter((i) => i.status !== "done").length})
        </button>
        {KID_IDS.map((id) => {
          const count = items.filter(
            (i) => i.kidIds.includes(id) && i.status !== "done"
          ).length;
          return (
            <button
              key={id}
              onClick={() => setFilterKid(id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterKid === id
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: KIDS[id].color }}
              />
              {KIDS[id].name} ({count})
            </button>
          );
        })}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <section>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Pending ({pending.length})
          </h2>
          <div className="space-y-2">
            {pending.map((item) => (
              <ActionItemRow
                key={item.id}
                item={item}
                onToggleStatus={toggleStatus}
                onSnooze={toggleSnooze}
              />
            ))}
          </div>
        </section>
      )}

      {/* Snoozed */}
      {snoozed.length > 0 && (
        <section>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-400/80 mb-3">
            Snoozed ({snoozed.length})
          </h2>
          <div className="space-y-2">
            {snoozed.map((item) => (
              <ActionItemRow
                key={item.id}
                item={item}
                onToggleStatus={toggleStatus}
                onSnooze={toggleSnooze}
              />
            ))}
          </div>
        </section>
      )}

      {/* Done */}
      {done.length > 0 && (
        <section>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Done ({done.length})
          </h2>
          <div className="space-y-2">
            {done.map((item) => (
              <ActionItemRow
                key={item.id}
                item={item}
                onToggleStatus={toggleStatus}
                onSnooze={toggleSnooze}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-sm">No action items yet</p>
          <p className="text-muted-foreground/60 text-xs mt-1 mb-4">
            Permission slips, supply lists, fees, and more
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-400 transition-colors mx-auto"
          >
            <Plus className="h-4 w-4" /> Add Item
          </button>
        </div>
      )}
    </div>
  );
}
