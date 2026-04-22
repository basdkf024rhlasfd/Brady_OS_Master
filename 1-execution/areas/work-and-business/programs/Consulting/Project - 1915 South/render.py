#!/usr/bin/env python3
"""Assemble the 1915 South innovation workshop HTML from YAML idea files + summary.md.

Emits two files: a dark-mode HTML (display) and a light-mode HTML (PDF source).
"""

from __future__ import annotations
import glob
import html as html_lib
import os
import re
from pathlib import Path

import yaml

HERE = Path(__file__).parent
IDEAS_DIR = HERE / "ideas"
IMAGES_DIR = HERE / "images-1915-south"
OUTPUT_DARK = HERE / "innovation-workshop-1915-south-2026-04-22.html"
OUTPUT_LIGHT = HERE / "innovation-workshop-1915-south-2026-04-22-light.html"

TITLE = "Innovation Workshop"
CLIENT = "1915 South | Ashley"
DATE_STR = "April 22, 2026"
SUBTITLE = "Product, Ops, and Back-Office Innovation for Justin Woods"

TRACK_LABELS = {
    "A": "Track A — Format / Product",
    "B": "Track B — Ops / AI Arbitrage",
    "C": "Track C — Back-Office / CFO Transition",
}

# Problem table drawn from summary.md frontmatter block
PROBLEMS = [
    ("P1", "Ashley corporate's GMROI Excellence Framework has no execution layer at 1915 South — inventory ROI is measured but not actively optimized across 30 stores.", "Ashley GMROI mandate (Dec 2024); 10% GMROI shift = $2-4M freed capital.", "Format"),
    ("P2", "Marketing across 30 stores is fragmented and sub-scale — no unified content engine exploits the 30-market footprint.", "Typical regional retailer pattern; $9-12M annual ad spend likely sub-optimized.", "Labor"),
    ("P3", "Back-office accounting is sized for a pre-$100M company — multi-entity consolidation, 30-store variance, cash position are manual or batch.", "$25M to $182M growth without back-office rebuild; QBO transition floated.", "Throughput"),
    ("P4", "CFO role design is incoherent — traditional accountant vs tech/AI strategist role conflict.", "Justin's April 20 email: \"not entirely happy with my CFO.\"", "Org"),
    ("P5", "Zapsight is building the data foundation — but nobody owns the decision/operating layer above it.", "Vendor pattern at mid-market retailers; Zapsight is a tech shop, not strategy.", "Format"),
    ("P6", "The sleep/mattress vertical launch has no analytics or format foundation.", "Justin's email: \"a lot could shift here if we open up a new line of business with sleep.\"", "Format"),
    ("P7", "Store-of-the-future investment has no ROI framework — retail-tech capex is under-measured and vendor-pitched.", "Justin's email names this as a \"key long-term initiative.\"", "Capital"),
    ("P8", "Final-mile distribution has no data-driven SLA structure, routing optimization, or damage-rate instrumentation.", "JB Hunt evaluation; industry damage 4-6% of $2,500 tickets.", "Throughput"),
    ("P9", "Acquisition strategy lacks a repeatable financial/operational due-diligence playbook.", "Yulee, FL acquired 2025; Justin naming new VP Corp Dev role.", "Format"),
    ("P10", "Regional demand variance (FL coastal vs GA urban vs AL rural) is not exploited in assortment, pricing, or promotion.", "30 stores across 6 states; distinct seasonal demand signatures.", "Format"),
]

# Light-mode palette override (used when PDF renders)
LIGHT_OVERRIDES = """
  :root {
    --bg: #F5F1E8;
    --bg-card: #FFFFFF;
    --bg-card-alt: #FAF6EE;
    --white: #1A1F2E;
    --gray: #5A5D64;
    --gray-light: #2A2D34;
  }
  body { background: var(--bg); color: var(--white); }
  .page::before { opacity: 0.5; }
"""


