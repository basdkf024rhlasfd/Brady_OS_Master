# Operator Handbook

**Who this is for:** A power user who has been onboarded to Brady OS and needs a day-to-day operating reference. Not a rebuild guide (that's `REBUILD-BRADY-OS.md`). Not a governance document (that's `3-reference/governance/`). This is the "what do I actually do today" doc.

**What it assumes:** You have read access to this repo, access to the Notion workspace, and understand the basic four-layer structure (Agents / Execution / Memory / Reference). You are not Brady — you don't have his email credentials, Vercel access, or Clerk admin rights unless explicitly granted.

**What it doesn't cover:** Initial setup (see `REBUILD-BRADY-OS.md`), portal deployment (see `3-reference/app-playbook.md`), agent creation (see the project-agent template), or any T2+ action requiring Brady approval.

---

## The Daily Rhythm

The OS runs on four sweeps. They're sequential during a normal day; they can be skipped if nothing is pressing, but they shouldn't be skipped two days in a row.

**Morning Sweep** (`3-reference/skills/morning-sweep/SKILL.md`)
Trigger: "run morning sweep" or "morning sweep". Runs phases 1–4: Phil primer check → engagement capacity snapshot → Gmail scan → Streaming Notes processor → pipeline dashboard. Takes 20–45 minutes depending on pipeline depth. "Done" = every Streaming Notes item has a Next Action set or a clear reason it doesn't. The sweep ends with a brief pushed to Telly (Telegram).

**Streaming Notes Processor** (`3-reference/skills/streaming-notes-processor/SKILL.md`)
Runs as Phase 3.6d of morning sweep, but can be triggered standalone: "process streaming notes" or "drain the notes". Actions items per Type-SLA. Routes Pulse Notes, queues Sweep Feedback, drafts Next Action candidates. Does NOT auto-set Next Actions — it proposes, Brady confirms.

**Evening Sweep** (`3-reference/skills/evening-sweep/SKILL.md`)
Trigger: "evening sweep". Archives the day: what moved, what didn't, journal entry. Takes 10–15 minutes. "Done" = today's work is captured in Streaming Notes or git. Nothing open that should be open.

**Weekly Sweep** (`3-reference/skills/weekly-sweep/SKILL.md`)
Trigger: "weekly sweep" — runs Sundays. Longer form: priorities, calendar coverage, projects, finances, family logistics. Ends with Commissioner Brief + Streaming Notes Disposition Audit. Takes 60–90 minutes. "Done" = the week ahead has a clear P1, the pipeline is drained, the disposition audit found nothing stuck > 14 days.

---

## How to Invoke an Agent

**Project agents (OC Optimus / Fran):**
1. Start a session with the agent name: "OC Optimus" or "Fran"
2. The agent runs its Session Protocol (loads PROJECT.md, checks Notion wiki, orients in ≤200 words)
3. Declare a mode or let the agent propose one: **Synthesis** (state of play), **Problem Frame** (take a specific problem and structure it), **Data Hunt** (generate SFDRs)
4. At session end: the agent updates Notion Next Bests page and surfaces at least one SFDR. If it doesn't, prompt it.
5. End cleanly: any items that need Brady's attention go to Streaming Notes with Next Action populated. Do not let a session end with open threads living only in chat.

**Skill agents (morning sweep, Finn, Musashi, etc.):**
- Call by trigger phrase (each SKILL.md documents its trigger)
- Skills are bounded SOPs — they run a sequence and produce specific outputs. Don't improvise inside a skill; follow the phases.
- If a skill phase fails (e.g., Notion MCP unavailable), note it in the sweep brief as `(unavailable this run)` and continue.

**General agents (Claudine, Wyatt Earp, DiCaprio, etc.):**
- Claudine: the default — most in-session work runs through Claudine. She orchestrates, routes, and builds.
- Wyatt Earp: invoke explicitly when pressure-testing a strategic pitch. Say "bring in Wyatt" or "Wyatt Earp review". He argues against the recommendation — that's his job.
- DiCaprio: cross-workspace panorama only. Not for single-repo status questions.

---

## How to Add to Streaming Notes Manually

