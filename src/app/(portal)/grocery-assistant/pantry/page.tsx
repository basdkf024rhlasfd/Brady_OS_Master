"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Camera,
  Upload,
  Loader2,
  Trash2,
  Package,
  AlertCircle,
} from "lucide-react";
import type { PantryItem } from "@/lib/grocery-types";

const STORAGE_KEY = "groceryAssistant_pantry";

export default function PantryPage() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setItems(JSON.parse(saved));
  }, []);

  function saveItems(updated: PantryItem[]) {
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function removeItem(index: number) {
    saveItems(items.filter((_, i) => i !== index));
  }

  function clearAll() {
    saveItems([]);
    setPreview(null);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Send to API
    setScanning(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/grocery-assistant/scan-pantry", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to scan image");
      }

      const data = await res.json();
      if (data.items && Array.isArray(data.items)) {
        const scannedItems: PantryItem[] = data.items.map(
          (item: { name: string; quantity: string; category: string; confidence: number }) => ({
            name: item.name,
            quantity: item.quantity || "some",
            category: item.category || "Other",
            scannedAt: new Date().toISOString(),
            confidence: item.confidence ?? 0.8,
          })
        );
        // Merge with existing, avoid duplicates by name
        const existingNames = new Set(items.map((i) => i.name.toLowerCase()));
        const newItems = scannedItems.filter(
          (i) => !existingNames.has(i.name.toLowerCase())
        );
        saveItems([...items, ...newItems]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
    } finally {
      setScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const grouped: Record<string, PantryItem[]> = {};
  for (const item of items) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Pantry Scanner
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Take a photo of your fridge or pantry. AI identifies what you have so the shopping list skips items you don&apos;t need.
        </p>
      </div>

      {/* Upload area */}
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed transition-colors",
          scanning
            ? "border-primary/50 bg-primary/[0.03]"
            : "border-white/[0.12] hover:border-white/[0.2] hover:bg-white/[0.01]"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={scanning}
        />
        <div className="flex flex-col items-center justify-center py-10 px-4">
          {scanning ? (
            <>
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
              <p className="text-sm font-medium text-primary">Scanning image...</p>
              <p className="text-xs text-muted-foreground mt-1">Claude is identifying items in your photo</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground">
                Tap to take a photo or upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Fridge, pantry, spice rack — any food storage
              </p>
            </>
          )}
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="rounded-lg overflow-hidden border border-white/[0.08]">
          <img src={preview} alt="Scanned" className="w-full max-h-64 object-cover" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/[0.06] border border-red-500/20 rounded-lg p-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Inventory */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              Current Inventory ({items.length} items)
            </h3>
            <button
              onClick={clearAll}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
          </div>

          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category} className="rounded-lg border border-white/[0.08]">
              <div className="px-4 py-2 border-b border-white/[0.06]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {category}
                </h4>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {categoryItems.map((item, i) => (
                  <div key={`${item.name}-${i}`} className="flex items-center gap-3 px-4 py-2.5">
                    <span className="flex-1 text-sm text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground bg-white/[0.04] px-2 py-0.5 rounded">
                      {item.quantity}
                    </span>
                    {item.confidence < 0.6 && (
                      <span className="text-[10px] text-yellow-400">unsure</span>
                    )}
                    <button
                      onClick={() => {
                        const globalIndex = items.indexOf(item);
                        if (globalIndex >= 0) removeItem(globalIndex);
                      }}
                      className="text-muted-foreground hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="text-[10px] text-muted-foreground">
            Last scan: {items.length > 0
              ? new Date(items[items.length - 1].scannedAt).toLocaleString()
              : "Never"}
          </p>
        </div>
      )}
    </div>
  );
}
