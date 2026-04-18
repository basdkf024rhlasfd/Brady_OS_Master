"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import type { ContentPiece } from "@/lib/content-engine-types";
import {
  initialPieces,
  getSeriesColor,
  getChannelColor,
} from "@/lib/content-engine-data";

const STORAGE_KEY = "contentEngine";

export default function PublishedPage() {
  const [pieces, setPieces] = useState<ContentPiece[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPieces(JSON.parse(saved));
      } catch {
        setPieces(initialPieces);
      }
    } else {
      setPieces(initialPieces);
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

  const published = pieces
    .filter((p) => p.status === "Published")
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

  const linkedInCount = published.filter((p) =>
    p.channels.includes("LinkedIn")
  ).length;
  const substackCount = published.filter((p) =>
    p.channels.includes("Substack")
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Published</h1>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground font-medium">
              {linkedInCount}
            </span>
            <span className="text-xs text-muted-foreground">LinkedIn</span>
            <div className="w-16 h-1.5 rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-blue-400 transition-all"
                style={{
                  width: `${Math.min((linkedInCount / 12) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">/ 12</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground font-medium">
              {substackCount}
            </span>
            <span className="text-xs text-muted-foreground">Substack</span>
            <div className="w-16 h-1.5 rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-orange-400 transition-all"
                style={{
                  width: `${Math.min((substackCount / 3) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">/ 3</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground font-medium">
              {published.length}
            </span>
            <span className="text-xs text-muted-foreground">total</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <section>
        {published.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-4">
            <p className="text-sm text-muted-foreground">
              Nothing published yet. Head to the Queue and draft your first
              piece.
            </p>
            <Link
              href="/content-engine/queue"
              className="text-sm text-primary hover:underline"
            >
              Go to Queue
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {published.map((piece) => (
              <div
                key={piece.id}
                className="p-4 rounded-xl bg-card border border-white/[0.08]"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Date */}
                  <span className="text-xs text-muted-foreground min-w-[100px]">
                    {piece.publishedAt
                      ? new Date(piece.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </span>

                  {/* Title */}
                  <span className="text-sm font-medium text-foreground flex-1 min-w-0 truncate">
                    {piece.title}
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

                  {/* Series tag */}
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-medium hidden sm:inline-block",
                      getSeriesColor(piece.series)
                    )}
                  >
                    {piece.series}
                  </span>

                  {/* URL */}
                  {piece.publishedUrl && (
                    <a
                      href={piece.publishedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
