#!/usr/bin/env python3
"""Innovation Workshop Run 8 — HTML renderer.

Reads innovation-workshop-2026-08-04-run8-ideas.yml and emits the per-run
deliverable (dark mode + light mode for PDF). Re-run after MJ hero PNGs land
in output/images-run8/ — images are embedded automatically when present.
"""
import html
import os
import yaml

HERE = os.path.dirname(os.path.abspath(__file__))
IDEAS = os.path.join(HERE, "innovation-workshop-2026-08-04-run8-ideas.yml")
IMGDIR = os.path.join(HERE, "images-run8")
DATE = "2026-08-04"

ideas = sorted(yaml.safe_load(open(IDEAS)), key=lambda i: i["rank"])

THEMES = [
    ("Sleep beat furniture", "6 of the top 8 concepts are sleep-side. The 'future of mattress stores' brief has more open white space than furniture-meets-F&B."),
    ("The bartaco transfer is the service model, not the food", "Every food-forward concept took ops damage (permits, soil risk); every self-serve ritual (menus, flights, suites, fit reports) survived scoring and verification."),
    ("Paid, credited trial rituals", "$25-49 tickets that convert to purchase credit emerged independently in 4 surviving ideas — the panel's strongest convergent signal. Ticketing filters intent and funds the labor model."),
    ("Owned DC + fleet is the moat", "Delivery-date guarantees and one-date whole-room delivery recur across the portfolio — the single asset DTC brands and marketplaces cannot copy."),
]

def esc(s):
    return html.escape(str(s)) if s else ""

def paras(txt):
    return "".join(f"<p>{esc(p.strip())}</p>" for p in str(txt).split("\n\n") if p.strip())

def img_block(i):
    fn = i.get("mj_filename", "")
    path = os.path.join(IMGDIR, fn)
    if fn and os.path.exists(path):
        return f'<div class="product-image-block"><img src="images-run8/{esc(fn)}" alt="{esc(i["name"])}"></div>'
    return (f'<div class="product-image-block placeholder"><div class="ph-inner">'
            f'<span class="ph-label">MJ RENDER PENDING</span><span class="ph-file">{esc(fn)}</span></div></div>')

def chips(i):
    v = i.get("verification", {})
    out = []
    for k, label in [("comparables", "COMPS"), ("cost_model", "COST"), ("rtbs", "RTBS"), ("competitive", "COMPETITIVE")]:
        val = str(v.get(k, "—"))
        cls = "ok" if val == "pass" else ("warn" if val in ("fixed", "revised", "downgraded") else "bad")
        out.append(f'<span class="vchip {cls}">{label}: {esc(val).upper()}</span>')
    return "".join(out)

