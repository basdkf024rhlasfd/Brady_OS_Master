---
name: nightly-advance
trust_tier: T1
description: >
  Nightly 8 PM CT push: three specific, sized ideas for advancing the compounding goal —
  one to build capability, one to harvest value already paid for, one to cut drag. Every
  idea is grounded in a real signal read from the repo that evening (substrate yield, the
  compound ledger, dormant research, never-invoked skills, stalled specs), carries a reply
  token, and is never repeated once ignored twice.

  TRIGGER on the 8 PM CT schedule, or whenever Brady says: "nightly advance", "three ideas",
  "what should I do next to advance this", "advance ideas", "what would move the needle",
  or replies with an `advance N` token to a prior run.

  Governed by 3-reference/substrate-doctrine.md. Reads
  3-reference/scripts/substrate-audit/substrate-audit.sh and the /compound ledger.
---

# Nightly Advance

The 8 PM push that answers one question: **what three things would most advance the
compounding goal, given where the OS actually stands tonight?**

## Why This Exists

The substrate doctrine says the OS is good at running and weak at growing — 27% of active
days add capability. Knowing that does not fix it. What fixes it is a specific, sized,
phone-answerable idea arriving at the moment Brady has attention to give it.

This skill exists to convert a measured gap into tomorrow's smallest useful move.

## Execution Environment

- **Runs on:** fresh session per firing (Routine, `create_new_session_on_fire`)
- **Schedule:** `0 1 * * *` UTC = **8:00 PM CT (CDT)**. Shift to `0 2 * * *` in CST months (Nov–Mar).
- **Access needed:** repo read, Notion MCP (Research Library, Streaming Notes), git
- **Delivery:** push notification to Brady's phone on run completion
- **Log:** `1-execution/areas/brady-os/nightly-advance/YYYY-MM.md`
- **Expected runtime:** 2–4 minutes

---

## The Three Levers (one idea each, never three of the same kind)

| # | Lever | The question it answers |
|---|---|---|
| 1 | **Compound** | What capability, if registered tonight, would a future model be able to use? |
| 2 | **Collect** | What has already been paid for and never collected? |
| 3 | **Cut** | What is adding drag and should be retired? |

**This triad is load-bearing.** An idea generator that only proposes *build more* would inflate
the registry and degrade the exact legibility the doctrine protects. Harvesting and pruning
raise substrate quality without adding a single new file, and on many nights they are the
better move. Never emit three Compound ideas because they were easiest to find.

---

## Phase 1 — Read the Signals (silent)

Gather tonight's state. Each signal maps to a lever. **Never propose an idea that is not
traceable to one of these** — a nightly note that invents its own premise gets ignored by
week two.

| Signal | How to read it | Feeds |
|---|---|---|
| Substrate yield + trend | `3-reference/scripts/substrate-audit/substrate-audit.sh` (S8.4); compare to last 7 logged runs | Compound |
| Days since last capability commit | `git log` against `0-agents/`, `3-reference/`, `portal/src/`, `.github/`, `CLAUDE.md` | Compound |
| `candidate` rows in the compound ledger | `1-execution/areas/brady-os/compound-log/YYYY-MM.md` — count repeats; 3× = ready to promote | Compound |
| Dormant research | Research Library rows, `Status=Active` and `Last Referenced` >90d (or null) | Collect |
| Landed-but-never-referenced | Compound ledger rows with `Referenced? = no` | Collect / Cut |
| Never-invoked skills | For each registered skill, `git log -S"<name>"` + repo grep since its creation — zero hits after 30 days | Collect / Cut |
| Stalled build specs | `3-reference/build-queue/INDEX.md` open SPECs with no commit activity in 30 days | Compound / Cut |
| Streaming Notes purgatory | Items `Not Started` >7 days with no Next Action | Collect |
| Open approval gates | Unanswered `approve <agent> <slug>` lines from Musashi / Heidi / Phil / Steward | Collect |
| In-flight work | Last 7 days of commits and open PRs | all three — never propose something already underway |

---

## Phase 2 — Generate and Filter

1. Draft candidate ideas per lever from the signals above.
2. **Dedupe against history.** Read the last 14 days of the log:
   - An idea materially identical to one already sent in that window → **drop it**, unless its
     underlying signal changed materially (yield moved a band, the count crossed a threshold).
   - An idea **ignored twice** → retire permanently. Record it in the log's `## Retired Ideas`
     section with the date and reason. Never send it again.
3. **Size each idea.** Estimated Brady-minutes, honestly: `5 min`, `20 min`, `needs a session`.
   An unsized idea is a wish. Anything over `needs a session` gets split or dropped.
4. **Rank within lever** by (signal strength × leverage) ÷ Brady-minutes. Take the top one.

### The permission to send fewer than three

**If a lever has no idea traceable to a real signal tonight, send two. Or one.** Say which
lever was empty and why:

```
2. Collect — nothing tonight. No dormant research, no unreferenced landings.
```

Forcing three every night guarantees filler by week two, and filler is how a daily
notification becomes something Brady swipes away. An honest short night is the mechanism
working. **Never invent a third idea to fill the slot.**

