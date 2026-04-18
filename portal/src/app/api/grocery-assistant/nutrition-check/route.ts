import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { plan } = await request.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `You are a family nutrition advisor. Analyze this weekly dinner meal plan for the Smallwood family:
- 1 adult male (~2,400 cal/day)
- 2 teen girls (17 and 14, ~2,000 and ~1,800 cal/day)
- 3 nine-year-olds (2 girls, 1 boy, ~1,600-1,800 cal/day each)
- Household total: ~11,200 cal/day, ~78,400 cal/week

MEAL PLAN:
${JSON.stringify(plan)}

Analyze and return ONLY a JSON object:
{
  "weeklyDinnerCalories": (total dinner calories for the household this week),
  "estimatedWeeklyTotal": (projected full-day calories based on dinner being ~35% of daily intake),
  "targetWeekly": 78400,
  "ratio": (estimatedWeeklyTotal / targetWeekly),
  "verdict": "under" | "on-track" | "over" | "way-over",
  "proteinDays": (number of days with adequate protein),
  "veggieDays": (number of days with vegetables),
  "processedFoodDays": (number of days that are primarily processed/packaged food),
  "suggestions": ["specific, actionable suggestion 1", "suggestion 2", "suggestion 3"],
  "swaps": [{"meal": "original", "suggestion": "healthier alternative", "reason": "why"}]
}

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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
