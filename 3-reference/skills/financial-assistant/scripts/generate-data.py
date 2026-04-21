#!/usr/bin/env python3
"""
Monarch Money CSV → financial cockpit data.js generator.

Reads the latest Monarch CSV export, applies Brady's category mappings,
account ownership rules, and Utah detection, then writes
portal/public/financial-assistant/data.js with window.COCKPIT_DATA.

Usage:
    python3 generate-data.py [/path/to/Transactions_*.csv]

If no path given, scans ~/Downloads for the newest Transactions_*.csv.

Output:
    portal/public/financial-assistant/data.js
    (relative to the repo root — auto-detected from this script's location)
"""

import csv
import glob
import json
import os
import re
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).parent.resolve()
REPO_ROOT = (SCRIPT_DIR / "../../../../").resolve()
OUTPUT_PATH = REPO_ROOT / "portal/public/financial-assistant/data.js"
REFERENCES_DIR = SCRIPT_DIR.parent / "references"
LIQUID_ASSETS_PATH = REFERENCES_DIR / "liquid-assets.md"
BUSINESS_RULES_PATH = REFERENCES_DIR / "business-vs-personal-rules.md"
BALANCE_SHEET_PATH = REFERENCES_DIR / "balance-sheet.md"

TODAY = date.today()
CURRENT_MONTH = TODAY.month
CURRENT_YEAR = TODAY.year
PREV_MONTH = CURRENT_MONTH - 1 if CURRENT_MONTH > 1 else 12
PREV_YEAR = CURRENT_YEAR if CURRENT_MONTH > 1 else CURRENT_YEAR - 1

MONTH_NAMES = {
    1: "January", 2: "February", 3: "March", 4: "April",
    5: "May", 6: "June", 7: "July", 8: "August",
    9: "September", 10: "October", 11: "November", 12: "December",
}

# ---------------------------------------------------------------------------
# Account → Owner mapping
# ---------------------------------------------------------------------------

def get_owner(account: str) -> str:
    a = account.lower()
    # Brady
    if any(x in a for x in ["2007", "1907", "3072", "2157", "1470", "amex",
                              "sofi", "citi", "venture", "marriott"]):
        return "Brady"
    # Karissa (same Arvest account, two names)
    if any(x in a for x in ["family checking", "9380", "free blue"]):
        # 9004 is Lily — must check before generic "free blue"
        if "9004" in a:
            return "Kids"
        return "Karissa"
    # Kids
    if any(x in a for x in ["9004", "8535", "money ("]):
        return "Kids"
    # Shared
    if any(x in a for x in ["6368", "mortgage", "truist"]):
        return "Shared"
    return "Unknown"

# ---------------------------------------------------------------------------
# Category classification
# ---------------------------------------------------------------------------

EXCLUDED_CATEGORIES = {
    "transfer", "credit card payment", "savings", "investment", "loan payment",
    "paycheck", "income", "interest", "dividend", "refund", "reimbursement",
}

CATEGORY_BUCKETS = {
    "Groceries":              ["groceries"],
    "Dining Out":             ["restaurants", "fast food", "coffee shops",
                               "food & drink", "alcohol & bars"],
    "Shopping / Retail":      ["shopping", "clothing", "electronics & software",
                               "hobbies", "home improvement", "home supplies",
                               "furniture", "general merchandise"],
    "Gas / Transportation":   ["gas", "auto & transport", "parking",
                               "ride share", "auto maintenance", "auto insurance"],
    "Kids / Family":          ["kids", "baby", "education", "toys",
                               "kids activities", "pets"],
    "Medical / Health":       ["doctor", "pharmacy", "dentist", "dental",
                               "health & fitness", "personal care", "medical"],
    "Housing":                ["mortgage & rent", "home services", "utilities"],
    "Subscriptions / Services": ["subscriptions", "streaming services",
                                 "internet & phone", "mobile phone", "software"],
    "Insurance":              ["insurance", "life insurance", "health insurance"],
    "Business":               ["business services", "office supplies"],
    "Other Spending":         ["gifts & donations", "charity", "travel",
                               "hotels", "flights", "entertainment", "arts",
                               "books & news", "fees & charges", "atm",
                               "service charges", "late fees"],
}

def normalize_cat(cat: str) -> str:
    return cat.strip().lower()

def bucket_category(cat: str) -> str:
    c = normalize_cat(cat)
    for bucket, cats in CATEGORY_BUCKETS.items():
        if c in cats:
            return bucket
    return "Other Spending"

def is_excluded(cat: str) -> bool:
    return normalize_cat(cat) in EXCLUDED_CATEGORIES

# ---------------------------------------------------------------------------
# Utah detection
# ---------------------------------------------------------------------------

UTAH_STRINGS = [
    "OREM", "PLEASANT GROV", "LINDON", "MURRAY",
    "SMITHS FOOD #4144", "SMITHS FOOD #4073",
    "MACEY", "HARMONS", "EAGLE MOUNTAIN",
]

