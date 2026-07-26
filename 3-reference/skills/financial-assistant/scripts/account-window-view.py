#!/usr/bin/env python3
"""
account-window-view.py — per-account L7D / L30D / L90D ins-and-outs view.

Finn sub-view. Takes a Monarch CSV export, filters to ONE account, and reports
rolling-window averages with debt-funded inflow separated from real income.

    python3 account-window-view.py <monarch.csv> --account 9380
    python3 account-window-view.py <monarch.csv> --account 9380 --html
    python3 account-window-view.py <monarch.csv> --account "SoFi Checking" --windows 7,30

Why this exists: aggregate cash-flow math hides per-account funding structure.
Karissa's Arvest FREE BLUE ...9380 looked roughly cash-flow neutral in the
aggregate view while actually running ~102% HELOC-funded (2026-07-26 run).

CLASSIFICATION (the point of the script)
  Inflows are split into three kinds, keyed off `Original Statement`, NOT the
  Monarch `Merchant` label -- Monarch collapses distinct funding sources into
  the single label "Arvest Bank - Online Banking". See
  references/transactions-with-context.md.

    heloc     Transfer from Loan *2261  -> DEBT. Never counted as income.
    transfer  genuine internal transfer / deposit from another household account
    refund    merchant refund -> netted against that merchant's spend, not income

  "Net spend" = gross outflow - refunds.
  "Operating cash flow" = (transfer + refund) - gross outflow, i.e. ex-HELOC.

OUTPUT: text to stdout by default. --html writes a dashboard.

SENSITIVE DATA: rendered HTML contains household financial detail and must NOT
be committed. Default output dir is ~/brady-os-local/finance/ per CLAUDE.md.
"""

import argparse
import collections
import csv
import datetime as dt
import html
import os
import sys

# Inflow patterns matched against the Original Statement column.
# Extend here rather than special-casing merchant names downstream.
DEBT_PATTERNS = ("Loan *2261",)
TRANSFER_PATTERNS = ("Transfer from", "From Savings", "From Checking", "TRANSFER")
# Monarch categories that are never merchant refunds.
TRANSFER_CATEGORIES = {
    "Transfer", "Income", "Paychecks", "Interest", "Dividends & Capital Gains",
    "Credit Card Payment", "Business Income", "Other Income",
}


def classify(row, out_merchants):
    """-> 'out' | 'heloc' | 'transfer' | 'refund'.

    `out_merchants` is the set of merchants this account has actually PAID.
    A positive amount only counts as a refund if money previously went out to
    that same merchant -- otherwise it is a deposit. Without this guard a large
    incoming transfer gets booked as a refund and is netted against spend,
    which understates net spend badly (a $10,000 SoFi savings transfer drove
    net spend to -$6,479 before this guard existed).
    """
    if row["a"] <= 0:
        return "out"
    stmt = row.get("Original Statement", "") or ""
    if any(p in stmt for p in DEBT_PATTERNS):
        return "heloc"
    if row.get("Category") in TRANSFER_CATEGORIES:
        return "transfer"
    if any(p in stmt for p in TRANSFER_PATTERNS):
        return "transfer"
    if row["Merchant"] in out_merchants:
        return "refund"
    return "transfer"


def load(path, account):
    rows = []
    with open(path, newline="", encoding="utf-8-sig") as fh:
        for r in csv.DictReader(fh):
            if account.lower() not in r["Account"].lower():
                continue
            try:
                r["d"] = dt.date.fromisoformat(r["Date"])
                r["a"] = float(r["Amount"])
            except (ValueError, KeyError):
                continue
            rows.append(r)
    out_merchants = {r["Merchant"] for r in rows if r["a"] < 0}
    for r in rows:
        r["k"] = classify(r, out_merchants)
    return rows


