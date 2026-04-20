import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { walmartItems, totalHistoricalSpend, topItemsBySpend, recentOrders } from "@/lib/grocery-data";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();

    if (body.action === "price-compare") {
      return handlePriceCompare(body.items);
    }

    return handleBudgetAnalysis(body.budget);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handleBudgetAnalysis(budget: unknown) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are a family food budget advisor for the Smallwood family:
- Single dad Brady + 5 kids (ages 17, 14, 9, 9, 9) in Bentonville, AR
- Uses Walmart+ delivery (no in-store shopping)
- Total food budget covers: groceries, dining out/takeout, school lunch funds, and delivery fees

Here is Brady's Walmart purchase history for context:
- Total historical spend: $${totalHistoricalSpend.toFixed(2)} across ${walmartItems.length} distinct items
- Top 10 items by spend: ${JSON.stringify(topItemsBySpend(10).map(i => ({ name: i.name, spend: i.totalSpend, purchases: i.purchases })))}
- Recent orders: ${JSON.stringify(recentOrders().slice(0, 5).map(o => ({ date: o.date, total: o.total, items: o.itemCount, type: o.type })))}

Now analyze this week's budget data and provide practical, actionable advice:

${JSON.stringify(budget)}

Use the purchase history to identify patterns (repeat buys, price trends, bulk opportunities).

Write a concise analysis (3-5 paragraphs) covering:
1. How they're tracking vs. their weekly target
2. Spending pattern (which categories are heavy/light)
3. Delivery fee optimization (are they batching orders or making too many small runs?)
4. 2-3 specific, actionable tips to save money next week
5. Any flags (e.g., dining out too much, school funds running low, etc.)

Be direct, conversational, specific. Not generic advice — react to THIS data.
Return a JSON object: {"analysis": "your text here"}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return NextResponse.json(jsonMatch ? JSON.parse(jsonMatch[0]) : { analysis: text });
  } catch {
    return NextResponse.json({ analysis: text });
  }
}

async function handlePriceCompare(items: { name: string; quantity: string }[]) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `You are a grocery price comparison engine for Bentonville, AR.

Compare prices for these items across three stores. Use your knowledge of typical pricing in NW Arkansas (these are major national/regional chains, you know their general price positioning):

ITEMS TO COMPARE:
${JSON.stringify(items)}

STORES AND THEIR DELIVERY MODELS:
1. **Walmart** — Walmart+ membership ($12.95/month = ~$3.24/week). Free delivery on $35+ orders.
2. **Sam's Club** — Membership ($50/year = ~$0.96/week). Delivery via Instacart or Sam's app (~$5.99/order for Plus members, ~$7.99 for Club members).
3. **Aldi** — No membership. Delivery via Instacart (~$7.99/order + ~15% markup on items).

For each store provide:
- Estimated item prices (use realistic Bentonville/NW Arkansas pricing)
- Subtotal for all items
- Weekly delivery cost (amortized membership + per-order fee assuming 1 delivery/week)
- Total weekly cost = subtotal + delivery

Also provide:
- Which store is the best total value (including delivery)
- Estimated weekly savings vs. the most expensive option
- 3-5 specific recommendations (e.g., "buy chicken and bulk staples at Sam's, produce at Walmart")

Return ONLY a JSON object:
{
  "stores": [
    {
      "store": "Walmart",
      "items": [{"name": "item", "price": 3.99, "unit": "each"}],
      "subtotal": 0,
      "deliveryFee": 3.24,
      "membershipCostPerWeek": 0,
      "totalWeeklyCost": 0
    }
  ],
  "bestStore": "Walmart",
  "weeklySavings": 0,
  "recommendations": ["specific tip 1", "specific tip 2"]
}

No markdown. No explanation. Just JSON.`,
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
}