def is_utah(original_statement: str) -> bool:
    s = original_statement.upper()
    return any(u in s for u in UTAH_STRINGS)

# ---------------------------------------------------------------------------
# Return detection
# ---------------------------------------------------------------------------

RETURN_EXCLUDE_PATTERNS = [
    "arvest", "tnxi", "trinet", "transfer", "paycheck", "betterment",
    "venmo", "greenlight", "payroll", "loan", "zelle", "wageworks",
]

def is_merchant_return(row: dict) -> bool:
    if row["amount"] <= 0:
        return False
    if is_excluded(row["category"]):
        return False
    merchant_lower = row["merchant"].lower()
    stmt_lower = row["original_statement"].lower()
    for pat in RETURN_EXCLUDE_PATTERNS:
        if pat in merchant_lower or pat in stmt_lower:
            return False
    return True

# ---------------------------------------------------------------------------
# Recurring detection — merchant appears 2+ months in last 3 months
# ---------------------------------------------------------------------------

def detect_recurring(txns: list[dict]) -> list[dict]:
    from collections import defaultdict
    merchant_months: dict[str, set] = defaultdict(set)
    merchant_amounts: dict[str, list] = defaultdict(list)

    cutoff = date(TODAY.year - 1, TODAY.month, 1) if TODAY.month <= 3 else \
             date(TODAY.year, TODAY.month - 3, 1)

    for t in txns:
        if t["date"] < cutoff:
            continue
        if is_excluded(t["category"]) or t["amount"] >= 0:
            continue
        key = t["merchant"].strip().lower()
        month_key = (t["date"].year, t["date"].month)
        merchant_months[key].add(month_key)
        merchant_amounts[key].append(abs(t["amount"]))

    recurring = []
    for merchant, months in merchant_months.items():
        if len(months) >= 2:
            amounts = merchant_amounts[merchant]
            avg = sum(amounts) / len(amounts)
            recurring.append({
                "merchant": merchant.title(),
                "monthsActive": len(months),
                "avgAmount": round(avg, 2),
                "total": round(sum(amounts), 2),
            })

    recurring.sort(key=lambda x: -x["total"])
    return recurring[:30]

# ---------------------------------------------------------------------------
# Business vs Personal classification
# ---------------------------------------------------------------------------

BUSINESS_MERCHANT_PATTERNS = [
    "anthropic", "openai", "claude", "chatgpt",
    "aws", "amazon web services", "vercel", "supabase", "render.com", "railway",
    "github", "gitlab", "linear", "notion", "canva", "figma",
    "google workspace", "gsuite", "domains.google", "namecheap", "cloudflare",
    "stripe fee", "quickbooks", "gusto", "rippling",
    "zoom", "calendly", "loom", "descript",
    "substack", "beehiiv",
    "apple.com/business", "adobe", "microsoft 365",
]

BUSINESS_REVENUE_PATTERNS = [
    "stripe", "wire in", "ach credit", "invoice", "consulting",
    "ffh", "florida food", "panda", "paulette", "danville humane",
    "kroger", "oldcastle", "crh", "contour", "schmulen", "stihl",
]

def is_business_txn(row: dict) -> bool:
    """True if the transaction is a business expense (negative amount)."""
    if row["amount"] >= 0:
        return False
    text = f"{row['merchant']} {row['original_statement']}".lower()
    if any(pat in text for pat in BUSINESS_MERCHANT_PATTERNS):
        return True
    cat = normalize_cat(row["category"])
    if cat in ("business services", "office supplies", "professional services"):
        return True
    if row["bucket"] == "Business":
        return True
    return False

def is_business_revenue(row: dict) -> bool:
    """True if the transaction is business revenue (positive amount into Brady's checking)."""
    if row["amount"] <= 0:
        return False
    acct = row["account"].lower()
    if "1907" not in acct and "sofi checking" not in acct:
        return False
    text = f"{row['merchant']} {row['original_statement']}".lower()
    return any(pat in text for pat in BUSINESS_REVENUE_PATTERNS)

# ---------------------------------------------------------------------------
# Burn rate, forecast, runway
# ---------------------------------------------------------------------------

BURN_BUCKETS = {"Discretionary (Trimmed)", "Household Running", "Other Spending"}
# These buckets don't exist by that exact name in CATEGORY_BUCKETS — we map
# via bucket() below to the closest categorical groupings that represent
# Brady's burn surface (discretionary + running household, not fixed obligations).
BURN_CATEGORY_BUCKETS = {
    "Dining Out", "Shopping / Retail", "Groceries", "Gas / Transportation",
    "Subscriptions / Services", "Other Spending",
}

def burn_txns_in_window(all_txns: list[dict], days: int) -> list[dict]:
    cutoff = TODAY - timedelta(days=days)
    return [
        t for t in all_txns
        if t["date"] >= cutoff
        and t["date"] <= TODAY
        and not t["excluded"]
        and t["amount"] < 0
        and t["bucket"] in BURN_CATEGORY_BUCKETS
    ]