def load_ideas() -> list[dict]:
    ideas: list[dict] = []
    for path in sorted(IDEAS_DIR.glob("track-*.yml")):
        with open(path) as f:
            data = yaml.safe_load(f)
        ideas.extend(data.get("ideas", []))
    return ideas


def esc(s: str | None) -> str:
    if s is None:
        return ""
    return html_lib.escape(str(s).strip())


def body(s: str) -> str:
    # Soft newline handling for YAML block scalars
    s = s.strip() if s else ""
    return esc(s).replace("\n\n", "</p><p>").replace("\n", " ")


def image_block_for(idea: dict) -> str:
    if not idea.get("canva"):
        return ""
    slug = re.sub(r"[^a-z0-9]+", "-", idea["name"].lower()).strip("-")
    hero = IMAGES_DIR / f"{idea['id'].lower()}-{slug}-hero.png"
    rel_hero = hero.relative_to(HERE)
    if not hero.exists():
        return f"""
        <div class="image-block image-placeholder">
          <div class="image-placeholder-text">Hero visual pending — add {rel_hero}</div>
        </div>
        """
    return f"""
        <div class="image-block">
          <img src="{rel_hero}" alt="{esc(idea['name'])} hero">
        </div>
        """


def tag_chip(label: str, variant: str = "") -> str:
    return f'<span class="chip chip-{variant}">{esc(label)}</span>'


def tier_chip(tier) -> str:
    mapping = {1: ("TIER 1 · DO NOW", "tier1"), 2: ("TIER 2 · EXPLORE", "tier2"), 3: ("TIER 3 · WATCH", "tier3")}
    label, variant = mapping.get(tier, (f"TIER {tier}", "tier3"))
    return tag_chip(label, variant)


def render_full_idea(idea: dict) -> str:
    img_html = image_block_for(idea)
    problems = " · ".join(idea.get("problems", []))
    return f"""
    <section class="page idea-page">
      <div class="idea-header">
        {tier_chip(idea.get("tier", 2))}
        {tag_chip(TRACK_LABELS[idea["track"]].upper(), "track")}
        <span class="score-chip">SCORE {idea.get("score", 0):.2f}</span>
      </div>
      <h2 class="idea-title">{esc(idea["name"])}</h2>
      <div class="idea-meta">ID {idea["id"]} · PROBLEMS {esc(problems)} · METHOD #{idea["method"]} · {esc(", ".join(idea.get("frameworks", [])))}</div>
      <div class="idea-body">
        {img_html}
        <div class="section"><div class="section-label">What</div><p>{body(idea.get("what", ""))}</p></div>
        <div class="section"><div class="section-label">Why now</div><p>{body(idea.get("why_now", ""))}</p></div>
        <div class="section"><div class="section-label">Pilot spec</div><p>{body(idea.get("pilot_spec", ""))}</p></div>
        <div class="grid-2">
          <div class="section"><div class="section-label">Impact</div><p>{body(idea.get("impact", ""))}</p></div>
          <div class="section"><div class="section-label">Precedent</div><p>{body(idea.get("precedent", ""))}</p></div>
        </div>
        <div class="grid-2">
          <div class="section"><div class="section-label">Competitive</div><p>{body(idea.get("competitive", ""))}</p></div>
          <div class="section"><div class="section-label">Ops complexity</div><p>{body(idea.get("complexity", ""))}</p></div>
        </div>
        <div class="section">
          <div class="section-label">Risks / failure modes</div>
          <ul>{"".join(f"<li>{body(r)}</li>" for r in idea.get("risks", []))}</ul>
        </div>
      </div>
      <div class="attribution">{esc(idea.get("attribution", ""))}</div>
    </section>
    """


