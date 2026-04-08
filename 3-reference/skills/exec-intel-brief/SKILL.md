---
name: exec-intel-brief
description: |
  Generates a daily intelligence briefing PDF for an executive client — packaged as a
  professional deliverable with cover note, scannable brief, full sourced dossier, and
  embedded LLM instructions so the recipient can upload and query it with AI.

  TRIGGER THIS SKILL whenever Brady says: "run the brief," "daily brief for [client],"
  "intel brief," "send [name] their brief," "morning brief," "build the brief,"
  "intelligence briefing," "run [company] brief," "daily intel," or any variation
  requesting a daily competitive/market intelligence deliverable for a client.

  Also trigger when Brady says "new client brief" or "set up a brief for [company]" —
  this means create a new client config first, then generate.

  This skill owns ALL daily executive intelligence briefing workflows. It does NOT
  own family briefs (family-daily-brief skill), email summaries (email-summary skill),
  or news digests for Brady himself (daily-news-digest skill). This is for paying or
  prospective consulting clients specifically.
---

# Executive Intelligence Brief

Generates a daily competitive intelligence PDF for an executive client. One document,
three parts: cover note, scannable brief, full research dossier with AI instructions.

## How It Works

1. **Load the client config** from `references/clients/[client_slug].md`
2. **Run web research** across all configured sections
3. **Build a combined HTML** (cover note + brief + dossier)
4. **Convert to PDF** via Playwright
5. **Output** to `/mnt/user-data/outputs/`

If no client config exists, create one first using the template below.

---

## Client Config Structure

Each client gets a markdown file in `references/clients/`. The config drives everything —
sections, sources, competitors, brands, tone.

**To create a new client:** Copy the template from `references/client_template.md`,
fill it out with Brady, and save to `references/clients/[slug].md`.

**To generate a brief:** Read the client config, then follow the Generation Workflow below.

---

## Generation Workflow

### Step 1: Load Client Config

```
Read: /mnt/skills/user/exec-intel-brief/references/clients/[client_slug].md
```

Extract all fields: company name, exec name/title, brand portfolio, competitors,
key facilities, strategic context, sections to run, source map, cover note tone,
and any client-specific instructions.

### Step 2: Research Sweep

Run web searches for each configured section. Minimum searches per section:

| Section | Min Searches | Query Pattern |
|---------|-------------|---------------|
| News & competitor moves | 3-4 | `[company] news 2026`, `[competitor1] [competitor2] news`, `[industry] news` |
| Retail watch | 2-3 | `[retailer] [category] 2026`, `[brand] [retailer] listing` |
| Category & consumer | 2-3 | `[category] market trends 2026`, `[category] consumer behavior` |
| Competitor spotlight | 2-3 | `[today's competitor] news 2026`, `[competitor] products launch` |
| Commodity & supply chain | 2-3 | `[key commodity] prices USDA`, `freight rates [month] 2026`, `[commodity2] supply` |
| Stock market & comps | 1-2 | `[comp1] [comp2] stock price 2026`, `[comp] acquisition news` |
| Brand portfolio scan | 1-2 | `[brand1] [brand2] 2026 new product`, `[brand] Amazon reviews` |

Total: 15-25 web searches per brief. Scale up for complex clients, down for simpler ones.

**Research rules:**
- Every claim needs a source. No unsourced assertions.
- Prioritize last 7 days for news. Last 30 days acceptable for trends.
- If a search returns nothing useful, note "no significant signals" — don't fabricate.
- Always check Walmart.com / retailer PDPs when retail watch is a section.
- Pull actual ingredient lists when comparing products (this is where the value lives).

### Step 3: Build the Brief

Generate a single HTML file with three parts:

**Part 1: Cover Note**
- From Brady to [exec name]
- Reference the relationship context (how/why this exists)
- Frame as "agents I've built for other clients, retooled for [company]"
- Include accuracy caveat (AI gets things wrong, feedback improves the system)
- Offer to keep sending and iterate
- Ask for feedback on what's valuable at exec level
- Tone: warm, peer-to-peer, not salesy

