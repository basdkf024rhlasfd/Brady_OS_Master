# Substrate Doctrine

*Established 2026-08-11. Companion to `os-doctrine.md`. Governs how Brady OS compounds
across model generations.*

---

## The Core Claim

When the underlying model improves, the improvement is applied to **what the model can
see**, not to what Brady has previously done. There is no credit for past sessions. A
better model reading a legible, well-registered OS is dramatically more capable than the
same model reading a pile of undocumented files.

Therefore: **the repo is the prompt.** Substrate quality sets the ceiling on every future
model's usefulness, and it is the only asset in the system that appreciates automatically
when the tech improves.

## What Does and Does Not Compound

Tokens do not compound. They are use-it-or-lose-it against a rolling window; nothing banks.
A maxed-out day of research that never lands in a registered, retrievable place is
thermodynamically identical to a day the app was never opened.

| Compounds | Does not compound |
|---|---|
| A skill with a trigger phrase, registered in `CLAUDE.md` | A one-off script in a chat window |
| A Research Library row with `Reference Count` + `Last Referenced` | A beautiful PDF nobody re-reads |
| A rule promoted to Rules & Preferences | A correction given verbally and forgotten |
| An agent profile named in the registry | An agent that exists only on disk |
| A doctrine file other sessions load | A conclusion reached and lost |

## The Governing Ratio

```
Escape velocity  =  durable artifacts created  ÷  minutes of Brady attention spent
```

Integrated over time. Model upgrades multiply the **existing stock** of the numerator.
This reframes the constraint: the scarce input was never compute, it was Brady's attention.
Phone-only, few-minutes-a-day is not a limitation to work around — it is the correct
forcing function, because it makes every unit of work asynchronous and specified rather
than supervised.

## The Three Leaks

1. **Unindexed research.** Research that produces no retrievable row is a rounding error.
   Governed by Hygiene Heidi Rule 5 and Claudine Scorecard K16.
2. **One-off building.** Fifty standalone artifacts ≠ escape velocity. One skill that fifty
   future sessions invoke = escape velocity. The test is not "does it work" — it is
   "does it have a trigger phrase and a registry line."
3. **Invisible capability.** A skill or agent that exists on disk but is absent from
   `CLAUDE.md`, or carries no routable frontmatter, cannot be found by a future model.
   It is capability that has already been paid for and will never be collected.
   Governed by Hygiene Heidi Rule 8 (`substrate-audit.sh`).

## Rules

1. **Nothing ends without a durable artifact.** A session that produced no registered,
   retrievable change scored zero regardless of tokens spent.
2. **Registration is part of building.** A skill is not done when it works. It is done
   when it has frontmatter (`name:`, `description:` with trigger phrases) and a line in
   the `CLAUDE.md` Skills Registry. The audit enforces this; do not wait for the audit.
3. **Substrate work outranks output work when they compete.** Making `CLAUDE.md` and the
   registry more legible pays a larger multiple than one more report, and the multiple
   grows as models improve.
4. **Measure yield, not volume.** The gauge is `substrate-audit.sh` S8.4 — the share of
   active days that added capability. Token consumption is not a metric.
5. **Agent output is not growth.** Days that only wrote reports under `1-execution/` mean
   the OS ran but did not grow. Both matter; do not confuse them.

## Instrumentation

| Signal | Source | Owner |
|---|---|---|
| Substrate legibility (S8.1–S8.3) | `3-reference/scripts/substrate-audit/substrate-audit.sh` | Hygiene Heidi Rule 8 + CI |
| Substrate yield (S8.4) | same script, report-only | Hygiene Heidi Rule 8 |
| Research leverage (K16) | `claudine-scorecard` | Hygiene Heidi Rule 5 |
| Hands-Off Index | `claudine-scorecard` North Star | Weekly sweep |

S8.1–S8.3 are hard gates: they fail CI on PRs that add unregistered capability, and Heidi
catches pre-existing drift weekly. S8.4 is report-only by design — it is a trend to steer
by, not a thing to block a PR over.

## Closing

The system is already good at running. The open question is whether it is getting smarter.
Running is measured in reports produced; getting smarter is measured in capability
registered. When the next model lands, only the second one gets multiplied.
