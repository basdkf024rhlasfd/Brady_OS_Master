"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContentPiece } from "@/lib/content-engine-types";
import {
  initialPieces,
  getSeriesColor,
  getStatusColor,
  getChannelColor,
} from "@/lib/content-engine-data";

const STORAGE_KEY = "contentEngine";

export default function QueuePage() {
  const [pieces, setPieces] = useState<ContentPiece[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPieces(JSON.parse(saved));
      } catch {
        setPieces(initialPieces);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPieces));
      }
    } else {
      setPieces(initialPieces);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPieces));
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const publishedLinkedIn = pieces.filter(
    (p) => p.status === "Published" && p.channels.includes("LinkedIn")
  ).length;
  const publishedSubstack = pieces.filter(
    (p) => p.status === "Published" && p.channels.includes("Substack")
  ).length;

  // Simple streak: count consecutive days with a publish (mock 0 for now)
  const streak = pieces.filter((p) => p.status === "Published").length > 0 ? 1 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Content Engine
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Draft &rarr; Publish &rarr; Repeat
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* LinkedIn card */}
        <div className="p-4 rounded-xl bg-card border border-white/[0.08]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              LinkedIn
            </p>
            <span className="text-xs text-blue-400">Target: 12</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            {publishedLinkedIn}{" "}
            <span className="text-sm text-muted-foreground font-normal">
              / 12
            </span>
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-blue-400 transition-all"
              style={{ width: `${Math.min((publishedLinkedIn / 12) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Substack card */}
        <div className="p-4 rounded-xl bg-card border border-white/[0.08]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Substack
            </p>
            <span className="text-xs text-orange-400">Target: 3</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            {publishedSubstack}{" "}
            <span className="text-sm text-muted-foreground font-normal">
              / 3
            </span>
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-orange-400 transition-all"
              style={{ width: `${Math.min((publishedSubstack / 3) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Streak card */}
        <div className="p-4 rounded-xl bg-card border border-white/[0.08] flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Flame className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">{streak}</p>
            <p className="text-xs text-muted-foreground">day streak</p>
          </div>
        </div>
      </div>

      {/* Queue list */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Queue
        </h2>
        <div className="space-y-2">
          {pieces.map((piece) => (
            <div
              key={piece.id}
              className="p-4 rounded-xl bg-card border border-white/[0.08] hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3 flex-wrap">
                {/* Status badge */}
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider",
                    getStatusColor(piece.status)
                  )}
                >
                  {piece.status}
                </span>

                {/* Title */}
                <span className="text-sm font-medium text-foreground flex-1 min-w-0 truncate">
                  {piece.title}
                </span>

                {/* Series tag */}
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-medium hidden sm:inline-block",
                    getSeriesColor(piece.series)
                  )}
                >
                  {piece.series}
                </span>

                {/* Channel badges */}
                <div className="flex items-center gap-1">
                  {piece.channels.map((ch) => (
                    <span
                      key={ch}
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase",
                        getChannelColor(ch)
                      )}
                    >
                      {ch === "LinkedIn" ? "LI" : "SS"}
                    </span>
                  ))}
                </div>

                {/* Priority dot */}
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    piece.priority === "High"
                      ? "bg-primary"
                      : piece.priority === "Medium"
                      ? "bg-primary/40"
                      : "bg-primary/20"
                  )}
                  title={`${piece.priority} priority`}
                />

                {/* Draft Now button */}
                <Link href={`/content-engine/editor?id=${piece.id}`}>
                  <Button size="sm" className="text-xs">
                    Draft Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
