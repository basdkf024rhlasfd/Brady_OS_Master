"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  MessageSquarePlus,
  Check,
  X,
  Clock,
  Trash2,
  Plus,
} from "lucide-react";
import type { GroceryRequest } from "@/lib/grocery-types";
import { KID_NAMES, REQUEST_CATEGORIES } from "@/lib/grocery-types";
import type { KidName } from "@/lib/grocery-types";

const STORAGE_KEY = "groceryAssistant_requests";

export default function RequestsPage() {
  const [requests, setRequests] = useState<GroceryRequest[]>([]);
  const [selectedKid, setSelectedKid] = useState<KidName | "Brady">("Lily");
  const [customItem, setCustomItem] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setRequests(JSON.parse(saved));
    setLoaded(true);
  }, []);

  function saveRequests(updated: GroceryRequest[]) {
    setRequests(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function addRequest(item: string) {
    const req: GroceryRequest = {
      id: crypto.randomUUID(),
      item,
      requestedBy: selectedKid,
      requestedAt: new Date().toISOString(),
      status: "pending",
      note: "",
    };
    saveRequests([req, ...requests]);
  }

  function addCustom() {
    if (!customItem.trim()) return;
    addRequest(customItem.trim());
    setCustomItem("");
  }

  function updateStatus(id: string, status: GroceryRequest["status"]) {
    saveRequests(
      requests.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }

  function removeRequest(id: string) {
    saveRequests(requests.filter((r) => r.id !== id));
  }

  function addApprovedToList() {
    const approved = requests.filter((r) => r.status === "approved");
    if (approved.length === 0) return;

    const listRaw = localStorage.getItem("groceryAssistant_shoppingList");
    const list = listRaw ? JSON.parse(listRaw) : [];
    const existingNames = new Set(list.map((i: { name: string }) => i.name.toLowerCase()));

    const newItems = approved
      .filter((r) => !existingNames.has(r.item.toLowerCase()))
      .map((r) => ({
        id: crypto.randomUUID(),
        name: r.item,
        quantity: "1",
        category: "Other",
        checked: false,
        estimatedPrice: null,
        walmartSearchUrl: `https://www.walmart.com/search?q=${encodeURIComponent(r.item)}`,
        fromMeal: null,
        fromPantry: false,
      }));

    localStorage.setItem(
      "groceryAssistant_shoppingList",
      JSON.stringify([...list, ...newItems])
    );

    // Clear approved requests
    saveRequests(requests.filter((r) => r.status !== "approved"));
  }

  const pending = requests.filter((r) => r.status === "pending");
  const approved = requests.filter((r) => r.status === "approved");
  const denied = requests.filter((r) => r.status === "denied");

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5 text-primary" />
          Kid Requests
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Kids tap items to add to the request list. Brady reviews and approves.
        </p>
      </div>

      {/* Kid selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[...KID_NAMES, "Brady" as const].map((name) => (
          <button
            key={name}
            onClick={() => setSelectedKid(name)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedKid === name
                ? "bg-primary/15 text-primary"
                : "bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
            )}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Visual grid */}
      <div className="space-y-4">
        {REQUEST_CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {cat.emoji} {cat.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => {
                const alreadyRequested = requests.some(
                  (r) =>
                    r.item.toLowerCase() === item.toLowerCase() &&
                    r.status !== "denied"
                );
                return (
                  <button
                    key={item}
                    onClick={() => !alreadyRequested && addRequest(item)}
                    disabled={alreadyRequested}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                      alreadyRequested
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground border border-white/[0.06]"
                    )}
                  >
                    {alreadyRequested ? "✓ " : ""}
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Custom item */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustom()}
          placeholder="Request something else..."
          className="flex-1 bg-white/[0.04] rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
        />
        <button
          onClick={addCustom}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {/* Pending review */}
      {pending.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-400" />
            Pending Review ({pending.length})
          </h3>
          <div className="rounded-lg border border-white/[0.08] divide-y divide-white/[0.04]">
            {pending.map((req) => (
              <div key={req.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="flex-1 text-sm text-foreground">{req.item}</span>
                <span className="text-[10px] text-muted-foreground">{req.requestedBy}</span>
                <button
                  onClick={() => updateStatus(req.id, "approved")}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => updateStatus(req.id, "denied")}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      {approved.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              Approved ({approved.length})
            </h3>
            <button
              onClick={addApprovedToList}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Add all to shopping list →
            </button>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-500/[0.03] divide-y divide-white/[0.04]">
            {approved.map((req) => (
              <div key={req.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="flex-1 text-sm text-foreground">{req.item}</span>
                <span className="text-[10px] text-muted-foreground">{req.requestedBy}</span>
                <button
                  onClick={() => removeRequest(req.id)}
                  className="text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Denied */}
      {denied.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <X className="h-4 w-4 text-red-400" />
            Denied ({denied.length})
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {denied.map((req) => (
              <span
                key={req.id}
                className="text-xs text-muted-foreground line-through bg-white/[0.03] px-2 py-1 rounded cursor-pointer hover:bg-white/[0.06]"
                onClick={() => removeRequest(req.id)}
              >
                {req.item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
