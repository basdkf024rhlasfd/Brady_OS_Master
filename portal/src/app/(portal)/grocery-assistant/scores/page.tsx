"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Star,
  Plus,
  Trash2,
  TrendingUp,
  Heart,
  ThumbsDown,
} from "lucide-react";
import type { MealScore, TasteProfile, WeeklyPlan } from "@/lib/grocery-types";
import { KID_NAMES } from "@/lib/grocery-types";
import type { KidName } from "@/lib/grocery-types";

const SCORES_KEY = "groceryAssistant_mealScores";
const PLAN_KEY = "groceryAssistant_mealPlan";

function StarRating({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange?.(n)}
          disabled={!onChange}
          className={cn(
            "transition-colors",
            onChange && "hover:text-yellow-300 cursor-pointer",
            !onChange && "cursor-default"
          )}
        >
          <Star
            className={cn(
              size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5",
              n <= value ? "fill-yellow-400 text-yellow-400" : "text-white/[0.15]"
            )}
          />
        </button>
      ))}
    </div>
  );
}

export default function ScoresPage() {
  const [scores, setScores] = useState<MealScore[]>([]);
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [addingScore, setAddingScore] = useState(false);
  const [scoreMeal, setScoreMeal] = useState("");
  const [scoreDate, setScoreDate] = useState(new Date().toISOString().split("T")[0]);
  const [kidScores, setKidScores] = useState<Partial<Record<KidName, number>>>({});

  useEffect(() => {
    const savedScores = localStorage.getItem(SCORES_KEY);
    const savedPlan = localStorage.getItem(PLAN_KEY);
    if (savedScores) setScores(JSON.parse(savedScores));
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    setLoaded(true);
  }, []);

  function saveScores(updated: MealScore[]) {
    setScores(updated);
    localStorage.setItem(SCORES_KEY, JSON.stringify(updated));
  }

  function addScore() {
    if (!scoreMeal.trim()) return;
    const kidVals = Object.values(kidScores).filter((v): v is number => v !== undefined);
    const avg = kidVals.length > 0 ? kidVals.reduce((a, b) => a + b, 0) / kidVals.length : 0;

    const score: MealScore = {
      id: crypto.randomUUID(),
      mealName: scoreMeal.trim(),
      date: scoreDate,
      scores: { ...kidScores },
      avgScore: Math.round(avg * 10) / 10,
      notes: "",
    };
    saveScores([score, ...scores]);
    setScoreMeal("");
    setKidScores({});
    setAddingScore(false);
  }

  function removeScore(id: string) {
    saveScores(scores.filter((s) => s.id !== id));
  }

  // Compute taste profiles
  const profiles = useMemo((): TasteProfile[] => {
    return KID_NAMES.map((kid) => {
      const kidScoreEntries = scores.filter((s) => s.scores[kid] !== undefined);
      const totalRatings = kidScoreEntries.length;
      const avgScore =
        totalRatings > 0
          ? kidScoreEntries.reduce((sum, s) => sum + (s.scores[kid] ?? 0), 0) / totalRatings
          : 0;

      const favorites = kidScoreEntries
        .filter((s) => (s.scores[kid] ?? 0) >= 4)
        .map((s) => s.mealName);
      const disliked = kidScoreEntries
        .filter((s) => (s.scores[kid] ?? 0) <= 2)
        .map((s) => s.mealName);

      return { kid, favorites, disliked, avgScore: Math.round(avgScore * 10) / 10, totalRatings };
    });
  }, [scores]);

  // Meal suggestions from this week's plan
  const planMeals = useMemo(() => {
    if (!plan) return [];
    return plan.days
      .filter((d) => d.dinner)
      .map((d) => d.dinner!.name);
  }, [plan]);

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Meal Scores
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Rate meals after dinner. Scores shape future meal plans.
          </p>
        </div>
        <button
          onClick={() => setAddingScore(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Score a Meal
        </button>
      </div>

      {/* Add score form */}
      {addingScore && (
        <div className="rounded-lg border border-primary/30 bg-white/[0.03] p-4 space-y-4">
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Meal</label>
            {planMeals.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1.5 mb-2">
                {planMeals.map((meal) => (
                  <button
                    key={meal}
                    onClick={() => setScoreMeal(meal)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                      scoreMeal === meal
                        ? "bg-primary/15 text-primary"
                        : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.06]"
                    )}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            ) : null}
            <input
              type="text"
              value={scoreMeal}
              onChange={(e) => setScoreMeal(e.target.value)}
              placeholder="Or type meal name..."
              className="w-full bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Date</label>
            <input
              type="date"
              value={scoreDate}
              onChange={(e) => setScoreDate(e.target.value)}
              className="w-full bg-white/[0.04] rounded px-3 py-2 text-sm text-foreground outline-none mt-1"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Kid Ratings</label>
            {KID_NAMES.map((kid) => (
              <div key={kid} className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground w-16">{kid}</span>
                <StarRating
                  value={kidScores[kid] ?? 0}
                  onChange={(v) => setKidScores((prev) => ({ ...prev, [kid]: v }))}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={addScore}
              className="bg-primary/20 text-primary text-xs font-medium px-4 py-1.5 rounded hover:bg-primary/30 transition-colors"
            >
              Save Score
            </button>
            <button
              onClick={() => { setAddingScore(false); setKidScores({}); setScoreMeal(""); }}
              className="text-xs text-muted-foreground hover:text-foreground px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Taste profiles */}
      {scores.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Family Taste Profiles
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => (
              <div
                key={profile.kid}
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{profile.kid}</span>
                  <div className="flex items-center gap-1.5">
                    <StarRating value={Math.round(profile.avgScore)} size="sm" />
                    <span className="text-xs text-muted-foreground">{profile.avgScore}</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">{profile.totalRatings} meals rated</p>

                {profile.favorites.length > 0 && (
                  <div>
                    <p className="text-[10px] text-green-400 flex items-center gap-1">
                      <Heart className="h-2.5 w-2.5" /> Favorites
                    </p>
                    <p className="text-xs text-muted-foreground">{profile.favorites.slice(0, 3).join(", ")}</p>
                  </div>
                )}
                {profile.disliked.length > 0 && (
                  <div>
                    <p className="text-[10px] text-red-400 flex items-center gap-1">
                      <ThumbsDown className="h-2.5 w-2.5" /> Skip
                    </p>
                    <p className="text-xs text-muted-foreground">{profile.disliked.slice(0, 3).join(", ")}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Score history */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">History</h3>
        {scores.length === 0 ? (
          <div className="text-center py-8 rounded-lg border border-dashed border-white/[0.12]">
            <Star className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No scores yet. Rate your first meal after dinner tonight.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-white/[0.08] divide-y divide-white/[0.04]">
            {scores.slice(0, 20).map((score) => (
              <div key={score.id} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{score.mealName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(score.date + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">{score.avgScore}</span>
                    </div>
                    <button
                      onClick={() => removeScore(score.id)}
                      className="text-muted-foreground hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 mt-1.5">
                  {KID_NAMES.map((kid) => {
                    const val = score.scores[kid];
                    if (val === undefined) return null;
                    return (
                      <span key={kid} className="text-[10px] text-muted-foreground">
                        {kid}: {val}★
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
