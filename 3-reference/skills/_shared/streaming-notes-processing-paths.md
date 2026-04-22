# Streaming Notes — Processing Paths

Canonical reference for per-Type SLAs, routing destinations, and completion definitions.

**Used by:**
- `skills/morning-sweep` — Phase 1.9b (daily light audit) + Phase 3.6b (System Instructions)
- `skills/streaming-notes-disposition-audit` — Bucket B SLA thresholds
- `skills/evening-sweep` — Thread Log lifecycle

**Streaming Notes DB:** `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`

---

## Processing Path Table

| Type | SLA | Processing Destination | Who Acts | Completion Definition |
|---|---|---|---|---|
| System Instruction | 24h | Rules & Preferences page (`344ed43b-89c5-813d-bded-f1d5689510e2`) | Morning sweep (Phase 3.6b) | Written to R&P page; Status=Complete, Done=\_\_YES\_\_ |
| Build Request | 24h | Dev plan at `.context/plans/` OR directly built | Morning sweep (Phase 3.4b) | Status=Complete + Build Session log OR plan generated |
| Task | 72h | Next Action field must be set | Brady / morning sweep daily audit | Next Action set; eventually Status=Complete, Done=\_\_YES\_\_ |
| To Do | 72h | Next Action required | Brady / morning sweep daily audit | Status=Complete, Done=\_\_YES\_\_ |
| Thread Log | 7d | Active → Complete or Archive | Evening sweep | Status=Complete, Done=\_\_YES\_\_ |
| Pulse Note | 48h | Route to Routing Log or Archive | Morning sweep | Status=Complete or Remove |
| Sweep Feedback | 24h | Applied to current sweep behavior; Prompt type baked into Section B via weekly sweep | Morning sweep Pre-Flight | Status=Complete after applied |
| Note | 72h | Action or Archive decision | Brady / disposition audit | Status=Complete or Remove |
| Daily State | Auto (24h) | No routing — lifecycle managed by sweep | Morning/Evening sweep | Auto-archived after use |
| Keep Handy | No SLA | Intentionally persistent — no processing required | Brady only (when ready) | Brady sets Done=\_\_YES\_\_ when finished |
| Pin to Top | No SLA | Intentionally persistent — no processing required | Brady only (when ready) | Brady sets Done=\_\_YES\_\_ when finished |

---

## Bucket B Thresholds (for Disposition Audit)

The flat 3-day threshold in the disposition audit applies to Task, To Do, and Note types.
For other types, use these overrides:

| Type | Bucket B threshold |
|---|---|
| System Instruction | 24h (should be gone by next morning) |
| Build Request | 24h |
| Pulse Note | 48h |
| Task / To Do / Note | 72h |
| Thread Log | 7d |
| Sweep Feedback | 24h |

Types exempt from Bucket B: `Daily State`, `Keep Handy`, `Pin to Top`

---

## Processing Score Tracking

At the end of each weekly Disposition Audit, compute:

```
Processing Score = (items actioned this week) / (items that entered this week) × 10
```

Where "actioned" = Status moved to Complete, Remove, or got a Next Action set.
Where "entered" = Status was "Not Started" at start of week.

Target: 9/10. Current baseline: 2/10 (as of 2026-04-22).
Track week-over-week in the Disposition Audit Thread Log under a `## Processing Score` section.

---

## Rules

- Any Type not in this table defaults to the 72h SLA.
- SLAs are not hard deadlines — they're Bucket B trigger thresholds for surfacing in audits.
- Never auto-close Keep Handy or Pin to Top items. Brady owns their lifecycle.
- Whenever Status is set to Complete or Remove, also set Done=\_\_YES\_\_. These fields move together. No exceptions.
