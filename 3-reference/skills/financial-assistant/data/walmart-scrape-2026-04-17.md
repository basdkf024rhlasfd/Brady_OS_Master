# Walmart.com Order Scrape — 2026-04-17

Scrape date: April 17, 2026
Account: Karissa S (Member since 2021) — this is Karissa's Walmart account, not Brady's
Coverage: Page 1-2 of order history (~Apr 9 – Apr 21 orders visible)
Status: **PARTIAL** — pagination is client-side, only 2 pages captured. Need to continue for full Mar 20+ history.

---

## KEY FINDING: Utah Delivery Address

**Order 200014584744661 (Apr 17, 2026 — TODAY)**
- Item: Time and Tru Goldtone Multicolored Bead Initial "K" Necklace ($9.92)
- Ship to: **Karissa Smallwood, 196 Inglewood Dr, Orem, UT 84097**
- Payment: Card ending in 2021 (Karissa's Arvest debit)
- Total: $10.66 (incl. tax $0.74, Walmart+ waived $6.99 min fee)
- Status: Arrives tomorrow (Apr 18) by 10pm

**This is a NEW Utah address** — not previously documented:
- Primer had: 4312 E Suffolk Ln, Eagle Mountain, UT (from DoorDash)
- Primer had: 285 W Broadway, Salt Lake City (from DoorDash)
- **Now:** 196 Inglewood Dr, Orem, UT 84097 (from Walmart)

---

## ORDERS CAPTURED

### Page 1 (Most Recent)

| Order # | Date | Type | Items | Total | Ship To | Payment |
|---------|------|------|-------|-------|---------|---------|
| 200014640514849 | Apr 21 (pending) | Delivery from store | 11+ items (subscription groceries) | $68.05 | Bentonville (inferred) | — |
| 200014584744661 | Apr 17 | Delivery (shipped) | "K" necklace | $10.66 | **Orem, UT 84097** | 2021 |
| 200014779746439 | Apr 16 | Delivery (shipped) | Certain Dri antiperspirant | $9.63 | (not checked) | — |
| 200014683226933 | Apr 14 | Delivery from store | 82 items (family groceries) | $353.11 | **Bentonville, AR 72712** | **2021** |
| (no ID captured) | Apr 14 | Delivery (shipped) | Plastic spoons (6-pack) | (part of above?) | (not checked) | — |
| 200014651641774 | Apr 13 | Delivery (shipped) | JOLLY CHEF plastic cups 100-set | $47.44 | (not checked) | — |

### Page 2

| Order # | Date | Type | Items | Total |
|---------|------|------|-------|-------|
| (store receipt) | Apr 11 | Store purchase | 1 item | $2.66 |
| (store receipt) | Apr 11 | Store purchase | 21+ items | $117.97 |
| 200014431501170 | Apr 10 | Delivery from store | — | $10.73 |
| 200014605699197 | Apr 9 | Delivery from store | — | $10.75 |
| 200014697271668 | Apr 9 | Delivery from store | 29+ items | $204.24 |

---

## ORDER DETAIL: Family Grocery Run (Apr 14, $353.11)

**Order 200014683226933**
- Address: brady Smallwood, 4505 NE Birchgrove Pl, Bentonville, AR 72712
- Payment: Card ending in 2021 (Karissa's Arvest debit)
- Hold amount: $368.03
- Subtotal: $342.14, Savings: -$20.20, Tax: $16.17, Driver tip: $15.00
- Walmart+ free delivery (was $9.95)
- 82 items received — all family groceries/household:
  - Proteins: chicken breasts, smashed burgers, hot dogs, chicken strips, chicken patties, birria tacos, taquitos
  - Produce: bananas (10), grapes, carrots, avocado, sugar snap peas
  - Dairy: butter (3), cream cheese, shredded cheese (2 types), parmesan
  - Frozen: hash browns, steak fries, corn, red potato bites, toaster scrambles (2)
  - Pantry: rice (4 cups), salt (2), enchilada sauce, golden curry, tabasco, aluminum foil, plastic wrap
  - Snacks: pita chips, rye chips, pretzels, tortilla chips (2)
  - Breakfast: cheerios, bagels, english muffins (2)
  - Prepared: mac & cheese (2), tomato bisque (2), hamburger buns (2)
  - Paper/household: napkins (3), plates, bowls, cutlery (2), tissues, bandages (2)

**Key observation:** This is clearly Brady feeding 5 kids — bulk family groceries ordered through Karissa's Walmart account and paid with Karissa's Arvest card (2021). These charges would appear as Karissa's spending in Monarch but are actually Brady's household grocery runs.

---

## NOTABLE OBSERVATIONS

1. **Karissa's Walmart list still active.** Sidebar shows "View list Karissa — 40 items — Primary". She maintains a shopping list on this account.

2. **Subscription shipment active.** The Apr 21 order is a "Subscription shipment" — auto-recurring grocery delivery to Bentonville.

3. **Mixed personal + grocery.** Same account has Brady's family groceries AND Karissa's personal Utah shipments (necklace). Attribution requires checking ship-to address on every order.

4. **Walmart+ membership active.** Free delivery benefits being used on both Bentonville and Utah orders.

---

## REMAINING SCRAPE WORK

- [ ] Continue paginating past page 2 (need to use client-side Next button, not URL params)
- [ ] Check ship-to addresses on ALL "Delivery" (shipped) orders to identify Utah vs Bentonville
- [ ] Focus on Mar 20 – Apr 9 window (post-separation, highest spend velocity)
- [ ] Check the Apr 16 Certain Dri order — where did it ship?
- [ ] Check Apr 13 JOLLY CHEF cups order — where did it ship?
- [ ] Look for any orders with Walmart gift card (1842) as payment method
