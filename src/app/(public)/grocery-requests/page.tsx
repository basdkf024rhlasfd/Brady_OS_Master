"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart, Check, Plus, Send } from "lucide-react";
import { REQUEST_CATEGORIES, KID_NAMES } from "@/lib/grocery-types";
import type { KidName } from "@/lib/grocery-types";

const API_KEY = "groceryAssistant_publicRequests";

interface PublicRequest {
  item: string;
  requestedBy: string;
  requestedAt: string;
}

export default function GroceryRequestsPublic() {
  const [selectedKid, setSelectedKid] = useState<KidName | "">(KID_NAMES[0]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [customItem, setCustomItem] = useState("");
  const [customItems, setCustomItems] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleItem(item: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  function addCustom() {
    if (!customItem.trim()) return;
    setCustomItems((prev) => [...prev, customItem.trim()]);
    setSelected((prev) => new Set(prev).add(customItem.trim()));
    setCustomItem("");
  }

  async function submit() {
    if (selected.size === 0 || !selectedKid) return;

    const requests: PublicRequest[] = Array.from(selected).map((item) => ({
      item,
      requestedBy: selectedKid,
      requestedAt: new Date().toISOString(),
    }));

    // Post to API which stores for Brady to review
    try {
      await fetch("/api/grocery-assistant/public-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requests }),
      });
    } catch {
      // Silently fail — requests are best-effort
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="text-xl font-semibold text-white">Sent to Dad!</h1>
          <p className="text-sm text-gray-400">
            {selected.size} item{selected.size !== 1 ? "s" : ""} requested. He&apos;ll review and add them to the shopping list.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelected(new Set());
              setCustomItems([]);
            }}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Request more
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
            <ShoppingCart className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-xl font-semibold">Grocery Requests</h1>
          <p className="text-sm text-gray-400 mt-1">
            Tap anything you need. Dad will review it.
          </p>
        </div>

        {/* Who are you */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Who&apos;s requesting?</p>
          <div className="flex gap-2 flex-wrap">
            {KID_NAMES.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedKid(name)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedKid === name
                    ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30"
                    : "bg-white/[0.06] text-gray-400 hover:bg-white/[0.1]"
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Category grids */}
        <div className="space-y-5">
          {REQUEST_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <p className="text-xs text-gray-500 mb-2">
                {cat.emoji} {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const isSelected = selected.has(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleItem(item)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-all",
                        isSelected
                          ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30"
                          : "bg-white/[0.06] text-gray-300 hover:bg-white/[0.1]"
                      )}
                    >
                      {isSelected && "✓ "}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Custom items */}
          {customItems.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Your additions</p>
              <div className="flex flex-wrap gap-2">
                {customItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleItem(item)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-all",
                      selected.has(item)
                        ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30"
                        : "bg-white/[0.06] text-gray-300 hover:bg-white/[0.1]"
                    )}
                  >
                    {selected.has(item) && "✓ "}
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom add */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustom()}
            placeholder="Something else..."
            className="flex-1 bg-white/[0.06] rounded-full px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-blue-500/30 placeholder:text-gray-500"
          />
          <button
            onClick={addCustom}
            className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-gray-400 hover:bg-white/[0.1]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={selected.size === 0 || !selectedKid}
          className={cn(
            "w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all",
            selected.size > 0 && selectedKid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-white/[0.06] text-gray-500 cursor-not-allowed"
          )}
        >
          <Send className="h-4 w-4" />
          Send {selected.size > 0 ? `${selected.size} item${selected.size !== 1 ? "s" : ""}` : ""} to Dad
        </button>
      </div>
    </div>
  );
}
