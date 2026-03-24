"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/stihl-data";

export function NewsFeed({ items }: { items: NewsItem[] }) {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    // Stagger items appearing for a streaming effect
    items.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, i * 180);
    });
  }, [items]);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`rounded-2xl border border-white/8 bg-zinc-950/60 p-4 transition-all duration-500 ${
            visible.includes(i)
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider">
            <span className="rounded-full bg-orange-400/10 px-2.5 py-0.5 font-semibold text-orange-300">
              {item.source}
            </span>
            <span className="text-zinc-600">{item.time}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-200">
            {item.headline}
          </p>
          <p className="mt-1 text-xs leading-5 text-zinc-500">
            {item.implication}
          </p>
        </div>
      ))}
    </div>
  );
}