def aggregate(rows, end, days):
    start = end - dt.timedelta(days=days - 1)
    win = [r for r in rows if start <= r["d"] <= end]
    g = collections.defaultdict(float)
    for r in win:
        g[r["k"]] += abs(r["a"])
    g["days"] = days
    g["start"] = start
    g["rows"] = win
    g["n"] = len(win)
    g["nout"] = sum(1 for r in win if r["k"] == "out")
    g["real_in"] = g["transfer"] + g["refund"]
    g["net_spend"] = g["out"] - g["refund"]
    g["ops_cf"] = g["real_in"] - g["out"]
    g["debt_share"] = (g["heloc"] / g["net_spend"] * 100) if g["net_spend"] else 0.0
    return g


def by_key(win, key):
    """Spend per category/merchant, with refunds netted against the same key."""
    tot = collections.defaultdict(float)
    cnt = collections.Counter()
    for r in win:
        if r["k"] == "out":
            tot[r[key]] += -r["a"]
            cnt[r[key]] += 1
        elif r["k"] == "refund":
            tot[r[key]] -= r["a"]
    return sorted(((k, v, cnt[k]) for k, v in tot.items()), key=lambda x: -x[1])


def weekly(rows, end, n_weeks=8):
    out = []
    for i in range(n_weeks):
        e = end - dt.timedelta(days=7 * i)
        s = e - dt.timedelta(days=6)
        win = [r for r in rows if s <= r["d"] <= e]
        if not win:
            continue
        g = collections.defaultdict(float)
        for r in win:
            g[r["k"]] += abs(r["a"])
        out.append(
            {
                "start": s,
                "end": e,
                "heloc": g["heloc"],
                "real_in": g["transfer"] + g["refund"],
                "out": g["out"],
                "net_spend": g["out"] - g["refund"],
                "n": len(win),
            }
        )
    out.reverse()
    return out


def money(x):
    return f"${x:,.2f}"


def render_text(account, end, aggs, rows):
    L = []
    L.append(f"\n{'=' * 70}\n  {account}  --  ins & outs through {end}\n{'=' * 70}")
    for days, g in aggs.items():
        L.append(f"\nL{days}D  ({g['start']} -> {end})   {g['n']} txns")
        L.append(f"  HELOC draws (DEBT)      {g['heloc']:12,.2f}   {g['heloc']/days:9,.2f}/day")
        L.append(f"  Real deposits           {g['transfer']:12,.2f}   {g['transfer']/days:9,.2f}/day")
        L.append(f"  Merchant refunds        {g['refund']:12,.2f}")
        L.append(f"  Gross outflow           {g['out']:12,.2f}   {g['out']/days:9,.2f}/day")
        L.append(f"  NET SPEND (refund-adj)  {g['net_spend']:12,.2f}   {g['net_spend']/days:9,.2f}/day"
                 f"   {g['net_spend']/days*7:,.2f}/wk")
        L.append(f"  Operating CF (ex-HELOC) {g['ops_cf']:12,.2f}   {g['ops_cf']/days:9,.2f}/day")
        L.append(f"  Debt-funded share of spend: {g['debt_share']:.0f}%")
        if g["nout"]:
            L.append(f"  Rhythm: {g['nout']/days:.1f} txns/day, {g['out']/g['nout']:,.2f} avg ticket")
        L.append("  -- top categories (refund-netted)")
        for k, v, c in by_key(g["rows"], "Category")[:8]:
            L.append(f"     {k:32s} {v:10,.2f}  {v/days:8,.2f}/day  n={c}")
        L.append("  -- top merchants")
        for k, v, c in by_key(g["rows"], "Merchant")[:8]:
            L.append(f"     {k:32s} {v:10,.2f}  {v/days:8,.2f}/day  n={c}")
    L.append("\nWeek by week (Sat-Fri)")
    L.append(f"  {'week':22s}{'HELOC in':>11s}{'real in':>10s}{'out':>11s}{'net spend':>12s}{'txns':>7s}")
    for w in weekly(rows, end):
        label = f"{w['start']:%b %d}-{w['end']:%b %d}"
        L.append(f"  {label:22s}{w['heloc']:11,.0f}{w['real_in']:10,.0f}"
                 f"{w['out']:11,.0f}{w['net_spend']:12,.0f}{w['n']:7d}")
    return "\n".join(L)


