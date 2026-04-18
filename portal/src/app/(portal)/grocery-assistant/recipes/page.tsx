"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Sparkles,
  Loader2,
  Clock,
  Users,
  Copy,
  Check,
  ExternalLink,
  ChefHat,
} from "lucide-react";
import type { WeeklyPlan } from "@/lib/grocery-types";

const PLAN_KEY = "groceryAssistant_mealPlan";
const RECIPES_KEY = "groceryAssistant_recipes";

interface Recipe {
  id: string;
  mealName: string;
  servings: number;
  prepTime: number;
  ingredients: string[];
  steps: string[];
  tips: string[];
  chatPrompt: string;
}

export default function RecipesPage() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [recipes, setRecipes] = useState<Record<string, Recipe>>({});
  const [generating, setGenerating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem(PLAN_KEY);
    const savedRecipes = localStorage.getItem(RECIPES_KEY);
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedRecipes) setRecipes(JSON.parse(savedRecipes));
    setLoaded(true);
  }, []);

  function saveRecipes(updated: Record<string, Recipe>) {
    setRecipes(updated);
    localStorage.setItem(RECIPES_KEY, JSON.stringify(updated));
  }

  async function generateRecipe(mealName: string) {
    setGenerating(mealName);
    try {
      const res = await fetch("/api/grocery-assistant/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealName }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.recipe) {
          saveRecipes({ ...recipes, [mealName]: data.recipe });
          setExpanded(mealName);
        }
      }
    } finally {
      setGenerating(null);
    }
  }

  async function copyPrompt(mealName: string) {
    const recipe = recipes[mealName];
    if (!recipe) return;
    await navigator.clipboard.writeText(recipe.chatPrompt);
    setCopied(mealName);
    setTimeout(() => setCopied(null), 2000);
  }

  const meals = plan?.days
    .filter((d) => d.dinner && d.dinner.type === "cook")
    .map((d) => d.dinner!) ?? [];

  if (!loaded) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Recipes
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Recipes for this week&apos;s cook nights. Tap &quot;Cook with me&quot; for an AI cooking companion.
        </p>
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-8 rounded-lg border border-dashed border-white/[0.12]">
          <ChefHat className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Add cook nights to your meal plan first, then come back for recipes.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => {
            const recipe = recipes[meal.name];
            const isExpanded = expanded === meal.name;
            const isGenerating = generating === meal.name;
            const isCopied = copied === meal.name;

            return (
              <div
                key={meal.name}
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] overflow-hidden"
              >
                {/* Meal header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {meal.name}
                    </h3>
                    <div className="flex gap-3 mt-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {meal.servings} servings
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {meal.prepTime} min
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {recipe && (
                      <button
                        onClick={() => copyPrompt(meal.name)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                          isCopied
                            ? "bg-green-500/15 text-green-400"
                            : "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
                        )}
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Cook with me
                          </>
                        )}
                      </button>
                    )}

                    {!recipe ? (
                      <button
                        onClick={() => generateRecipe(meal.name)}
                        disabled={isGenerating}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
                      >
                        {isGenerating ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3" />
                        )}
                        {isGenerating ? "Generating..." : "Get Recipe"}
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setExpanded(isExpanded ? null : meal.name)
                        }
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
                      >
                        {isExpanded ? "Collapse" : "Expand"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Recipe details */}
                {recipe && isExpanded && (
                  <div className="border-t border-white/[0.06] px-4 py-4 space-y-4">
                    {/* Ingredients */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                        Ingredients
                      </h4>
                      <ul className="space-y-1">
                        {recipe.ingredients.map((ing, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-white/[0.2] mt-1">-</span>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Steps */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                        Steps
                      </h4>
                      <ol className="space-y-2">
                        {recipe.steps.map((step, i) => (
                          <li
                            key={i}
                            className="text-sm text-foreground flex items-start gap-3"
                          >
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tips */}
                    {recipe.tips.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-yellow-400 mb-2">
                          Family Tips
                        </h4>
                        <ul className="space-y-1">
                          {recipe.tips.map((tip, i) => (
                            <li
                              key={i}
                              className="text-xs text-muted-foreground"
                            >
                              - {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Chat prompt info */}
                    <div className="rounded-lg bg-orange-500/[0.05] border border-orange-500/20 p-3">
                      <p className="text-xs text-orange-400 font-medium mb-1 flex items-center gap-1.5">
                        <ChefHat className="h-3 w-3" />
                        Cook with me prompt
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Click &quot;Cook with me&quot; to copy a custom AI cooking companion prompt.
                        Paste it into Claude or ChatGPT for step-by-step guidance,
                        kid engagement ideas, and substitution help.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