def calc_burn_rate(all_txns: list[dict]) -> dict:
    last_4w = burn_txns_in_window(all_txns, 28)
    last_12w = burn_txns_in_window(all_txns, 84)

    four_total = sum(abs(t["amount"]) for t in last_4w)
    twelve_total = sum(abs(t["amount"]) for t in last_12w)

    four_weekly = four_total / 4 if last_4w else 0
    twelve_weekly = twelve_total / 12 if last_12w else 0

    if twelve_weekly == 0:
        trend = "flat"
        delta_pct = 0
    else:
        delta_pct = ((four_weekly - twelve_weekly) / twelve_weekly) * 100
        if delta_pct > 10:
            trend = "up"
        elif delta_pct < -10:
            trend = "down"
        else:
            trend = "flat"

    alert = None
    if trend == "up" and delta_pct > 25:
        alert = f"Burn up {delta_pct:.0f}% vs 12-week average"

    return {
        "fourWeekTotal": round(four_total, 2),
        "twelveWeekTotal": round(twelve_total, 2),
        "fourWeekWeekly": round(four_weekly, 2),
        "twelveWeekWeekly": round(twelve_weekly, 2),
        "deltaPct": round(delta_pct, 1),
        "trend": trend,
        "alert": alert,
    }

def calc_forecast(all_txns: list[dict], budget_data: dict) -> dict:
    """Project current-month category spend to month-end and compare to budget."""
    import calendar
    days_in_month = calendar.monthrange(CURRENT_YEAR, CURRENT_MONTH)[1]
    days_elapsed = TODAY.day
    if days_elapsed == 0:
        days_elapsed = 1

    cur_spend = [
        t for t in all_txns
        if t["date"].year == CURRENT_YEAR and t["date"].month == CURRENT_MONTH
        and not t["excluded"] and t["amount"] < 0
    ]

    by_bucket: dict[str, float] = defaultdict(float)
    for t in cur_spend:
        by_bucket[t["bucket"]] += abs(t["amount"])

    # Budget targets per bucket (rough mapping from budget-targets.md tiers)
    # Groceries + Gas + Household supplies land under Household Running ($4,450)
    # Kids + Medical under Kids & Medical ($1,160)
    # Dining + entertainment + subscriptions under Discretionary ($850)
    bucket_budget = {
        "Groceries": 2400,
        "Gas / Transportation": 800,
        "Shopping / Retail": 1250,
        "Kids / Family": 700,
        "Medical / Health": 460,
        "Housing": 4530,
        "Dining Out": 400,
        "Subscriptions / Services": 300,
        "Insurance": 89,
        "Business": 0,
        "Other Spending": 150,
    }

    by_category = []
    alerts = []
    total_projected = 0.0
    for bucket, actual in sorted(by_bucket.items(), key=lambda x: -x[1]):
        projected = actual * (days_in_month / days_elapsed)
        total_projected += projected
        budget = bucket_budget.get(bucket, 0)
        pct_of_budget = (projected / budget * 100) if budget > 0 else None
        flag = None
        if budget > 0 and projected > budget * 1.15:
            flag = "over"
            alerts.append({
                "bucket": bucket,
                "projected": round(projected, 2),
                "budget": budget,
                "over_pct": round(((projected - budget) / budget) * 100, 1),
            })
        by_category.append({
            "bucket": bucket,
            "actual": round(actual, 2),
            "projected": round(projected, 2),
            "budget": budget,
            "pctOfBudget": round(pct_of_budget, 1) if pct_of_budget is not None else None,
            "flag": flag,
        })

    return {
        "daysElapsed": days_elapsed,
        "daysInMonth": days_in_month,
        "monthProgressPct": round(days_elapsed / days_in_month * 100, 1),
        "projectedMonth": round(total_projected, 2),
        "budgetMonth": sum(bucket_budget.values()),
        "byCategory": by_category,
        "alerts": alerts,
    }

def read_liquid_assets() -> float | None:
    """Parse the total accessible liquidity from liquid-assets.md. Returns None if TBD."""
    if not LIQUID_ASSETS_PATH.exists():
        return None
    text = LIQUID_ASSETS_PATH.read_text(encoding="utf-8")
    # Support both old ("Total liquid assets:") and new ("Total accessible liquidity:") headers
    for pattern in (
        r"\*\*Total accessible liquidity:\*\*\s*`?([^\n`]+)`?",
        r"\*\*Total liquid assets:\*\*\s*`?([^\n`]+)`?",
    ):
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            value = m.group(1).strip().strip("`")
            if "TBD" in value.upper():
                return None
            cleaned = re.sub(r"[^\d.]", "", value)
            try:
                return float(cleaned)
            except ValueError:
                continue
    return None

