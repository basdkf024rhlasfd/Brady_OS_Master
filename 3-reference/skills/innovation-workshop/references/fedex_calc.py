"""
FedEx shipping cost calculator — sourced from Artisan Specialty Foods'
negotiated FedEx rate card (Airline_Price_List_Master.xlsx, tab "FedEx Rates",
last updated 2025-02-11).

Use this to estimate DTC shipping cost when modeling Stage 2 Cost Models for
ideas that would ship direct-to-consumer via FedEx. These are Artisan's
contract rates, not FedEx retail — if the product ships from a different
origin or uses a different carrier account, treat these as a *floor* estimate
and flag `source: assumption` in the Cost Model.

Data source:
  3-reference/skills/innovation-workshop/references/raw/fedex-rates.jsonl
  — 6,450 rows: 6 schedules × 8 zones × 150 weight points (1-150 lb)

Schedules available: 2-Day, 3-Day, Ground, Home, Priority, Standard
Zones: 2, 3, 4, 5, 6, 7, 8, 13
Weight range: 1-150 lbs (integers)

Quick usage:

    from fedex_calc import fedex_cost, zone_for_state

    # Ground shipping, 8 lb package to Zone 5
    fedex_cost("Ground", 5, 8)            # → 13.27

    # Guess the zone from a destination state (origin = Broadview, IL)
    zone_for_state("CA")                   # → 8

    # Get the cheapest ground-class option for a DTC order
    cheapest_ground(destination_state="FL", weight_lbs=6)
      # → {"schedule": "Ground", "zone": 5, "cost": 11.95}
"""

from __future__ import annotations
import json
import math
from pathlib import Path
from functools import lru_cache

_RATES_PATH = Path(__file__).parent / "raw" / "fedex-rates.jsonl"


@lru_cache(maxsize=1)
def _load_rates() -> dict:
    """Load rate card into a dict keyed by (schedule, zone, weight_lbs)."""
    rates = {}
    with open(_RATES_PATH) as f:
        for line in f:
            row = json.loads(line)
            if row.get("_meta"):
                continue
            key = (row["schedule"], row["zone"], row["weight_lbs"])
            rates[key] = row
    return rates


# FedEx zone map from Broadview, IL origin (Artisan's warehouse zip ~60155).
# This is approximate — real zone comes from ZIP, not state. For DTC Cost
# Models, "state → zone" is close enough. Zone 13 is Hawaii/Alaska (AK, HI).
_STATE_ZONE = {
    # Zone 2 (immediate region)
    "IL": 2, "IN": 2, "IA": 3, "MI": 3, "MO": 3, "KY": 3, "WI": 3,
    # Zone 4
    "OH": 4, "MN": 4, "AR": 4, "KS": 4, "NE": 4, "TN": 4, "WV": 4, "PA": 4,
    # Zone 5
    "NY": 5, "NJ": 5, "CT": 5, "MA": 5, "VA": 5, "NC": 5, "SC": 5, "GA": 5,
    "AL": 5, "MS": 5, "LA": 5, "OK": 5, "SD": 5, "ND": 5,
    # Zone 6
    "FL": 6, "ME": 6, "NH": 6, "VT": 6, "RI": 6, "DE": 6, "MD": 6, "DC": 6,
    "TX": 6, "CO": 6, "WY": 6, "MT": 6, "NM": 6,
    # Zone 7
    "AZ": 7, "UT": 7, "ID": 7, "NV": 7,
    # Zone 8
    "CA": 8, "OR": 8, "WA": 8,
    # Zone 13 (offshore)
    "AK": 13, "HI": 13, "PR": 13,
}


def zone_for_state(state: str) -> int:
    """Return approximate FedEx zone for a destination state (from IL origin)."""
    s = (state or "").strip().upper()
    if s not in _STATE_ZONE:
        raise ValueError(f"Unknown state code: {state!r}. Expected 2-letter USPS code.")
    return _STATE_ZONE[s]


def fedex_cost(schedule: str, zone: int, weight_lbs: float) -> float:
    """
    All-in FedEx cost for a single package (base + fuel + addon already
    included in the rate table's per_case column).

    Rounds weight UP to the next whole pound (FedEx billing practice).
    Clamps to the 1-150 lb range of the rate card.

    Raises KeyError if the (schedule, zone) combination isn't in the card.
    """
    w = max(1, min(150, math.ceil(float(weight_lbs))))
    rates = _load_rates()
    key = (schedule, int(zone), w)
    if key not in rates:
        raise KeyError(
            f"No rate for {schedule=} {zone=} {w=} lb. "
            f"Valid schedules: {sorted({k[0] for k in rates})}; "
            f"valid zones: {sorted({k[1] for k in rates})}"
        )
    return float(rates[key]["per_case"])


