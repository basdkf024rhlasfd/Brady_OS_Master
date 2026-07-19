# SPEC-014 — mception Week-One Kill-Test (the go/no-go)

**ID:** SPEC-014
**Slug:** mception-killtest
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** small
**Trust tier:** T1 (read-only analysis, no writes to the site)
**Approval gate:** Brady approved core plan 2026-07-19

---

## Problem

The single assumption that quietly kills the whole program is signal volume: a gated, low-traffic portal may not generate enough weekly signal for a real, non-random proposal. This must be **measured, not reasoned about**, before any loop or autonomy is built.

## Deliverable

After SPEC-013 has captured **one full week** of normal use, run a **one-off manual Steward dry-run**: a read-only agent reads everything captured (chat transcripts, low-confidence answers, click paths, replays' event streams) and produces the exact digest it *would* have sent — a numbered list of proposed site improvements ("here's what I saw, here's what I'd change"). Deliver it to Brady once.

## Acceptance criteria

1. [ ] Dry-run reads the full week of captured data (chat + behavior), read-only, no writes to `portal/`
2. [ ] Output is a phone-scannable numbered digest of concrete proposals with the signal behind each
3. [ ] Brady renders the **go/no-go**: does the digest contain ≥1 proposal he'd actually approve?
4. [ ] Decision recorded in the plan file + a Streaming Notes row

## Blocked by

- SPEC-013 live + one week of captured data.

## Notes

Owner: Claudine. **The gate:** ≥1 approvable proposal → build the loop (SPEC-015→017). Noise → shrink the loop to Brady-side signal only (coverage gaps from his own chatbot testing + what he re-explains), drop visitor-behavior proposals. Either way the truth is known for ~a day of wiring + a passive week. Research basis: Thicket (machinery ≠ demand), low-traffic A/B floors, Kura ("<100 conversations, manual review wins").
