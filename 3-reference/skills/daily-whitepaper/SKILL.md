---
name: daily-whitepaper
description: >
  Scrapes Brady's Substack subscriptions and web news daily, then synthesizes everything into a
  polished 2-page PDF whitepaper with source links. Covers AI/LLM industry, Retail/CPG/Food,
  and NW Arkansas business news plus Substack digest. Runs daily from CoWork.

  Trigger this skill whenever Brady says "daily whitepaper", "daily brief doc", "news whitepaper",
  "scrape my news", "build today's brief", "run the whitepaper", "daily PDF", "morning paper",
  "news PDF", "today's paper", or any variation requesting a daily synthesized news document.
  Also trigger if Brady says "whitepaper" in a news/briefing context. This skill owns all
  daily news-to-PDF workflows.
---

# Daily Whitepaper

Scrape, synthesize, publish. One polished 2-page PDF every day covering Brady's Substack reads
and three news verticals. Links to every source. Readable in 5 minutes, shareable to anyone.

## Why This Exists

Brady needs a single document that captures what happened across his world — AI, food industry,
NW Arkansas, and the thought leadership he follows on Substack. Not a link dump. A synthesized
brief that connects dots and surfaces what matters. PDF because it's shareable, archivable, and
looks professional if he forwards it to a client or collaborator.

## Execution Environment

**Runs on**: CoWork (Claude Desktop) on Brady's Mac
**Scheduled**: Daily — after the morning sweep, or on-demand
**Output**: PDF saved to local file system and `/mnt/user-data/outputs/`

## Source Configuration

### Substack Subscriptions (RSS Feeds)

| Publication | RSS URL | Topic |
|-------------|---------|-------|
| Opinion AI / Emerging AI | `https://emergingai.substack.com/feed` | AI agents, applied AI |
| Ruben Hassid | `https://rubenhassid.substack.com/feed` | AI industry, tools |
| Growth Mindset | `https://growthmindsetco.substack.com/feed` | Leadership, personal dev |
| Judd Legum / Popular Information | `https://popular.substack.com/feed` | Politics, accountability |
| Joe Rogan Recaps | `https://joeroganrecaps.substack.com/feed` | Culture, interviews |
| Stoic Wisdoms | `https://stoicwisdoms.substack.com/feed` | Philosophy, mindset |

To add/remove Substacks, update this table. Brady can also say "sweep feedback: add [substack]
to the whitepaper" and it will be queued for the weekly sweep to make permanent.

### Web News Topics

1. **AI / LLM Industry** — product launches, funding, policy, open source, model releases
2. **Retail / CPG / Food Industry** — M&A, earnings, supply chain, consumer trends, grocery/foodservice
3. **NW Arkansas Business & Development** — corporate relocations, real estate, Walmart ecosystem,
   trail/culture development, local policy

## Workflow

### Phase 1: SCRAPE (Silent)

#### 1.1 Substack RSS
For each publication, fetch the RSS feed via web_fetch. Extract posts from the last 48 hours
(wider window catches anything missed yesterday). Capture per post:
- Post title
- Post URL (full link back to original)
- Publication name
- Excerpt (first 2-3 sentences from RSS `description` field)

If an RSS URL fails, fall back to web_fetch on the publication's homepage and parse recent posts.

#### 1.2 Web News
For each of the 3 topics, run 2-3 web searches with varied queries:

**AI / LLM**: "AI news today 2026", "LLM product launch", "AI funding round"
**Retail / CPG / Food**: "retail industry news today", "CPG food industry", "grocery foodservice trends"
**NW Arkansas**: "NW Arkansas business news", "Bentonville development", "Walmart supplier news"
For the 3-5 best results per topic, use web_fetch to read the full article. Capture:
- Headline
- Source name + URL
- Key facts (2-3 bullets per article)
- Publication date

#### 1.3 Deduplicate
If a Substack post covers the same story as a web news hit, merge them. Credit both sources.

### Phase 2: SYNTHESIZE

Write the whitepaper content. This is NOT a link dump — connect dots, identify themes, surface
what matters to Brady specifically.

**Structure:**

