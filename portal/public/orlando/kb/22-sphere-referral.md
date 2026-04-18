# Sphere & Referral Management

Database segmentation, outreach cadence, life event tracking, and referral systems for Orlando real estate agents.

---

## Database Segmentation

Categorize every contact in your database into tiers. This determines outreach frequency, channel, and investment of time.

### Tier Definitions

| Tier | Who | Criteria | Size Target |
|------|-----|---------|-------------|
| **A — Inner Circle** | Past clients (last 2 years), active referral sources, close friends/family in real estate cycle | Transacted with you, referred someone, or will transact within 12 months | 25–50 people |
| **B — Active Sphere** | Past clients (2–5 years), professional contacts (lenders, attorneys, PMs), friends who know you're in RE | Know you personally, aware of your business, likely to refer when asked | 50–150 people |
| **C — Wider Network** | Past clients (5+ years), acquaintances, social media connections, community contacts | Know who you are but don't think of you for RE without prompting | 150–500 people |
| **D — Database** | Leads (never transacted), cold contacts, imported lists, event attendees | In your system but no personal relationship | 500+ |

### Tagging Methodology

Tag each contact with these attributes in your CRM:

| Tag Category | Options | Purpose |
|-------------|---------|---------|
| **Tier** | A, B, C, D | Determines outreach cadence |
| **Status** | Past client, Sphere, Lead, Professional, Family | Shapes message tone |
| **Transaction date** | Date of last closing | Triggers anniversary touches |
| **Property type** | SFR, Condo, Townhome, Investment, STR | Informs market update content |
| **Area** | ZIP code or neighborhood | Enables area-specific market data |
| **Life stage** | Starter home, Growing family, Empty nest, Investor, Retired | Predicts next move |
| **Referral history** | # of referrals sent, # converted | Identifies top referral sources |
| **Last contact date** | Date of most recent personal touch | Prevents contacts going cold |
| **Communication preference** | Call, Text, Email, Social | Respect preferred channel |
| **Notes** | Free text | Kids' names, hobbies, job changes, etc. |

### Quarterly Re-Evaluation

Every 90 days, review and adjust tiers:

| Action | Trigger |
|--------|---------|
| **Promote C → B** | Engaged with your content 3+ times, attended event, or responded to outreach |
| **Promote B → A** | Sent a referral, asked about buying/selling, or is within 6 months of likely transaction |
| **Demote A → B** | No engagement in 6+ months, no referrals in 12+ months |
| **Demote B → C** | No response to 3+ outreach attempts |
| **Demote C → D** | Email bounced, phone disconnected, no engagement in 12+ months |
| **Remove from database** | Unsubscribed, requested removal, or clearly no future connection |

---

## Monthly Market Update

Content template for a monthly email or social post pulling from market stats. Sent to tiers A, B, and C.

### Email Template

```
Subject: Orlando Market Update — [Month Year]

Hi [First Name],

Here's what's happening in the Orlando real estate
market this month:

📊 MARKET SNAPSHOT
  Median home price: $[Amount] ([+/-X]% vs last year)
  Active listings: [Number] ([+/-X]% vs last month)
  Average days on market: [Number]
  Months of supply: [Number] → [Seller's/Balanced/Buyer's]

🏘️ YOUR AREA: [Area/ZIP]
  Median price: $[Amount]
  Homes sold last 30 days: [Number]
  Average sale-to-list ratio: [X]%

💡 WHAT THIS MEANS
  [2-3 sentences of plain-language interpretation]
  [Example: "Inventory is growing, giving buyers more
  options. If you're thinking about selling, pricing
  correctly from day one is more important than ever."]

🔮 LOOKING AHEAD
  [1-2 sentences about market outlook or upcoming
  factors — new construction pipeline, interest rate
  expectations, seasonal trends]

Have questions about what your home is worth or what's
available in your price range? I'm happy to run the
numbers for you.

[Agent Name]
[Phone] | [Email]

P.S. Know someone thinking about buying or selling?
I'd love to help them.
```

### Data Sources for Monthly Update

Pull data from these sources each month (see `kb/18-data-sources.md` for links):