---

## Phase 3 — Output

Phone-first. The push preview shows the first line, so lead with the sharpest idea.

```
🌙 Nightly Advance — YYYY-MM-DD
Yield: 27% (flat / ↑2 / ↓3) · 4 days since last capability commit

1. COMPOUND · 20 min
   <the idea, one line>
   Why now: <the signal that triggered it>
   → advance 1

2. COLLECT · 5 min
   <the idea>
   Why now: <signal>
   → advance 2

3. CUT · 10 min
   <the idea>
   Why now: <signal>
   → advance 3

⏳ WAITING ON YOU
1. Reply `advance 1`, `advance 1,3`, or `skip` — anything unanswered by tomorrow counts as ignored.
```

Reply handling:
- `advance N` → execute that idea now, then route the output through `/compound` so the work lands and registers.
- `skip` / no reply by the next run → mark all three `ignored` in the log.
- Free-text redirect → log the original as `ignored`, treat the redirect as the real task.

---

## Phase 4 — Log and Score

Append to `1-execution/areas/brady-os/nightly-advance/YYYY-MM.md`:

```markdown
| Date | Lever | Idea | Signal | Size | Outcome |
|---|---|---|---|---|---|
| 2026-08-11 | compound | ... | yield flat 3d | 20m | approved / ignored / retired |
```

Then one Routing Log row per `_shared/routing-log.md` for the run itself.

### Scoring Methodology (objective — Hygiene Heidi Rule 1)

Per run, out of 10:

| Points | Criterion |
|---|---|
| 3 | Every idea sent traces to a named signal from Phase 1 |
| 2 | Levers are distinct (no two ideas on the same lever) |
| 2 | Every idea carries an honest size estimate |
| 2 | No idea duplicates one sent in the last 14 days |
| 1 | Log row + Routing Log row written |

A run that honestly sends **one** idea and names the two empty levers scores **10/10**.
Volume is not the metric.

**Self-score (Rule 2):** append the number to the log row. If <8, name the missing points.

### Improvement Mechanism (Rule 3) — the weekly recalibration

Every Sunday run, before generating, compute from the trailing 30 days:

```
acceptance(lever) = approved ÷ (approved + ignored)
```

| Acceptance | Reading | Action |
|---|---|---|
| ≥50% | This lever earns its slot | none |
| 20–49% | Ideas are right, framing or sizing is off | shrink the sizes; lead with the signal |
| <20% (n≥10) | Brady does not want this lever at night | Propose dropping it and running two ideas — approval-gated |

**Require n≥10 before acting.** Rewriting the format on a slow week is how this gets worse
instead of better.

Behavioral learnings route to `3-reference/skills/recursive-learning/SKILL.md`. Structural
changes to this skill go through `approve advance <slug>` — it never rewrites itself.

---

## Safety Rails

- **Read-only on the OS.** Generates ideas; executes nothing until Brady replies `advance N`.
- **Never writes to Notion** except its own Routing Log row.
- **Never sends twice in one evening**, even if the run is retried.
- **Never proposes work already in flight** — check open PRs and the last 7 days of commits first.
- **Hard stop:** if `substrate-audit.sh` cannot run, send the ideas it can ground in other
  signals and say the yield number is unavailable. Do not fabricate a trend.

### Degraded mode — no Notion connector (current scheduled state)

The Routine `trig_01KjTfy9TccYBcBnT4BAUiva` was created from a session holding no MCP
connector grants, so **its fired sessions have no Notion access**. Two of the ten Phase 1
signals — Research Library dormancy and Streaming Notes purgatory — are unreadable on a
scheduled run. The eight repo-native signals (substrate yield, compound ledger, never-invoked
skills, stalled SPECs, capability-commit recency, approval gates visible in gitted backups,
recent commits, open PRs) all still work.

When a signal source is unreachable:

1. Generate from the signals that *are* available.
2. State the gap in one line: `Collect — repo signals only tonight (no Notion).`
3. **Never infer a Notion-side signal from memory or from a stale gitted backup.** A dormant
   research row invented from last week's file is a fabricated premise, which is the specific
   failure this skill's Phase 1 rule exists to prevent.

To restore full signal coverage, re-create the Routine from a session that holds the Notion
connector, or create it in the claude.ai Routines UI. Delete the old trigger by ID first so
Brady does not get two pushes a night.

## What This Skill Does NOT Do

- Does not execute ideas unprompted
- Does not replace `daily-decision-queue` (aggregates *pending approvals*); this generates *new* proposals
- Does not duplicate `musashi` nightly review (scores agents) or `phil` (grooms Notion) — it reads their leftovers as signal
- Does not pad to three. An empty lever is stated, not filled.

## Data Dependencies

- **Reads:** substrate-audit S8.4, compound ledger, Research Library, Streaming Notes, build-queue INDEX, git history, open PRs, prior 14 days of its own log
- **Writes:** `1-execution/areas/brady-os/nightly-advance/YYYY-MM.md`, one Routing Log row
- **Recomputed live every run:** yield trend and per-lever acceptance rates — never cached
