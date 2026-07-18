#!/usr/bin/env python3
"""Render the M&A deep research markdown to mception-styled HTML (dark + light) and PDF.

Usage: python3 render-ma-brief.py
"""

from __future__ import annotations
import re
from pathlib import Path

import markdown
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
MD = HERE / "m-and-a-deep-research-2026-04-22.md"
OUT_DARK = HERE / "m-and-a-deep-research-2026-04-22.html"
OUT_LIGHT = HERE / "m-and-a-deep-research-2026-04-22-light.html"
OUT_PDF = HERE / "m-and-a-deep-research-2026-04-22.pdf"


# mception design-system tokens (dark default, light override)
BASE_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg: #0B0E14;
  --bg-card: #161A23;
  --bg-card-alt: #1E2330;
  --white: #F5F1E8;
  --gray: #A8ADB8;
  --gray-light: #D4D7DD;
  --accent: #E8A547;
  --accent-soft: #C97E2A;
  --line: #2A2F3D;
  --positive: #6FC37E;
  --alert: #E86464;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--bg); color: var(--white); font-family: 'Inter', system-ui, sans-serif; font-size: 11pt; line-height: 1.55; -webkit-font-smoothing: antialiased; }
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 56px 72px 48px;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}
.page.cover {
  min-height: 100vh;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 96px 96px 64px;
  background: linear-gradient(135deg, var(--bg) 0%, var(--bg-card) 100%);
  page-break-after: always;
}
.cover-eyebrow { color: var(--accent); font-weight: 700; letter-spacing: 0.18em; font-size: 10pt; text-transform: uppercase; }
.cover-title { font-size: 48pt; line-height: 1.05; font-weight: 800; margin: 24px 0 16px; letter-spacing: -0.02em; }
.cover-subtitle { font-size: 18pt; font-weight: 500; color: var(--gray-light); max-width: 780px; }
.cover-meta { display: flex; gap: 40px; color: var(--gray); font-size: 10pt; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em; }
.cover-meta strong { color: var(--white); font-weight: 500; }

h1 { font-size: 26pt; font-weight: 800; letter-spacing: -0.01em; margin: 48px 0 20px; color: var(--white); page-break-after: avoid; }
h1:first-child { margin-top: 0; }
h2 { font-size: 18pt; font-weight: 700; letter-spacing: -0.005em; margin: 36px 0 14px; color: var(--white); padding-top: 12px; border-top: 1px solid var(--line); page-break-after: avoid; }
h3 { font-size: 13pt; font-weight: 700; margin: 24px 0 10px; color: var(--accent); letter-spacing: 0.005em; page-break-after: avoid; }
h4 { font-size: 11pt; font-weight: 700; margin: 16px 0 6px; color: var(--white); text-transform: uppercase; letter-spacing: 0.08em; page-break-after: avoid; }
p { margin: 0 0 12px; }
ul, ol { margin: 0 0 14px; padding-left: 20px; }
li { margin-bottom: 4px; }
strong { color: var(--white); font-weight: 700; }
em { color: var(--gray-light); font-style: italic; }
code { font-family: 'JetBrains Mono', monospace; font-size: 9.5pt; background: var(--bg-card); padding: 2px 6px; border-radius: 3px; color: var(--accent); }
pre { background: var(--bg-card); padding: 14px 18px; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-size: 9pt; overflow-x: auto; margin-bottom: 14px; }
a { color: var(--accent); text-decoration: none; border-bottom: 1px dotted var(--accent-soft); }
a:hover { border-bottom-style: solid; }
hr { border: 0; border-top: 1px solid var(--line); margin: 36px 0; }
blockquote { margin: 0 0 14px; padding: 8px 18px; border-left: 3px solid var(--accent); background: var(--bg-card); color: var(--gray-light); }

table { width: 100%; border-collapse: collapse; margin: 16px 0 20px; font-size: 9.5pt; page-break-inside: auto; }
thead { background: var(--bg-card-alt); }
th, td { padding: 8px 12px; border: 1px solid var(--line); text-align: left; vertical-align: top; }
th { color: var(--accent); font-weight: 700; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.04em; }
tr { page-break-inside: avoid; }
tr:nth-child(even) td { background: var(--bg-card); }

