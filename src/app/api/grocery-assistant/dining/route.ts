import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `You are a family dining guide for NW Arkansas (Bentonville, Rogers, Springdale, Fayetteville area).

The Smallwood family: single dad Brady + 5 kids (ages 17, 14, 9, 9, 9). They need:
- Family-friendly restaurants
- Kids-eat-free deals (specify which day of the week)
- Budget-conscious (family of 6 eating out is expensive)
- Variety of cuisines
- Takeout/delivery options welcome

Generate 10-12 family-friendly restaurant recommendations for NW Arkansas. For each:
- name: restaurant name (real places in NWA)
- cuisine: type of food
- kidsEatFree: day/deal description, or null if none
- estimatedCostFamily: estimated total cost for family of 6 (in dollars)
- address: city or neighborhood (e.g. "Bentonville" or "Rogers")
- rating: 1-5 family-friendliness rating
- familyFriendly: true
- notes: one-line tip (e.g. "big outdoor patio", "fast service", "great for picky eaters")
- orderUrl: null (user will find their own links)

Include a mix of: sit-down restaurants, fast casual, pizza, Mexican, Asian, American, and BBQ.

Return ONLY a JSON object: {"restaurants": [{restaurant objects}]}
No markdown, no explanation.`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return NextResponse.json(jsonMatch ? JSON.parse(jsonMatch[0]) : { restaurants: [] });
    } catch {
      return NextResponse.json({ restaurants: [] });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