def render_condensed_idea(idea: dict) -> str:
    problems = " · ".join(idea.get("problems", []))
    return f"""
    <section class="page idea-page condensed">
      <div class="idea-header">
        {tier_chip(idea.get("tier", 3))}
        {tag_chip(TRACK_LABELS[idea["track"]].upper(), "track")}
        <span class="score-chip">SCORE {idea.get("score", 0):.2f}</span>
      </div>
      <h2 class="idea-title">{esc(idea["name"])}</h2>
      <div class="idea-meta">ID {idea["id"]} · PROBLEMS {esc(problems)} · METHOD #{idea["method"]}</div>
      <div class="idea-body">
        <p>{body(idea.get("condensed", ""))}</p>
      </div>
      <div class="attribution">{esc(idea.get("attribution", ""))}</div>
    </section>
    """


def render_cover() -> str:
    return f"""
    <section class="page cover">
      <div class="cover-label">1915 SOUTH / ASHLEY · INNOVATION WORKSHOP</div>
      <h1>{esc(TITLE)}<br><span>{esc(CLIENT)}</span></h1>
      <div class="cover-divider"></div>
      <div class="subtitle">{esc(SUBTITLE)}</div>
      <div class="cover-meta">
        <div>DATE · <span>{esc(DATE_STR)}</span></div>
        <div>PREPARED BY · <span>BRADY SMALLWOOD / MCEPTION.AI</span></div>
        <div>CLASSIFICATION · <span>DRAFT · INTERNAL REVIEW</span></div>
      </div>
    </section>
    """


def render_exec_summary(ideas: list[dict]) -> str:
    tier1 = [i for i in ideas if i.get("tier") == 1]
    do_now = sorted(tier1, key=lambda x: -x.get("score", 0))[:5]
    tier2 = [i for i in ideas if i.get("tier") == 2]
    explore = sorted(tier2, key=lambda x: -x.get("score", 0))[:5]

    def card(i: dict) -> str:
        return f"""
        <div class="summary-card">
          <div class="summary-card-id">{i['id']} · {TRACK_LABELS[i['track']].split(' — ')[1]}</div>
          <div class="summary-card-name">{esc(i['name'])}</div>
          <div class="summary-card-score">SCORE {i.get('score', 0):.2f}</div>
        </div>
        """

    matrix_svg = render_matrix_svg(ideas)

    return f"""
    <section class="page">
      <div class="section-header">EXECUTIVE SUMMARY</div>
      <h2 class="page-title">Three Tracks, One Operating Thesis</h2>
      <p class="lede">1915 South is a high-performing regional retailer being asked to operate at corporate-grade sophistication — with the systems of a family-owned business. That gap is the opportunity. Thirty-eight ideas, organized across three tracks, rank-ordered by where the next dollar of management attention returns the most.</p>

      <div class="section-header">TOP 5 — DO NOW</div>
      <div class="summary-grid">{"".join(card(i) for i in do_now)}</div>

      <div class="section-header">TOP 5 — EXPLORE FURTHER</div>
      <div class="summary-grid">{"".join(card(i) for i in explore)}</div>

      <div class="section-header">EFFORT × IMPACT</div>
      {matrix_svg}
      <p class="caption">Y-axis: estimated financial impact at scale. X-axis: time to first pilot. Lower-left = small, slow. Upper-right = big and fast.</p>
    </section>
    """


