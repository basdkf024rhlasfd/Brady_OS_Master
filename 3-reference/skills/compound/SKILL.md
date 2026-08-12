---
name: compound
trust_tier: T1
description: >
  Makes a piece of work compound instead of evaporating. Invoked at the START of work it
  declares the landing zone so the work is shaped to land; invoked AFTER work it lands the
  output in its durable form, registers it so a future model can find it, verifies with
  substrate-audit, and logs the decision to a ledger that scores its own accuracy over time.

  TRIGGER whenever Brady types "/compound", or says: "make this compound", "land this",
  "make this stick", "don't let me lose this", "put this somewhere durable", "does this
  compound", "compound review", or any variation about making work durable rather than
  one-off. Also trigger at the end of any session that produced research, a working build,
  a reusable procedure, or a conclusion worth keeping.

  Governed by 3-reference/substrate-doctrine.md. Enforced by
  3-reference/scripts/substrate-audit/substrate-audit.sh (Hygiene Heidi Rule 8).
---

# Compound

The slash command that keeps Brady's phone-only, few-minutes-a-day operating pattern
pointed at escape velocity.

## Why This Exists

Tokens do not bank. A maxed-out session of research or building that lands nowhere
retrievable is thermodynamically identical to a session that never happened. Model
upgrades multiply **what the model can see** — the registered substrate — not what was
done in past sessions.

The 2026-08-11 substrate audit measured the gap: **9 of 35 active days (25%) added
capability**; 26 days wrote only agent output. The OS ran well and grew barely. That is
not a token problem. It is a landing problem — work gets done and never gets put anywhere
a future session can find it.

`/compound` is the landing gear. It is deliberately cheap to invoke (one line, from a
phone) because a discipline that costs more than the work it protects will not be used.

## The Three Modes

| Mode | Invoke | When | What it does |
|---|---|---|---|
| **Open** | `/compound <what I'm about to do>` | Before work | Declares the landing zone up front so the work is shaped to land. **Preferred mode.** |
| **Land** | `/compound` (bare) or `/compound land` | After work | Takes what just happened and lands it. |
| **Review** | `/compound review` | Weekly / on demand | Checks whether past landings were actually referenced. Adjusts the routing table. This is the improvement loop. |

Bare `/compound` with no argument: read the session. If substantive work has already
happened, run **Land**. If the session is fresh or Brady is describing an intent, run
**Open**. Never ask which mode — infer it and say which one you picked in one line.

---

## Mode 1 — Open

**Goal: one line back to Brady, then get out of the way.**

1. Classify the stated intent against the Routing Table below.
2. Emit the landing declaration — exactly this shape, nothing more:

   ```
   📍 Landing: <durable form> → <exact path or DB>
      Registers via: <frontmatter + registry line | Reference Count | Rules & Preferences | Key Files link>
      Done when: <the single observable condition>
   ```

3. Then do the work Brady asked for. The declaration is now a commitment — at the end of
   the work, land it without being asked again.

**Do not** ask clarifying questions in Open mode unless the intent maps to two routing
rows with materially different destinations. Brady is on a phone. Guess well, state the
guess, proceed.

---

## Mode 2 — Land

1. **Identify what was actually produced.** Not what was discussed — what exists.
2. **Route it** via the Routing Table.
3. **Write it** to the durable path.
4. **Register it** — this is the step that is always skipped and always matters:
   - Skill → frontmatter `name:` + `description:` with trigger phrases, **and** a line in
     the `CLAUDE.md` Skills Registry, **and** the mirror list in `3-reference/skills/CLAUDE.md`
   - Agent → a registry line in `CLAUDE.md` naming the file path
   - Research → a Research Library row with TL;DR, Source Credibility, Topic Tags, Client Relevance
   - Doctrine → a Key Files link in `CLAUDE.md`
   - Rule → Streaming Notes row, `Type="System Instruction"`, `Status="Not Started"`, `Priority="Must"`
5. **Verify.** Run `3-reference/scripts/substrate-audit/substrate-audit.sh`. It must exit 0.
   If it does not, fix what it names before reporting done.
6. **Log** one ledger row (below) and one Routing Log row per `_shared/routing-log.md`.
7. **Self-score** the run (below) and report it in one line.