CSS = """*{box-sizing:border-box}
body{margin:0;padding:28px 22px 60px;background:#0b0d10;color:#e8eaed;
 font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif}
.wrap{max-width:1080px;margin:0 auto}
h1{font-size:26px;margin:0 0 4px;letter-spacing:-.02em}
.sub{color:#8b93a1;font-size:13px;margin-bottom:26px}
h2{font-size:13px;text-transform:uppercase;letter-spacing:.11em;color:#7f8896;
 margin:38px 0 12px;font-weight:600}
.alert{background:linear-gradient(90deg,rgba(220,60,60,.14),rgba(220,60,60,.04));
 border-left:3px solid #e0524d;padding:16px 18px;border-radius:6px;margin-bottom:26px}
.alert b{color:#ff8a84}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px}
.card{background:#14171c;border:1px solid #22262e;border-radius:10px;padding:18px}
.ch{font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#7f8896;
 font-weight:700;display:flex;justify-content:space-between;margin-bottom:12px}
.ch span{font-weight:400;letter-spacing:0;text-transform:none;color:#5d6572}
.big{font-size:30px;font-weight:700;letter-spacing:-.03em;margin-bottom:14px}
.big em{display:block;font-size:11px;font-weight:500;font-style:normal;
 color:#7f8896;letter-spacing:.02em;margin-top:3px}
table{width:100%;border-collapse:collapse;font-size:13.5px}
.kv td{padding:5px 0;color:#c3c9d3}
.kv td:first-child{color:#8b93a1}
.kv td:not(:first-child){text-align:right;font-variant-numeric:tabular-nums}
tr.sep td{border-top:1px solid #22262e;padding-top:9px}
.tbl{background:#14171c;border:1px solid #22262e;border-radius:10px;overflow:hidden}
.tbl th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.08em;
 color:#6d7583;padding:11px 14px;background:#171b21;font-weight:600}
.tbl td{padding:8px 14px;border-top:1px solid #1c2027;color:#c3c9d3}
.r{text-align:right;font-variant-numeric:tabular-nums}
.bar{width:110px}
.bar i{display:block;height:7px;background:linear-gradient(90deg,#3d7de0,#5b9bff);border-radius:4px}
.neg{color:#ff8a84}.pos{color:#5fd39a}.warn{color:#f0b45e}.muted{color:#6d7583}
.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.scroll{overflow-x:auto}
.note{color:#8b93a1;font-size:12.5px;margin-top:10px;line-height:1.6}
@media(max-width:760px){.two{grid-template-columns:1fr}.bar{display:none}}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]) body{background:#0b0d10}}
@media(prefers-color-scheme:light){:root:not([data-theme="dark"]) body{background:#fbfbfc;color:#15181d}
 :root:not([data-theme="dark"]) .card,:root:not([data-theme="dark"]) .tbl{background:#fff;border-color:#e3e6ea}
 :root:not([data-theme="dark"]) .tbl th{background:#f4f6f8}
 :root:not([data-theme="dark"]) .tbl td{border-color:#eceef1;color:#33383f}}
"""


