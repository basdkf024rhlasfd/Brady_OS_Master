---
name: deep-research-whitepaper
description: >
  Replicable pipeline for turning a single strategic question into an executive-grade,
  fully-cited white paper (markdown source + polished PDF). This is the exact mechanism
  behind the "Insourcing the Build" Walmart GC paper. Trigger when someone needs a
  rigorous, multi-source, decision-ready research deliverable — not a quick answer.
audience: Mark (portable — assumes a coding agent with web search + subagents + a code runtime)
---

# Deep Research → Executive White Paper

**What this is.** The white paper you read ("Insourcing the Build") was not produced by asking an AI to "write a white paper." It was produced by a specific, repeatable pipeline. The quality comes from three things, in order of importance:

1. **Decomposition + parallel fan-out** — the question is split into 5–7 *independent* research streams, and a separate research agent runs each one *concurrently*, each forced to return a structured digest with a source URL on every claim.
2. **Honest synthesis** — the writer merges those digests under hard rules that separate fact from thesis, primary from secondary, and label every estimate. This is what makes it survive an executive's skepticism.
3. **A real render pipeline** — markdown is the source of truth; a script turns it into a designed PDF (cover, section rules, styled tables, light/dark). This is what makes it look like a consulting deliverable instead of a chat transcript.

If you have a coding agent with web search, the ability to spawn sub-agents, and a code runtime, you can reproduce this exactly. The connector substitutions are in §7.

---

## 1. The pipeline at a glance

```
Stage 0  FRAME      One sharp question → 5–7 non-overlapping research streams
Stage 1  FAN OUT    Spawn one research sub-agent per stream — ALL IN ONE BATCH (concurrent)
                    Each returns: structured findings, a source URL per claim, flags for the unverified
Stage 2  SYNTHESIZE Merge under the honesty rules (§4). De-duplicate. Decide the spine/thesis.
Stage 3  WRITE      Draft the paper in markdown using the structure in §5
Stage 4  RENDER     markdown → dark HTML + light HTML → Letter PDF (render_whitepaper.py)
Stage 5  QA         Screenshot 3–4 pages; check tables don't overflow; verify every claim has a cite
Stage 6  (optional) CAPTURE durably + PUBLISH as a gated share
```

The non-obvious lever is **Stage 1's concurrency + output contract.** Ten minutes of six agents working in parallel, each returning a clean cited digest, beats an hour of one agent meandering — and the per-agent "every claim needs a URL, flag what you couldn't verify, don't fabricate" instruction is what keeps the final paper honest.

---

## 2. Required capabilities

You need an agent/runtime that can do all of these. Exact tools don't matter; capabilities do (§7 lists substitutes).

| # | Capability | Why the pipeline needs it |
|---|---|---|
| A | **Spawn parallel sub-agents** | Run each research stream concurrently, isolated, with its own context |
| B | **Web search + fetch a page** | Each sub-agent finds and reads real sources |
| C | **Run code (shell + Python)** | Render the PDF, run QA, parse config |
| D | **Read/write/edit files** | Markdown source of truth + render outputs |
| E | *(optional)* **Notion/DB write** | Durable capture of the deliverable + follow-ups |
| F | *(optional)* **A gated host** | Publish the result as a private, shareable link |

---

## 3. Stage 1 — the research sub-agent (the heart of it)

Spawn **one agent per stream, all in a single batch so they run at the same time.** Give each the *same output contract* and a *different scope*. Here is the exact prompt skeleton — fill in the bracketed parts:

```
Research [SCOPE: the one slice of the question this agent owns].

Investigate specifically: [explicit list of companies / entities / sub-questions —
the more concrete, the better; this prevents two agents from covering the same ground].

For each, capture:
(a) [the structural fact you need]
(b) [evidence of outcome / cost / scale]
(c) [scale or magnitude]
(d) a SOURCE URL for every claim.

Use web search and fetch real sources. Return a CONCISE, STRUCTURED list — one block per
entity — findings and citations only, NOT raw page dumps. Flag clearly anything you could
NOT verify in a primary source (do not fabricate). At the end, name the 2–3 strongest
examples for [the decision the paper must inform].
```

**Why each clause is there:**
- *"Investigate specifically: [explicit list]"* — concreteness is what makes parallel agents non-overlapping and exhaustive. Vague scopes produce vague, duplicated results.
- *"a SOURCE URL for every claim"* — turns the digest into something you can footnote. No URL, no claim.
- *"findings and citations only, NOT raw page dumps"* — keeps the return payload dense so your synthesis context stays clean.
- *"Flag clearly anything you could NOT verify… do not fabricate"* — this single line is the difference between a credible paper and one that dies on the first wrong fact. (In the Walmart paper this surfaced: "no verified standalone Schwarz construction subsidiary" and "capex figures are from secondary reporting." Both made it into the paper as honest caveats.)
- *"name the 2–3 strongest examples"* — forces each agent to rank, which seeds your synthesis.

