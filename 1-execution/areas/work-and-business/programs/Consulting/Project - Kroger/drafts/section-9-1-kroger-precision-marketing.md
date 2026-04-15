# §9.1 Kroger Precision Marketing (KPM)

## Situation
Kroger Precision Marketing, powered by 84.51°, is currently a ~$1B revenue business operating as a retail media network selling advertising to CPG brands. This is strategically correct — retail media is one of the few growth vectors available to incumbent grocers. US retail media spend exceeded $60B in 2025 and is tracking toward $70B+ in 2026. Walmart Connect alone generated $4.82B in 2025 and is growing 30%+ year-over-year. Kroger's KPM is significantly smaller — representing roughly <5% of the retail media opportunity despite Kroger having ~8.9% of the grocery market. The gap exists because Kroger's retail media capabilities are fragmented: KPM exists as a separate P&L, separate from merchandising, separate from pricing, separate from store operations. Walmart Connect, by contrast, is fully integrated — advertising dollars inform pricing decisions, which inform promotion calendars, which inform shelf placement, which inform supplier negotiations. Kroger's KPM is a brochure business; Walmart Connect is a decision engine.

## Complication
The complication is architectural: KPM cannot scale as a standalone business. It's constrained by:
- **Fragmented customer data:** Each Kroger banner maintains separate loyalty databases. Harris Teeter's customers don't share profiles with Mariano's customers. This fragmentation limits audience scale and targeting precision. Walmart can target across 130M Walmart+ members; Kroger can target across maybe 50–60M Kroger customers, but not seamlessly across banners.
- **Siloed merchandising:** KPM sits in a separate org from merchandising and pricing. When a CPG brand wants to run a promotional campaign via KPM, the resulting demand signal doesn't automatically flow back to the buyer (who decides shelf position, promo support, pricing). Walmart integrates all of this; Kroger doesn't.
- **Limited reach:** KPM currently reaches customers primarily in-store and via Kroger.com. It doesn't reach customers on third-party platforms (DoorDash, Instacart, Amazon Fresh). Walmart reaches customers across Walmart.com, Walmart mobile app, in-store, and increasingly on third-party platforms.
- **Immature product portfolio:** KPM currently offers standard sponsored products (search, display, shelf). It lacks sophisticated features like sponsored items (dynamic product recommendations tied to household purchase data), brand stores, subscription advertising, or video advertising. These are table stakes on Amazon and Walmart.

## Resolution
**Three-year KPM transformation plan:**

**1. Consolidate customer data across banners (Year 1).** Post-banner rationalization (§7), unify all customer loyalty data into a single Kroger ID. This is not a technical problem — it's an organizational problem. Establish a single Chief Data Officer (new role per §6.2) who owns customer identity, loyalty, and first-party data across all banners. Migrate Harris Teeter, Mariano's, Regional banners into unified Kroger ID infrastructure. Target: 75% of active customers on unified ID by Year 1, 95% by Year 2.

**2. Integrate KPM with merchandising, pricing, and supply chain.** Move KPM out of a standalone P&L and embed it as a function within merchandising. The merchandiser doesn't just manage shelf space; they manage shelf space + advertising + pricing + supplier support as an integrated package. This requires:
- KPM team physically located with merchants and pricing teams.
- Shared incentive metrics (not just KPM revenue, but total category profit = margin + KPM advertising revenue + volume increase).
- Unified planning cadence (monthly reviews where merchants, pricing, KPM, and suppliers align on category strategy).

Target: By Year 2, 60% of KPM revenue tied to integrated category initiatives (not standalone ad placements).

**3. Expand addressable reach to third-party platforms.** KPM today is primarily owned-and-operated (KR.com, in-store, loyalty). Expand to reach customers on DoorDash, Instacart, and Uber Eats:
- Negotiate premium placement and sponsored product advertising within Instacart/DoorDash apps for Kroger brands and CPG partners.
- This requires data sharing agreements with these partners (Instacart and DoorDash can provide anonymized customer signals; Kroger can provide private label SKU performance data).
- Target: 20% of KPM revenue from third-party platform advertising by Year 2.

**4. Expand KPM product portfolio.** Build new features that Walmart Connect and Amazon Ads already offer:
- **Sponsored items:** Dynamic recommendations tied to household purchase history (powered by 84.51° data). CPG brands bid for placements not just in search results, but in personalized recommendation blocks.
- **Shelf intelligence:** Real-time analytics showing which products are selling, which are slow-moving, which are being outcompeted. This visibility enables brands to adjust support dynamically.
- **Video advertising:** In-store digital screens + web-based video. Start with DTC (direct-to-consumer) video advertising; move to shoppable video.
- **Subscription advertising:** Similar to Amazon Prime Ads — premium brands get early access to new customers, loyalty members get curated offers.

Investment: $30–50M in product development (engineering, data science, design) over three years.

**5. Price KPM competitively vs. Walmart Connect.** Walmart's current advertiser CPM (cost per thousand impressions) is higher than Amazon's but lower than traditional digital media. Kroger should price below Walmart to capture share. Target: 15–20% lower CPM than Walmart Connect to make Kroger the preferred channel for lower-margin categories (private label, regional brands) where CPMs are already constrained.

**Financial impact:** With unified data, integrated merchandising, and expanded product, KPM can grow from $1B to $2–3B revenue within three years (30%+ CAGR). At 40% operating margins, this is $400–800M in incremental annual profit.

**Cross-domain entanglement:** KPM scaling directly depends on banner consolidation (§7 — unified customer data across fewer banners) and supply chain optimization (§8 — CPG partnerships enable more sophisticated promotional co-planning and inventory optimization). Retail media success also powers data monetization (§9.2 — aggregated purchasing signals and audience data become valuable licensing assets for 84.51°).
