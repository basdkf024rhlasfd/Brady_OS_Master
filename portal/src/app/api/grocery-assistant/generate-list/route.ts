import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { action, plan, pantry, currentPlan } = body;

    if (action === "suggest-meals") {
      return handleSuggestMeals(currentPlan);
    }

    if (action === "generate-list") {
      return handleGenerateList(plan, pantry);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handleSuggestMeals(currentPlan: unknown) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: `You are a meal planning assistant for the Smallwood family:
- Brady (adult dad), Lily (17), Faith (14), Isla (9), Quinn (9), Luke (9)
- Bentonville, AR — Walmart+ delivery
- Target: ~11,200 calories/day household, ~78,400/week
- Budget-conscious, kid-friendly meals, reasonable prep time for a single dad
- Mix of cook nights (4-5), takeout (1), eat-out (1), leftovers (1)

Current plan state: ${JSON.stringify(currentPlan)}

Generate a complete weekly dinner plan. For each day, provide:
- name: meal name
- type: "cook" | "takeout" | "eat-out" | "leftovers"
- servings: 6 (always)
- estimatedCalories: per serving
- estimatedCost: total for the meal (groceries or restaurant)
- prepTime: minutes (0 for non-cook)
- notes: empty string

Return ONLY a JSON object matching this structure exactly:
{
  "plan": {
    "weekOf": "${new Date().toISOString().split("T")[0]}",
    "days": [
      {"day": "Monday", "dinner": {meal object}},
      ...
    ],
    "notes": ""
  }
}

No markdown, no explanation. Just JSON.`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    return NextResponse.json(parsed || { error: "Could not parse response" });
  } catch {
    return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
  }
}

async function handleGenerateList(plan: unknown, pantry: unknown) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `You are a grocery list generator for the Smallwood family (6 people, Bentonville AR, Walmart+ delivery).

MEAL PLAN FOR THE WEEK:
${JSON.stringify(plan)}

CURRENT PANTRY INVENTORY (already have these — skip them):
${JSON.stringify(pantry || [])}

Generate a complete Walmart shopping list. For each item:
- name: specific product name (e.g. "Kraft Mac & Cheese" not "pasta")
- quantity: amount needed (e.g. "3 boxes", "2 lbs", "1 gallon")
- category: one of: Meat & Protein, Pasta & Grains, Sauces & Soups, Dairy, Produce, Frozen & Canned, Baking & Dessert, Snacks, Beverages, Household, Other
- fromMeal: which meal needs this (or null for staples)

Rules:
1. Scale quantities for 6 people
2. Skip anything already in the pantry inventory
3. Include staples that might be running low (milk, bread, eggs, fruit)
4. Group by category for efficient shopping
5. Be specific with brands when it matters (e.g. Kraft, Prego)

Return ONLY a JSON object: {"items": [{item objects}]}
No markdown, no explanation.`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    return NextResponse.json(parsed || { error: "Could not parse response" });
  } catch {
    return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
  }
}
