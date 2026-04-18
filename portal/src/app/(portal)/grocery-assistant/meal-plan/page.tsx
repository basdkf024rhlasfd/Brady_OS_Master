"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  UtensilsCrossed,
  Truck,
  Store,
  ChefHat,
  Sparkles,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import type { WeeklyPlan, DayPlan, MealSlot, NutritionSummary } from "@/lib/grocery-types";
import { DAYS_OF_WEEK, HOUSEHOLD_WEEKLY_CALORIES } from "@/lib/grocery-types";

const STORAGE_KEY = "groceryAssistant_mealPlan";

const mealTypeConfig = {
  cook: { label: "Cook", icon: ChefHat, color: "text-green-400" },
  takeout: { label: "Takeout", icon: Truck, color: "text-orange-400" },
  "eat-out": { label: "Eat Out", icon: Store, color: "text-blue-400" },
  leftovers: { label: "Leftovers", icon: UtensilsCrossed, color: "text-yellow-400" },
};

function getMonday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
}

function emptyPlan(): WeeklyPlan {
  return {
    weekOf: getMonday(),
    days: DAYS_OF_WEEK.map((day) => ({ day, dinner: null })),
    notes: "",
  };
}

function estimateNutrition(plan: WeeklyPlan): NutritionSummary {
  const totalCalories = plan.days.reduce((sum, d) => {
    if (!d.dinner) return sum;
    return sum + (d.dinner.estimatedCalories * d.dinner.servings);
  }, 0);

  // Dinner is roughly 35-40% of daily calories; multiply to estimate full day
  const weeklyCalories = totalCalories * 2.7;
  const ratio = weeklyCalories / HOUSEHOLD_WEEKLY_CALORIES;

  let verdict: NutritionSummary["verdict"] = "on-track";
  if (ratio < 0.7) verdict = "under";
  else if (ratio > 1.3) verdict = "way-over";
  else if (ratio > 1.1) verdict = "over";

  const notes: string[] = [];
  const cookNights = plan.days.filter((d) => d.dinner?.type === "cook").length;
  const eatOutNights = plan.days.filter(
    (d) => d.dinner?.type === "takeout" || d.dinner?.type === "eat-out"
  ).length;
  const emptyNights = plan.days.filter((d) => !d.dinner).length;

  if (emptyNights > 0) notes.push(`${emptyNights} night${emptyNights > 1 ? "s" : ""} unplanned`);
  if (eatOutNights > 2) notes.push("3+ eat-out nights — budget risk");
  if (cookNights >= 5) notes.push("5+ cook nights — solid home cooking week");

  return {
    totalCalories,
    householdDailyTarget: 11200,
    householdWeeklyTarget: HOUSEHOLD_WEEKLY_CALORIES,
    weeklyCalories: Math.round(weeklyCalories),
    ratio,
    verdict,
    notes,
  };
}

