#!/usr/bin/env python3
"""
Render the Panda whitepaper + mception one-pager from markdown into:
- HTML (dark mode, primary visual artifact)
- HTML (light mode, for PDF generation)
- PDF (light mode, print-ready)

Usage:
    python3 render-whitepaper.py

Requirements:
    pip install markdown playwright --break-system-packages
    playwright install chromium
"""

import re
import subprocess
import sys
from pathlib import Path

try:
    import markdown
except ImportError:
    print("Installing markdown...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "markdown", "--break-system-packages"])
    import markdown

HERE = Path(__file__).resolve().parent

DARK_VARS = {
    "--bg": "#0C0F14",
    "--bg-card": "#13161D",
    "--bg-card-alt": "#181C25",
    "--gold": "#D4A843",
    "--gold-dim": "#9A7B32",
    "--blue": "#4A7FB5",
    "--dark-blue": "#1E3A5F",
    "--white": "#F0EDE6",
    "--gray": "#8A8D94",
    "--gray-light": "#B0B3BA",
    "--red": "#C45C5C",
    "--red-dim": "#8B3A3A",
    "--green": "#7CB97A",
    "--rule": "rgba(255,255,255,0.08)",
    "--rule-strong": "rgba(255,255,255,0.14)",
    "--grid-tint": "rgba(212,168,67,0.03)",
}

LIGHT_VARS = {
    "--bg": "#FFFFFF",
    "--bg-card": "#F7F5F0",
    "--bg-card-alt": "#EDEBE5",
    "--gold": "#9C7A1F",
    "--gold-dim": "#B8922E",
    "--blue": "#2C5A8A",
    "--dark-blue": "#1E3A5F",
    "--white": "#1A1A1A",
    "--gray": "#6B6E75",
    "--gray-light": "#3A3D44",
    "--red": "#A33A3A",
    "--red-dim": "#C45C5C",
    "--green": "#3F8A4A",
    "--rule": "rgba(0,0,0,0.10)",
    "--rule-strong": "rgba(0,0,0,0.18)",
    "--grid-tint": "rgba(156,122,31,0.04)",
}


def base_css(varmap):
    var_block = "\n".join(f"  {k}: {v};" for k, v in varmap.items())
    return f"""
:root {{
{var_block}
}}
@page {{
  size: Letter;
  margin: 0;
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body {{
  background: var(--bg);
  color: var(--white);
  font-family: 'DM Sans', -apple-system, sans-serif;
  font-size: 11.5px;
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
}}
body::before {{
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(var(--grid-tint) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-tint) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
  z-index: 0;
}}
.page {{
  max-width: 780px;
  margin: 0 auto;
  padding: 64px 72px 56px;
  position: relative;
  z-index: 1;
}}
.cover {{
  min-height: calc(100vh - 0px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  page-break-after: always;
}}
.cover-meta {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
}}
.cover h1 {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 52px;
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1.04;
  color: var(--white);
  margin-top: 28px;
}}
.cover .subhead {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 22px;
  font-weight: 500;
  color: var(--gold);
  margin-top: 18px;
  line-height: 1.3;
  max-width: 640px;
}}
.cover .gold-rule {{
  height: 2px;
  background: var(--gold-dim);
  margin: 36px 0 28px;
}}
.cover .meta-table {{
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 10px 24px;
  font-size: 12.5px;
  color: var(--gray-light);
}}
.cover .meta-table dt {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--gold);
  padding-top: 3px;
}}
.cover .meta-table dd {{
  color: var(--white);
}}
.cover-footer {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--gray);
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--rule);
  padding-top: 18px;
}}

/* BODY TYPOGRAPHY */
.body h1 {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.6px;
  color: var(--white);
  line-height: 1.15;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 2px solid var(--gold-dim);
  position: relative;
}}
.body h1::before {{
  content: attr(data-num);
  position: absolute;
  top: 24px;
  right: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--gold);
  font-weight: 500;
}}
.body h1:first-child {{
  border-top: none;
  margin-top: 0;
  padding-top: 0;
}}
.body h2 {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: var(--white);
  margin-top: 32px;
  margin-bottom: 12px;
  line-height: 1.25;
}}
.body h3 {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: 28px;
  margin-bottom: 10px;
}}
.body p {{
  margin-bottom: 14px;
  color: var(--white);
  font-weight: 400;
  hyphens: auto;
  text-align: left;
}}
.body p strong {{
  color: var(--white);
  font-weight: 600;
}}
.body em {{
  font-style: italic;
  color: var(--gray-light);
}}
.body ul, .body ol {{
  margin: 0 0 14px 0;
  padding-left: 22px;
}}
.body ul li, .body ol li {{
  margin-bottom: 8px;
  color: var(--white);
}}
.body ul li::marker {{
  color: var(--gold);
}}
.body ol li::marker {{
  color: var(--gold);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
}}
.body code {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  background: var(--bg-card);
  padding: 1px 5px;
  border-radius: 3px;
  color: var(--gold);
}}
.body hr {{
  border: none;
  border-top: 1px solid var(--rule);
  margin: 36px 0;
}}
.body blockquote {{
  border-left: 3px solid var(--gold-dim);
  padding: 4px 18px;
  margin: 18px 0;
  color: var(--gray-light);
  font-style: italic;
}}

/* TABLES */
.body table {{
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 10.5px;
  background: var(--bg-card);
  border: 1px solid var(--rule);
}}
.body table th {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
  text-align: left;
  padding: 10px 12px;
  background: var(--bg-card-alt);
  border-bottom: 2px solid var(--gold-dim);
  font-weight: 500;
}}
.body table td {{
  padding: 9px 12px;
  border-bottom: 1px solid var(--rule);
  color: var(--white);
  vertical-align: top;
}}
.body table tr:last-child td {{
  border-bottom: none;
}}

/* HEADER ON PAGES AFTER COVER */
.running-header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--gray);
  border-bottom: 1px solid var(--rule);
  padding-bottom: 12px;
  margin-bottom: 36px;
}}
.running-header .left {{ color: var(--gold); }}

/* HOW TO READ + EXEC SUMMARY block */
.howto-block {{
  background: var(--bg-card);
  border-left: 3px solid var(--gold-dim);
  padding: 22px 26px;
  margin: 28px 0 0;
  font-size: 11.5px;
  color: var(--gray-light);
}}
.howto-block strong {{ color: var(--white); }}

/* ANCHOR FIVE NUMBERS callout if used */
.anchor-stats {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 18px 0;
  padding: 18px 22px;
  background: var(--bg-card);
  border-top: 2px solid var(--gold);
  border-bottom: 1px solid var(--rule);
}}

/* === VISUAL BLOCKS === */

/* STAT GRID (Exec Summary) */
.stat-grid {{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 18px 0 22px;
}}
.stat-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-top: 2px solid var(--gold);
  padding: 12px 14px 14px;
  break-inside: avoid;
}}
.stat-card .stat-num {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: -0.8px;
  line-height: 1;
  margin-bottom: 6px;
}}
.stat-card .stat-label {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: var(--gray-light);
  margin-bottom: 8px;
  line-height: 1.4;
}}
.stat-card .stat-detail {{
  font-size: 10px;
  line-height: 1.45;
  color: var(--white);
}}

/* DEPENDENCY GRID (Section 1) */
.dep-grid {{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 14px 0 18px;
}}
.dep-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-left: 3px solid var(--gold);
  padding: 12px 14px;
  break-inside: avoid;
}}
.dep-card .dep-num {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.8px;
  color: var(--gold);
  font-weight: 500;
}}
.dep-card .dep-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--white);
  margin: 3px 0 4px;
  line-height: 1.2;
}}
.dep-card .dep-spans {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gray-light);
  margin-bottom: 6px;
}}
.dep-card .dep-detail {{
  font-size: 10px;
  line-height: 1.5;
  color: var(--white);
}}

/* CALLOUT GRID (Section 2) */
.callout-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin: 16px 0 18px;
}}
.callout {{
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 16px;
  background: var(--bg-card);
  border-left: 3px solid var(--gold-dim);
  padding: 10px 14px;
  break-inside: avoid;
}}
.callout .callout-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2.2px;
  text-transform: uppercase;
  color: var(--gold);
  align-self: start;
  padding-top: 1px;
}}
.callout .callout-text {{
  font-size: 11px;
  line-height: 1.5;
  color: var(--white);
}}
.callout .callout-text strong {{ color: var(--white); font-weight: 600; }}

/* FOOTPRINT GRID (Section 3) */
.footprint-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 14px 0 18px;
}}
.fp-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-top: 2px solid var(--gold-dim);
  padding: 10px 12px 12px;
  break-inside: avoid;
}}
.fp-card .fp-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 4px;
}}
.fp-card .fp-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--white);
  letter-spacing: -0.2px;
  margin-bottom: 3px;
  line-height: 1.2;
}}
.fp-card .fp-loc {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  color: var(--gray-light);
  margin-bottom: 6px;
}}
.fp-card .fp-detail {{
  font-size: 9.5px;
  line-height: 1.45;
  color: var(--white);
}}

/* GAP BARS (Section 4) */
.gap-grid {{
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 14px 0 22px;
}}
.gap-row {{
  display: grid;
  grid-template-columns: 130px 1fr 80px;
  gap: 10px;
  align-items: center;
  background: var(--bg-card);
  padding: 8px 12px;
  border-left: 2px solid var(--gold-dim);
  break-inside: avoid;
}}
.gap-row .gap-name {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
}}
.gap-row .gap-bar {{
  display: flex;
  flex-direction: column;
  gap: 3px;
}}
.gap-row .gap-panda, .gap-row .gap-bic {{
  height: 18px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 9.5px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  color: var(--white);
}}
.gap-row .gap-panda {{
  background: rgba(212,168,67,0.45);
  border-left: 2px solid var(--gold);
}}
.gap-row .gap-panda.red {{
  background: rgba(196,92,92,0.45);
  border-left: 2px solid var(--red);
}}
.gap-row .gap-bic {{
  background: rgba(124,185,122,0.30);
  border-left: 2px solid var(--green);
}}
.gap-row .gap-pp {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);
  text-align: right;
}}

/* DOLLAR GRID (Section 4) */
.dollar-grid {{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 7px;
  margin: 14px 0 18px;
}}
.dollar-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  padding: 11px 12px;
  break-inside: avoid;
}}
.dollar-card.primary {{
  border: 1px solid var(--gold);
  background: linear-gradient(180deg, rgba(212,168,67,0.10), rgba(212,168,67,0.02));
}}
.dollar-card .dollar-num {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 5px;
}}
.dollar-card .dollar-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 5px;
  line-height: 1.2;
}}
.dollar-card .dollar-detail {{
  font-size: 8.5px;
  line-height: 1.4;
  color: var(--gray-light);
}}

/* CONSTRAINT CARDS (Section 5) */
.constraint-grid {{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin: 14px 0 18px;
}}
.constraint-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-top: 2px solid var(--gold-dim);
  padding: 11px 14px 13px;
  position: relative;
  break-inside: avoid;
}}
.constraint-card.primary {{ border-top-color: var(--gold); border-top-width: 3px; }}
.constraint-card.structural {{ border-top-color: var(--gray); }}
.constraint-card .constraint-rank {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--gold);
  font-weight: 500;
}}
.constraint-card .constraint-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gray);
  display: inline-block;
  border: 1px solid var(--rule-strong);
  padding: 1px 6px;
  margin: 4px 0 6px;
}}
.constraint-card .constraint-tag.primary {{ color: var(--gold); border-color: var(--gold-dim); }}
.constraint-card .constraint-tag.structural {{ color: var(--gray-light); }}
.constraint-card .constraint-tag.warn {{ color: var(--red); border-color: var(--red-dim); }}
.constraint-card .constraint-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 5px;
  line-height: 1.2;
}}
.constraint-card .constraint-text {{
  font-size: 10px;
  line-height: 1.5;
  color: var(--white);
}}

/* MECH TABLE (Section 6) */
.mech-table {{
  margin: 14px 0 18px;
  border: 1px solid var(--rule);
  background: var(--bg-card);
}}
.mech-row {{
  display: grid;
  grid-template-columns: 2.4fr 1.4fr 1fr 1fr;
  gap: 14px;
  padding: 9px 14px;
  border-bottom: 1px solid var(--rule);
  font-size: 10px;
  color: var(--white);
  align-items: center;
  break-inside: avoid;
}}
.mech-row.mech-head {{
  background: var(--bg-card-alt);
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 500;
}}
.mech-row.mech-best {{
  background: linear-gradient(90deg, rgba(212,168,67,0.10), transparent);
  border-left: 3px solid var(--gold);
}}
.mech-row:last-child {{ border-bottom: none; }}

/* VECTOR CARDS (Section 6) */
.vector-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 14px 0 22px;
}}
.vector-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  padding: 12px 14px 14px;
  break-inside: avoid;
}}
.vector-card.v1 {{ border-top: 3px solid var(--red); }}
.vector-card.v2 {{ border-top: 3px solid var(--gold); }}
.vector-card.v3 {{ border-top: 3px solid var(--green); }}
.vector-card .vector-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 5px;
}}
.vector-card .vector-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 6px;
  line-height: 1.2;
}}
.vector-card .vector-meta {{
  font-size: 9.5px;
  color: var(--gray-light);
  margin-bottom: 8px;
  line-height: 1.4;
}}
.vector-card .vector-target, .vector-card .vector-risk {{
  font-size: 9.5px;
  line-height: 1.4;
  color: var(--white);
  margin-top: 5px;
  padding-top: 5px;
  border-top: 1px dashed var(--rule);
}}
.vector-card strong {{ color: var(--gold); font-weight: 600; }}

/* CAPEX GRID (Section 6) */
.capex-grid {{
  margin: 14px 0 18px;
  border: 1px solid var(--rule);
  background: var(--bg-card);
}}
.capex-line {{
  display: grid;
  grid-template-columns: 1.4fr 1fr 2fr;
  gap: 14px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--rule);
  font-size: 10px;
  color: var(--white);
  align-items: center;
}}
.capex-line:last-child {{ border-bottom: none; }}
.capex-line .capex-cat {{ font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold); }}
.capex-line .capex-val {{ font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: var(--white); }}
.capex-line .capex-note {{ font-size: 9px; color: var(--gray-light); }}
.capex-line.capex-total {{ background: var(--bg-card-alt); border-top: 1px solid var(--gold-dim); }}
.capex-line.capex-total .capex-val {{ color: var(--gold); font-size: 13px; }}

/* GATES FLOW (Section 7) */
.gates-flow {{
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 4px;
  margin: 16px 0 20px;
  break-inside: avoid;
}}
.gate-block {{
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--rule);
  padding: 10px 12px;
  border-top: 2px solid var(--gold-dim);
}}
.gate-block.kill {{ border-top: 3px solid var(--red); background: linear-gradient(180deg, rgba(196,92,92,0.06), transparent); }}
.gate-block .gate-num {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: -0.4px;
  line-height: 1;
}}
.gate-block.kill .gate-num {{ color: var(--red); }}
.gate-block .gate-week {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--gold);
  margin: 4px 0 2px;
}}
.gate-block .gate-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 4px;
  line-height: 1.2;
}}
.gate-block .gate-type {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 7.5px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--gray-light);
  margin-bottom: 6px;
}}
.gate-block .gate-criteria {{
  font-size: 9px;
  line-height: 1.4;
  color: var(--white);
}}
.gate-arrow {{
  align-self: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  color: var(--gold);
  font-weight: 700;
  padding: 0 1px;
}}

/* CAPABILITY GRID (Section 8) */
.cap-grid {{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin: 14px 0 18px;
}}
.cap-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-left: 3px solid var(--gold);
  padding: 11px 14px;
  break-inside: avoid;
}}
.cap-card .cap-num {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--gold);
  font-weight: 500;
}}
.cap-card .cap-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--white);
  margin: 3px 0 5px;
  line-height: 1.2;
}}
.cap-card .cap-detail {{
  font-size: 10px;
  line-height: 1.45;
  color: var(--white);
  margin-bottom: 6px;
}}
.cap-card .cap-form {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
  padding-top: 5px;
  border-top: 1px dashed var(--rule);
}}

/* STAFF TABLE (Section 8) */
.staff-table {{
  margin: 14px 0 18px;
  border: 1px solid var(--rule);
  background: var(--bg-card);
}}
.staff-row {{
  display: grid;
  grid-template-columns: 1.6fr 1.2fr 1.5fr;
  gap: 14px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--rule);
  font-size: 10px;
  color: var(--white);
  align-items: center;
}}
.staff-row:last-child {{ border-bottom: none; }}
.staff-row.staff-head {{
  background: var(--bg-card-alt);
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
}}
.staff-row .form-perm {{
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--green);
  border: 1px solid rgba(124,185,122,0.40);
  padding: 1px 6px;
  background: rgba(124,185,122,0.08);
}}
.staff-row .form-frac {{
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid var(--gold-dim);
  padding: 1px 6px;
  background: rgba(212,168,67,0.08);
}}

/* MECHANISM CARDS (Section 8) */
.mech-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  margin: 14px 0 18px;
}}
.mech-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-top: 2px solid var(--gold-dim);
  padding: 11px 13px 13px;
  break-inside: avoid;
}}
.mech-card .mech-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 4px;
}}
.mech-card .mech-title {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 5px;
  line-height: 1.2;
}}
.mech-card .mech-text {{
  font-size: 9.5px;
  line-height: 1.5;
  color: var(--white);
}}

/* SEQUENCE FLOW (Section 8) */
.seq-flow {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 14px 0 18px;
}}
.seq-block {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-top: 2px solid var(--gold);
  padding: 11px 14px 13px;
  break-inside: avoid;
}}
.seq-block .seq-month {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 3px;
}}
.seq-block .seq-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 8px;
  line-height: 1.2;
}}
.seq-block ul {{
  margin: 0;
  padding-left: 14px;
  list-style: none;
}}
.seq-block ul li {{
  font-size: 9.5px;
  line-height: 1.45;
  color: var(--white);
  margin-bottom: 5px;
  position: relative;
}}
.seq-block ul li::before {{
  content: '·';
  color: var(--gold);
  position: absolute;
  left: -10px;
  top: -1px;
  font-weight: 700;
  font-size: 12px;
}}

/* NINETY-DAY GRID (Section 9) */
.ninety-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 14px 0 18px;
}}
.ninety-block {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-top: 3px solid var(--gold);
  padding: 11px 13px 13px;
  break-inside: avoid;
}}
.ninety-block .ninety-week {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 2px;
}}
.ninety-block .ninety-theme {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 8px;
  letter-spacing: -0.3px;
}}
.ninety-item {{
  font-size: 9.5px;
  line-height: 1.5;
  color: var(--white);
  margin-bottom: 8px;
  padding-left: 12px;
  position: relative;
}}
.ninety-item::before {{
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  width: 5px;
  height: 5px;
  background: var(--gold);
  border-radius: 50%;
}}
.ninety-item strong {{ color: var(--white); font-weight: 600; }}

/* ANTI-PATTERN GRID (Section 10) */
.anti-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin: 14px 0 18px;
}}
.anti-card {{
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 1fr;
  gap: 14px;
  background: var(--bg-card);
  border-left: 3px solid var(--red);
  padding: 11px 14px;
  break-inside: avoid;
  font-size: 10px;
  line-height: 1.5;
}}
.anti-card .anti-rule {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--red);
  line-height: 1.2;
}}
.anti-card .anti-evidence {{ color: var(--gray-light); }}
.anti-card .anti-action {{ color: var(--white); }}
.anti-card strong {{ color: var(--white); font-weight: 600; }}

/* DECISION GRID (Section 11) */
.decision-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin: 14px 0 18px;
}}
.decision-card {{
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: auto auto;
  gap: 4px 14px;
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-left: 3px solid var(--gold);
  padding: 11px 14px;
  break-inside: avoid;
  align-items: start;
}}
.decision-card .decision-num {{
  grid-row: 1 / span 2;
  grid-column: 1;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: -1px;
  line-height: 1;
  padding-top: 2px;
}}
.decision-card .decision-q {{
  grid-row: 1;
  grid-column: 2;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 5px;
  line-height: 1.25;
}}
.decision-card .decision-text {{
  grid-row: 2;
  grid-column: 2;
  font-size: 10px;
  line-height: 1.5;
  color: var(--gray-light);
}}

/* LAB CONCEPT CARDS (Innovation Lab section) */
.lab-card {{
  background: var(--bg-card);
  border: 1px solid var(--rule);
  border-top: 3px solid var(--gold);
  padding: 0;
  margin: 18px 0 24px;
  break-inside: avoid;
  page-break-inside: avoid;
}}
.lab-card .lab-image {{
  width: 100%;
  display: block;
  background: var(--bg-card-alt);
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-bottom: 2px solid var(--gold-dim);
}}
.lab-card .lab-image-placeholder {{
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, var(--bg-card-alt), var(--bg-card));
  border-bottom: 2px solid var(--gold-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
}}
.lab-card .lab-body {{ padding: 16px 20px 18px; }}
.lab-card .lab-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 4px;
}}
.lab-card .lab-name {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--white);
  letter-spacing: -0.5px;
  margin-bottom: 10px;
  line-height: 1.15;
}}
.lab-card .lab-row {{
  font-size: 10.5px;
  line-height: 1.55;
  color: var(--white);
  margin-bottom: 5px;
}}
.lab-card .lab-row strong {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 500;
  margin-right: 6px;
}}

/* PRINT TWEAKS */
@media print {{
  body {{ font-size: 10.5px; }}
  .page {{ padding: 56px 64px 48px; }}
  .cover {{ min-height: auto; padding-top: 96px; padding-bottom: 80px; }}
  .body h1 {{
    page-break-before: always;
    page-break-after: avoid;
  }}
  .body h1:first-child {{ page-break-before: auto; }}
  .body h2, .body h3 {{
    page-break-after: avoid;
  }}
  .body table, .stat-card, .dep-card, .callout, .fp-card, .gap-row,
  .dollar-card, .constraint-card, .vector-card, .gate-block, .cap-card,
  .mech-card, .seq-block, .ninety-block, .anti-card, .decision-card {{
    page-break-inside: avoid;
  }}
  .gates-flow, .vector-grid, .seq-flow, .ninety-grid {{
    page-break-inside: avoid;
  }}
  .body p {{ orphans: 3; widows: 3; }}
}}
"""


HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
{cover}
<div class="page body">
{running_header}
{body}
</div>
</body>
</html>
"""

ONEPAGER_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
{css}
{onepager_css}
</style>
</head>
<body class="onepager-body">
<div class="page onepager">
{body}
</div>
</body>
</html>
"""

ONEPAGER_CSS = """
@page { size: Letter; margin: 0; }
html, body { background: var(--bg); color: var(--white); }
.onepager-body { font-size: 9.5px; line-height: 1.46; }
.onepager {
  max-width: 7.6in;
  margin: 0 auto;
  padding: 0.55in 0.65in 0.45in;
  page-break-after: avoid;
}
.onepager h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--gold);
  line-height: 1;
  margin: 0;
  padding: 0;
  border: none;
}
.onepager h1::before { content: none; }
.onepager h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--white);
  letter-spacing: -0.2px;
  line-height: 1.25;
  margin: 4px 0 0;
}
.onepager h3 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--gold);
  margin: 14px 0 5px;
}
.onepager p {
  margin: 0 0 7px 0;
  color: var(--white);
  font-size: 9.5px;
  line-height: 1.5;
  hyphens: auto;
}
.onepager p strong { color: var(--white); font-weight: 600; }
.onepager hr {
  border: none;
  border-top: 1px solid var(--gold-dim);
  margin: 10px 0 12px;
}
.onepager ul {
  margin: 0 0 8px 18px;
  padding: 0;
  list-style: none;
}
.onepager ul li {
  position: relative;
  margin-bottom: 4px;
  font-size: 9.5px;
  line-height: 1.42;
  padding-left: 2px;
}
.onepager ul li::before {
  content: '·';
  color: var(--gold);
  position: absolute;
  left: -12px;
  top: -2px;
  font-weight: 700;
  font-size: 14px;
}
.onepager .muted {
  background: var(--bg-card);
  border-left: 2px solid var(--gold-dim);
  padding: 8px 12px;
  margin: 6px 0 8px;
  font-size: 8.8px;
  line-height: 1.45;
  color: var(--gray-light);
}
.onepager .muted em { color: var(--gray-light); }
.onepager .onepager-footer {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gray);
  text-align: center;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid var(--rule);
}
"""


def build_cover(title, subtitle, prepared_for, prepared_by, date, corpus, status, footer_left, footer_right):
    return f"""<div class="page cover">
  <div>
    <div class="cover-meta">{footer_left}</div>
    <h1>{title}</h1>
    <div class="subhead">{subtitle}</div>
    <div class="gold-rule"></div>
    <dl class="meta-table">
      <dt>Prepared for</dt><dd>{prepared_for}</dd>
      <dt>Prepared by</dt><dd>{prepared_by}</dd>
      <dt>Date</dt><dd>{date}</dd>
      <dt>Source corpus</dt><dd>{corpus}</dd>
      <dt>Status</dt><dd>{status}</dd>
    </dl>
  </div>
  <div class="cover-footer">
    <span>{footer_left}</span>
    <span>{footer_right}</span>
  </div>
</div>"""


def md_to_body(md_text):
    """Convert markdown body (after stripping cover metadata) into HTML."""
    html = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "attr_list", "sane_lists", "md_in_html"],
    )
    # Number top-level h1 sections (skip "Executive Summary" if it exists at top)
    # Use a counter-based approach: detect each <h1>...</h1>
    counter = [0]

    def numerator(match):
        counter[0] += 1
        inner = match.group(1)
        if counter[0] == 1 and "executive summary" in inner.lower():
            return f"<h1>{inner}</h1>"
        n = counter[0] - 1 if "executive summary" in match.string.split("</h1>")[0].lower() else counter[0]
        return f'<h1 data-num="§ {n:02d}">{inner}</h1>'

    # Simpler approach: just number them in order
    counter = [0]
    def numerator2(match):
        counter[0] += 1
        inner = match.group(1)
        return f'<h1 data-num="§ {counter[0]:02d}">{inner}</h1>'

    html = re.sub(r"<h1>(.*?)</h1>", numerator2, html, flags=re.DOTALL)
    return html


