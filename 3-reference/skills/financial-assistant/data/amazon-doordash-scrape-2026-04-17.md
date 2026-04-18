# Amazon + DoorDash Scrape — 2026-04-17

---

## AMAZON ORDER HISTORY

**Account:** Hello, Brady (Brady's Amazon/Prime account)
**Coverage:** 42 orders in past 3 months (Jan 22 – Apr 16, 2026)
**Status:** COMPLETE — all 5 pages scraped

### Key Finding: ALL orders ship to Brady L Smallwood

Zero orders to Karissa, Utah, or any other address. Every single order ships to Brady's Bentonville address. **The 78 Amazon returns ($2,251) in the Monarch dataset must be from Karissa's own separate Amazon account, not Brady's.**

### Orders with Return Flags (on Brady's account)

| Date | Total | Item | Return? |
|------|-------|------|---------|
| Mar 25 | $36.61 | Physician's CHOICE Probiotics | Yes |
| Jan 30 | $14.22 | (not captured) | Yes |

Only 2 return-eligible items flagged out of 42 orders — minimal return activity on Brady's account. Contrast with 78 returns in Monarch data.

### Notable Purchases

| Date | Total | Item | Notes |
|------|-------|------|-------|
| Apr 13 | $71.94 | 5Strands Food Intolerance Test (658 items) | Health/kids |
| Apr 11 | $218.99 | Google Nest Cam with Floodlight | Home security (2nd camera) |
| Mar 28 | $547.49 | roborock Qrevo S5V Robot Vacuum | Household |
| Mar 4 | $280.19 | Google Nest Cam with Floodlight | Home security (1st camera) |
| Feb 27 | $179.66 | Stainless Steel Cable Railing Swage Studs (100 pack) | Home improvement |
| Feb 22 | $32.84 | Stance Socks 6-Pack | Personal |
| Feb 17 | $9.84 | Soprano Recorder | Kids (school music) |
| Feb 7 | $32.84 | Philips Sonicare 4100 | Personal care |

**Subscribe & Save active:** CELSIUS energy drinks ($26.23, auto-delivered every 2 weeks)

### Monthly Amazon Spend (Brady's account only, past 3 months)

| Month | Orders | Approximate Total |
|-------|--------|-------------------|
| January | 2 | ~$59 |
| February | ~10 | ~$500+ |
| March | ~14 | ~$1,050+ |
| April (through 16) | ~6 | ~$400+ |

---

## DOORDASH ORDER HISTORY

**Account:** Brady's DoorDash (brady.smallwood@gmail.com)
**Coverage:** Mar 9 – Apr 1, 2026 (all visible orders)
**Status:** COMPLETE

### Current Account State

- **Delivery address:** 196 Inglewood Drive (Orem, UT) — **CHANGED TO KARISSA'S UTAH ADDRESS**
- **Saved payment:** Visa....2021 (Karissa's Arvest debit card, exp. 03/2027) — only card saved, set as default
- **Card 1842:** NOT saved on DoorDash — rules out this theory
- **DoorDash Credits:** $0.00
- **Cart:** 4 items (from current session/address)

### All Orders

| Date | Restaurant | Total | Items | Payment (from receipt) |
|------|-----------|-------|-------|----------------------|
| Apr 1 | McDonald's | $23.64 | Sausage Egg McMuffin Meal (2x) + Egg McMuffin | Amex....0000 |
| Mar 29 | Raising Cane's | $35.93 | 3x Caniac Combo | — |
| Mar 27 | Pickleman's Gourmet Cafe | $0.00 | 8 items (turkey club, grilled cheese, mac & cheese) | — (promo?) |
| Mar 15 | Ziggi's Coffee | $16.16 | Iced Americano + Sparkling Soda | — |
| Mar 14 | Ziggi's Coffee | $16.16 | Iced Americano + Sparkling Soda | — |
| Mar 13 | Ziggi's Coffee | $16.66 | Iced Americano + Sparkling Soda | — |
| Mar 9 | Cronuts Donuts | $20.29 | (not captured) | — |

**Total DoorDash spend (visible): ~$128.84** over ~3.5 weeks

### Key Observations

1. **All restaurants are Bentonville-area.** No Utah restaurants visible in order history. If Karissa ordered food to Utah on this account, those orders are NOT showing — either she used her own DoorDash account, or the orders were placed on a different profile.

2. **Delivery address changed to Utah.** Someone changed the default delivery address from Bentonville to 196 Inglewood Drive, Orem, UT. This aligns with the **Mar 25 suspicious login** from a different device (captured in Gmail scan). Karissa may have logged in, changed the address, but not placed an order through this account.

3. **Payment card discrepancy.** The Apr 1 McDonald's receipt shows "Amex....0000" but the only saved card is Visa....2021 (Karissa's Arvest). Either:
   - Brady's Amex was previously saved and used for that order, then later removed
   - Or "0000" is a masking artifact
   
4. **Karissa's card is the default.** Visa 2021 (Karissa's Arvest debit) is the only saved payment method on Brady's DoorDash account. This means any new DoorDash order would charge Karissa's card by default.

5. **$0.00 Pickleman's order (Mar 27).** 8 items for $0 — likely a promotional credit or gift card. Worth investigating.

6. **Venmo also used for DoorDash.** Gmail showed a Venmo receipt from Panda Express ($36.47 on Mar 19) — this was a Venmo payment at a physical location, not a DoorDash delivery.

---

## COMBINED SCRAPE SUMMARY (All Platforms, Apr 17)

### Addresses Found

| Address | Owner | Platforms | First Seen |
|---------|-------|-----------|------------|
| 4505 NE Birchgrove Pl, Bentonville, AR 72712 | Brady | Walmart, Amazon, DoorDash | All history |
| 196 Inglewood Dr, Orem, UT 84097 | Karissa | Walmart (necklace), DoorDash (default address) | Apr 17 (Walmart), Mar 25+ (DoorDash) |
| 4312 E Suffolk Ln, Eagle Mountain, UT | Karissa | DoorDash (per primer, not confirmed in this scrape) | Prior analysis |
| 285 W Broadway, Salt Lake City, UT | Karissa | DoorDash (per primer, not confirmed in this scrape) | Prior analysis |

### Card Usage Across Platforms

| Card | Owner | Walmart | Amazon | DoorDash |
|------|-------|---------|--------|----------|
| Visa/Debit 2021 | Karissa (Arvest) | Default payment | Not used | Saved, default |
| Amex 2007 | Brady | Not used | Not visible | Used for 1 order (shown as 0000) |
| Card 1842 | Unknown | Not found | Not found | **NOT saved** |

### Outstanding Scrapes

- [ ] Arvest Online Banking — HELOC balance, cards on 9380 account, card 1842 verification
- [ ] Walmart pages 3+ — Mar 20–Apr 9 orders, more Utah shipments?
- [ ] Target — tripled spending, returns (low priority)
- [ ] Fresh Monarch CSV export
