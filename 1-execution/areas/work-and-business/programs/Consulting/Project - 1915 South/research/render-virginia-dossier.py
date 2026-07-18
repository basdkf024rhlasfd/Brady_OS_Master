#!/usr/bin/env python3
"""Render the Virginia furniture targets dossier markdown to a clean Letter-format PDF.

Uses the mception design system light theme (warm cream paper, Inter typeface,
amber accent). Standalone — no project chrome, no client branding.
"""

from pathlib import Path

import markdown
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
MD_PATH = HERE / "virginia-furniture-targets-deep-dossier-2026-04-29.md"
HTML_PATH = HERE / "virginia-furniture-targets-deep-dossier-2026-04-29.html"
PDF_PATH = HERE.parent / "virginia-furniture-targets-deep-dossier-2026-04-29.pdf"

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg: #F5F1E8;
  --bg-card: #FFFFFF;
  --bg-card-alt: #FAF6EE;
  --ink: #1A1F2E;
  --gray: #5A5D64;
  --gray-light: #2A2D34;
  --line: #D4CEBE;
  --accent: #B56A1C;
  --accent-soft: #8F5211;
  --positive: #2E7D3F;
  --alert: #B53D3D;
}

* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 10.5pt;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

.page {
  max-width: 7.5in;
  margin: 0 auto;
  padding: 0.5in 0.6in;
  background: var(--bg);
}

.page.cover {
  min-height: 9.5in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2in 1in 0.8in;
  background: linear-gradient(135deg, var(--bg) 0%, var(--bg-card) 100%);
  page-break-after: always;
}

.cover-eyebrow {
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.18em;
  font-size: 9.5pt;
  text-transform: uppercase;
}
.cover-title {
  font-size: 38pt;
  line-height: 1.04;
  font-weight: 800;
  margin: 28px 0 16px;
  letter-spacing: -0.018em;
  color: var(--ink);
}
.cover-subtitle {
  font-size: 14pt;
  font-weight: 500;
  color: var(--gray);
  max-width: 6.2in;
  line-height: 1.4;
}
.cover-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  color: var(--gray);
  font-size: 9pt;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.04em;
  border-top: 1px solid var(--line);
  padding-top: 18px;
}
.cover-meta strong {
  color: var(--ink);
  font-weight: 600;
}

h1 {
  font-size: 22pt;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin: 36px 0 14px;
  color: var(--ink);
  page-break-after: avoid;
}
h1:first-child { margin-top: 0; }
h2 {
  font-size: 15pt;
  font-weight: 700;
  letter-spacing: -0.004em;
  margin: 28px 0 10px;
  color: var(--ink);
  padding-top: 10px;
  border-top: 1px solid var(--line);
  page-break-after: avoid;
}
h3 {
  font-size: 12pt;
  font-weight: 700;
  margin: 20px 0 8px;
  color: var(--accent);
  letter-spacing: 0.004em;
  page-break-after: avoid;
}
h4 {
  font-size: 10pt;
  font-weight: 700;
  margin: 14px 0 5px;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  page-break-after: avoid;
}

p { margin: 0 0 10px; }
ul, ol { margin: 0 0 12px; padding-left: 20px; }
li { margin-bottom: 3px; }

strong { color: var(--ink); font-weight: 700; }
em { color: var(--gray-light); font-style: italic; }

a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px dotted var(--accent-soft);
}

hr { border: 0; border-top: 1px solid var(--line); margin: 28px 0; }

blockquote {
  margin: 0 0 12px;
  padding: 8px 16px;
  border-left: 3px solid var(--accent);
  background: var(--bg-card);
  color: var(--gray-light);
}

code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9pt;
  background: var(--bg-card-alt);
  padding: 2px 5px;
  border-radius: 3px;
  color: var(--accent);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 14px 0 16px;
  font-size: 9pt;
  page-break-inside: auto;
}
thead { background: var(--bg-card-alt); }
th, td {
  padding: 7px 10px;
  border: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}
th {
  color: var(--accent);
  font-weight: 700;
  font-size: 8.5pt;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
tr { page-break-inside: avoid; }
tr:nth-child(even) td { background: var(--bg-card-alt); }

section, h2, table, ul, ol { page-break-inside: avoid; }
h2, h3 { break-after: avoid; }

@page {
  size: Letter;
  margin: 0.4in 0.4in 0.4in 0.4in;
}
"""

COVER_HTML = """
<section class="page cover">
  <div>
    <div class="cover-eyebrow">Strategic Reconnaissance · Internal</div>
    <h1 class="cover-title">Virginia Ashley Operators</h1>
    <p class="cover-subtitle">Deep target dossier on the four independent Ashley HomeStore licensees operating across Virginia. Owners, footprints, succession signals, philanthropy, family networks, legal posture, and the warm-introduction surface area for each.</p>
  </div>
  <div class="cover-meta">
    <span><strong>Date</strong> &nbsp; 2026-04-29</span>
    <span><strong>Sources</strong> &nbsp; 45+ live-verified</span>
    <span><strong>Depth</strong> &nbsp; Deep recon</span>
    <span><strong>Distribution</strong> &nbsp; Selective</span>
  </div>
</section>
"""


def main() -> None:
    md_text = MD_PATH.read_text(encoding="utf-8")

    # Strip the YAML frontmatter — the cover slide replaces it visually
    if md_text.startswith("---"):
        end = md_text.find("---", 3)
        if end != -1:
            md_text = md_text[end + 3:].lstrip()

    # The first H1 is the title block — the cover already shows it, so
    # drop the duplicate H1 + tagline section.
    lines = md_text.splitlines()
    if lines and lines[0].startswith("# "):
        # Drop the first H1 and any immediate H2 subtitle + blank line that follow
        i = 1
        while i < len(lines) and not lines[i].strip():
            i += 1
        if i < len(lines) and lines[i].startswith("## "):
            i += 1
            while i < len(lines) and not lines[i].strip():
                i += 1
        md_text = "\n".join(lines[i:])

    body_html = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "sane_lists"],
    )

    full_html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Virginia Ashley Operators — Deep Target Dossier</title>
<style>{CSS}</style>
</head>
<body>
{COVER_HTML}
<section class="page">
{body_html}
</section>
</body>
</html>
"""

    HTML_PATH.write_text(full_html, encoding="utf-8")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(HTML_PATH.as_uri())
        page.pdf(
            path=str(PDF_PATH),
            format="Letter",
            print_background=True,
            margin={"top": "0.4in", "right": "0.4in", "bottom": "0.5in", "left": "0.4in"},
            display_header_footer=True,
            footer_template=(
                '<div style="font-family: Inter, sans-serif; font-size: 7.5pt; '
                'color: #8F5211; width: 100%; padding: 0 0.4in; '
                'display: flex; justify-content: space-between;">'
                '<span>Virginia Ashley Operators · Deep Target Dossier</span>'
                '<span class="pageNumber"></span> / <span class="totalPages"></span>'
                '</div>'
            ),
            header_template='<div></div>',
        )
        browser.close()

    print(f"HTML: {HTML_PATH}")
    print(f"PDF:  {PDF_PATH}  ({PDF_PATH.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
