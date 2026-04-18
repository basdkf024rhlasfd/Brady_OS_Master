import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { tasteProfiles, budget, pantry, recentMeals } = await request.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `You are the Smallwood family meal planning AI. Generate an optimized weekly dinner plan.

FAMILY: Brady (dad), Lily (17), Faith (14), Isla (9), Quinn (9), Luke (9) — Bentonville, AR
HOUSEHOLD CALORIES: ~11,200/day target (~78,400/week)
DELIVERY: Walmart+ (optimize for 1 delivery/week to minimize fees)

TASTE PROFILES (from kid ratings — respect these):
${JSON.stringify(tasteProfiles || [], null, 2)}

BUDGET TARGET: $${budget?.target || 250}/week total food spend (groceries + dining + delivery)

CURRENT PANTRY (already have these ingredients):
${JSON.stringify(pantry || [], null, 2)}

RECENT MEALS (avoid repeats from last 2 weeks):
${JSON.stringify(recentMeals || [], null, 2)}

OPTIMIZATION RULES:
1. AVOID meals any kid scored ≤2 (check taste profiles)
2. FAVOR meals kids scored ≥4 (rotate favorites, don't repeat every week)
3. 4-5 COOK NIGHTS with realistic prep times for a single dad (≤45 min)
4. 1 TAKEOUT NIGHT (suggest the cheapest family-friendly option)
5. 1 EAT-OUT or LEFTOVERS night
6. Use pantry items first to reduce grocery spend
7. Include at least 2 nights with vegetables as a main component
8. Keep estimated grocery cost under budget target minus ~$40 for dining/delivery
9. Suggest 1 NEW MEAL the family hasn't tried (mark it clearly)
10. Scale all servings for 6 people

Return ONLY a JSON object:
{
  "plan": {
    "weekOf": "${new Date().toISOString().split("T")[0]}",
    "days": [
      {
        "day": "Monday",
        "dinner": {
          "name": "Meal Name",
          "type": "cook",
          "servings": 6,
          "estimatedCalories": 500,
          "estimatedCost": 12,
          "prepTime": 30,
          "notes": "Uses pantry chicken + new recipe"
        }
      }
    ],
    "notes": "Overall plan notes"
  },
  "insights": {
    "estimatedGroceryCost": 0,
    "estimatedDiningCost": 0,
    "estimatedDeliveryFee": 3.24,
    "totalEstimatedCost": 0,
    "budgetStatus": "under" | "at" | "over",
    "nutritionNotes": ["note about the week's nutrition"],
    "newMeal": "Name of the new suggestion",
    "pantryItemsUsed": ["items from pantry this plan uses"]
  }
}
No markdown.`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return NextResponse.json(jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Could not parse" });
    } catch {
      return NextResponse.json({ error: "Failed to parse response" }, { status: 500 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