def split_cover_and_body(md_text):
    """Strip the markdown frontmatter (cover content) and return body."""
    # Find the first <hr> equivalent ("---" line) after the cover block
    # Cover is title, subtitle, key-value pairs at top.
    # We assume the markdown begins with title (#) then subtitle (##) then bold lines, then ---.
    parts = md_text.split("\n---\n", 1)
    if len(parts) == 2:
        return parts[1].lstrip()
    return md_text


def render_html(meta, md_text, varmap):
    body_md = split_cover_and_body(md_text)
    body_html = md_to_body(body_md)
    cover_html = build_cover(**meta["cover"])
    css = base_css(varmap)
    running = (
        f'<div class="running-header"><span class="left">{meta["running_left"]}</span>'
        f'<span>{meta["running_right"]}</span></div>'
    )
    return HTML_TEMPLATE.format(
        title=meta["title"],
        css=css,
        cover=cover_html,
        running_header=running,
        body=body_html,
    )


def render_onepager_html(meta, md_text, varmap):
    """Render the one-pager: full content on a single letter page, no cover."""
    # Use the entire markdown (no split) since there's no cover block
    html = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "attr_list", "sane_lists", "md_in_html"],
    )
    css = base_css(varmap)
    return ONEPAGER_TEMPLATE.format(
        title=meta["title"],
        css=css,
        onepager_css=ONEPAGER_CSS,
        body=html,
    )