| Metric | Source |
|--------|--------|
| Median price, DOM, inventory | ORRA monthly reports or Redfin Data Center |
| Active listings by ZIP | Stellar MLS or Redfin |
| Appreciation rates | Zillow ZHVI (monthly download) |
| Interest rates | Freddie Mac PMMS |
| New construction pipeline | Census Bureau building permits |

### Social Media Adaptation

For Instagram/Facebook, condense to:
- 1 key stat with visual (e.g., "Orlando median price: $389K — up 3.8% this year")
- 1 sentence of interpretation
- Call to action: "DM me for your area's numbers"
- Use Canva or similar for branded graphic

---

## Quarterly Personal Touch

Top 50 contacts (Tier A + top Tier B) get a personal touch every 90 days. No automation — this is human connection.

### Rotation System

| Quarter | Touch Type | Details |
|---------|-----------|---------|
| **Q1 (Jan–Mar)** | Phone call | "Happy new year, how's the house?" + market outlook |
| **Q2 (Apr–Jun)** | Coffee/lunch | In-person meeting, catch up, discuss their goals |
| **Q3 (Jul–Sep)** | Handwritten note or small gift | Anniversary card, birthday card, or "thinking of you" note |
| **Q4 (Oct–Dec)** | Holiday touch | Holiday card, client appreciation event, or year-end call |

### Top 50 Rotation Tracker

```
═══════════════════════════════════════════════
        TOP 50 QUARTERLY TRACKER
        Quarter: Q___ [Year]
═══════════════════════════════════════════════

Touch type this quarter: _______________

| # | Name | Last Touch | This Quarter | Done? | Notes |
|---|------|-----------|-------------|-------|-------|
| 1 | ___  | ___/___   | □ Call □ Coffee □ Note □ Gift | □ | _____ |
| 2 | ___  | ___/___   | □ Call □ Coffee □ Note □ Gift | □ | _____ |
| 3 | ___  | ___/___   | □ Call □ Coffee □ Note □ Gift | □ | _____ |
...
| 50| ___  | ___/___   | □ Call □ Coffee □ Note □ Gift | □ | _____ |

Progress: ___/50 completed
═══════════════════════════════════════════════
```

### Conversation Starters (Not About Real Estate)

Build relationship first, business follows:
- "How are the kids doing in school?"
- "Did you end up doing that kitchen renovation?"
- "How's the new job going?"
- "I saw your post about [trip/event] — looked amazing"
- "I drove past your neighborhood the other day and thought of you"

### When to Pivot to Business

Only after genuine conversation:
- "By the way, the market in your area has been [interesting/active] — your place has probably appreciated nicely"
- "Anyone in your circle been talking about buying or selling?"
- "Let me know if you ever want me to run a current value estimate"

---

## Life Event Triggers

Predict when past clients are likely to transact again based on buyer type and typical life timeline.

### Timeline by Buyer Type

| Original Buyer Type | Typical Next Transaction | Timeline | Trigger Signals |
|--------------------|------------------------|----------|-----------------|
| **First-time buyer (starter home)** | Trade up to larger home | 3–5 years | Growing family, income increase, complaining about space |
| **First-time buyer (condo)** | Move to SFR | 2–4 years | Marriage, children, remote work needs |
| **Young family (3BR)** | Upgrade to 4–5BR | 4–7 years | Second/third child, school district concerns |
| **Relocating professional** | Second purchase (investment) | 1–3 years | Settled in, understands market, builds equity |
| **Investor (first property)** | Buy second investment | 1–2 years | Positive cash flow, equity in first property |
| **Investor (portfolio)** | Ongoing acquisitions | 6–18 months | Market conditions, 1031 exchange timelines |
| **Downsizer / empty nester** | May not transact again | 7–15 years | Health change, grandchildren, retirement relocation |
| **Retiree (55+)** | Possible downsize or assisted living | 5–10 years | Health events, spouse passing, mobility needs |
| **International buyer (STR)** | Second property or sell | 3–5 years | Currency conditions, tax law changes, portfolio rebalancing |
| **Divorce buyer** | Possible trade-up when stable | 2–5 years | Remarriage, income recovery, children's needs |

### Outreach Timing