```
DAILY INTELLIGENCE BRIEF — [Day], [Month DD, YYYY]
AI · Food & Retail · NW Arkansas · Substack Digest

━━━ EXECUTIVE SUMMARY ━━━
[3-5 sentences. The single most important theme across all sources today.
 "If you read nothing else" paragraph. End with a forward-looking hook.]

━━━ AI & TECHNOLOGY ━━━
[2-3 paragraphs synthesizing AI/LLM news + relevant Substack content.
 Lead with the biggest story. Weave in Substack perspectives where they add value.
 Every factual claim gets a source link. Flag Broker Co relevance if any.]

━━━ FOOD, RETAIL & CPG ━━━
[2-3 paragraphs on food/retail industry.
 M&A, earnings, consumer trends, supply chain.
 Flag anything with Broker Co or IVFH relevance.]

━━━ NW ARKANSAS ━━━
[1-2 paragraphs on local business/development.
 Corporate moves, real estate, Walmart ecosystem.]

━━━ SUBSTACK DIGEST ━━━
[Quick hits from Substacks not already woven into sections above.
 1-2 lines each with link. Skip any already covered.]

━━━ SOURCES ━━━
[Numbered list of every source cited, grouped by section, with full clickable URL.]
```

### Phase 3: GENERATE PDF

Use Python with reportlab to produce a polished 2-page PDF.

**PDF Design Spec:**
- **Page size**: Letter (8.5" x 11")
- **Margins**: 0.75" all sides
- **Font**: Helvetica (built into reportlab)
  - Title: 16pt bold
  - Subtitle: 10pt regular, gray
  - Section headers: 12pt bold, dark blue (#1a365d)
  - Body: 9.5pt regular, 13pt leading
  - Source links: 8pt, blue (#2563eb), clickable
  - Footer: 7.5pt italic, gray
- **Header**: "DAILY INTELLIGENCE BRIEF" + date, thin horizontal rule below
- **Section dividers**: Thin gray rules between sections
- **Links**: Blue, underlined, clickable in the PDF
- **Footer**: Page number + "Confidential — BS Ventures"
- **Max pages**: 2 (hard limit)**Enforcing the 2-page limit:**
If content exceeds 2 pages during generation, compress in this order:
1. Shorten the Substack Digest section (drop to titles + links only)
2. Trim NW Arkansas to 1 paragraph
3. Reduce body font to 9pt with 12pt leading
4. If still over, cut the lowest-priority stories from each section

**Python approach:**
```python
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
```

Build a `story` list of Platypus flowables. Use `SimpleDocTemplate` with `onPage` callback
for header/footer. After building, check page count — if > 2, apply compression steps and rebuild.

**Output**: Save to `/mnt/user-data/outputs/daily-brief-YYYY-MM-DD.pdf`

On CoWork: also save to `~/Documents/Daily-Briefs/YYYY/MM/daily-brief-YYYY-MM-DD.pdf`
(create directories if they don't exist). This feeds into the evening sweep's journal archive.

### Phase 4: DELIVER

1. Present the PDF file
2. In-chat: 3 bullet points — one per vertical — covering the top stories
3. Flag anything with direct Broker Co or client relevance

## Edge Cases

- **No Substack posts in 48 hours**: "No new Substack posts." Omit the Substack Digest section
  entirely — don't pad with old content.
- **No news on a topic**: "No significant developments." Keep section header, one line, move on.
- **Weekend**: Still runs. News doesn't stop. Substack may be lighter — that's fine.
- **RSS feed broken**: Skip that publication, note it. Don't block the whole whitepaper.
- **Scrape fails**: Use search snippets as fallback. Lower quality but still useful.

## Feedback Loop

This skill participates in the same sweep feedback system as morning/weekly sweeps:
- "sweep feedback: add [substack] to the whitepaper" → logs prompt feedback
- "sweep feedback: drop Retail section" → logs prompt feedback
- Weekly sweep reviews and proposes permanent changes

## What This Skill Does NOT Do

- It doesn't replace deep research — this is a daily scan, not an analysis
- It doesn't post to Brady's Substack (Opinion AI) — that's a separate workflow
- It doesn't archive old whitepapers in Notion — the evening sweep handles archival
- It doesn't editorialize — facts and synthesis, not opinions