---

## The Routing Table

The core decision. Each row: what was produced → where it lives → what makes it findable.

| What was produced | Durable form | Path / destination | Findable because |
|---|---|---|---|
| Research findings, a scan of a market/company/tech | Research Library row | Notion `4f87259b-e9a7-4d35-86ba-2148cb472d0f` | Topic Tags + Client Relevance; `Reference Count` increments on reuse |
| A procedure done twice, or that will be | **Skill** | `3-reference/skills/<name>/SKILL.md` | Frontmatter triggers + `CLAUDE.md` registry line |
| A behavioral correction or preference | System Instruction | Streaming Notes → Rules & Preferences | Morning sweep promotes it |
| A conclusion, principle, or settled argument | Doctrine section | `3-reference/<topic>-doctrine.md` or a section in an existing one | Key Files link in `CLAUDE.md` |
| A working page, app, or portal surface | Portal route + config | `portal/src/` + `portal/src/config/projects.yml` | Allowlist entry (see mception publishing rules) |
| A persona with judgment and voice | Agent | `0-agents/custom-built-agents/<name>.md` | `CLAUDE.md` registry line |
| Client-specific facts, problems, stakeholders | Company page / Agent Wiki | Companies DB `d41b6f0d-9455-4bb4-9332-ac1539473253` | Problem Statements H2 on the Company page |
| A build worth doing later | Build spec | `3-reference/build-queue/SPEC-NNN-*.md` + `INDEX.md` | Index entry |
| A check that should run repeatedly (hygiene, gate, audit) | Script + CI workflow + owning rule | `3-reference/scripts/<name>/` + `.github/workflows/` | `CLAUDE.md` Scripts section **and** a Hygiene Heidi rule — a script with no owning rule never runs twice |
| **A one-off answer, a throwaway toy, a thing done once with no reuse ahead** | **Nothing** | — | — |

### The last row is load-bearing

**Refuse to land things that do not compound.** A registry stuffed with one-off entries is
*worse* than a lean one — it degrades exactly the legibility this skill exists to protect,
and it teaches Brady the command is bureaucracy.

When the honest answer is "this doesn't compound," say so in one line and stop:

```
📍 Not landing: <one clause why> — nothing to register.
```

Good reasons not to land: it was a question with an answer, not a procedure; it's a kid's
art toy with no reuse ahead; it's a variation on something already registered (say which);
the durable version already exists (link it).

**Test for skill-worthiness:** has this procedure been done twice, or is there a concrete
third occasion coming? If neither, it is not a skill yet. Note it in the ledger as a
`candidate` and let the review pass promote it if it recurs.

---

## The Ledger

Append one row per invocation to `1-execution/areas/brady-os/compound-log/YYYY-MM.md`
(create the file with the header if the month is new):

```markdown
# Compound Log — YYYY-MM

| Date | Mode | Input | Landed as | Path | Registered | Audit | Referenced? | Score |
|---|---|---|---|---|---|---|---|---|
| 2026-08-11 | open | substrate audit theory | doctrine | `3-reference/substrate-doctrine.md` | Key Files | pass | — | 10/10 |
```

- `Referenced?` is left `—` at write time. **The review pass fills it in.** That column is
  the entire point — it is the only honest evidence a landing was worth making.
- `candidate` rows (things not landed but flagged as possibly recurring) use
  `Landed as: candidate` and are re-examined by the review pass.

---

## Mode 3 — Review (the improvement loop)

Run weekly, or on `/compound review`. This is what makes the skill get better rather than
just get used.

### 3.1 Fill in the `Referenced?` column

For every ledger row older than 14 days with `Referenced? = —`, check ground truth:

| Landed as | How to check whether it was actually used |
|---|---|
| Skill | `git log -S"<skill-name>" --since=<landing date>` **and** grep the repo for invocations; a Routing Log row naming it counts |
| Research Library row | `Reference Count > 0` **and** `Last Referenced` after the landing date |
| Doctrine | `git log --since=<date> -- <path>` **or** any file linking to it that did not exist at landing |
| Rule | Present in Rules & Preferences and not contradicted by a later instruction |
| Portal surface | Route still in `projects.yml` and the file changed since landing |
| Agent | Named in a standup, sweep output, or Routing Log row since landing |

