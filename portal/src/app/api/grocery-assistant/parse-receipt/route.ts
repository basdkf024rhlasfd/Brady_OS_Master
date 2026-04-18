import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { text, source } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Receipt text required" }, { status: 400 });
    }

    const isMonarch = source === "monarch";

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: isMonarch
            ? `Parse this Monarch Money CSV export and extract ONLY food-related transactions.

CSV DATA:
${text}

Rules:
1. Include transactions from: grocery stores (Walmart, Sam's Club, Aldi, Harps, Kroger, etc.), restaurants, fast food, DoorDash, Uber Eats, Grubhub, Domino's, pizza places, school lunch/cafeteria payments
2. EXCLUDE non-food transactions (gas, Amazon, subscriptions, utilities, etc.)
3. Categorize each as: "groceries", "dining", "school-lunch", or "delivery-fee"
4. If a Walmart order has a delivery fee line, split it into a separate "delivery-fee" entry
5. Use the merchant name as the store

Return ONLY a JSON object:
{
  "entries": [
    {
      "date": "2026-04-15",
      "amount": 45.67,
      "category": "groceries",
      "store": "Walmart",
      "description": "Weekly grocery order"
    }
  ],
  "summary": {
    "totalFood": 0,
    "groceries": 0,
    "dining": 0,
    "schoolLunch": 0,
    "deliveryFees": 0,
    "dateRange": "Apr 1 - Apr 15"
  }
}
No markdown.`
            : `Parse this Walmart receipt/email and extract line items.

RECEIPT TEXT:
${text}

Extract each item with its price. Separate delivery fee, tax, and tip if present.

Return ONLY a JSON object:
{
  "entries": [
    {
      "date": "${new Date().toISOString().split("T")[0]}",
      "amount": 0,
      "category": "groceries",
      "store": "Walmart",
      "description": "Item name"
    }
  ],
  "deliveryFee": 0,
  "tax": 0,
  "tip": 0,
  "subtotal": 0,
  "total": 0
}
No markdown.`,
        },
      ],
    });

    const responseText = response.content[0].type === "text" ? response.content[0].text : "";
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      return NextResponse.json(jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Could not parse" });
    } catch {
      return NextResponse.json({ error: "Failed to parse response" }, { status: 500 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