def product_page(i):
    rtbs = "".join(
        f'<li>{esc(r["claim"])}<span class="src">{esc(r["source"])}</span></li>' for r in i.get("rtbs", []))
    comps = "".join(
        f'<div class="comp"><strong>{esc(c["name"])}</strong><span>{esc(c.get("operator",""))}</span>'
        f'<em>{esc(c.get("price_or_model",""))}</em></div>' for c in i.get("comparables", []))
    fits = "".join(
        f'<span class="fit-chip">{esc(f["channel"])}</span>' for f in i.get("deployment_fit", []))
    cm = i.get("cost_model", {})
    capex = cm.get("capex", {})
    labor = cm.get("labor_delta", {})
    oc = i.get("ops_complexity", {})
    rating = str(oc.get("rating", ""))
    return f"""
<section class="product-page">
  <div class="p-head">
    <span class="p-rank">#{i['rank']:02d}</span>
    <div>
      <h2 class="p-name">{esc(i['name'])}</h2>
      <div class="p-meta"><span class="tag">{esc(i.get('type',''))}</span>
        <span class="tag">METHOD {esc(i.get('method',''))}</span>
        <span class="tag score">SCORE {esc(i.get('score',''))}</span></div>
    </div>
  </div>
  <p class="p-oneliner">{esc(i.get('one_liner',''))}</p>
  {img_block(i)}
  <div class="p-body">
    <h3>The Pitch</h3>{paras(i.get('pitch',''))}
    <h3>Reasons to Believe</h3><ul class="rtbs">{rtbs}</ul>
  </div>
  <div style="clear:both"></div>
  <div class="panel-grid">
    <div class="panel"><h4>Competitive Landscape</h4>{paras(i.get('competitive_landscape',''))}</div>
    <div class="panel"><h4>Closest Comparables</h4><div class="comps">{comps}</div></div>
    <div class="panel"><h4>Cost Model <span class="defense">{esc(cm.get('defensibility',''))}</span></h4>
      <table class="cost">
        <tr><td>Capex</td><td>{esc(capex.get('range',''))}<span class="src">{esc(capex.get('source',''))}</span></td></tr>
        <tr><td>Labor</td><td>{esc(labor.get('estimate',''))}<span class="src">{esc(labor.get('source',''))}</span></td></tr>
        <tr><td>Revenue</td><td>{esc(cm.get('revenue_mechanic',''))}</td></tr>
        <tr><td>Payback</td><td>{esc(cm.get('payback_logic',''))}</td></tr>
      </table></div>
    <div class="panel"><h4>Operational Complexity <span class="oc oc-{rating.lower()}">{esc(rating)}</span></h4>
      <p>{esc(oc.get('detail',''))}</p>
      <h4 style="margin-top:14px">Deployment Fit</h4><div class="fits">{fits}</div></div>
  </div>
  <div class="p-footer">
    <div class="fm"><span class="lbl">FIRST MOVE</span><p>{esc(i.get('first_move',''))}</p></div>
    <div class="ei"><span class="lbl">EFFORT</span><b>{esc(i.get('effort',''))}/5</b>
        <span class="lbl">IMPACT</span><b>{esc(i.get('impact',''))}/5</b></div>
    <div class="verify">{chips(i)}</div>
  </div>
  <p class="research-basis">{esc(i.get('research_basis',''))}</p>
</section>"""

top5 = "".join(
    f'<div class="t5"><span class="t5-rank">#{i["rank"]:02d}</span><div><strong>{esc(i["name"])}</strong>'
    f'<p>{esc(i["one_liner"])}</p></div><span class="t5-score">{esc(i["score"])}</span></div>'
    for i in ideas[:5])
themes_html = "".join(f'<div class="theme"><strong>{esc(t)}</strong><p>{esc(d)}</p></div>' for t, d in THEMES)
matrix_rows = "".join(
    f'<tr><td>#{i["rank"]:02d} {esc(i["name"])}</td><td>{esc(i.get("type",""))}</td>'
    f'<td>{esc(i.get("effort",""))}</td><td>{esc(i.get("impact",""))}</td><td>{esc(i.get("score",""))}</td></tr>'
    for i in ideas)
