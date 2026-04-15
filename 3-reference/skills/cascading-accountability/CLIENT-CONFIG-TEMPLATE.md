# Client Configuration — Cascading Accountability System

> Fill this out per client. Every `[PLACEHOLDER]` across the whitepaper, templates, and OKR tracker references one of these fields.

---

## Company Profile

| Field | Value |
|-------|-------|
| **Company Name** | `[COMPANY]` — |
| **Industry** | |
| **Approximate Headcount** | |
| **Revenue Scale** | |
| **CEO Name** | `[CEO]` — |
| **CEO Email** | |

---

## Organizational Structure

### Divisions

List the divisions that will be tracked. These populate `[Division 1-N]` placeholders and the OKR tracker's `DIVISIONS` config.

| # | Division Name | Division Leader | Leader Tier |
|---|---------------|-----------------|-------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

### Leadership Tiers in System

Check which tiers will be included in the system:

- [ ] C-Suite (CEO's direct reports)
- [ ] SVP
- [ ] VP
- [ ] Director

**Total leaders in system (estimated):** ___

---

## Scoring Configuration

| Parameter | Default | Client Override |
|-----------|---------|----------------|
| **Green threshold** | 75 | |
| **Yellow threshold** | 50 | |
| **OKR Adherence weight — C-Suite** | 15% | |
| **OKR Adherence weight — SVP** | 20% | |
| **OKR Adherence weight — VP** | 25% | |
| **OKR Adherence weight — Director** | 30% | |
| **Commitment Follow-Through weight — C-Suite** | 30% | |
| **Meeting Engagement weight (all tiers)** | 15% | |
| **Team Health weight — C-Suite** | 25% | |
| **Strategic Alignment weight (all tiers)** | 15% | |

---

## Briefing Configuration

| Field | Value |
|-------|-------|
| **Briefing delivery time** | `[BRIEFING_TIME]` — Default: 12:00 PM CT |
| **Briefing delivery method** | Email (default) / Slack DM / Other: ___ |
| **Weekly summary day** | Friday (default) / Other: ___ |
| **Briefing voice calibration notes** | How does [CEO] talk? Casual/formal? First name basis with reports? |

---

## Input Channels

Check all that apply:

- [ ] **Meeting transcripts** — Platform: ___ (Teams / Zoom / Otter / Copilot / Other)
- [ ] **Ad-hoc manager notes** — [CEO] types notes about leaders
- [ ] **Email threads** — [CEO] forwards relevant email chains
- [ ] **OKR tracker submissions** — Monday focus + Friday recap
- [ ] **Skip-level meetings** — [CEO] meets with leaders 2+ levels down
- [ ] **Board prep notes** — Observations from board interactions
- [ ] **Slack/Teams signals** — Channel activity analysis (Phase 2+)

---

## MVP Cohort

### Phase 1 — Direct Reports (Weeks 1–4)

| # | Name | Title | Division | Tier |
|---|------|-------|----------|------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |

### Phase 2 — Expansion (Weeks 5–8)

Add direct reports of Phase 1 leaders. Target: 30–50 total.

| Division | Leaders to Add | Approx Count |
|----------|---------------|-------------- |
| | | |
| | | |
| | | |

---

## Technical Configuration

| Field | Value |
|-------|-------|
| **OKR Tracker URL** | `[TRACKER_URL]` — |
| **OKR Tracker storage key** | Default: `cas-okr-data` / Custom: ___ |
| **OKR Tracker admin PIN** | Default: `2026` / Custom: ___ |
| **[CEO]'s AI platform** | ChatGPT / Claude / Copilot / Other: ___ |
| **[BUILDER] name/role** | `[BUILDER]` — Who will wire automation after MVP |

---

## Confidentiality Configuration

| Parameter | Value |
|-----------|-------|
| **C/V scoring required?** | Yes / No |
| **Board-ready outputs needed?** | Yes / No |
| **Legal review required before deployment?** | Yes / No |
| **Recording consent requirements** | One-party / Two-party / Already covered by company policy |
| **Sensitive leaders (higher C threshold)** | List names and C floor: |

---

## Financial Overlay

| Parameter | Value |
|-----------|-------|
| **AOP/P&L data available?** | Yes / No |
| **Frequency of financial data** | Monthly / Quarterly / Annual |
| **Source** | Finance team report / ERP export / Manual |
| **Division-level granularity?** | Yes / No |

---

## Historical Data Bootstrap

Available data to seed 1-pagers at Day 1:

- [ ] Org chart with reporting lines
- [ ] Tenure / start dates
- [ ] Recent performance reviews
- [ ] [CEO]'s existing notes on leaders
- [ ] Division financial performance (current year)
- [ ] Board presentation history (who presents, how often)
- [ ] Prior OKR/goal frameworks in use

---

## Notes & Special Considerations

<!-- Any client-specific context that affects system design -->

---

*Configuration last updated: [DATE]*
*Prepared by: Brady Smallwood*