def read_balance_sheet() -> dict | None:
    """Parse balance-sheet.md into a structured snapshot dict."""
    if not BALANCE_SHEET_PATH.exists():
        return None
    text = BALANCE_SHEET_PATH.read_text(encoding="utf-8")

    def dollars(pattern: str) -> float | None:
        m = re.search(pattern, text, re.IGNORECASE)
        if not m:
            return None
        cleaned = re.sub(r"[^\d.]", "", m.group(1))
        try:
            return float(cleaned)
        except ValueError:
            return None

    def find_date() -> str | None:
        m = re.search(r"Last updated:\s*(\d{4}-\d{2}-\d{2})", text)
        return m.group(1) if m else None

    return {
        "snapshotDate": find_date(),
        "netWorth": dollars(r"Net worth:\*\*\s*\$([\d,\.]+)"),
        "assets": {
            "total": dollars(r"Total assets:\*\*\s*\$([\d,\.]+)"),
            "realEstate": {
                "grossValue": dollars(r"Gross value:\*\*\s*\$([\d,\.]+)"),
                "netEquity": dollars(r"Net equity:\*\*\s*\$([\d,\.]+)"),
                "mortgage": dollars(r"Mortgage balance:\*\*\s*\$([\d,\.]+)"),
                "heloc": dollars(r"HELOC balance:\*\*\s*\$([\d,\.]+)"),
            },
            "investments": {
                "total": dollars(r"###\s*Investments\s*—\s*\$([\d,\.]+)"),
                "ira": dollars(r"IRA \(Rollover\):\s*\$([\d,\.]+)"),
                "k401": dollars(r"401k:\s*\$([\d,\.]+)"),
                "roth": dollars(r"Roth IRA:\s*\$([\d,\.]+)"),
                "taxableBrokerage": dollars(r"Brokerage \(Taxable\):\s*\$([\d,\.]+)"),
            },
            "bankCash": dollars(r"###\s*Bank Cash\s*—\s*\$([\d,\.]+)"),
        },
        "liabilities": {
            "total": dollars(r"Total liabilities:\*\*\s*\$([\d,\.]+)"),
        },
        "helocAvailable": dollars(r"Available to draw \(estimated\):\*\*\s*\$([\d,\.]+)"),
    }

COMPENSATION_TARGET_MONTHLY = 24000
COMPENSATION_TARGET_ANNUAL = COMPENSATION_TARGET_MONTHLY * 12

def build_compensation_target(business: dict) -> dict:
    """Compare current-month income against the $24K/mo gross target."""
    current = business.get("revenue", 0) or 0
    gap = COMPENSATION_TARGET_MONTHLY - current
    if gap <= 0:
        status = "above"
        surplus = -gap
        headline = f"Above target by ${surplus:,.0f} — allocate surplus explicitly"
    elif current == 0:
        status = "no-income-tracked"
        surplus = 0
        headline = f"No income tracked MTD — target ${COMPENSATION_TARGET_MONTHLY:,}"
    else:
        status = "below"
        surplus = 0
        pct = (current / COMPENSATION_TARGET_MONTHLY) * 100
        headline = f"${current:,.0f} of ${COMPENSATION_TARGET_MONTHLY:,} target ({pct:.0f}%) — gap ${gap:,.0f}"
    return {
        "monthlyTarget": COMPENSATION_TARGET_MONTHLY,
        "annualTarget": COMPENSATION_TARGET_ANNUAL,
        "monthActual": round(current, 2),
        "gap": round(gap, 2),
        "surplus": round(surplus, 2),
        "status": status,
        "headline": headline,
        "note": "Above target = save more / fund goals / reinvest. Below = push pipeline. Only tracks what business rules identify as revenue.",
    }

def build_budget_baseline(accessible_cash: float | None, burn: dict) -> dict:
    """Three-tier budget with runway at each tier."""
    tiers = [
        {"name": "Zero-income floor", "monthly": 10990, "annual": 131880},
        {"name": "Strip frivolous", "monthly": 14704, "annual": 176448},
        {"name": "12-mo actual avg", "monthly": 18088, "annual": 217056},
    ]
    for tier in tiers:
        if accessible_cash and tier["monthly"] > 0:
            tier["runwayMonths"] = round(accessible_cash / tier["monthly"], 1)
        else:
            tier["runwayMonths"] = None
    return {
        "accessibleLiquidity": accessible_cash,
        "currentMonthlyBurn": burn.get("monthlyBurn") if isinstance(burn, dict) else None,
        "tiers": tiers,
    }

def calc_runway(burn: dict) -> dict:
    liquid = read_liquid_assets()
    weekly = burn.get("fourWeekWeekly", 0)
    monthly = weekly * (52 / 12) if weekly else 0

    if liquid is None or monthly <= 0:
        return {
            "liquidAssets": liquid,
            "monthlyBurn": round(monthly, 2),
            "months": None,
            "weeks": None,
            "status": "unknown",
            "alert": "Update references/liquid-assets.md to unlock runway" if liquid is None else None,
        }

    months = liquid / monthly
    weeks = liquid / weekly if weekly > 0 else 0

    if months < 3:
        status = "red"
        alert = f"Runway {months:.1f} months — below 3-month threshold"
    elif months < 6:
        status = "yellow"
        alert = None
    else:
        status = "green"
        alert = None

    return {
        "liquidAssets": round(liquid, 2),
        "monthlyBurn": round(monthly, 2),
        "months": round(months, 1),
        "weeks": round(weeks, 1),
        "status": status,
        "alert": alert,
    }