/* Section-level emphasis */
h1 + p em:first-child,
h2 + p em:first-child { color: var(--accent-soft); }

/* Pagination hints */
section, h2, table, ul, ol { page-break-inside: avoid; }
h2, h3 { break-after: avoid; }

@page {
  size: Letter;
  margin: 0.5in 0.5in 0.5in 0.5in;
}
"""

LIGHT_OVERRIDES = """
:root {
  --bg: #F5F1E8;
  --bg-card: #FFFFFF;
  --bg-card-alt: #FAF6EE;
  --white: #1A1F2E;
  --gray: #5A5D64;
  --gray-light: #2A2D34;
  --line: #D4CEBE;
  --accent: #B56A1C;
  --accent-soft: #8F5211;
}
body { background: var(--bg); color: var(--white); }
.page.cover { background: linear-gradient(135deg, var(--bg) 0%, var(--bg-card) 100%); }
tr:nth-child(even) td { background: var(--bg-card-alt); }
"""


def strip_frontmatter(md_text: str) -> tuple[dict, str]:
    """Strip YAML frontmatter between '---' blocks, return (meta, body)."""
    if not md_text.startswith("---"):
        return {}, md_text
    parts = md_text.split("---", 2)
    if len(parts) < 3:
        return {}, md_text
    meta = {}
    for line in parts[1].strip().splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    return meta, parts[2].lstrip("\n")


def render_body(md_text: str) -> str:
    """Convert markdown body to HTML via python-markdown with tables + fenced_code."""
    md = markdown.Markdown(extensions=["tables", "fenced_code", "attr_list", "toc"])
    html = md.convert(md_text)
    return html


def build_html(meta: dict, body_html: str, *, light: bool = False) -> str:
    css = BASE_CSS + (LIGHT_OVERRIDES if light else "")
    client = meta.get("client", "1915 South | Ashley")
    date_str = meta.get("date", "2026-04-22")
    title = meta.get("title", "1915 South M&A Deep Research")
    cover = f"""
    <section class="page cover">
      <div>
        <div class="cover-eyebrow">M&amp;A · Investment · Partnership Deep Research</div>
        <div class="cover-title">1915 South — The Full Chessboard</div>
        <div class="cover-subtitle">Buy-side roll-up. Capital-in options for Russell. Strategic partnerships. Adjacencies. Brady's positioning angle for the CFO + AI operating partner role.</div>
      </div>
      <div class="cover-meta">
        <div><strong>Client</strong><br>{client}</div>
        <div><strong>Date</strong><br>{date_str}</div>
        <div><strong>Classification</strong><br>Internal — Brady's ammo only</div>
        <div><strong>Depth</strong><br>30+ sources · live-verified</div>
      </div>
    </section>
    """
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
<style>{css}</style>
</head>
<body>
{cover}
<section class="page">
{body_html}
</section>
</body>
</html>"""


def main() -> None:
    md_text = MD.read_text(encoding="utf-8")
    meta, body_md = strip_frontmatter(md_text)

    # First H1 in the markdown is "# 1915 South — The Full Chessboard" — we already have
    # that on the cover, so strip the first H1 + subtitle to avoid duplication.
    body_md = re.sub(r"^# [^\n]+\n+\*\*M&A[^\n]+\n+", "", body_md, count=1)

    body_html = render_body(body_md)

    dark = build_html(meta, body_html, light=False)
    light = build_html(meta, body_html, light=True)

    OUT_DARK.write_text(dark, encoding="utf-8")
    OUT_LIGHT.write_text(light, encoding="utf-8")
    print(f"Wrote: {OUT_DARK.name} ({OUT_DARK.stat().st_size // 1024} KB)")
    print(f"Wrote: {OUT_LIGHT.name} ({OUT_LIGHT.stat().st_size // 1024} KB)")

    # PDF from light
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(OUT_LIGHT.as_uri())
        page.pdf(
            path=str(OUT_PDF),
            format="Letter",
            print_background=True,
            margin={"top": "0.5in", "right": "0.5in", "bottom": "0.5in", "left": "0.5in"},
        )
        browser.close()
    print(f"Wrote: {OUT_PDF.name} ({OUT_PDF.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
