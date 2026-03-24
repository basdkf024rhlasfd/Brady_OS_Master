"use client";

import { useState } from "react";
import { requestCategories, requestPrompts } from "@/lib/stihl-data";

interface StoredRequest {
  id: string;
  category: string;
  summary: string;
  urgency: string;
  createdAt: string;
}

const STORAGE_KEY = "stihl-request-inbox";

export function RequestInbox() {
  const [category, setCategory] = useState(requestCategories[0]);
  const [summary, setSummary] = useState("");
  const [urgency, setUrgency] = useState("This week");
  const [saved, setSaved] = useState<StoredRequest[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as StoredRequest[];
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  });
  const [submitted, setSubmitted] = useState(false);

  function persist(next: StoredRequest[]) {
    setSaved(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function submitRequest() {
    if (!summary.trim()) {
      return;
    }

    const nextEntry: StoredRequest = {
      id: crypto.randomUUID(),
      category,
      summary: summary.trim(),
      urgency,
      createdAt: new Date().toLocaleString(),
    };

    const next = [nextEntry, ...saved].slice(0, 6);
    persist(next);
    setSummary("");
    setUrgency("This week");
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 1800);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            New request
          </div>
          <h3 className="mt-2 text-lg font-semibold text-white">Capture a request quickly</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-300/40"
            >
              {requestCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Timing
            </span>
            <select
              value={urgency}
              onChange={(event) => setUrgency(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-300/40"
            >
              {["Today", "This week", "Next meeting"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Request
          </span>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="Example: Build a board-ready tariff memo comparing STIHL, Husqvarna, and DeWalt."
            className="min-h-32 w-full rounded-[24px] border border-white/10 bg-zinc-950 px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-orange-300/40"
          />
        </label>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={submitRequest}
            className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
            Save request
          </button>
          {submitted ? (
            <span className="text-sm text-emerald-300">Request saved.</span>
          ) : (
            <span className="text-sm text-zinc-500">
              Requests are reviewed within one business day.
            </span>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Suggested asks
          </div>
          <div className="mt-4 space-y-3">
            {requestPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setSummary(prompt)}
                className="w-full rounded-2xl border border-white/8 bg-zinc-950/70 px-4 py-3 text-left text-sm leading-6 text-zinc-300 transition hover:border-orange-300/30 hover:text-white"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Recent saved requests
          </div>
          <div className="mt-4 space-y-3">
            {saved.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm leading-6 text-zinc-500">
                No requests saved yet in this browser.
              </div>
            ) : (
              saved.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/8 bg-zinc-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-white">{item.category}</div>
                    <div className="text-xs text-zinc-500">{item.urgency}</div>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.summary}</p>
                  <div className="mt-3 text-xs text-zinc-500">{item.createdAt}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