function MealEditor({
  day,
  meal,
  onUpdate,
}: {
  day: string;
  meal: MealSlot | null;
  onUpdate: (meal: MealSlot | null) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(meal?.name ?? "");
  const [type, setType] = useState<MealSlot["type"]>(meal?.type ?? "cook");
  const [calories, setCalories] = useState(meal?.estimatedCalories ?? 500);
  const [cost, setCost] = useState(meal?.estimatedCost ?? 0);
  const [prepTime, setPrepTime] = useState(meal?.prepTime ?? 30);

  function save() {
    if (!name.trim()) {
      onUpdate(null);
    } else {
      onUpdate({
        name: name.trim(),
        type,
        servings: 6,
        estimatedCalories: calories,
        estimatedCost: cost,
        prepTime,
        notes: "",
      });
    }
    setEditing(false);
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className={cn(
          "w-full text-left p-3 rounded-lg border transition-colors",
          meal
            ? "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
            : "border-dashed border-white/[0.12] hover:border-white/[0.2] hover:bg-white/[0.02]"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{day}</span>
          {meal && (() => {
            const config = mealTypeConfig[meal.type];
            const Icon = config.icon;
            return <Icon className={cn("h-3.5 w-3.5", config.color)} />;
          })()}
        </div>
        {meal ? (
          <div className="mt-1">
            <p className="text-sm font-medium text-foreground">{meal.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              ~{meal.estimatedCalories * meal.servings} cal &middot; ${meal.estimatedCost.toFixed(0)}
              {meal.type === "cook" && ` · ${meal.prepTime}min`}
            </p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground mt-1">+ Add meal</p>
        )}
      </button>
    );
  }

  return (
    <div className="p-3 rounded-lg border border-primary/30 bg-white/[0.03] space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{day}</span>
        <button onClick={() => setEditing(false)} className="text-xs text-muted-foreground hover:text-foreground">
          Cancel
        </button>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Meal name..."
        autoFocus
        className="w-full bg-transparent text-sm text-foreground border-b border-white/[0.12] pb-1 outline-none focus:border-primary placeholder:text-muted-foreground"
      />

      <div className="flex gap-1">
        {(Object.keys(mealTypeConfig) as MealSlot["type"][]).map((t) => {
          const config = mealTypeConfig[t];
          return (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "flex-1 text-center py-1 rounded text-[10px] font-medium transition-colors",
                type === t
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-white/[0.04]"
              )}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] text-muted-foreground">Cal/serving</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            className="w-full bg-white/[0.04] rounded px-2 py-1 text-xs text-foreground outline-none"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground">Est. cost</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full bg-white/[0.04] rounded px-2 py-1 text-xs text-foreground outline-none"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground">Prep (min)</label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(Number(e.target.value))}
            className="w-full bg-white/[0.04] rounded px-2 py-1 text-xs text-foreground outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={save}
          className="flex-1 bg-primary/20 text-primary text-xs font-medium py-1.5 rounded hover:bg-primary/30 transition-colors"
        >
          Save
        </button>
        <button
          onClick={() => { onUpdate(null); setEditing(false); setName(""); }}
          className="text-xs text-red-400 hover:text-red-300 px-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default function MealPlanPage() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setPlan(saved ? JSON.parse(saved) : emptyPlan());
  }, []);

  function savePlan(updated: WeeklyPlan) {
    setPlan(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function updateDay(dayIndex: number, meal: MealSlot | null) {
    if (!plan) return;
    const updated = { ...plan, days: [...plan.days] };
    updated.days[dayIndex] = { ...updated.days[dayIndex], dinner: meal };
    savePlan(updated);
  }

  async function generateWithAI() {
    setGenerating(true);
    try {
      // Gather all context for smart plan generation
      const scoresRaw = localStorage.getItem("groceryAssistant_mealScores");
      const pantryRaw = localStorage.getItem("groceryAssistant_pantry");
      const budgetRaw = localStorage.getItem("groceryAssistant_budget");
      const scores = scoresRaw ? JSON.parse(scoresRaw) : [];
      const pantry = pantryRaw ? JSON.parse(pantryRaw) : [];
      const budget = budgetRaw ? JSON.parse(budgetRaw) : { target: 250 };

      // Build taste profiles from scores
      const kidNames = ["Lily", "Faith", "Isla", "Quinn", "Luke"];
      const tasteProfiles = kidNames.map((kid) => {
        const kidScores = scores.filter((s: Record<string, Record<string, number>>) => s.scores[kid] !== undefined);
        const favorites = kidScores.filter((s: Record<string, Record<string, number>>) => (s.scores[kid] ?? 0) >= 4).map((s: Record<string, string>) => s.mealName);
        const disliked = kidScores.filter((s: Record<string, Record<string, number>>) => (s.scores[kid] ?? 0) <= 2).map((s: Record<string, string>) => s.mealName);
        return { kid, favorites, disliked, totalRatings: kidScores.length };
      });

      // Recent meals to avoid repeats
      const recentMeals = scores.slice(0, 14).map((s: Record<string, string>) => s.mealName);

      const res = await fetch("/api/grocery-assistant/auto-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasteProfiles, budget, pantry, recentMeals }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.plan) savePlan(data.plan);
      }
    } finally {
      setGenerating(false);
    }
  }

  if (!plan) return null;

  const nutrition = estimateNutrition(plan);
  const totalCost = plan.days.reduce(
    (sum, d) => sum + (d.dinner?.estimatedCost ?? 0),
    0
  );
  const plannedNights = plan.days.filter((d) => d.dinner).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Meal Plan
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Week of {new Date(plan.weekOf + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <button
          onClick={generateWithAI}
          disabled={generating}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {generating ? "Planning..." : "Auto Plan"}
        </button>
      </div>

      {/* Nutrition summary card */}
      <div className={cn(
        "rounded-lg border p-4",
        nutrition.verdict === "on-track" && "border-green-500/20 bg-green-500/[0.03]",
        nutrition.verdict === "under" && "border-yellow-500/20 bg-yellow-500/[0.03]",
        nutrition.verdict === "over" && "border-orange-500/20 bg-orange-500/[0.03]",
        nutrition.verdict === "way-over" && "border-red-500/20 bg-red-500/[0.03]",
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {nutrition.verdict === "on-track" ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertTriangle className={cn(
                "h-4 w-4",
                nutrition.verdict === "way-over" ? "text-red-400" : "text-yellow-400"
              )} />
            )}
            <span className="text-sm font-medium text-foreground">
              Nutrition: {nutrition.verdict === "on-track" ? "On Track" : nutrition.verdict === "under" ? "Under Target" : nutrition.verdict === "over" ? "Slightly Over" : "Way Over"}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            ~{nutrition.weeklyCalories.toLocaleString()} / {nutrition.householdWeeklyTarget.toLocaleString()} cal/week
          </span>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
          <span>{plannedNights}/7 nights planned</span>
          <span>Est. ${totalCost.toFixed(0)} groceries</span>
          {nutrition.notes.map((note, i) => (
            <span key={i}>{note}</span>
          ))}
        </div>
      </div>

      {/* Day cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {plan.days.map((day, i) => (
          <MealEditor
            key={day.day}
            day={day.day}
            meal={day.dinner}
            onUpdate={(meal) => updateDay(i, meal)}
          />
        ))}
      </div>
    </div>
  );
}