def write_pair(name, meta, md_text, mode="full"):
    md_path = HERE / f"{name}.md"
    dark_path = HERE / f"{name}.html"
    light_path = HERE / f"{name}-light.html"
    pdf_path = HERE / f"{name}.pdf"

    if not md_text:
        md_text = md_path.read_text()

    if mode == "onepager":
        dark_html = render_onepager_html(meta, md_text, DARK_VARS)
        light_html = render_onepager_html(meta, md_text, LIGHT_VARS)
    else:
        dark_html = render_html(meta, md_text, DARK_VARS)
        light_html = render_html(meta, md_text, LIGHT_VARS)

    dark_path.write_text(dark_html)
    light_path.write_text(light_html)
    print(f"  wrote {dark_path.name}")
    print(f"  wrote {light_path.name}")

    return light_path, pdf_path


def render_pdfs(jobs):
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Installing playwright...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright", "--break-system-packages"])
        subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], check=False)
        from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch()
        for light_path, pdf_path in jobs:
            page = browser.new_page()
            page.goto(f"file://{light_path}")
            page.wait_for_load_state("networkidle")
            page.pdf(
                path=str(pdf_path),
                format="Letter",
                print_background=True,
                margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
                prefer_css_page_size=True,
            )
            print(f"  wrote {pdf_path.name}")
            page.close()
        browser.close()