def calc_business(all_txns: list[dict]) -> dict:
    cur_txns = [
        t for t in all_txns
        if t["date"].year == CURRENT_YEAR and t["date"].month == CURRENT_MONTH
    ]
    expenses_mtd = [t for t in cur_txns if t.get("is_business")]
    revenue_mtd = [t for t in cur_txns if t.get("is_business_revenue")]

    expense_total = sum(abs(t["amount"]) for t in expenses_mtd)
    revenue_total = sum(t["amount"] for t in revenue_mtd)
    margin = ((revenue_total - expense_total) / revenue_total) if revenue_total > 0 else None

    # 3-month rolling to smooth monthly variance
    three_month_cutoff = TODAY - timedelta(days=90)
    rev_3mo = [t for t in all_txns if t["date"] >= three_month_cutoff and t.get("is_business_revenue")]
    monthly_recurring = (sum(t["amount"] for t in rev_3mo) / 3) if rev_3mo else 0

    return {
        "month": f"{MONTH_NAMES[CURRENT_MONTH]} {CURRENT_YEAR}",
        "revenue": round(revenue_total, 2),
        "expenses": round(expense_total, 2),
        "net": round(revenue_total - expense_total, 2),
        "margin": round(margin, 3) if margin is not None else None,
        "monthlyRecurringRevenue": round(monthly_recurring, 2),
        "revenueTransactions": len(revenue_mtd),
        "expenseTransactions": len(expenses_mtd),
    }

# ---------------------------------------------------------------------------
# Alert generation
# ---------------------------------------------------------------------------

def build_alerts(txns: list[dict]) -> list[dict]:
    alerts = []

    # Truist NSF rejections — look for Truist mortgage with positive amounts
    # (rejected payment shows as returned debit = positive)
    truist_odd = [t for t in txns
                  if "truist" in t["account"].lower() or "6368" in t["account"]
                  if t["amount"] > 0 and t["date"] >= date(2026, 4, 1)]
    if truist_odd:
        total = sum(t["amount"] for t in truist_odd)
        alerts.append({
            "level": "critical",
            "title": "Mortgage Payment Rejected (NSF)",
            "detail": f"${total:,.2f} returned — {len(truist_odd)} rejected payment(s) detected. "
                      "Truist account 6368. Resubmit once SoFi funds settle.",
            "action": "Resubmit mortgage payment Thursday 4/23 after funds clear.",
        })

    # Flag if current month spend is >20% above prior month (excluding April which is MTD)
    # Surfaced as info, not critical

    return alerts

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def find_csv() -> Path:
    pattern = str(Path.home() / "Downloads/Transactions_*.csv")
    candidates = sorted(glob.glob(pattern), reverse=True)
    if not candidates:
        print("ERROR: No Transactions_*.csv found in ~/Downloads", file=sys.stderr)
        sys.exit(1)
    return Path(candidates[0])


def load_csv(path: Path) -> list[dict]:
    rows = []
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                amount = float(row["Amount"])
                txn_date = datetime.strptime(row["Date"].strip(), "%Y-%m-%d").date()
            except (ValueError, KeyError):
                continue
            rows.append({
                "date": txn_date,
                "merchant": row.get("Merchant", "").strip(),
                "category": row.get("Category", "").strip(),
                "account": row.get("Account", "").strip(),
                "original_statement": row.get("Original Statement", "").strip(),
                "notes": row.get("Notes", "").strip(),
                "amount": amount,
                "tags": row.get("Tags", "").strip(),
                "owner_raw": row.get("Owner", "").strip(),
            })
    return rows


