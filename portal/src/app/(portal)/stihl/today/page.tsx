"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PageHeader,
  Panel,
  MetricCard,
  Tag,
  ActionCard,
} from "@/components/stihl/briefing-components";
import {
  quickPulse,
  quickStats,
  artifacts,
  rssFeed,
  intelSummary,
} from "@/lib/stihl-data";
import type { RSSFeedItem } from "@/lib/stihl-types";
import {
  FileText,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Database,
  ChevronRight,
  Users,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TodayPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get latest artifact runs that are new
  const latestArtifacts = artifacts
    .flatMap((artifact) =>
      artifact.runs
        .filter((run) => run.isNew)
        .map((run) => ({
          ...run,
          artifactTitle: artifact.title,
          artifactId: artifact.id,
          format: artifact.format,
        }))
    )
    .slice(0, 4);

  // RSS feed state with localStorage persistence
  const [feedItems, setFeedItems] = useState<RSSFeedItem[]>(rssFeed);

  useEffect(() => {
    const saved = localStorage.getItem("stihl-rss-state");
    if (saved) {
      const savedState = JSON.parse(saved);
      setFeedItems(
        rssFeed.map((item) => ({
          ...item,
          isSaved: savedState[item.id]?.isSaved ?? item.isSaved,
          isIndexed: savedState[item.id]?.isIndexed ?? item.isIndexed,
        }))
      );
    }
  }, []);

  const updateFeedItem = (id: string, updates: Partial<RSSFeedItem>) => {
    setFeedItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      // Persist to localStorage
      const state: Record<string, { isSaved: boolean; isIndexed: boolean }> = {};
      updated.forEach((item) => {
        state[item.id] = { isSaved: !!item.isSaved, isIndexed: !!item.isIndexed };
      });
      localStorage.setItem("stihl-rss-state", JSON.stringify(state));
      return updated;
    });
  };

  const toggleSave = (id: string) => {
    const item = feedItems.find((f) => f.id === id);
    if (item) {
      updateFeedItem(id, { isSaved: !item.isSaved });
    }
  };

  const toggleIndex = (id: string) => {
    const item = feedItems.find((f) => f.id === id);
    if (item) {
      updateFeedItem(id, { isIndexed: !item.isIndexed });
    }
  };

  const getCategoryColor = (category: RSSFeedItem["category"]) => {
    switch (category) {
      case "competitor":
        return "orange";
      case "market":
        return "blue";
      case "digital":
        return "green";
      case "trade":
        return "orange";
      case "regulatory":
        return "neutral";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <PageHeader
        eyebrow="Executive Briefing"
        title="Today"
        description={currentDate}
        updatedAt="8:45 AM ET"
      />

      {/* Signal of the Day + Action Item */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ActionCard
          label="Top Signal"
          content={quickPulse.topSignal}
          accent="orange"
        />
        <ActionCard
          label="Action Item"
          content={quickPulse.actionItem}
          accent="blue"
        />
      </div>

      {/* Quick Stats */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Quick Stats
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickStats.map((stat) => (
            <MetricCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              detail={stat.detail}
            />
          ))}
        </div>
      </section>

      {/* Latest Artifacts */}
      {latestArtifacts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Latest Artifacts
            </h2>
            <Link
              href="/stihl/artifacts"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {latestArtifacts.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-card border border-white/[0.08] hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.artifactTitle}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {item.format}
                      </p>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider bg-primary/20 text-primary rounded">
                    New
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                  <p className="text-[10px] text-muted-foreground">
                    {item.runDate}
                  </p>
                  <a
                    href={item.link}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Intel Summary - Combined Competitors + Digital */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Intel Summary
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Competitors Summary */}
          <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Competitors
                </h3>
                <p className="text-xs text-muted-foreground">
                  {intelSummary.competitors.headline}
                </p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {intelSummary.competitors.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/stihl/competitors"
              className="mt-4 text-xs text-primary hover:underline flex items-center gap-1 pt-3 border-t border-white/[0.06]"
            >
              View full analysis <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Digital Summary */}
          <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Digital
                </h3>
                <p className="text-xs text-muted-foreground">
                  {intelSummary.digital.headline}
                </p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {intelSummary.digital.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/stihl/digital"
              className="mt-4 text-xs text-primary hover:underline flex items-center gap-1 pt-3 border-t border-white/[0.06]"
            >
              View full analysis <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* RSS Content Feed */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Content Feed
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Save and index content for LLM knowledge base
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bookmark className="w-3 h-3" /> Saved:{" "}
              {feedItems.filter((f) => f.isSaved).length}
            </span>
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3" /> Indexed:{" "}
              {feedItems.filter((f) => f.isIndexed).length}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                item.isIndexed
                  ? "bg-card border-secondary/30"
                  : item.isSaved
                  ? "bg-card border-primary/30"
                  : "bg-card border-white/[0.08]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag tone={getCategoryColor(item.category)}>
                      {item.source}
                    </Tag>
                    <Tag tone="neutral">{item.category}</Tag>
                    <span className="text-[10px] text-muted-foreground">
                      {item.publishedAt}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${
                      item.isSaved
                        ? "text-primary hover:text-primary/80"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => toggleSave(item.id)}
                    title={item.isSaved ? "Remove from saved" : "Save for later"}
                  >
                    {item.isSaved ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${
                      item.isIndexed
                        ? "text-secondary hover:text-secondary/80"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => toggleIndex(item.id)}
                    title={
                      item.isIndexed
                        ? "Remove from LLM index"
                        : "Add to LLM index"
                    }
                  >
                    <Database className="w-4 h-4" />
                  </Button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              {(item.isSaved || item.isIndexed) && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                  {item.isSaved && (
                    <span className="text-[10px] text-primary flex items-center gap-1">
                      <BookmarkCheck className="w-3 h-3" /> Saved
                    </span>
                  )}
                  {item.isIndexed && (
                    <span className="text-[10px] text-secondary flex items-center gap-1">
                      <Database className="w-3 h-3" /> Indexed for LLM
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Peer Snapshot */}
      <Panel title="Peer Snapshot" accent="neutral">
        <p className="text-sm text-foreground leading-relaxed">
          {quickPulse.peerSnapshot}
        </p>
      </Panel>
    </div>
  );
}
