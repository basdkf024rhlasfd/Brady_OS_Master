import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const mediaType = file.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
    if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(mediaType)) {
      return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: "text",
              text: `You are a pantry inventory scanner for a family of 6 (1 adult, 2 teens, 3 nine-year-olds) in Bentonville, AR.

Look at this photo and identify every food item you can see. For each item, provide:
- name: the item name (be specific, e.g. "Kraft Mac & Cheese" not just "pasta")
- quantity: estimated amount (e.g. "1 box", "half gallon", "3 cans")
- category: one of: Meat & Protein, Pasta & Grains, Sauces & Soups, Dairy, Produce, Frozen & Canned, Baking & Dessert, Snacks, Beverages, Household, Other
- confidence: 0.0 to 1.0 how sure you are about the identification

Return ONLY a JSON object with an "items" array. No markdown, no explanation.
Example: {"items":[{"name":"Prego Spaghetti Sauce","quantity":"2 jars","category":"Sauces & Soups","confidence":0.95}]}`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Parse JSON from response, handling potential markdown wrapping
    let parsed;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { items: [] };
    } catch {
      parsed = { items: [] };
    }

    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