def run(csv_path: Path):
    print(f"[generate-data] Reading {csv_path}")
    all_txns = load_csv(csv_path)
    print(f"[generate-data] Loaded {len(all_txns):,} transactions")

    # Enrich each row
    for t in all_txns:
        t["owner"] = get_owner(t["account"])
        t["bucket"] = bucket_category(t["category"])
        t["utah"] = is_utah(t["original_statement"])
        t["is_return"] = is_merchant_return(t)
        t["excluded"] = is_excluded(t["category"])
        t["is_business"] = is_business_txn(t)
        t["is_business_revenue"] = is_business_revenue(t)

    # Spend = negative amount, non-excluded
    def spend_txns(txn_list):
        return [t for t in txn_list if not t["excluded"] and t["amount"] < 0]

    # Current month (April MTD)
    cur_txns = [t for t in all_txns if t["date"].year == CURRENT_YEAR
                and t["date"].month == CURRENT_MONTH]
    cur_spend = spend_txns(cur_txns)
    cur_total = sum(abs(t["amount"]) for t in cur_spend)
    cur_days = TODAY.day

    # Prior month (March)
    prev_txns = [t for t in all_txns if t["date"].year == PREV_YEAR
                 and t["date"].month == PREV_MONTH]
    prev_spend = spend_txns(prev_txns)
    prev_total = sum(abs(t["amount"]) for t in prev_spend)

    # Returns in current month
    cur_returns = [t for t in cur_txns if t["is_return"]]
    cur_return_total = sum(t["amount"] for t in cur_returns)

    # Utah spend (all time, last 8 weeks for context)
    cutoff_8w = date(TODAY.year, TODAY.month - 2 if TODAY.month > 2 else 1, 1)
    utah_txns = [t for t in all_txns if t["utah"] and not t["excluded"] and t["amount"] < 0]
    utah_total = sum(abs(t["amount"]) for t in utah_txns)
    utah_returns = [t for t in all_txns if t["utah"] and t["is_return"]]
    utah_return_total = sum(t["amount"] for t in utah_returns)

    # --- By owner (current month spend) ---
    owners = {}
    for owner in ["Brady", "Karissa", "Kids", "Shared"]:
        o_spend = [t for t in cur_spend if t["owner"] == owner]
        owners[owner] = {
            "total": round(sum(abs(t["amount"]) for t in o_spend), 2),
            "transactions": len(o_spend),
        }

    # --- Karissa velocity (last 6 months, Karissa account only) ---
    karissa_velocity = []
    for offset in range(5, -1, -1):
        m = CURRENT_MONTH - offset
        y = CURRENT_YEAR
        while m <= 0:
            m += 12
            y -= 1
        mo_txns = [t for t in all_txns
                   if t["date"].year == y and t["date"].month == m
                   and t["owner"] == "Karissa" and not t["excluded"] and t["amount"] < 0]
        karissa_velocity.append({
            "month": f"{MONTH_NAMES[m]} {y}",
            "total": round(sum(abs(t["amount"]) for t in mo_txns), 2),
            "transactions": len(mo_txns),
        })

    # --- Categories (current month) ---
    cat_totals: dict[str, dict] = defaultdict(lambda: {"total": 0.0, "count": 0})
    for t in cur_spend:
        b = t["bucket"]
        cat_totals[b]["total"] += abs(t["amount"])
        cat_totals[b]["count"] += 1

    categories = [
        {"name": k, "amount": round(v["total"], 2), "transactions": v["count"]}
        for k, v in sorted(cat_totals.items(), key=lambda x: -x[1]["total"])
    ]

    # --- Top merchants (current month) ---
    merchant_totals: dict[str, dict] = defaultdict(lambda: {"total": 0.0, "count": 0})
    HIGH_FREQ = {"walmart", "amazon", "target", "doordash", "mcdonald's", "chick-fil-a",
                 "domino's", "shogun", "tokyo house", "barnes & noble", "casey's",
                 "sam's club", "h&m", "american eagle"}
    for t in cur_spend:
        key = t["merchant"].strip()
        merchant_totals[key]["total"] += abs(t["amount"])
        merchant_totals[key]["count"] += 1

    top_merchants = [
        {"merchant": k, "amount": round(v["total"], 2), "transactions": v["count"]}
        for k, v in sorted(merchant_totals.items(), key=lambda x: -x[1]["total"])
    ][:25]

    # --- Utah detail ---
    utah_merchant_totals: dict[str, dict] = defaultdict(lambda: {"total": 0.0, "count": 0})
    for t in utah_txns:
        key = t["merchant"].strip()
        utah_merchant_totals[key]["total"] += abs(t["amount"])
        utah_merchant_totals[key]["count"] += 1

    utah_merchants = [
        {"merchant": k, "amount": round(v["total"], 2), "transactions": v["count"]}
        for k, v in sorted(utah_merchant_totals.items(), key=lambda x: -x[1]["total"])
    ][:20]

    # Approximate weeks of Utah data (from earliest Utah transaction)
    utah_dates = [t["date"] for t in utah_txns]
    utah_weeks = 0
    utah_address = "Orem / Pleasant Grove area"
    if utah_dates:
        earliest = min(utah_dates)
        utah_weeks = max(1, (TODAY - earliest).days // 7)

    # --- Recurring ---
    recurring = detect_recurring(all_txns)

    # --- Burn rate, forecast, runway, business ---
    burn_rate = calc_burn_rate(all_txns)
    forecast = calc_forecast(all_txns, None)
    runway = calc_runway(burn_rate)
    business_metrics = calc_business(all_txns)
    balance_sheet = read_balance_sheet()
    budget_baseline = build_budget_baseline(
        runway.get("liquidAssets"),
        {"monthlyBurn": runway.get("monthlyBurn")},
    )
    compensation_target = build_compensation_target(business_metrics)

    # --- Alerts ---
    alerts = build_alerts(all_txns)
    if burn_rate.get("alert"):
        alerts.append({
            "level": "warning",
            "title": "Burn rate trending up",
            "detail": burn_rate["alert"],
            "action": "Review Discretionary + Other Spending categories in weekly sweep.",
        })
    if runway.get("alert") and runway.get("status") == "red":
        alerts.append({
            "level": "critical",
            "title": "Cash runway below 3 months",
            "detail": runway["alert"],
            "action": "Accelerate consulting collections or cut Discretionary tier.",
        })

    # --- Recent transactions (last 20 spend) ---
    recent = sorted(cur_spend, key=lambda x: x["date"], reverse=True)[:20]
    recent_txns = [
        {
            "date": t["date"].isoformat(),
            "merchant": t["merchant"],
            "category": t["bucket"],
            "account": t["account"],
            "amount": round(abs(t["amount"]), 2),
            "owner": t["owner"],
            "utah": t["utah"],
        }
        for t in recent
    ]

    # --- Budget tiers (static from budget-targets.md) ---
    budget = {
        "summary": {
            "actualAvg12mo": 18088,
            "strippedFrivolous": 14704,
            "zeroIncomeFloor": 10990,
        },
        "tiers": [
            {
                "name": "Fixed Obligations",
                "amount": 4530,
                "items": [
                    {"name": "Mortgage (Truist)", "amount": None},
                    {"name": "Home Insurance / Umbrella (Allstate)", "amount": None},
                    {"name": "Utilities (Gas, Electric, Water)", "amount": None},
                    {"name": "Internet / Mobile (AT&T)", "amount": None},
                    {"name": "Car(s) / SoFi auto loan(s)", "amount": None},
                    {"name": "Life Insurance (Lincoln)", "amount": 89},
                ],
            },
            {
                "name": "Household Running",
                "amount": 4450,
                "items": [
                    {"name": "Groceries (Walmart/Sam's/Target)", "amount": None},
                    {"name": "Gas / Fuel", "amount": None},
                    {"name": "Household Supplies", "amount": None},
                ],
            },
            {
                "name": "Kids & Medical",
                "amount": 1160,
                "items": [
                    {"name": "Medical (copays, pharmacy, Rx)", "amount": None},
                    {"name": "Kid expenses (activities, haircuts, shoes)", "amount": None},
                ],
            },
            {
                "name": "Discretionary (Trimmed)",
                "amount": 850,
                "items": [
                    {"name": "Restaurants (mostly inside)", "amount": None},
                    {"name": "Movies / Subscriptions", "amount": None},
                    {"name": "Minor entertainment / coffee", "amount": None},
                ],
            },
            {
                "name": "Zeroed Out",
                "amount": 0,
                "items": [
                    {"name": "Travel, charity, fine dining, Pure Barre, GolfTec", "amount": 0},
                ],
            },
        ],
        "monthlyTotal": 10990,
        "annualized": 131880,
    }

    # --- Family budget (current month actuals vs targets) ---
    def cat_actual(cat_name: str) -> float:
        matching = [t for t in cur_spend if bucket_category(t["category"]) == cat_name]
        return round(sum(abs(t["amount"]) for t in matching), 2)

    grocery_actual = cat_actual("Groceries")
    dining_actual = cat_actual("Dining Out")
    kids_actual = cat_actual("Kids / Family")
    medical_actual = cat_actual("Medical / Health")

    family_budget = {
        "month": f"{MONTH_NAMES[CURRENT_MONTH]} {CURRENT_YEAR}",
        "familyTotal": round(sum(abs(t["amount"]) for t in cur_spend
                                 if t["owner"] in ("Brady", "Karissa", "Shared")), 2),
        "businessTotal": round(sum(abs(t["amount"]) for t in cur_spend
                                   if t["bucket"] == "Business"), 2),
        "categories": [
            {
                "name": "Groceries (Walmart+)",
                "budget": 560,
                "actual": grocery_actual,
                "subscription": 360,
                "notes": "$360 subscription + ~$200 ad hoc",
            },
            {
                "name": "Kids Activities",
                "budget": 350,
                "actual": kids_actual,
                "notes": "BJJ $100-150, voice lessons $80-120",
            },
            {
                "name": "Dining / DoorDash",
                "budget": None,
                "actual": dining_actual,
                "notes": "TBD — needs input",
            },
            {
                "name": "Medical",
                "budget": None,
                "actual": medical_actual,
                "notes": "Copays, pharmacy, Rx",
            },
        ],
        "businessCategories": [
            {
                "name": "Software / SaaS",
                "budget": None,
                "actual": round(
                    sum(abs(t["amount"]) for t in cur_spend
                        if t["bucket"] in ("Subscriptions / Services", "Business")), 2),
                "notes": "",
            },
        ],
    }

    # --- Assemble COCKPIT_DATA ---
    csv_stat = csv_path.stat()
    csv_age_days = (datetime.now() - datetime.fromtimestamp(csv_stat.st_mtime)).days

    cockpit = {
        "generated": datetime.now().astimezone().isoformat(),
        "dataThrough": TODAY.isoformat(),
        "scrapedDate": TODAY.isoformat(),
        "csvStaleDays": csv_age_days,

        "budget": budget,
        "alerts": alerts,

        "topline": {
            f"{MONTH_NAMES[CURRENT_MONTH].lower()}MTD": {
                "amount": round(cur_total, 2),
                "transactions": len(cur_spend),
                "days": cur_days,
            },
            f"{MONTH_NAMES[PREV_MONTH].lower()}Total": {
                "amount": round(prev_total, 2),
                "transactions": len(prev_spend),
            },
            f"{MONTH_NAMES[CURRENT_MONTH].lower()}Returns": {
                "amount": round(cur_return_total, 2),
                "count": len(cur_returns),
            },
            "utahSpend": {
                "amount": round(utah_total, 2),
                "transactions": len(utah_txns),
                "weeks": utah_weeks,
            },
        },

        "byOwner": {
            "month": MONTH_NAMES[CURRENT_MONTH],
            "owners": [
                {"name": owner, **data}
                for owner, data in owners.items()
            ],
        },

        "karissaVelocity": karissa_velocity,
        "categories": categories,
        "merchants": top_merchants,

        "utah": {
            "totalSpend": round(utah_total, 2),
            "transactions": len(utah_txns),
            "returns": {
                "amount": round(utah_return_total, 2),
                "count": len(utah_returns),
            },
            "netSpend": round(utah_total - utah_return_total, 2),
            "weeks": utah_weeks,
            "address": utah_address,
            "merchants": utah_merchants,
        },

        "recurring": recurring,
        "openQuestions": [],
        "dataSources": [
            {
                "name": "Monarch Money",
                "file": csv_path.name,
                "rows": len(all_txns),
                "staleDays": csv_age_days,
            }
        ],
        "recentTransactions": recent_txns,

        "familyBudget": family_budget,

        "burnRate": burn_rate,
        "forecast": forecast,
        "runway": runway,
        "business": business_metrics,
        "balanceSheet": balance_sheet,
        "budgetBaseline": budget_baseline,
        "compensationTarget": compensation_target,

        "consulting": {
            "month": f"{MONTH_NAMES[CURRENT_MONTH]} {CURRENT_YEAR}",
            "invoicesSent": [],
            "invoicesReceived": [],
            "outstanding": [],
            "pipelineMRR": 0,
            "note": "Populated by financial-assistant skill run (Gmail/Calendar/Notion enrichment). Empty until next skill execution.",
        },

        "revenue": {
            "month": f"{MONTH_NAMES[CURRENT_MONTH]} {CURRENT_YEAR}",
            "consulting": {
                "invoiced": business_metrics["revenue"],
                "collected": business_metrics["revenue"],
                "pipeline": 0,
            },
            "netIncome": business_metrics["net"],
            "runwayMonths": runway.get("months") or 0,
            "note": "Revenue numbers reflect txns tagged via business-vs-personal-rules.md. Pipeline populated by skill run.",
        },
    }

    # --- Write output ---
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    js_content = (
        "// Financial Cockpit Data — AUTO-GENERATED by generate-data.py\n"
        "// Do not edit manually. Re-run the script to update.\n"
        f"// Generated: {cockpit['generated']}\n"
        f"// CSV: {csv_path.name} ({len(all_txns):,} transactions)\n"
        "window.COCKPIT_DATA = "
        + json.dumps(cockpit, indent=2, default=str)
        + ";\n"
    )
    OUTPUT_PATH.write_text(js_content, encoding="utf-8")
    print(f"[generate-data] Written → {OUTPUT_PATH}")
    print(f"[generate-data] {MONTH_NAMES[CURRENT_MONTH]} MTD spend: ${cur_total:,.2f} across {len(cur_spend)} transactions")
    print(f"[generate-data] {MONTH_NAMES[PREV_MONTH]} total: ${prev_total:,.2f}")
    print(f"[generate-data] Burn: ${burn_rate['fourWeekWeekly']:,.0f}/wk (4w) vs ${burn_rate['twelveWeekWeekly']:,.0f}/wk (12w) — trend {burn_rate['trend']}")
    runway_display = f"{runway['months']} months" if runway.get("months") else "—"
    print(f"[generate-data] Runway: {runway_display} (liquid {runway.get('liquidAssets') or 'TBD'})")
    print(f"[generate-data] Business MTD: revenue ${business_metrics['revenue']:,.0f} / expenses ${business_metrics['expenses']:,.0f} / net ${business_metrics['net']:,.0f}")
    print(f"[generate-data] Comp target: ${COMPENSATION_TARGET_MONTHLY:,}/mo — {compensation_target['headline']}")
    print(f"[generate-data] Forecast: on pace for ${forecast['projectedMonth']:,.0f} this month ({len(forecast['alerts'])} category alerts)")
    print(f"[generate-data] Alerts: {len(alerts)}")
    print(f"[generate-data] Done.")
    return OUTPUT_PATH


if __name__ == "__main__":
    csv_path = Path(sys.argv[1]) if len(sys.argv) > 1 else find_csv()
    if not csv_path.exists():
        print(f"ERROR: File not found: {csv_path}", file=sys.stderr)
        sys.exit(1)
    run(csv_path)