Write `yes` / `no` / `too-early`.

### 3.2 Compute hit rate per durable form

```
hit_rate(form) = rows landed as <form> with Referenced=yes
                 ÷ rows landed as <form> with Referenced in (yes, no)
```

`too-early` rows are excluded from both sides — never counted as failures.

| Hit rate | Reading | Action |
|---|---|---|
| ≥60% | The routing rule is earning its place | none |
| 30–59% | Landing too eagerly into this form | Tighten that row's criteria; propose the edit |
| <30% (n≥5) | This form is a graveyard | Propose demoting it — either stop routing here, or fix why artifacts here die |

**Require n≥5 landed rows before acting on any hit rate.** Below that it is noise, and
rewriting the routing table on 2 data points is how the skill gets worse instead of better.

### 3.3 Promote recurring candidates

Any `candidate` row appearing **3+ times** with the same shape is now a real skill. Draft
it and put it up for approval.

### 3.4 Emit proposals — approval-gated, never auto-applied

```
⏳ WAITING ON YOU
1. approve compound routing-<n>: <the specific routing table edit>
2. approve compound promote-<slug>: <candidate that recurred 3x → make it a skill>
```

Routing-table edits change how all future work is filed. They are Brady's call. Apply only
on explicit approval, then log the change in a `## Routing Table Changes` section at the
bottom of the current month's ledger with the date, the edit, and the hit rate that
triggered it — so a future review can tell whether the change helped.

### 3.5 Feed the wider loop

- Behavioral learnings → `3-reference/skills/recursive-learning/SKILL.md`
- One Routing Log row for the review itself
- Report the substrate yield number from `substrate-audit.sh` S8.4 alongside the hit rates.
  Rising yield with flat hit rates means landing more but landing worse — call that out.

---

## Scoring Methodology (objective — Hygiene Heidi Rule 1)

Every run scores itself out of 10. Replicable, no judgment calls:

| Points | Criterion |
|---|---|
| 2 | Landing zone declared **before** the work (Open mode used) |
| 3 | A durable artifact exists at the declared path |
| 2 | Registered: frontmatter + registry line / Research row / Rules & Preferences entry, as the Routing Table requires |
| 2 | `substrate-audit.sh` exits 0 after the run |
| 1 | Ledger row written |

A correct **"not landing"** call scores **10/10** — declining to register a non-compounding
one-off is the skill working, not failing. Score it and move on.

**Self-score (Rule 2):** report the number in the closing line of every run. If <8, name
the missing points in one clause.

**Improvement mechanism (Rule 3):** Mode 3 — the `Referenced?` column is a prediction
being scored against outcome, and the routing table is edited from the result.

---

## Output Contract

Keep it phone-sized. Open mode is 3 lines. Land mode is at most:

```
📍 Landed: <form> → <path>
   Registered: <what was added where>
   Audit: PASS · Ledger: logged · Score: 10/10
```

Then the `⏳ WAITING ON YOU` block per the root `CLAUDE.md` communication protocol — or
`⏳ Waiting on you: nothing — FYI only.`

## What This Skill Does NOT Do

- Does not do the underlying work — it declares where the work lands, then lands it
- Does not auto-edit its own routing table (approval-gated, §3.4)
- Does not publish to mception.ai — that is Musashi deploy mode and the allowlist rules in `CLAUDE.md`
- Does not register one-offs to hit a number. Refusing to land is a valid, full-score outcome.
- Does not replace `streaming-notes-processor` (drains the intake queue) or
  `substrate-audit.sh` (measures the result). It is the step between them: deciding where
  a given piece of work belongs and putting it there.

## Data Dependencies

- **Reads:** session context, `3-reference/substrate-doctrine.md`, the Routing Table above, prior ledger months
- **Writes:** the durable artifact, its registry line(s), `1-execution/areas/brady-os/compound-log/YYYY-MM.md`, one Routing Log row
- **Verifies with:** `3-reference/scripts/substrate-audit/substrate-audit.sh`
- **Recomputed live every review:** hit rates per form (never cached — they move as the `Referenced?` column fills in)