def render_html(account, end, aggs, rows):
    def card(days):
        g = aggs[days]
        cf_cls = "neg" if g["ops_cf"] < 0 else "pos"
        return f"""<div class="card">
<div class="ch">L{days}D<span>{g['start']:%b %d} &ndash; {end:%b %d}</span></div>
<div class="big {cf_cls}">{money(g['ops_cf']/days)}<em>/day operating cash flow (ex-HELOC)</em></div>
<table class="kv">
<tr><td>Net spend (refund-adj)</td><td class="neg">{money(g['net_spend'])}</td>
<td>{money(g['net_spend']/days)}/day</td><td>{money(g['net_spend']/days*7)}/wk</td></tr>
<tr><td>Gross outflow</td><td>{money(g['out'])}</td>
<td>{money(g['out']/days)}/day</td><td>{g['nout']} txns</td></tr>
<tr class="sep"><td>HELOC draws <b>(debt)</b></td><td class="warn">{money(g['heloc'])}</td>
<td>{money(g['heloc']/days)}/day</td><td>{money(g['heloc']/days*7)}/wk</td></tr>
<tr><td>Real deposits</td><td class="{'neg' if not g['transfer'] else ''}">{money(g['transfer'])}</td>
<td>{money(g['transfer']/days)}/day</td><td>{money(g['transfer']/days*7)}/wk</td></tr>
<tr><td>Merchant refunds</td><td>{money(g['refund'])}</td>
<td>{money(g['refund']/days)}/day</td><td></td></tr>
<tr class="sep"><td>Avg transaction</td><td colspan="3">
{money(g['out']/g['nout']) if g['nout'] else '--'} &middot; {g['nout']/days:.1f} txns/day</td></tr>
<tr><td><b>Debt-funded share of spend</b></td>
<td colspan="3" class="warn"><b>{g['debt_share']:.0f}%</b></td></tr>
</table></div>"""

    def keytable(days, key, limit=10, bars=True):
        g = aggs[days]
        data = by_key(g["rows"], key)
        top = sum(v for _, v, _ in data) or 1
        out = []
        for k, v, c in data[:limit]:
            bar = (f"<td class='bar'><i style='width:{max(v,0)/top*100:.1f}%'></i></td>"
                   if bars else "")
            out.append(f"<tr><td>{html.escape(str(k))}</td><td class='r'>{money(v)}</td>"
                       f"<td class='r'>{money(v/days)}</td><td class='r'>{c}</td>{bar}</tr>")
        if len(data) > limit:
            rest = sum(v for _, v, _ in data[limit:])
            out.append(f"<tr class='muted'><td>+ {len(data)-limit} others</td>"
                       f"<td class='r'>{money(rest)}</td><td class='r'>{money(rest/days)}</td>"
                       f"<td></td>{'<td></td>' if bars else ''}</tr>")
        return "".join(out)

    short = min(aggs)
    g_short = aggs[short]
    ins = "".join(
        f"<tr><td>{r['Date']}</td><td>{html.escape(r['Merchant'][:34])}</td>"
        f"<td class='r {'warn' if r['k']=='heloc' else ''}'>{money(r['a'])}</td>"
        f"<td>{'HELOC (debt)' if r['k']=='heloc' else ('Deposit' if r['k']=='transfer' else 'Refund')}</td></tr>"
        for r in sorted(g_short["rows"], key=lambda r: r["Date"], reverse=True) if r["a"] > 0)
    outs = "".join(
        f"<tr><td>{r['Date']}</td><td>{html.escape(r['Merchant'][:34])}</td>"
        f"<td class='r'>{money(-r['a'])}</td><td>{html.escape(r['Category'])}</td></tr>"
        for r in sorted(g_short["rows"], key=lambda r: (r["Date"], r["a"]), reverse=True) if r["a"] < 0)

    wk = weekly(rows, end)
    mx = max((w["net_spend"] for w in wk), default=1) or 1
    wk_rows = "".join(
        f"<tr><td>{w['start']:%b %d}&ndash;{w['end']:%b %d}</td>"
        f"<td class='r warn'>${w['heloc']:,.0f}</td><td class='r'>${w['real_in']:,.0f}</td>"
        f"<td class='r'>${w['out']:,.0f}</td><td class='r'><b>${w['net_spend']:,.0f}</b></td>"
        f"<td class='bar'><i style='width:{max(w['net_spend'],0)/mx*100:.0f}%'></i></td>"
        f"<td class='r muted'>{w['n']}</td></tr>" for w in wk)

    long = max(aggs)
    banner = ""
    if aggs[long]["debt_share"] > 50:
        g = aggs[long]
        banner = (f'<div class="alert"><b>This account is {g["debt_share"]:.0f}% debt-funded.</b> '
                  f'Over the last {long} days, {money(g["heloc"])} of '
                  f'{money(g["heloc"]+g["real_in"])} in deposits came from the HELOC '
                  f'(Loan &bull;&bull;&bull;&bull;2261). Only {money(g["transfer"])} arrived as a real '
                  f'transfer. HELOC draws are debt, never income.</div>')

    cards = "".join(card(d) for d in sorted(aggs))
    cat_tables = "".join(
        f'<div class="tbl"><table><tr><th>L{d}D category</th><th class="r">Total</th>'
        f'<th class="r">/day</th><th class="r">n</th><th></th></tr>{keytable(d,"Category")}</table></div>'
        for d in sorted(aggs)[:2])
    mer_tables = "".join(
        f'<div class="tbl"><table><tr><th>L{d}D merchant</th><th class="r">Total</th>'
        f'<th class="r">/day</th><th class="r">n</th></tr>{keytable(d,"Merchant",bars=False)}</table></div>'
        for d in sorted(aggs)[:2])

    return f"""<title>{html.escape(account)} &mdash; Ins &amp; Outs</title>
<style>{CSS}</style>
<div class="wrap">
<h1>{html.escape(account)}</h1>
<div class="sub">Ins &amp; outs &middot; data through {end:%b %d, %Y} &middot; Finn account-window-view</div>
{banner}
<div class="grid">{cards}</div>
<h2>Week by week</h2>
<div class="tbl scroll"><table>
<tr><th>Week</th><th class="r">HELOC in</th><th class="r">Real in</th><th class="r">Out</th>
<th class="r">Net spend</th><th></th><th class="r">Txns</th></tr>{wk_rows}</table></div>
<div class="note">Net spend = outflow minus merchant refunds. Weeks run Sat&ndash;Fri.</div>
<h2>Where it goes &mdash; categories</h2>
<div class="two">{cat_tables}</div>
<h2>Where it goes &mdash; merchants</h2>
<div class="two">{mer_tables}</div>
<h2>Every IN, last {short} days</h2>
<div class="tbl"><table><tr><th>Date</th><th>Source</th><th class="r">Amount</th>
<th>Type</th></tr>{ins}</table></div>
<h2>Every OUT, last {short} days</h2>
<div class="tbl"><table><tr><th>Date</th><th>Merchant</th><th class="r">Amount</th>
<th>Category</th></tr>{outs}</table></div>
</div>"""


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("csv", help="Monarch transactions CSV export")
    p.add_argument("--account", required=True,
                   help="Account name substring, e.g. 9380 or 'SoFi Checking'")
    p.add_argument("--windows", default="7,30,90", help="Comma-separated day windows")
    p.add_argument("--html", action="store_true", help="Write an HTML dashboard")
    p.add_argument("--out", help="HTML output path (default ~/brady-os-local/finance/)")
    p.add_argument("--as-of", help="Anchor date YYYY-MM-DD (default: latest txn in file)")
    args = p.parse_args()

    rows = load(args.csv, args.account)
    if not rows:
        sys.exit(f"No transactions matched account '{args.account}' in {args.csv}")

    label = rows[0]["Account"]
    end = dt.date.fromisoformat(args.as_of) if args.as_of else max(r["d"] for r in rows)
    windows = [int(w) for w in args.windows.split(",") if w.strip()]
    aggs = {w: aggregate(rows, end, w) for w in windows}

    print(render_text(label, end, aggs, rows))

    if args.html:
        out = args.out or os.path.join(
            os.path.expanduser("~/brady-os-local/finance"),
            f"account-view-{args.account.strip().lower().replace(' ', '-')}-{end}.html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8") as fh:
            fh.write(render_html(label, end, aggs, rows))
        print(f"\nHTML -> {out}")
        print("Sensitive: do not commit. Lives outside the repo by design.")


if __name__ == "__main__":
    main()
