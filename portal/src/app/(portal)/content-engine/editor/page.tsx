"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clipboard,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContentPiece, DraftFormat, Channel } from "@/lib/content-engine-types";
import { initialPieces } from "@/lib/content-engine-data";

const STORAGE_KEY = "contentEngine";

const DRAFT_FORMATS: DraftFormat[] = [
  "Opinion Post",
  "Story Post",
  "Proof Post",
  "Origin Essay",
  "Case Study",
  "Thought Leadership",
  "Raw-to-Draft",
  "Repurpose",
];

function EditorContent() {
  const searchParams = useSearchParams();
  const pieceId = searchParams.get("id");

  const [pieces, setPieces] = useState<ContentPiece[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<DraftFormat>("Opinion Post");
  const [sourceOpen, setSourceOpen] = useState(true);
  const [voiceCheckOpen, setVoiceCheckOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

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

  const piece = pieces.find((p) => p.id === pieceId) ?? null;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const updatePiece = useCallback(
    (updates: Partial<ContentPiece>) => {
      if (!piece) return;
      setPieces((prev) => {
        const updated = prev.map((p) =>
          p.id === piece.id ? { ...p, ...updates } : p
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    [piece]
  );

  const handleDraftChange = (value: string) => {
    updatePiece({ draft: value, status: value ? "Drafting" : "Idea" });
  };

  const toggleChannel = (ch: Channel) => {
    if (!piece) return;
    const has = piece.channels.includes(ch);
    const next = has
      ? piece.channels.filter((c) => c !== ch)
      : [...piece.channels, ch];
    if (next.length > 0) updatePiece({ channels: next });
  };

  const handleGenerateDraft = () => {
    showToast("AI drafting coming soon — write manually or paste from Claude");
  };

  const handleVoiceCheck = () => {
    setVoiceCheckOpen((v) => !v);
  };

  const handleCopy = async () => {
    if (!piece?.draft) return;
    await navigator.clipboard.writeText(piece.draft);
    showToast("Copied to clipboard!");
  };

  const handleOpenChannel = () => {
    if (!piece) return;
    if (piece.channels.includes("LinkedIn")) {
      window.open("https://www.linkedin.com/feed/", "_blank");
    } else if (piece.channels.includes("Substack")) {
      window.open("https://substack.com/", "_blank");
    }
  };

  const handleMarkPublished = () => {
    if (!piece) return;
    const url = window.prompt("Enter the published URL:");
    if (!url) return;
    updatePiece({
      status: "Published",
      publishedUrl: url,
      publishedAt: new Date().toISOString(),
    });
    showToast("Marked as published!");
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!pieceId || !piece) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-sm text-muted-foreground">
          Select a piece from the Queue to start editing.
        </p>
        <Link href="/content-engine/queue">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Queue
          </Button>
        </Link>
      </div>
    );
  }

  const draft = piece.draft ?? "";
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const charCount = draft.length;
  const isLinkedIn = piece.channels.includes("LinkedIn");

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-card border border-primary/30 text-sm text-foreground shadow-lg animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center gap-4 flex-wrap">
        <Link href="/content-engine/queue">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>

        <h1 className="text-lg font-semibold text-foreground flex-1 min-w-0 truncate">
          {piece.title}
        </h1>

        {/* Channel pills */}
        <div className="flex items-center gap-1">
          {(["LinkedIn", "Substack"] as Channel[]).map((ch) => (
            <button
              key={ch}
              onClick={() => toggleChannel(ch)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                piece.channels.includes(ch)
                  ? ch === "LinkedIn"
                    ? "bg-blue-400/15 text-blue-400"
                    : "bg-orange-400/15 text-orange-400"
                  : "bg-white/[0.04] text-muted-foreground hover:text-foreground"
              )}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Format dropdown */}
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value as DraftFormat)}
          className="bg-card border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary/40"
        >
          {DRAFT_FORMATS.map((fmt) => (
            <option key={fmt} value={fmt}>
              {fmt}
            </option>
          ))}
        </select>
      </div>

      {/* Source Material */}
      <div className="rounded-xl bg-card border border-white/[0.08]">
        <button
          onClick={() => setSourceOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Source Material
          {sourceOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {sourceOpen && (
          <div className="px-4 pb-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {piece.sourceText}
            </p>
          </div>
        )}
      </div>

      {/* Editor area */}
      <div className="space-y-2">
        <textarea
          value={draft}
          onChange={(e) => handleDraftChange(e.target.value)}
          placeholder="Click 'Generate Draft' or start writing..."
          className="w-full min-h-[300px] bg-card border border-white/[0.08] rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-y focus:border-primary/30 transition-colors leading-relaxed"
        />
        <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
          <span>{wordCount} words</span>
          <span>
            {charCount} chars
            {isLinkedIn && (
              <span
                className={cn(
                  "ml-2",
                  charCount > 3000 ? "text-red-400" : "text-muted-foreground"
                )}
              >
                / 3,000 limit
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={handleGenerateDraft} size="sm">
          <Sparkles className="w-4 h-4 mr-1" />
          Generate Draft
        </Button>
        <Button variant="ghost" size="sm" onClick={handleVoiceCheck}>
          <ShieldCheck className="w-4 h-4 mr-1" />
          Voice Check
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!draft}>
          <Clipboard className="w-4 h-4 mr-1" />
          Copy to Clipboard
        </Button>
        <Button variant="ghost" size="sm" onClick={handleOpenChannel}>
          <ExternalLink className="w-4 h-4 mr-1" />
          {isLinkedIn ? "Open LinkedIn" : "Open Substack"}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleMarkPublished}>
          <CheckCircle className="w-4 h-4 mr-1" />
          Mark Published
        </Button>
      </div>

      {/* Voice Check panel */}
      {voiceCheckOpen && (
        <div className="rounded-xl bg-card border border-white/[0.08] p-5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-semibold text-foreground">85</p>
              <p className="text-xs text-muted-foreground">/ 100</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Voice Score</p>
              <p className="text-xs text-muted-foreground">
                Based on anti-pattern detection and tone analysis
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Issues Found
            </h3>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <p className="text-sm text-foreground">
                &ldquo;leverage&rdquo; detected &mdash; consider a more specific verb
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <p className="text-sm text-foreground">
                Opening is generic &mdash; lead with the story, not the lesson
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