def main():
    print("Rendering Panda whitepaper...")

    whitepaper_meta = {
        "title": "Panda Operations Innovation — Research Synthesis",
        "running_left": "Panda Operations Innovation · Research Synthesis",
        "running_right": "April 30, 2026",
        "cover": {
            "title": "Panda Operations\nInnovation",
            "subtitle": "A peer-benchmarked view of where the next operating margin lives — and what to build first.",
            "prepared_for": "James Ku · Chief Development Officer · Panda Restaurant Group",
            "prepared_by": "Brady Smallwood",
            "date": "April 30, 2026",
            "corpus": "14 deep research threads + 3 supplementary focus dossiers · 480+ cited sources · ~600 pages of internal working notes",
            "status": "Standalone synthesis — not a proposal",
            "footer_left": "mception · Research Synthesis",
            "footer_right": "Confidential — for the named recipient",
        },
    }

    onepager_meta = {
        "title": "mception — Practice Brief",
        "running_left": "mception · An AI-native research and decision practice",
        "running_right": "April 30, 2026",
        "cover": {
            "title": "mception",
            "subtitle": "An AI-native research and decision practice for operating leaders.",
            "prepared_for": "James Ku · Chief Development Officer · Panda Restaurant Group",
            "prepared_by": "Brady Smallwood",
            "date": "April 30, 2026",
            "corpus": "Companion brief to the Panda Operations Innovation synthesis",
            "status": "Practice introduction — for context",
            "footer_left": "mception · Practice Brief",
            "footer_right": "Confidential — for the named recipient",
        },
    }

    jobs = []

    md_path = HERE / "whitepaper-2026-04-30.md"
    md_text = md_path.read_text()
    jobs.append(write_pair("whitepaper-2026-04-30", whitepaper_meta, md_text))

    # mception one-pager is now a hand-crafted infographic HTML — do NOT
    # render from markdown here. See render-onepager.py for its build.

    print("\nGenerating PDFs (this can take ~10s per doc)...")
    render_pdfs(jobs)

    print("\nDone.")


if __name__ == "__main__":
    main()
