---
owner: Finn
maintained_by: financial-assistant skill
cadence: drip protocol — Brady sends Karissa 1-3 providers at a time, waits for completion before sending next batch
last_updated: 2026-05-13
---

# Karissa Financial Follow-Up Queue

Drip protocol established by Brady's email to Karissa on 2026-04-25. Brady drives the outbound; Finn watches the inbound and pings when a batch is done so Brady can send the next one.

## Operating Protocol

When Karissa contacts each provider, she asks two specific things:
1. **Itemized receipt** that can be submitted to insurance for reimbursement.
2. **Future claims to go through insurance** (if not already happening).

Brady flagged that UHC website is currently showing inactive — likely due to the late-but-within-grace April payment. Should be temporary, but it's an open risk on every receipt request. See linked Streaming Note: "UHC benefits showing inactive — paid April late but within grace period."

## Provider Queue (sorted by YTD spend, biggest first)

| # | Provider | YTD | Status |
|---|----------|-----|--------|
| 1 | Center for Change | $2,520.00 | **RECEIPT IN HAND** (Gmail 3/24, ZPay) — file with insurance once UHC verified |
| 2 | Siloam Springs Clinic | $2,093.00 | **Batched 2026-05-13** — Brady emailed Karissa solo provider with itemized-receipt + claim-routing asks |
| 3 | Wellness & Courage | $1,600.00 | Open |
| 4 | Walgreens | $870.68 | Open — Walgreens app pull for Rx-only split |
| 5 | Ziva Aesthetics | $550.00 | Open |
| 6 | NW Med Plaza Sugar Creek | $374.16 | Open |
| 7 | Assurex/GeneSight | $330.00 | Open |
| 8 | Netzel Eye | $200.85 | Open |
| 9 | Radiology Associates | $184.46 | Open |
| 10 | Mint Dental | $183.68 | Open |
| 11 | Living Tree Pediatrics | $116.00 | Open (Brady AmEx) |
| 12 | NW Family Med Centerton | $104.16 | Open (Brady AmEx) |
| 13 | My Village Pediatric | $92.60 | Open |
| 14 | Labcorp | $80.85 | Open |
| 15 | Premier Family Med Orem | $75.00 | Open |
| 16 | Quest Health | $59.10 | Open |
| 17 | Kent Moore Chiropractic | $45.00 | Open (Brady AmEx) |
| 18 | Infinity Compounding | $35.00 | Open (Brady AmEx) |
| 19 | NW Benton Co Phys Serv | $31.17 | Open |

## Status key
- **Open** — provider not yet handed to Karissa
- **Batched [date]** — Brady sent to Karissa, awaiting her work
- **Done [date]** — Karissa returned documents, queued for filing
- **Filed [date]** — submitted to UHC/Aflac for reimbursement
- **Reimbursed [date]** — payment received

## Finn Instructions

On every Conductor session and morning sweep:

1. **Scan Gmail + iMessage** for Karissa's responses (provider documents forwarded, status updates, or "send me the next batch").
2. **When a document arrives:**
   - Save to project folder (ask Brady on first occurrence where this lives)
   - Confirm both asks were addressed
   - Queue for UHC + Aflac reimbursement (gated on coverage being verified active)
   - Update YTD medical recap
3. **When Karissa says "done with this batch":**
   - Prompt Brady: "Karissa finished [providers]. Ready to send the next batch?"
   - Suggest next 1-3 providers from the queue (largest unbatched first)
4. **Do not push Karissa directly.** All outbound goes through Brady.

## Linked Streaming Notes
- UHC benefits showing inactive — paid April late but within grace period (Must)
- Karissa medical receipt drip — provider batches w/ 2-ask protocol (Must, In Progress)

## Daily surfacing rule
Surface the **next provider Brady should batch** as today's Karissa action when nothing is in flight. When a batch is in flight with Karissa, surface "waiting on Karissa: [providers]" instead of pushing a new ask.