def render_matrix_svg(ideas: list[dict]) -> str:
    # Position each idea in a 2x2 based on TtP (x) and composite score (y proxy).
    # Only plot Tier 1 and Tier 2 to keep legible.
    plottable = [i for i in ideas if i.get("tier") in (1, 2)]

    def x_for(i):
        ttp = i.get("scores", {}).get("ttp", 3)
        # score 1 (>12mo) → left, score 5 (<90d) → right
        return 0.1 + (ttp - 1) * 0.20

    def y_for(i):
        lc = i.get("scores", {}).get("lc", 3)
        # labor/cost impact: 1 → bottom, 5 → top
        return 0.9 - (lc - 1) * 0.20

    # Slight deterministic jitter so dots don't overlap exactly
    buckets: dict[tuple[float, float], int] = {}
    points = []
    for i in plottable:
        bx, by = x_for(i), y_for(i)
        key = (round(bx, 2), round(by, 2))
        n = buckets.get(key, 0)
        buckets[key] = n + 1
        angle = (n * 37) % 360
        import math
        jx = bx + math.cos(math.radians(angle)) * (0.02 if n else 0)
        jy = by + math.sin(math.radians(angle)) * (0.02 if n else 0)
        points.append((i["id"], jx, jy, i.get("tier", 2)))

    W, H = 640, 360
    dots = []
    for pid, jx, jy, tier in points:
        cx = int(jx * W)
        cy = int(jy * H)
        fill = "#D4A843" if tier == 1 else "#4A7FB5"
        r = 9 if tier == 1 else 6
        dots.append(f'<g><circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" fill-opacity="0.8" stroke="#13161D" stroke-width="1.5"/><text x="{cx}" y="{cy+3}" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#0C0F14" font-weight="600">{pid}</text></g>')

    return f"""
    <svg class="matrix" viewBox="0 0 {W} {H}" width="100%" style="max-width:900px;">
      <rect x="0" y="0" width="{W}" height="{H}" fill="#13161D" stroke="#D4A843" stroke-opacity="0.3"/>
      <line x1="{W/2}" y1="0" x2="{W/2}" y2="{H}" stroke="#D4A843" stroke-opacity="0.2"/>
      <line x1="0" y1="{H/2}" x2="{W}" y2="{H/2}" stroke="#D4A843" stroke-opacity="0.2"/>
      <text x="{W/4}" y="20" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#8A8D94">SLOW / HIGH IMPACT</text>
      <text x="{3*W/4}" y="20" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#D4A843">FAST / HIGH IMPACT</text>
      <text x="{W/4}" y="{H-8}" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#8A8D94">SLOW / LOW IMPACT</text>
      <text x="{3*W/4}" y="{H-8}" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#8A8D94">FAST / LOW IMPACT</text>
      {"".join(dots)}
    </svg>
    """


def render_problems() -> str:
    rows = []
    for pid, problem, evidence, binding in PROBLEMS:
        rows.append(f"""
        <tr>
          <td class="pid">{pid}</td>
          <td class="problem">{esc(problem)}</td>
          <td class="evidence">{esc(evidence)}</td>
          <td class="binding">{esc(binding)}</td>
        </tr>
        """)
    return f"""
    <section class="page">
      <div class="section-header">PROBLEM STATEMENTS</div>
      <h2 class="page-title">Ten Problems Justin Is Solving For</h2>
      <p class="lede">Every idea in this workshop references one or more of the problems below. Evidence comes from Justin's April 20 email, iMessage history, and public Ashley corporate communications. Binding constraint names the dimension that blocks progress.</p>
      <table class="problems-table">
        <thead>
          <tr><th>#</th><th>Problem</th><th>Evidence</th><th>Binding constraint</th></tr>
        </thead>
        <tbody>
          {"".join(rows)}
        </tbody>
      </table>
    </section>
    """


def render_track(track: str, ideas: list[dict]) -> str:
    track_ideas = [i for i in ideas if i["track"] == track]
    tier1 = [i for i in track_ideas if i.get("tier") == 1]
    tier2 = [i for i in track_ideas if i.get("tier") == 2]
    tier3 = [i for i in track_ideas if i.get("tier") == 3]

    intro_subtitle = {
        "A": "Format and product innovation: new revenue lines, retail formats, and buyer-ready product concepts.",
        "B": "Ops and AI arbitrage: where AI implementation cost is dramatically lower than the value it creates at 30-store scale.",
        "C": "Back-office and CFO transition: the operating foundation that enables everything else in this document.",
    }[track]

    return f"""
    <section class="page track-intro">
      <div class="section-header">{esc(TRACK_LABELS[track].upper())}</div>
      <h2 class="page-title">{esc(TRACK_LABELS[track].split(' — ')[1])}</h2>
      <p class="lede">{esc(intro_subtitle)}</p>
      <div class="track-stats">
        <div><span class="stat-num">{len(tier1)}</span><span class="stat-label">TIER 1</span></div>
        <div><span class="stat-num">{len(tier2)}</span><span class="stat-label">TIER 2</span></div>
        <div><span class="stat-num">{len(tier3)}</span><span class="stat-label">TIER 3</span></div>
      </div>
    </section>
    {"".join(render_full_idea(i) for i in tier1 + tier2)}
    {"".join(render_condensed_idea(i) for i in tier3)}
    """