Streaming Notes (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`) is the OS pipeline. Everything Brady wants actioned or remembered goes here first.

**Required fields:**

| Field | Options | What to pick |
|---|---|---|
| **Name** | Free text | Clear title — "what is this item?" |
| **Type** | See below | What kind of item is this? |
| **Status** | Not Started / In Progress / Waiting / Blocked | Start at Not Started unless it's already in flight |
| **Priority** | Must / Should / Could | Must = Brady will regret not doing it; Should = matters this week; Could = someday |
| **Source** | Chat / Cowork / Code / Execution | Where did this come from? |

**Type cheat sheet:**

| Situation | Type to use |
|---|---|
| Something Brady needs to do | `To Do` |
| A thought, observation, or piece of information | `Note` |
| A behavioral rule Brady stated | `System Instruction` |
| A research item that should go to Research Library | `Research` |
| Something to send someone | `Communication Snapshot` |
| Daily OS state (Phil primer, Musashi review, sweep logs) | `Daily State` |
| A running thread across multiple sessions | `Thread Log` |
| Something to always have within reach | `Keep Handy` |

**When to add manually vs. letting the sweep do it:**
- Sweep adds items for you when you're running a skill. Use manual entry when something surfaces mid-session that isn't part of a skill run (e.g., Brady says something in conversation that should be captured, or a build completes and there's a handoff item).

---

## How to Handle a Stuck Streaming Notes Item

A stuck item is one that has been sitting in `Not Started` or `In Progress` for > 14 days with no movement.

1. **Read it.** Is the Type still correct? Sometimes an item aged because it was filed as `To Do` when it should be `Research` (different SLA).
2. **Check the Priority.** If it's `Must` and > 3 days old with no Next Action → escalate to Brady immediately. Don't let Must items sit.
3. **Check if it's stale context.** If the item is a `Note` or `Thread Log` and the situation it described no longer exists → mark Status = `Complete`, Done = YES, and note "stale context, closed" in the body.
4. **Check if it's blocked on something external.** If yes → set Status = `Blocked`, populate the Blockers field, set Next Action to "wait for [X]".
5. **If genuinely unclear** → leave Status = `In Progress`, set Next Action to "Brady review — context unclear", bump Priority to `Should`.

Never delete a Streaming Note. Archive by marking Done = YES.

---

## How to Run a Project Agent Session

The full sequence for OC Optimus or Fran:

1. **Declare the agent and context:** "OC Optimus — Synthesis mode" or "Fran, let's go to Problem Frame on the GMROI issue"
2. **Wait for orientation:** The agent loads its SESSION PROTOCOL — reads PROJECT.md, loads synthesis files, checks Notion wiki, queries Research Library. This takes 30–60 seconds. Do not skip it.
3. **Review the State / Stale / Next 3 Bests brief.** The agent gives you ≤200 words on where things stand. If anything in "Stale" has changed since it was written, correct it before proceeding.
4. **Work the session in the declared mode.** For Synthesis: surface decisions and priorities. For Problem Frame: nail down the problem statement, size it, route it to a framework. For Data Hunt: generate 3 SFDRs ranked by unlock/effort.
5. **End with at least one SFDR.** If the agent hasn't surfaced one by end of session, ask: "Give me today's SFDRs." Non-negotiable per the agent contracts.
6. **Update Notion Next Bests.** At session end, the agent updates its Next Bests page in the wiki. If it doesn't, ask explicitly.
7. **Route handoff items.** Anything that needs Brady's attention or a build → Streaming Notes with Next Action populated. Never leave threads only in chat.

---

## How to File a Build Request

1. Go to `3-reference/build-queue/`
2. Copy `SPEC-TEMPLATE.md` and rename it: `SPEC-NNN-[slug]-open.md` (use the next available number from `INDEX.md`)
3. Fill in all fields. Be specific on the Deliverable and Acceptance Criteria — "improve the agent" is not a valid deliverable.
4. Size it honestly: small = under 30 min, medium = 30–90 min, large = over 90 min.
5. Mark Trust Tier: T1 (internal, reversible) or T2+ (client-facing, irreversible, or outbound).
6. Update the table in `INDEX.md` to add the new spec.
7. Commit the new spec file and INDEX.md update.
8. T1 small items can be picked up by the next available agent or operator. T1 medium/large and all T2+ items need Brady to approve before execution.

---

## How to Escalate to Brady

**Escalate immediately (do not proceed without Brady):**
- Any T2+ action: client-facing content, outbound communications, portal access changes, Clerk allowlist changes, Vercel env var changes
- Any action involving a client email address
- Any scope or pricing question from a client or partner
- Any irreversible operation (delete, overwrite, deploy to production)
- Any Streaming Notes item with Priority = Must that has been sitting > 3 days

**Does not need escalation (T1 — proceed):**
- File edits in `0-agents/`, `3-reference/`, `1-execution/` that don't change any client-facing surface
- Adding or updating internal Notion pages (Research Library, agent wikis, Context Vault)
- Running any scheduled skill (morning sweep, Musashi review, Phil pre-sweep, etc.)
- Filing a build queue spec
- Updating a SKILL.md with new constraints or sections

**When in doubt:** file a Streaming Notes item with Type=Note, Priority=Should, Next Action="Brady review — escalation unclear", and describe the decision you're trying to make.

---

## What NOT to Touch Without Brady

Hard stops — do not proceed without explicit Brady instruction:

- **Clerk allowlists** — `MCEPTION_*_EMAILS` env vars. Adding any email grants portal access.
- **Vercel environment variables** — any changes to the `mception-ai` Vercel project.
- **Portal slug changes** — adding/removing entries from `portal/src/config/projects.yml`.
- **Agent profile files** (`0-agents/custom-built-agents/*.md`) — changes to agent identity, trust tier, or guardrails.
- **Client communications** — any email, message, or document that goes to a client contact.
- **mception.ai deploys** — never trigger a production deploy without Brady confirmation.
- **Notion database schema changes** — adding fields or relations to any DB.
- **Git force push or history rewrites** — never.
- **Brady's external accounts** — Gmail, Google Calendar, Google Drive, Otter.ai, Telegram.