def quote(destination_state: str, weight_lbs: float, schedule: str = "Ground") -> dict:
    """Convenience: state + weight + schedule → {zone, cost}."""
    zone = zone_for_state(destination_state)
    return {
        "schedule": schedule,
        "zone": zone,
        "weight_lbs_billed": max(1, math.ceil(float(weight_lbs))),
        "cost": fedex_cost(schedule, zone, weight_lbs),
    }


def all_options(destination_state: str, weight_lbs: float) -> list[dict]:
    """Return every shipping schedule priced for this destination + weight."""
    zone = zone_for_state(destination_state)
    rates = _load_rates()
    schedules = sorted({k[0] for k in rates if k[1] == zone})
    w = max(1, min(150, math.ceil(float(weight_lbs))))
    out = []
    for s in schedules:
        if (s, zone, w) in rates:
            out.append({
                "schedule": s,
                "zone": zone,
                "weight_lbs_billed": w,
                "cost": float(rates[(s, zone, w)]["per_case"]),
            })
    return sorted(out, key=lambda x: x["cost"])


def cheapest_ground(destination_state: str, weight_lbs: float) -> dict:
    """Pick the cheapest ground-class option (Ground vs Home)."""
    ground_opts = [
        o for o in all_options(destination_state, weight_lbs)
        if o["schedule"] in ("Ground", "Home")
    ]
    if not ground_opts:
        raise RuntimeError(f"No ground rates for {destination_state=}")
    return min(ground_opts, key=lambda x: x["cost"])


def dtc_landed_model(
    *,
    vendor_cost: float,
    product_weight_lbs: float,
    destination_state: str = "TX",  # median-ish zone for a national average
    packaging_cost: float = 2.00,
    cold_chain: bool = False,
    schedule: str = "Ground",
    target_margin: float = 0.35,
):
    """
    Quick landed-cost + suggested retail calculator for a DTC product idea.

    Adds a 2 lb frozen-pack weight allowance when cold_chain=True (dry ice +
    insulated box) per the original pricing-calculator sheet's convention.

    Returns a dict with COGS stack and suggested retail price given target
    margin. Explicitly flags which inputs are assumptions so Stage 2 Cost
    Models can cite sources correctly.
    """
    ship_weight = product_weight_lbs + (2.0 if cold_chain else 0.0)
    ship = quote(destination_state, ship_weight, schedule=schedule)
    landed_cost = vendor_cost + packaging_cost + ship["cost"]
    # Suggested retail to hit target margin: retail = landed / (1 - margin)
    suggested_retail = landed_cost / max(1e-6, 1 - target_margin)
    return {
        "vendor_cost": round(vendor_cost, 2),
        "packaging_cost": round(packaging_cost, 2),
        "ship_cost": round(ship["cost"], 2),
        "ship_weight_lbs": ship["weight_lbs_billed"],
        "ship_schedule": schedule,
        "ship_zone": ship["zone"],
        "cold_chain": cold_chain,
        "landed_cost": round(landed_cost, 2),
        "target_margin": target_margin,
        "suggested_retail": round(suggested_retail, 2),
        "notes": [
            "ship_cost sourced from Artisan negotiated FedEx rate card (2025-02-11)",
            "packaging_cost is a placeholder assumption — override per idea",
            "cold_chain adds 2 lb of dry ice + insulated packaging weight",
            f"destination used: {destination_state} (zone {ship['zone']})",
        ],
    }


if __name__ == "__main__":
    # Smoke test
    print("FedEx zone for CA:", zone_for_state("CA"))
    print("Ground, zone 5, 8 lb:", fedex_cost("Ground", 5, 8))
    print("All options for NY, 10 lb:", all_options("NY", 10))
    print("Cheapest ground to FL, 6 lb:", cheapest_ground("FL", 6))
    print("\nDTC landed model (Real Family Lasagna, 15 lb frozen):")
    import json as _json
    print(_json.dumps(dtc_landed_model(
        vendor_cost=18.50,
        product_weight_lbs=15,
        destination_state="TX",
        packaging_cost=4.00,
        cold_chain=True,
        schedule="2-Day",
        target_margin=0.30,
    ), indent=2))
