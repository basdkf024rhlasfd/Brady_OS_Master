# Binder — Pitch Deck (v1 Draft)

*Draft for Baden's review — April 16, 2026*

This is a VC-facing pitch deck draft for **Binder**, built from the current state of the `binder-aws-native` repo. Brady framed it to an investor audience, using hard technical evidence from v3.3 + v2.3 + Phase 1 Foundation as the credibility anchor.

**Your role here is to vet the deck before anything goes to an investor.** Specifically:

1. Confirm framing (vision, buyer, positioning)
2. Correct placeholders (pricing, TAM math, 3-year ARR, advisors)
3. Flag anything that overstates, misstates, or undersells

The feedback panel at the bottom of this page routes directly into a Notion database Brady monitors.

---

## Download the Deck

- **[View HTML (dark mode, interactive)](./assets/Binder_Pitch_Deck_2026-04-16.html)** — open in a new tab
- **[Download PDF (print/share)](./assets/Binder_Pitch_Deck_2026-04-16.pdf)**
- **[Download PPTX (send-and-present)](./assets/Binder_Pitch_Deck_2026-04-16.pptx)** *— slides embedded as images; not editable*

---

## What's in the Deck (12 Sections)

### §1 Purpose & Vision
> *"Every inspection report becomes evidence a regulator, insurer, or lender can trust — without a human re-reading it."*

Draft wording. 15 words. Frames Binder as the **trust layer**, not the OCR tool.

### §2 Target Audience
**Primary buyer:** VP Ops or Head of Compliance at mid-market inspection services firms (50–500 inspectors, multi-state, ASHI/InterNACHI-derived templates). **Adjacent:** insurance carriers + mortgage underwriters consuming inspection PDFs.

### §3 The Problem (3 Dimensions)
- **Financial:** $180K–$400K/yr burned on manual extraction + reviewer QA + per-template parsers. Cloud OCR adds $2–$4 per report.
- **Operational:** 8 templates = 8 brittle parsers. Findings get lost between PDFs, photos, reviewer judgment.
- **Personal:** Compliance leads ship audit bundles they cannot defend. Reviewer memory is the evidence trail.

### §4 The Solution (1-to-1 Mapping)
- Deterministic PyMuPDF across 8 templates → $0 marginal OCR cost
- Evidence-linked findings (page, photo, ROI, verdict, timestamp) → reproducible + disputable
- ERIC review UI + auditable verdict trail → reviewers backed by evidence, not memory
- S3 Object Lock + CloudTrail + KMS → compliance-ready audit bundles native

### §5 Commercial Model *(DRAFT — your input needed)*
- **Starter** $1,500/mo (<500 reports/mo)
- **Growth** $5,000/mo + $0.50/report over 2,500
- **Enterprise** Custom ($120K+ ACV)
- 80%+ gross margin target · 12-mo CAC payback (est.) · $36K blended ACV (est.)

### §6 Market Analysis (Bottom-Up) *(DRAFT — validate with industry data)*
- **TAM** $2.2B · 120K US inspection firms × $18K avg spend + carriers/underwriters
- **SAM** $720M · 8K mid-market firms + top 500 compliance buyers
- **SOM** $22M ARR · 3% capture over 36 months

### §7 Market Viability
Regulatory pull (7-year retention, state AI transparency 2026–2028). Behavioral shift away from custom PDF parsers. Competition (Textract, Document AI, Hyperscience, HomeGauge, ISN) validates the market — none deliver evidence-linked, template-normalized bundles.

### §8 Evidence of Success
**Technical maturity (from repo):** v3.3 live · v2.3 CodeDeploy canary + auto-rollback · **51 of 81** production readiness items · **9 of 10** UI gates pass · SDK v2.4.0 (7 reusable modules, zero breaking changes) · EventBridge 90-day replay · **8,110 findings** validated · 66 verdicts · 43-item review queue active.
**Commercial:** Internal validation by ERIC + FRAN. Design-partner conversions are the Q3 milestone the raise funds.

### §9 Future Growth *(DRAFT — your input needed on revenue + burn)*
- Y1 $400K ARR · 3 design partners + 2 paid pilots
- Y2 $2.2M ARR · enterprise tier, 2 carrier integrations, 15+ templates
- Y3 $7.5M ARR · multi-tenant SaaS, lending/insurance SDK, 90%+ auto-resolve
- Gross margin expands 72% → 85% · Break-even ~$3.5M ARR mid-Y2 (est.)

### §10 Unique Advantage (4 Moats)
1. **Codebook grows with every review** — 8,110+ verdicts create calibration signal
2. **Template fingerprinting across 8 standards** — proprietary section-alias map
3. **Evidence-linked provenance by design** — retrofitting this into Textract is a multi-quarter rebuild
4. **Regulatory switching cost** — once certified, moving off = recertifying the audit trail

### §11 Horizon Mapping
- **H1 (0–12mo):** Ship Phase 2–5, 8 templates, 90% DHI coverage, 2–3 paid pilots
- **H2 (12–24mo):** 15+ templates, photo-level CV, carrier + underwriter integrations, multi-tenant SaaS
- **H3 (24–48mo):** Category platform — compliance evidence beyond inspections (claims, underwriting, loan docs)

### §12 The Team *(DRAFT — confirm + add advisors)*
- **Baden Bagley — Founder & CEO.** Built Binder solo from first commit to v3.3. Full AWS-native stack. Deep inspection-industry context via Spectora.
- **Eric — Domain Lead.** Inspector, codebook trainer.
- **Fran — TPM / Compliance.** Release gating, audit bundles.
- **Brady Smallwood — Strategic Advisor.** Commercial positioning, pricing, GTM, investor narrative.
- **Advisors + key hires:** TBD post-raise.

---

## Known Gaps to Close Before Investor Ready

These are the things Brady marked as `[DRAFT]` or `[NEED INPUT]` — your answers drive the next version:

1. **Vision wording** — approve, rewrite, or keep searching
2. **Primary buyer confirmation** — mid-market inspection firms, or lead with insurance carriers?
3. **Pricing & unit economics** — any real conversations or anchor economics?
4. **TAM/SAM/SOM math** — industry-association numbers (ASHI, InterNACHI) or analyst data you can point to?
5. **Commercial traction** — any design-partner conversations or named prospects to include in §8?
6. **Burn / raise target / runway** — how much, what milestones, how long?
7. **Your title preference** — Founder & CEO, Founder, CTO & Founder?
8. **Named advisors + key hires planned** — who's on the cap table story?

---

## Leave Feedback

Use the **feedback panel below** to flag changes section by section. Submissions go straight to Brady — pick a section, mark a verdict, hit Submit.

---
