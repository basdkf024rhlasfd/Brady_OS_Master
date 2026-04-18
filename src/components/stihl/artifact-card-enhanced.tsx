"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/stihl/briefing-components";
import type { ArtifactExample, ArtifactRun } from "@/lib/stihl-types";
import {
  Clock,
  ChevronDown,
  ChevronUp,
  Play,
  ExternalLink,
  Calendar,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ArtifactCardEnhancedProps {
  artifact: ArtifactExample;
  className?: string;
}

export function ArtifactCardEnhanced({
  artifact,
  className,
}: ArtifactCardEnhancedProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(
    artifact.schedule?.enabled ?? false
  );
  const [showAdHocModal, setShowAdHocModal] = useState(false);
  const [adHocContext, setAdHocContext] = useState("");
  const [readRuns, setReadRuns] = useState<string[]>([]);

  // Load read runs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`artifact-read-${artifact.id}`);
    if (stored) {
      setReadRuns(JSON.parse(stored));
    }
  }, [artifact.id]);

  // Mark a run as read
  const markAsRead = (runId: string) => {
    const updated = [...readRuns, runId];
    setReadRuns(updated);
    localStorage.setItem(
      `artifact-read-${artifact.id}`,
      JSON.stringify(updated)
    );
  };

  // Check if a run is new (unread)
  const isRunNew = (run: ArtifactRun) => {
    return run.isNew && !readRuns.includes(run.id);
  };

  // Get latest run
  const latestRun = artifact.runs[0];
  const hasNewRuns = artifact.runs.some(isRunNew);

  // Handle ad hoc request submission
  const handleAdHocSubmit = () => {
    // In a real app, this would send to an API
    console.log("Ad hoc request for:", artifact.title, "Context:", adHocContext);
    setAdHocContext("");
    setShowAdHocModal(false);
  };

  return (
    <>
      <div
        className={cn(
          "rounded-2xl border border-white/[0.08] bg-card overflow-hidden",
          className
        )}
      >
        {/* Header Section */}
        <div className="p-5 border-b border-white/[0.08]">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-foreground">
                {artifact.title}
              </h3>
              {hasNewRuns && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-primary text-primary-foreground">
                  New
                </span>
              )}
            </div>
            <Tag tone="blue">{artifact.format}</Tag>
          </div>

          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            {artifact.audience}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {artifact.description}
          </p>
        </div>

        {/* Schedule Section */}
        {artifact.schedule && (
          <div className="px-5 py-4 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Schedule
                  </span>
                </div>
                <Switch
                  checked={scheduleEnabled}
                  onCheckedChange={setScheduleEnabled}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              {scheduleEnabled && (
                <div className="flex items-center gap-2 text-xs">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {artifact.schedule.frequency}
                  </span>
                  <span className="text-muted-foreground">at</span>
                  <span className="text-foreground font-mono">
                    {artifact.schedule.time}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Latest Run + Ad Hoc Section */}
        <div className="px-5 py-4 border-b border-white/[0.08]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Latest Run
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdHocModal(true)}
              className="h-7 px-2 text-xs gap-1.5 text-primary hover:text-primary hover:bg-primary/10"
            >
              <Play className="h-3 w-3" />
              Run Ad Hoc
            </Button>
          </div>

          {latestRun ? (
            <a
              href={latestRun.link}
              onClick={() => markAsRead(latestRun.id)}
              className="group flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    latestRun.status === "completed" && "bg-stihl-emerald",
                    latestRun.status === "running" && "bg-primary animate-pulse",
                    latestRun.status === "failed" && "bg-stihl-red"
                  )}
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {latestRun.runDate}
                </span>
                {isRunNew(latestRun) && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-primary/20 text-primary">
                    New
                  </span>
                )}
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">No runs yet</p>
          )}
        </div>

        {/* Expandable Run History */}
        <div className="px-5 py-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">
              Run History ({artifact.runs.length})
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-1 max-h-48 overflow-y-auto">
              {artifact.runs.map((run) => (
                <a
                  key={run.id}
                  href={run.link}
                  onClick={() => markAsRead(run.id)}
                  className="group flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        run.status === "completed" && "bg-stihl-emerald",
                        run.status === "running" && "bg-primary animate-pulse",
                        run.status === "failed" && "bg-stihl-red"
                      )}
                    />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {run.runDate}
                    </span>
                    {isRunNew(run) && (
                      <span className="px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded bg-primary/20 text-primary">
                        New
                      </span>
                    )}
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Sections Footer */}
        <div className="px-5 py-4 border-t border-white/[0.08] bg-white/[0.02]">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Sections
          </p>
          <div className="flex flex-wrap gap-1">
            {artifact.sections.map((section) => (
              <span
                key={section}
                className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-muted-foreground"
              >
                {section}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ad Hoc Request Modal */}
      <Dialog open={showAdHocModal} onOpenChange={setShowAdHocModal}>
        <DialogContent className="bg-card border-white/[0.08] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              Run Ad Hoc: {artifact.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Provide additional context for this one-time run. This request
              will be sent for processing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                Context / Special Instructions
              </label>
              <Textarea
                value={adHocContext}
                onChange={(e) => setAdHocContext(e.target.value)}
                placeholder="e.g., Focus on Milwaukee's Q1 earnings, Include pricing comparison for 500-series chainsaws..."
                className="min-h-[120px] bg-muted/50 border-white/[0.08] text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowAdHocModal(false)}
                className="flex-1 border border-white/[0.08]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAdHocSubmit}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Send className="h-4 w-4" />
                Send Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