def render_appendix(ideas: list[dict]) -> str:
    method_set: dict[int, int] = {}
    framework_set: dict[str, int] = {}
    for i in ideas:
        m = i.get("method")
        if m:
            method_set[m] = method_set.get(m, 0) + 1
        for f in i.get("frameworks", []):
            framework_set[f] = framework_set.get(f, 0) + 1

    method_rows = "".join(f"<tr><td>#{m}</td><td>{c}</td></tr>" for m, c in sorted(method_set.items()))
    framework_rows = "".join(f"<tr><td>{esc(f)}</td><td>{c}</td></tr>" for f, c in sorted(framework_set.items(), key=lambda x: -x[1]))

    return f"""
    <section class="page">
      <div class="section-header">APPENDIX — METHODOLOGY</div>
      <h2 class="page-title">How This Workshop Was Built</h2>
      <p>This workshop was generated using the combined Innovation Workshop and Operations Innovation Engine pipelines. Stage 0 used the April 21 internal brief as a sharp-thesis Level-3 input (no fresh research). Stage 1 applied 10 methods from the full-stack-ideation library. Stage 2 generated 40 raw ideas across three tracks. Stage 3 scored each against the ops rubric (5 criteria, weighted composite) and tiered into Do Now / Explore / Watch.</p>

      <div class="section-header">METHOD FREQUENCY</div>
      <table class="small-table"><thead><tr><th>Method #</th><th>Count</th></tr></thead><tbody>{method_rows}</tbody></table>

      <div class="section-header">OPERATOR WISDOM REFERENCED</div>
      <table class="small-table"><thead><tr><th>Framework</th><th>Ideas anchored</th></tr></thead><tbody>{framework_rows}</tbody></table>

      <div class="section-header">SCORING RUBRIC</div>
      <table class="small-table">
        <thead><tr><th>Criterion</th><th>Weight</th><th>Score 5</th></tr></thead>
        <tbody>
          <tr><td>Labor / cost impact</td><td>25%</td><td>&gt;15% or structural cost-curve reset</td></tr>
          <tr><td>Throughput / speed impact</td><td>20%</td><td>&gt;30% gain or unlocks new format</td></tr>
          <tr><td>Scalability</td><td>20%</td><td>Extends beyond client (category creation, exportable framework)</td></tr>
          <tr><td>Time to pilot</td><td>15%</td><td>&lt;90 days</td></tr>
          <tr><td>Risk-adjusted feasibility</td><td>20%</td><td>Low risk, strong precedent, reversible pilot</td></tr>
        </tbody>
      </table>
      <p class="note">Tier 1 ≥ 4.00 · Tier 2 3.50-3.99 · Tier 3 3.00-3.49 · Cut below 3.00.</p>

      <div class="section-header">SOURCES</div>
      <ul class="sources">
        <li>Internal brief: <em>1915 South | Justin Woods — Comprehensive Analysis &amp; Opportunity Brief</em>, April 21, 2026</li>
        <li>Justin Woods, April 20, 2026 email outlining leadership-team vision</li>
        <li>Ashley Furniture Industries public statements on GMROI Excellence Framework (Dec 2024) and AI mandate</li>
        <li>Operator wisdom cards: toc-five-focusing-steps, toyota-way-pillars, sam-walton-retail-doctrine, foran-radical-simplification, thorndike-capital-allocation, high-output-management, bezos-shareholder-letters, danny-meyer-hospitality, slootman-amp-it-up, chipotle-throughput-model</li>
        <li>Industry benchmarks: Furniture Today 2024 consumer panel; Best Buy Geek Squad public reporting; Ashley corporate AI forecast accuracy claims</li>
      </ul>
    </section>
    """


