# Musashi Review — Fran (Single-Agent Pass) — 2026-04-24

STATUS: complete
Runtime: single-session, not midnight-scheduled
Trigger: Brady invoked manually ("Use Musashi San's review skill... come up with and debate next round of edits for Agent Fran")
Scope: Fran only, not full 15-agent pass

---

## Agent Scorecard

| Agent | Score | d1 Activation | d2 Output Landed | d3 Autonomy | d4 Trigger Clarity | d5 Surprise Value |
|---|---:|:---:|:---:|:---:|:---:|:---:|
| Fran | **8/10** | 2 | 2 | 1 | 2 | 1 |

### Rationale per dimension

- **d1 Activation (2):** Invoked multiple times since instantiation 2026-04-22. Caveat — recency inflates 14-day metric.
- **d2 Output Landed (2):** 8 Phase 2 artifacts shipped + PR #133 merged; email to Justin sent; Notion Context Vault + Drive architecture live.
- **d3 Autonomy (1):** Fran thinks opinionatedly but every execution step needs Brady or Claudine. Cannot close her own SFDRs or write to Notion/Drive. Not at Phil's autonomous-4AM-grooming level.
- **d4 Trigger Clarity (2):** Per-project scoped; sharp boundary with OC Optimus (Panda) and Claudine (general).
- **d5 Surprise Value (1):** Surfaced Zeidan dual-brand / FRG-Kahn fraud / Badcock SFL carve-out. **Missed the Panda capacity tension** — Brady had to frame it in the Apr 23 Project Agent Standup doc himself. Also missed the Consulting Delivery Stack / R&D-loop role Fran should play.

---

## Recommendations (5 issued, all implemented with Wyatt Earp debate-informed narrowing)

### Rec 1 (medium) — Scenario (d) Brady-at-capacity added to talk-track + engagement-shapes
**What:** New Option E (Advisory Right-Size OR Delayed Start) in engagement-shapes.md; new Scenario (d) row in talk-track-justin-phase-2.md signal table.
**Why:** Brady's Panda scope negotiation firmed 2026-04-23. Fran previously assumed Brady was freely available; that's now false.
**Wyatt dissent:** "Don't preemptively lower the ask." → **Rebuttal:** Brady himself wrote the Scenario-C-right-size framing in the standup. Honest modeling, not defeatism.
**Status:** IMPLEMENTED.

### Rec 2 (small, narrowed) — Monthly "Lessons Learned" entry to Consulting Practice wiki
**What:** Fran appends one paragraph per calendar month to Consulting Practice wiki under a "Lessons from 1915 South" section. Feeds the Consulting Delivery Stack R&D loop.
**Why:** Second-instance project agent is when pattern needs to self-document. Otherwise R&D loss is permanent.
**Wyatt dissent:** "Delivery Stack is still stub; theoretical overhead." → **Rebuttal:** Instrumenting early is exactly when it matters. Narrowed to one monthly entry, no deeper ceremony.
**Status:** IMPLEMENTED as constraint #23 in fran-SKILL.md.

### Rec 3 (small) — Research Autonomy Mode (SFDR self-closure)
**What:** Section B.5 added to fran-SKILL.md. Fran can close her own SFDRs via WebSearch + Exa + Bright Data, output to Context Vault + Data Requests wiki. Triggered by `fran close SFDR-NNN`.
**Why:** Autonomy dimension was the weakest (1/2). This closes ~50% of the gap without breaking the non-executing contract.
**Wyatt dissent:** "Fran is non-executing; breaks contract." → **Rebuttal:** Non-executing = no client comms, no Decision Log writes. Public web research + Context Vault write is safely inside the research boundary.
**Status:** IMPLEMENTED.

### Rec 4 (small, narrowed) — Fran contributes to Project Agent Standup doc
**What:** Constraint #22 added — Fran supplies phase, KR status, top-3 moves, service dimensions (V/S/D), cross-agent signal when Brady runs a standup. OC Optimus does the same for Panda. Brady synthesizes.
**Why:** The cross-agent capacity tension (2-clients-one-Brady) is a real recurring concern that needs a format.
**Wyatt dissent:** "Duplicates OC Optimus; scope creep." → **Rebuttal:** Don't make Fran OWN it. Make it contributed. Narrowed: Fran contributes, does not own.
**Status:** IMPLEMENTED as constraint #22.

### Rec 5 (small) — SFDR Owner field
**What:** Added Owner field to SFDR format: `Fran-web-pull | Brady-ask-Justin | Claudine-tier | Paid-access-required`. Makes it scannable at a glance which SFDRs Fran can self-close.
**Why:** Without owner field, Brady has to read each SFDR to know who should execute it. Adds zero friction to generate.
**Wyatt dissent:** "Scope creep on SFDR format." → **Rebuttal:** One column. Immediate operational value.
**Status:** IMPLEMENTED in Section D.

---

## Tech Scan — N/A this run

Single-agent pass; skipped per-Musashi-skill degradation rule (normally Phase 4). Full midnight pass should re-run Tech Scan for all agents.

## Business Ideation — N/A this run

Same as above — skipped. Single-agent tension pass.

---

## Notes from Musashi's Lens

Fran is earning her keep. 8/10 is the aspirational-asymptote band for a project-specific agent just 2 days into existence — she shouldn't be 10/10, and she shouldn't be <7/10 either. The real signal today isn't Fran's score; it's the **tension between Fran and OC Optimus both working well** — the flywheel that just produced two simultaneous live opportunities with one Brady.

The weakness surfaced by this pass isn't a Fran-specific failure. It's that the project-agent pattern (template validated on OC Optimus, second instance Fran) didn't yet have a cross-agent standup protocol or a monthly R&D-loop contribution. Those are template-level gaps, not agent-level. The edits applied above fix Fran; the same constraints should propagate to OC Optimus (and to the `project-agent` template at `3-reference/skills/project-agent/SKILL.md`) in the next round.

**The placeholder content to watch for:** Fran's talk-track assuming Brady has bandwidth. That's no longer true. Update it whenever Brady's capacity shifts, not whenever a new deliverable ships.

Reject drift. Push for specificity.

— Musashi's lens, applied to Fran, 2026-04-24