**How many streams?** Match it to the request. A quick check = 2–3 streams. "Be comprehensive / executive-grade" = 5–7. The Walmart paper used **six** (listed in §6).

**Decomposition tips (Stage 0):** split by *angle*, not by keyword. Good splits are mutually exclusive and collectively exhaustive: by population (retail vs. tech vs. international), by question half (does anyone do X? / can you monetize X?), by discipline (the economics / the precedents / the risks). Add one stream whose only job is the *counter-evidence* (cautionary tales, failures, what went wrong) — it's the most valuable stream and the one a single-pass AI always skips.

---

## 4. Stage 2 — the honest-synthesis rules

Apply these while merging the digests. They are the credibility engine.

1. **Separate fact from thesis.** If a claim is your extrapolation, say so. (Walmart paper: "the *external-monetization step is a thesis, not an announced move*.")
2. **Primary beats secondary.** If your number came from a news article reporting a filing, label it as such and say "pull the line item from the primary source for any model."
3. **Soften the unverified.** If a sub-agent flagged something as unconfirmed, soften the language and say it's unconfirmed. Don't quietly upgrade it to fact.
4. **Label every estimate** and lead with the honest (not the flattering) number; note the high end rather than cherry-picking it.
5. **Reason ≠ measure.** If a figure is reasoned from logic rather than measured in a study, say which. (Walmart paper: owner-builder savings were "reasoned from documented markup layers, not a single peer-reviewed study.")
6. **Find the spine.** A good paper has one load-bearing sentence the whole thing supports. Decide it explicitly. (Walmart paper's spine: the failures all came from *fragmenting accountability to dodge a fee* + *welding fixed capacity to one cyclical demand source*; the successes did the inverse.)
7. **De-duplicate across streams** before writing — the same example often shows up in two digests; keep the best-sourced version.

---

## 5. Stage 3 — the white-paper structure

This is the skeleton that reads as "executive-grade." Adapt section count to the topic.

```
# Title  +  one-line subtitle  +  a short italic framing paragraph (the question, stated sharply)
<!-- RENDER-BODY-START -->        ← marker the render script splits on
## Executive Summary             ← the answer up front: a bold one-paragraph verdict,
                                   then 3–5 numbered findings, each with its hardest number
## 1. Framing the question        ← define terms; a spectrum/decision table so "it" is precise
## 2. Where [subject] sits today  ← the baseline / status quo + the size of the prize
## 3–N. The evidence base         ← grouped by your streams; lead each example with its proof point
## The economics                  ← what's actually capturable; a worked $ example in a callout (>)
## Risks & mitigations            ← a table: risk | the cautionary evidence | the mitigation
## Recommendation & roadmap       ← staged (crawl-walk-run), each phase independently valuable
## Appendix A — evidence table     ← one row per example, scannable
## Appendix B — methodology + sources ← the honesty caveats, then grouped source list with URLs
```

Formatting that pulls weight: **tables** for anything comparative, a **blockquote** (`>`) for the one worked dollar example so it stands out, **bold** on the load-bearing number in each paragraph, and a **grouped Sources section** so every claim is traceable.

---

## 6. Worked example — the six streams behind "Insourcing the Build"

The Walmart GC-insourcing paper decomposed into these six concurrent research agents. Note how they don't overlap, and that #6 is the dedicated counter-evidence stream:

1. **Retail/big-box self-perform** — Costco, Chick-fil-A, Buc-ee's, Aldi, IKEA, Chipotle, H-E-B, Sheetz, Wawa, Lidl. *(Who owns the build vs. directs GCs?)*
2. **Walmart's own delivery model + its insource-then-monetize flywheel** — Connect, GoLocal, WFS, Store Assist, Scintilla, OnePay. *(Does the parent already run this play?)*
3. **Hyperscalers + Tesla** — Amazon R2L, Google, Microsoft, Meta, Tesla, Apple. *(Owner-as-construction-manager at extreme scale.)*
4. **Monetizers** — Toyota Home, Sears Modern Homes, IKEA BoKlok, Ryan/Clayco/Gray, Sekisui/Daiwa, Clayton. *(Can you sell the capability externally?)*
5. **Construction economics** — GC fee, general conditions, sub markup, OCIP, bonding; FHWA/CII-Pankow delivery-method data; the value-capture math. *(What's it worth?)*
6. **International + cautionary tales** — Schwarz, Aldi DE, Tesco/Spenhill, MAF; and the failures: Berlin Brandenburg Airport, Tesco's writedown. *(What goes wrong?)*

Each returned a cited digest; the synthesis merged them under §4 and built the spine in §5. Total wall-clock for the research: a few minutes, because all six ran at once.

---

## 7. Connector substitution table

You don't need the exact tools this output used — you need the capabilities. Here's what it used and what you can swap in:

| Capability | What "Insourcing the Build" used | Portable equivalents you can use instead |
|---|---|---|
| **A. Parallel sub-agents** | Claude Code "Agent/Task" tool (6 concurrent agents) | Claude Code or the Claude Agent SDK; OpenAI Agents SDK; LangGraph / CrewAI; **gpt-researcher** (purpose-built for exactly this); worst case, run the streams sequentially in one long session |
| **B. Web search + fetch** | Built-in WebSearch + WebFetch | Web search in Claude/ChatGPT; MCP servers: **Exa, Tavily, Brave, Bright Data, Perplexity API**; or a SERP API |
| **C. Code runtime** | Shell + Python 3 | Any local Python 3.10+; or the agent's built-in code interpreter |
| **D. markdown → PDF** | Python `markdown` + **Playwright** (chromium) — see `render_whitepaper.py` | **weasyprint**; **Pandoc** + wkhtmltopdf/LaTeX; **Typst**; or browser "Print → Save as PDF" on the light HTML |
| **E. Visual QA** | `pdftoppm` (poppler) → read the PNGs | macOS `sips`/Preview; `pdf2image`; or just open the PDF and eyeball it |
| **F. Durable capture** *(opt.)* | Notion MCP (logged a tracked to-do) | Any Notion/Airtable/Obsidian; or a dated markdown log file |
| **G. Gated publish** *(opt.)* | Next.js portal + Clerk auth + a magic-link JWT on Vercel | Any authenticated static host; a Notion page set to "anyone with link"; a password-protected PDF; or just email the PDF |

Minimum viable kit for an identical result: **a coding agent that can spawn sub-agents + search the web + run Python.** Everything else is polish.

---

## 8. End-to-end runbook

1. **Write the question on one line.** If it has sub-parts ("is anyone doing X, and can you monetize it?"), note them — they become stream boundaries.
2. **List 5–7 streams** (§3 decomposition tips). Make one of them the counter-evidence stream.
3. **Spawn all the research agents in a single batch** using the §3 prompt skeleton, one per stream. Wait for all to return.
4. **Read the digests, de-duplicate, and decide the spine** (§4).
5. **Draft the paper in markdown** using §5. Put `<!-- RENDER-BODY-START -->` before `## Executive Summary`.
6. **Render it:**
   ```bash
   pip install markdown playwright pyyaml && playwright install chromium
   python3 render_whitepaper.py --md your-paper.md --out-dir ./out \
     --title "Your Title" --subtitle "Your subtitle" \
     --label "CLIENT · PRECEDENT RESEARCH" --prepared-for "Name" --date "Month D, YYYY"
   ```
7. **QA** (§9). Fix anything, re-render (it's idempotent).
8. **(Optional)** Log it somewhere durable; publish as a gated link.

---

## 9. QA checklist (don't skip)

- [ ] Every factual claim in the body has a source in the Sources section.
- [ ] Every estimate is labeled as an estimate; every thesis is labeled as a thesis.
- [ ] Anything a sub-agent flagged as unverified is softened in the text, not upgraded.
- [ ] Screenshot the cover + 2–3 content pages (incl. a wide table) and look at them — tables must not overflow the page; nothing clipped.
- [ ] The Executive Summary alone answers the question (an exec who reads only page 1 gets the verdict).
- [ ] There is exactly one spine sentence the whole paper supports.

---

## 10. Failure modes (learned the hard way)

- **Streams overlap → wasted agents and a lopsided paper.** Fix: make each scope an explicit, disjoint entity list.
- **No counter-evidence stream → the paper reads like a sales pitch.** Always dedicate one agent to "what goes wrong / who retreated / what failed."
- **A sub-agent returns a plausible but unsourced claim.** The output contract ("URL per claim, flag the unverified") catches most; in synthesis, drop or soften anything without a cite.
- **PDF looks like a webpage.** You skipped the render step or rendered the dark HTML to paper. Use the light variant for print; let webfonts load before printing (the script waits 1.2s).
- **Tables overflow.** Too many columns or too-long cells. Tighten wording, or split into two tables. The QA screenshot catches this.
- **One mega-agent instead of a fan-out.** It will be slower *and* shallower. The parallelism is the point.

---

*This skill is the generalized version of the pipeline that produced "Insourcing the Build" (June 2026). The render script lives next to this file as `render_whitepaper.py`.*
