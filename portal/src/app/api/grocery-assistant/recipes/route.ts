import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { mealName } = await request.json();
    if (!mealName) {
      return NextResponse.json({ error: "Meal name required" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `Generate a recipe for "${mealName}" scaled for the Smallwood family (6 people: 1 adult dad, 2 teen girls ages 17 and 14, and 3 nine-year-olds including triplets).

Return ONLY a JSON object with this structure:
{
  "recipe": {
    "id": "${crypto.randomUUID()}",
    "mealName": "${mealName}",
    "servings": 6,
    "prepTime": (minutes),
    "ingredients": ["ingredient with quantity"],
    "steps": ["clear step-by-step instruction"],
    "tips": [
      "kid engagement tip (e.g. 'Let the 9-year-olds measure dry ingredients')",
      "time-saving tip for a busy single dad",
      "substitution if you're missing something"
    ],
    "chatPrompt": "(see below)"
  }
}

For the chatPrompt field, generate a complete prompt that Brady can paste into Claude or ChatGPT to get a live AI cooking companion. The prompt should include:

1. The full recipe (ingredients + steps)
2. Custom instructions:
   - "You are a friendly cooking assistant helping a single dad (Brady) cook ${mealName} with his kids tonight."
   - "The family: Brady (dad), Lily (17), Faith (14), Isla (9), Quinn (9), Luke (9). The triplets are eager helpers."
   - "Guide me step by step. After each step, suggest something a kid can help with."
   - "If I'm missing an ingredient, suggest a substitution from common pantry items."
   - "Keep it fun and encouraging. Make dinner time feel like a team activity."
   - "If I upload a photo of my progress, give feedback and suggest what to do next."
3. An opening message like "Let's cook ${mealName} tonight! Here's what we'll need..."

Make the chatPrompt a single string with newlines. It should be copy-paste ready.

No markdown wrapping. Just the JSON object.`,
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