pages = "".join(product_page(i) for i in ideas)

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');
:root{--bg:#0b0d12;--panel:#12151d;--edge:#1f2430;--txt:#e8eaf0;--dim:#9aa3b5;--acc:#5eead4;--acc2:#f0abfc;--warn:#fbbf24;--bad:#f87171;--ok:#4ade80;}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--txt);font:14px/1.65 'DM Sans',sans-serif;padding:0}
.wrap{max-width:1040px;margin:0 auto;padding:48px 40px}
.cover{min-height:92vh;display:flex;flex-direction:column;justify-content:center;page-break-after:always}
.kicker{font:600 12px 'JetBrains Mono';letter-spacing:4px;color:var(--acc);text-transform:uppercase;margin-bottom:20px}
h1{font:700 64px/1.05 'Space Grotesk';margin-bottom:18px}
.cover .sub{font-size:19px;color:var(--dim);max-width:640px}
.cover .brand{margin-top:56px;font:600 12px 'JetBrains Mono';letter-spacing:3px;color:var(--dim)}
.sec-h{font:600 12px 'JetBrains Mono';letter-spacing:4px;color:var(--acc);text-transform:uppercase;margin:0 0 22px;border-bottom:1px solid var(--edge);padding-bottom:10px}
.exec{page-break-after:always}
.t5{display:flex;gap:16px;align-items:flex-start;background:var(--panel);border:1px solid var(--edge);border-radius:10px;padding:16px 18px;margin-bottom:10px}
.t5-rank{font:600 13px 'JetBrains Mono';color:var(--acc2)}
.t5 strong{font:700 17px 'Space Grotesk'}
.t5 p{color:var(--dim);font-size:13px;margin-top:2px}
.t5-score{margin-left:auto;font:600 16px 'JetBrains Mono';color:var(--acc)}
.theme{background:var(--panel);border:1px solid var(--edge);border-left:3px solid var(--acc2);border-radius:8px;padding:14px 16px;margin-bottom:10px}
.theme strong{font:700 15px 'Space Grotesk'}
.theme p{color:var(--dim);font-size:13px}
table.matrix{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:8px}
table.matrix th,table.matrix td{padding:7px 10px;border-bottom:1px solid var(--edge);text-align:left}
table.matrix th{font:600 10px 'JetBrains Mono';letter-spacing:2px;color:var(--dim);text-transform:uppercase}
.product-page{page-break-before:always;page-break-inside:avoid;padding:36px 0 24px;border-top:1px solid var(--edge)}
.p-head{display:flex;gap:18px;align-items:baseline}
.p-rank{font:600 15px 'JetBrains Mono';color:var(--acc2)}
.p-name{font:700 36px/1.1 'Space Grotesk'}
.p-meta{margin:8px 0 0}
.tag{font:600 10px 'JetBrains Mono';letter-spacing:1.5px;text-transform:uppercase;color:var(--dim);border:1px solid var(--edge);border-radius:20px;padding:3px 10px;margin-right:6px}
.tag.score{color:var(--acc);border-color:var(--acc)}
.p-oneliner{font-size:16px;color:var(--dim);margin:14px 0 20px;max-width:820px}
.product-image-block{float:left;margin:0 24px 16px 0;width:280px}
.product-image-block img{width:280px;height:280px;object-fit:contain;border-radius:10px;background:#000}
.product-image-block.placeholder .ph-inner{width:280px;height:280px;border:1px dashed var(--edge);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:var(--panel)}
.ph-label{font:600 10px 'JetBrains Mono';letter-spacing:2px;color:var(--dim)}
.ph-file{font:400 10px 'JetBrains Mono';color:#565f72}
.p-body h3{font:700 20px 'Space Grotesk';margin:14px 0 8px}
.p-body p{margin-bottom:10px;max-width:840px}
ul.rtbs{list-style:none}
ul.rtbs li{padding:8px 0 8px 18px;position:relative;border-bottom:1px dashed var(--edge)}
ul.rtbs li:before{content:'▸';position:absolute;left:0;color:var(--acc)}
.src{display:block;font:400 9px 'JetBrains Mono';color:#6b7488;margin-top:3px}
.panel-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px}
.panel{background:var(--panel);border:1px solid var(--edge);border-radius:10px;padding:16px 18px}
.panel h4{font:700 14px 'Space Grotesk';margin-bottom:8px}
.panel p{font-size:12.5px;color:var(--dim)}
.comp{padding:7px 0;border-bottom:1px dashed var(--edge);font-size:12.5px}
.comp strong{display:block}
.comp span{color:var(--dim);font-size:11px;margin-right:8px}
.comp em{color:#8b93a7;font-size:11px;font-style:normal}
table.cost{width:100%;font-size:12px;border-collapse:collapse}
table.cost td{padding:5px 8px 5px 0;vertical-align:top;border-bottom:1px dashed var(--edge)}
table.cost td:first-child{font:600 10px 'JetBrains Mono';letter-spacing:1px;color:var(--dim);text-transform:uppercase;width:70px}
.defense{font:600 9px 'JetBrains Mono';color:var(--warn);letter-spacing:1px;text-transform:uppercase;margin-left:8px}
.oc{font:600 10px 'JetBrains Mono';letter-spacing:1px;border-radius:16px;padding:2px 10px;margin-left:8px}
.oc-simple{background:#0d2b1c;color:var(--ok)}.oc-moderate{background:#2d230a;color:var(--warn)}.oc-complex{background:#2d1212;color:var(--bad)}
.fits{display:flex;flex-wrap:wrap;gap:6px}
.fit-chip{font:600 10px 'JetBrains Mono';color:var(--acc);border:1px solid var(--acc);opacity:.85;border-radius:16px;padding:3px 10px}
.p-footer{display:flex;gap:20px;align-items:flex-start;margin-top:16px;background:var(--panel);border:1px solid var(--edge);border-radius:10px;padding:14px 18px}
.lbl{font:600 9px 'JetBrains Mono';letter-spacing:2px;color:var(--dim);display:block;margin-bottom:2px}
.fm{flex:1}.fm p{font-size:12.5px}
.ei{display:flex;gap:14px;align-items:center}.ei b{font:600 15px 'JetBrains Mono';color:var(--acc)}
.verify{display:flex;flex-direction:column;gap:4px}
.vchip{font:600 8.5px 'JetBrains Mono';letter-spacing:1px;border-radius:12px;padding:2px 8px}
.vchip.ok{background:#0d2b1c;color:var(--ok)}.vchip.warn{background:#2d230a;color:var(--warn)}.vchip.bad{background:#2d1212;color:var(--bad)}
.research-basis{font:400 10px 'JetBrains Mono';color:#6b7488;margin-top:12px}
.appendix{page-break-before:always}
.appendix h3{font:700 20px 'Space Grotesk';margin:20px 0 8px}
.appendix p,.appendix li{font-size:13px;color:var(--dim);max-width:860px}
.appendix ul{margin:6px 0 6px 20px}
@media print{body{background:#0b0d12 !important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
"""

APPENDIX = f"""
<section class="appendix wrap">
  <div class="sec-h">Whitepaper Appendix</div>
  <h3>Methodology</h3>
  <p>Run 8 executed the innovation-workshop advanced-model pipeline: Stage 0 trend-convergence research (bartaco service economics, ISPA 2026 mattress data, RH/Poliform/Fritz Hansen hospitality precedent, FRG vacancy analysis, Eight Sleep retail signals); a 9-method blind parallel fan-out (JTBD, Blue Ocean, Analogous Inspiration, SCAMPER, Mashup, Cultural Trend Mining, Premiumization, Downmarket Disruption, Occasion-Based) producing 34 deduplicated raw ideas; a 3-judge scoring panel (Margin Realist / Novelty Maximalist / Ops Skeptic, median-of-three, 6-criterion weighted rubric); Gate 1 operator selection of 20 survivors; parallel research-grounded pitch development; and a mandatory adversarial verification pass in which every comparable, cost line, and cited statistic was independently attacked before publication.</p>
  <h3>Market Context</h3>
  <p>US mattress unit shipments fell 13.2% in 2025 (dollars -6.5%) while average selling prices rose ~5% — a contracting-volume, premiumizing market (ISPA 2026 Industry Trends Report). Sleep Number entered Chapter 11 with sale to Sleep Country Canada; Mattress Firm closed ~700 stores in its 2018 bankruptcy with ~700 more closures announced since; the Franchise Group collapse vacated ~880 Southeast storefronts. Bed-in-a-box economics broke on 21-23% online return rates vs ~9% in-store. Meanwhile furniture × hospitality is proven at the luxury tier — RH operates restaurants and wine bars in 25 galleries explicitly to drive furniture attach — and the mid-market, low-labor translation of that playbook remains unclaimed.</p>
  <h3>The Labor Thesis (bartaco transfer)</h3>
  <p>bartaco eliminated the order-taker role (90% QR ordering), replaced servers with fewer salaried zone service leaders, and pooled tips house-wide: labor cost down 5-6 points, ~50% fewer front-of-house staff, average wage UP to $23-24/hr, guest sentiment ~4.7/5, ~30% store-level EBITDA. The transferable primitive for home retail is not food — it is opt-in service, self-serve transaction rails, and salaried zone hospitality funded by removed commissioned roles.</p>
  <h3>Verification Report</h3>
  <ul>
    <li>All 20 ideas passed adversarial verification; per-idea status chips appear on each page.</li>
    <li>Fixes applied during verification: Wayfair Decorify (discontinued) replaced with Wayfair Muse; #roommakeover view count corrected per the cited source; bartaco table-coverage figure corrected to published values; Mattress Firm closure count corrected to ~700 (2018) + ~700 announced; online-vs-store return rates restated precisely (16.9% vs 8.9% overall; 21-23% online furniture/bedding); Coco-Mat pricing replaced with verified figures; J.C. Penney register-removal comparable restated as an announced-not-completed plan; several capex lines downgraded to explicit assumptions.</li>
    <li>Key stats verified against primary sources: ISPA 2026 (Furniture Today 2026-07-14), NAHB first-year buyer spend ($26,882 vs $9,457), Dreams Sleepmatch (3-min scan, 18 measurements, 25 patents, free), Casper Dreamery ($25/45-min, 9 nooks), Eight Sleep House of Sleep (free 30-min private reservations), NielsenIQ non-alcohol category ($925M off-premise, +22% YoY, sober-curious interest +44%), Outstanding in the Field ($385/seat).</li>
  </ul>
  <h3>Method Performance (this run)</h3>
  <p>Survivor counts by method: SCAMPER 3, Occasion-Based 3, Cultural Trend Mining 3 (+1 merged), JTBD 3, Analogous 2, Premiumization 2, Blue Ocean 1, Mashup 1 (+1 merged), Downmarket Disruption 1 (+2 merged). Highest-scoring ideas came from SCAMPER-Magnify (Room-as-Menu, 4.1) and the Mashup×Downmarket merge (The Sleep Suite, 4.0). Packaging Innovation (#58) was correctly excluded per Run 5/7 learning (food/CPG only).</p>
  <h3>Sources</h3>
  <p>Restaurant Dive (Jan 2023); FSR Magazine (Feb 2021); Back of House (Mar 2023); ISPA 2026 Mattress Industry Trends Report via Furniture Today (2026-07-14); BedTimes (Mar 2026); RH 10-K (Jan 2026); Chain Store Age (2018); Poliform/WWD (2026); Interior Daily — Fritz Hansen Singapore (Mar 2026); Axios — Eight Sleep Series D (Aug 2025); Furniture Today — Sleep Number (Mar 2026); BUILD Magazine (Mar 2026); NAHB Eye on Housing (2022, 2026); NielsenIQ (2025); HuffPost (2019); Forbes (2024); TIME/TechCrunch (2018); Dreams.ie; Hästens; IKEA Newsroom; Texas DSHS; NYC DOHMH.</p>
</section>"""

def doc():
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Innovation Workshop — Hospitality-Grade, Low-Labor Home Retail — {DATE}</title>
<style>{CSS}</style></head>
<body>
<div class="wrap cover">
  <div class="kicker">Innovation Workshop — Run 8 — {DATE}</div>
  <h1>Hospitality-Grade,<br>Low-Labor Home Retail</h1>
  <p class="sub">20 verified concepts for the furniture store rebuilt on the bartaco service model — and the future of the mattress store. Judge-panel scored, adversarially verified.</p>
  <div class="brand">MCEPTION.AI</div>
</div>
<div class="wrap exec">
  <div class="sec-h">Executive Summary — Top 5</div>
  {top5}
  <div class="sec-h" style="margin-top:34px">Key Themes</div>
  {themes_html}
  <div class="sec-h" style="margin-top:34px">Portfolio — Effort × Impact</div>
  <table class="matrix"><tr><th>Idea</th><th>Type</th><th>Effort</th><th>Impact</th><th>Score</th></tr>{matrix_rows}</table>
</div>
<div class="wrap">
{pages}
</div>
{APPENDIX}
</body></html>"""

out = os.path.join(HERE, f"innovation-workshop-{DATE}.html")
open(out, "w").write(doc())
print("wrote", out)