| Life Event | When to Reach Out | What to Say |
|-----------|-------------------|-------------|
| New baby announced | Within 1 week | Congratulations message. Note internally: may need more space in 1–2 years |
| Child starting school | August (Orlando schools start early Aug) | "How's the school? If you ever think about a different district, I know the area well" |
| Job promotion or change | Within 1 week of learning | Congratulations. Note: may have more buying power |
| Marriage / engagement | Within 1 week | Congratulations. Two incomes may enable trade-up |
| Divorce / separation | Tread carefully — only if they bring it up | "I'm here if you need help with any housing questions" |
| Kids graduating / leaving home | May–June | "Big milestone! If you're thinking about right-sizing, I can show you what's out there" |
| Retirement | When announced | "Congratulations! If Orlando is still the plan, let's talk about what makes sense for this chapter" |
| Equity milestone ($80K+) | Monitor annually via appreciation estimates | "Your home has gained significant equity — here's what that means for your options" |

### CRM Implementation

Set these as recurring tasks in your CRM:
1. **Anniversary date**: Auto-reminder for equity update
2. **Estimated transaction window**: Flag contacts entering their predicted "next move" window
3. **Life stage advancement**: When a "starter home" buyer hits year 3, move to "potential trade-up" watch list
4. **Social media monitoring**: Follow clients on social — life events surface there first

---

## Referral Ask System

When and how to ask for referrals. Most agents never ask — or ask at the wrong time.

### Best Windows for Referral Asks

| Window | Why It Works | Approach |
|--------|-------------|----------|
| **Day 90–120 post-close** | Client has settled in, told friends about the house, peak satisfaction | Direct ask (see template below) |
| **After solving a problem** | You just added value — reciprocity is natural | "Glad I could help! By the way, if anyone you know needs help with real estate..." |
| **Purchase anniversary** | Gratitude moment, equity gain feels good | Include soft ask in anniversary message |
| **After they refer someone (converted or not)** | They've already shown willingness | Thank them, ask if anyone else comes to mind |
| **At client events** | Social context, warm atmosphere | Casual: "The best compliment you can give me is sending your friends my way" |
| **When they praise you unprompted** | They just said something nice — make it easy to share | "That means a lot! If you ever run into someone who needs help, I'd love the introduction" |

### Indirect Referral Script (Soft)

Use when you don't want to be pushy — works in casual conversation:

```
"You know, I've been really fortunate this year —
most of my business comes from people like you
sending friends and family my way. It's the best
compliment I can get. So if anyone ever mentions
they're thinking about buying or selling, I'd love
for you to connect us."
```

### Direct Referral Script (Specific)

Use at day 90–120 or during a scheduled touchpoint:

```
"[Name], I have a quick question for you. In your
circle — friends, coworkers, family — is there
anyone who's been talking about buying or selling
a home? Or anyone who recently moved to the area
and might be looking?

I ask because my best clients always come from
referrals, and I'd love to help someone you know
the same way I helped you."
```

### Thank-You Protocol

| Referral Status | Response |
|----------------|----------|
| Referral given (not yet contacted) | Same-day thank-you text: "Thanks so much for thinking of me! I'll reach out to [Name] today." |
| Referral contacted, became a client | Handwritten thank-you card + small gift ($25–$50 gift card or local experience) |
| Referral closed a transaction | Referral fee (if applicable) OR premium gift ($100–$200 value — dinner, experience, or their favorite thing) |
| Referral didn't convert | Thank-you text: "Thanks for the introduction! They're not quite ready yet, but I'll stay in touch with them." |

### What NOT to Do

- **Don't automate referral asks** — they must feel personal
- **Don't ask too early** (before day 30) — client hasn't experienced the home yet
- **Don't ask when problems are unresolved** — fix the issue first
- **Don't make it transactional** — "I'll give you $500 for a referral" cheapens the relationship
- **Don't ask every conversation** — once per quarter max for direct asks
- **Don't forget to follow up** — the worst thing is getting a referral and not acting on it immediately

---

## Cross-References

- `kb/01-market-overview.md` — Market data for monthly updates and equity estimates
- `kb/19-agent-templates.md` — Lead scoring for qualifying referred leads
- `kb/21-nurture-system.md` — Post-close nurture transitions into sphere management after Year 1
- `kb/18-data-sources.md` — Data sources for market update content

---

*Sphere management is the highest-ROI activity in real estate. NAR data shows 64% of sellers use an agent they've used before or were referred to. Invest 1–2 hours per week in sphere touches — it compounds.*