CSS = r"""
  @page { size: 11in 17in; margin: 0; }
  :root {
    --bg: #0C0F14;
    --bg-card: #13161D;
    --bg-card-alt: #181C25;
    --gold: #D4A843;
    --gold-dim: #9A7B32;
    --blue: #4A7FB5;
    --dark-blue: #1E3A5F;
    --white: #F0EDE6;
    --gray: #8A8D94;
    --gray-light: #B0B3BA;
    --red: #C45C5C;
    --red-dim: #8B3A3A;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--bg);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 52px 40px;
    min-height: 100vh;
    position: relative;
    page-break-after: always;
    page-break-inside: avoid;
  }
  .page::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image:
      linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
  .cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 90vh;
  }
  .cover-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
  }
  .cover h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 64px;
    letter-spacing: -1px;
    color: var(--white);
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .cover h1 span { color: var(--gold); }
  .cover .subtitle {
    font-size: 22px;
    color: var(--gray-light);
    margin-bottom: 40px;
    max-width: 720px;
  }
  .cover-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--gray);
    letter-spacing: 1px;
  }
  .cover-meta span { color: var(--gold-dim); }
  .cover-meta > div { margin-bottom: 6px; }
  .cover-divider {
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-dim));
    margin: 32px 0;
    border-radius: 2px;
  }
  .section-header {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin: 40px 0 16px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(212,168,67,0.2);
  }
  .page > .section-header:first-child { margin-top: 0; }
  h2.page-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 40px;
    letter-spacing: -0.5px;
    line-height: 1.15;
    margin-bottom: 24px;
  }
  .lede {
    font-size: 16px;
    color: var(--gray-light);
    max-width: 780px;
    margin-bottom: 28px;
  }
  .caption {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--gray);
    margin-top: 8px;
  }
  /* IDEA PAGES */
  .idea-page { padding: 40px 52px 32px; }
  .idea-header {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin-bottom: 14px;
  }
  .chip {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 3px;
  }
  .chip-tier1 { background: var(--gold); color: #0C0F14; font-weight: 600; }
  .chip-tier2 { background: var(--blue); color: #F0EDE6; }
  .chip-tier3 { background: var(--bg-card-alt); color: var(--gray-light); border: 1px solid rgba(212,168,67,0.15); }
  .chip-track { background: transparent; color: var(--gold-dim); border: 1px solid var(--gold-dim); }
  .score-chip {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--gray);
    margin-left: auto;
  }
  h2.idea-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 1.15;
    margin-bottom: 8px;
  }
  .idea-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--gray);
    margin-bottom: 18px;
  }
  .idea-body .section { margin-bottom: 14px; }
  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 4px;
  }
  .section p { color: var(--gray-light); font-size: 14px; }
  .section ul { margin-left: 18px; color: var(--gray-light); }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }
  .attribution {
    margin-top: 16px;
    padding-top: 10px;
    border-top: 1px solid rgba(212,168,67,0.15);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 1.5px;
    color: var(--gray);
  }
  .image-block {
    float: left;
    margin: 0 24px 16px 0;
  }
  .image-block img {
    width: 280px; height: 280px;
    object-fit: contain;
    background: var(--bg-card);
    border: 1px solid rgba(212,168,67,0.15);
    border-radius: 4px;
  }
  .image-placeholder {
    width: 280px; height: 280px;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg-card);
    border: 1px dashed rgba(212,168,67,0.25);
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--gray);
    text-align: center;
    padding: 20px;
  }
  .idea-body::after { content: ""; display: block; clear: both; }
  /* EXEC SUMMARY */
  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }
  .summary-card {
    background: var(--bg-card);
    border: 1px solid rgba(212,168,67,0.15);
    border-left: 3px solid var(--gold);
    padding: 14px 18px;
    border-radius: 3px;
  }
  .summary-card-id {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--gold);
    margin-bottom: 6px;
  }
  .summary-card-name {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: var(--white);
    margin-bottom: 4px;
  }
  .summary-card-score {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 1.5px;
    color: var(--gray);
  }
  /* PROBLEMS TABLE */
  .problems-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 14px;
    font-size: 13px;
  }
  .problems-table th {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(212,168,67,0.3);
  }
  .problems-table td {
    padding: 14px 12px;
    vertical-align: top;
    color: var(--gray-light);
    border-bottom: 1px solid rgba(212,168,67,0.1);
  }
  .problems-table td.pid {
    font-family: 'JetBrains Mono', monospace;
    color: var(--gold);
    font-weight: 600;
    width: 50px;
  }
  .problems-table td.binding {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--gold-dim);
    text-transform: uppercase;
    width: 120px;
  }
  /* TRACK INTRO */
  .track-intro { min-height: 80vh; }
  .track-stats {
    display: flex;
    gap: 40px;
    margin-top: 36px;
  }
  .track-stats > div {
    display: flex;
    flex-direction: column;
  }
  .stat-num {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 56px;
    color: var(--gold);
    line-height: 1;
  }
  .stat-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--gray);
    margin-top: 4px;
  }
  /* APPENDIX */
  .small-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .small-table th {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
    text-align: left;
    padding: 8px 10px;
    border-bottom: 1px solid rgba(212,168,67,0.3);
  }
  .small-table td {
    padding: 8px 10px;
    color: var(--gray-light);
    border-bottom: 1px solid rgba(212,168,67,0.08);
  }
  .note { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--gray); letter-spacing: 1px; margin-top: 8px; }
  ul.sources { margin-left: 18px; color: var(--gray-light); font-size: 13px; }
  ul.sources li { margin-bottom: 6px; }
  .matrix { display: block; margin: 20px 0 8px; border-radius: 3px; }
  /* CONDENSED IDEA PAGE */
  .idea-page.condensed { min-height: auto; padding: 40px 52px 28px; }
  .idea-page.condensed .idea-body p { font-size: 14px; color: var(--gray-light); max-width: 820px; }
"""