**Part 2: The Brief (5-minute scan)**
- Headline: one sentence, the single most important thing
- Each section: 3-8 bullet points, each with [What happened] — [Why it matters to client]
- Competitor spotlight: profile card format (what they're doing, where vulnerable, client implication)
- Product/strategic idea: grounded in today's signals, specific to client's brands/capabilities
- Coverage table: all sections with cadence and last-run date
- Total read time: ~5 minutes

**Part 3: Full Dossier**
- AI instructions block (tells the LLM who it is, what to prioritize, what not to do)
- Current strategic context block (self-contained even if exec skips a week)
- Full research for each section with source citations
- Source log table (source name, description, date)
- 6-8 suggested analysis prompts

### Step 4: Style the HTML

Use the mception light-mode design system for the PDF:

```css
/* Core fonts */
font-family: 'Space Grotesk' (titles), 'DM Sans' (body), 'JetBrains Mono' (labels/data)

/* Colors - light mode for PDF */
--bg: #FFFFFF
--accent: #B8922E (gold)
--text: #1A1A1A
--gray: #6B6E75
--card-bg: #F5F5F3

/* Section headers */
JetBrains Mono, 9px, 3px letter-spacing, uppercase, gold, with trailing line

/* Cards */
Background: #F5F5F3, border: 1px solid rgba(0,0,0,0.06), border-radius: 6px

/* Caveat box */
Background: #FFF8EC, gold-tinted border
```

Import Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Page format: Letter size, zero margins, max-width 850px centered, 40-48px padding.

### Step 5: Generate PDF

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f'file:///path/to/brief.html')
    page.wait_for_timeout(3000)  # font loading
    page.pdf(
        path='/path/to/output.pdf',
        format='Letter',
        print_background=True,
        margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
    )
    browser.close()
```

If Playwright unavailable: `pip install playwright --break-system-packages && playwright install chromium`

### Step 6: Output

Save to `/mnt/user-data/outputs/[Company]_Brief_[YYYY-MM-DD].pdf`
Present to Brady via `present_files`.

---

## Section Definitions

These are the standard sections. Client configs can enable/disable or customize.

### Daily Sections (run every brief)

1. **News & Competitor Moves** — What happened in the last 24-48 hours. Press releases, launches, retailer announcements, competitor moves, regulatory signals. Each bullet: [What] — [Why it matters to client].

2. **Retail Watch** — Shelf signals at key retailers. New listings, delistings, price changes, promo activity, resets, competitor shelf changes. Organized by retailer. Always check actual retailer websites.

3. **Category & Consumer Signals** — Market sizing, trend data, consumer behavior shifts, review mining, search/demand proxies. Google Trends, Amazon reviews, social signals.

4. **Competitor Spotlight (rotating)** — One competitor per day. Profile: what they're doing, where winning/losing, what it means for client. Rotation schedule defined in client config.

5. **Commodity, Cost & Supply Chain** — Key input costs, freight rates, energy, labor signals. USDA data for agricultural inputs. FreightWaves/DAT for transport. Specific to client's supply chain.

6. **Stock Market & Public Comps** — Relevant public company moves with client read-through. Price movements, earnings, M&A, analyst actions.

7. **Brand Portfolio Scan** — Quick check across client's brands. New reviews, rating changes, social mentions, press, retailer availability, search volume.

8. **Product Idea / Strategic Angle** — ONE concrete idea grounded in today's signals. Which brand, which retailer, why now, one-sentence buyer pitch, risk/open question.

### Weekly Sections (embed in that day's brief)

9. **Innovation & International Inspiration** — Global product launches, international trends, Innova/Mintel references, trade show coverage.

10. **Pricing & Promo Deep Dive** — Retailer price histories, flyer/circular analysis, trade promo calendars.

### Monthly Sections

11. **Talent & Org Movement** — Competitor hiring, buyer announcements, leadership changes.

12. **M&A / Funding Watch** — Deals, PE activity, funding rounds in client's space.

13. **Full Competitor Profiles** — Comprehensive refresh of all competitor data.

### Quarterly

14. **Board-Level Strategy Brief** — Custom strategic analysis. Different product — presentation-quality, not just a bigger daily.

---

## Accuracy Caveat (always include)

Place in a highlighted callout box in the cover note:

> **A note on accuracy:** This is coming mostly raw from the AI research agents.
> It will get things wrong — especially early on without any internal [company]
> knowledge baked in. Market data, competitor intel, and category signals should
> be directionally right, but anything touching your internal operations, pricing,
> or strategy is either inferred from public sources or missing entirely. If you
> see things that are off, reply with corrections or context and it feeds back
> into the agent's knowledge base. It gets meaningfully better with each round
> of feedback.

---

## Cover Note Template

The cover note should always:
- Reference the most recent interaction with the exec (breakfast, call, text, etc.)
- Frame as "agents I've built for other clients, retooled for [company]"
- Explain the two parts (brief to scan, dossier to upload to AI)
- Include the accuracy caveat
- Say Brady is happy to keep sending and iterate
- Ask for feedback on what's valuable at the exec level
- Close with just "Brady" — no sign-off fluff
- Do NOT include a "no strings" or "no commitment" line

---

## Updating Notion After Generation

After generating a brief, update the client's Streaming Notes page in Notion with:
- Date of brief sent
- Key signals flagged
- Any open questions for follow-up
- Status of engagement

---

## File Naming Convention

- HTML working file: `[company_slug]_brief_[YYYY-MM-DD].html`
- Output PDF: `[Company]_Brief_[YYYY-MM-DD].pdf`
- Client config: `references/clients/[company_slug].md`