def wrap_html(body_html: str, extra_css: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{TITLE} — {CLIENT} — {DATE_STR}</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
{CSS}
{extra_css}
</style>
</head>
<body>
{body_html}
</body>
</html>
"""


def main() -> None:
    ideas = load_ideas()

    cover = render_cover()
    exec_summary = render_exec_summary(ideas)
    problems = render_problems()
    track_a = render_track("A", ideas)
    track_b = render_track("B", ideas)
    track_c = render_track("C", ideas)
    appendix = render_appendix(ideas)

    body_html = "".join([cover, exec_summary, problems, track_a, track_b, track_c, appendix])

    OUTPUT_DARK.write_text(wrap_html(body_html))
    OUTPUT_LIGHT.write_text(wrap_html(body_html, extra_css=LIGHT_OVERRIDES))

    idea_counts = {
        "total": len(ideas),
        "tier1": sum(1 for i in ideas if i.get("tier") == 1),
        "tier2": sum(1 for i in ideas if i.get("tier") == 2),
        "tier3": sum(1 for i in ideas if i.get("tier") == 3),
        "cut": sum(1 for i in ideas if i.get("tier") == "cut"),
    }
    print(f"Rendered {idea_counts} ideas.")
    print(f"  Dark: {OUTPUT_DARK}")
    print(f"  Light: {OUTPUT_LIGHT}")


if __name__ == "__main__":
    main()
