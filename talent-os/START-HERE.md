# Start Here — Talent OS in 15 minutes

Brandon — this is your kit. You already know talent and HR better than most. What's new is
the *harness*: instead of doing the work in your head and a dozen browser tabs, you drop raw
material into a folder, say one line, and a pre-built process hands you a finished deliverable.

This doc gets you from zero to your first real output in about 15 minutes. Read it once.

---

## 1. The mental model (2 minutes)

An AI agent isn't a chat window. It runs a loop — **observe → think → act** — and it can read
files, write files, and use tools. Three things shape what it does:

- **Context** — the standing instructions and knowledge it loads every time. In Talent OS
  that's `CLAUDE.md` (how the kit works) plus the `reference/` folder (HR playbook, retail
  hiring patterns, the engagement backdrop) and the `agents/hunter.md` identity. You don't
  re-explain this every session; it's always on.
- **Skills** — pre-built processes for a specific job. A skill is just a `SKILL.md` file that
  tells the agent, step by step, how to turn an input into an output. You *invoke* one by
  naming it in plain English. Think of them as your SOPs, made executable.
- **Intake** — the folders where you drop raw material. Because the context and skill are
  already loaded, your prompt can be one line and the result is 80% done.

That's the whole game. Context makes it smart, skills make it repeatable, intake makes it fast.

## 2. Install (5 minutes)

1. Install Claude Code: <https://claude.com/claude-code> (follow the setup for your OS; you'll
   sign in with your Anthropic account — Brady can get you on the right plan).
2. Put this `talent-os/` folder somewhere permanent (e.g. `~/talent-os`).
3. Open a terminal, `cd` into it, and run `claude`.
4. When it starts, it automatically reads `CLAUDE.md` and knows it's Hunter. Test it:

   > **you:** who are you and what can you do?

   You should get Hunter introducing itself and listing the skills. If you do, you're wired up.

*(Optional, later: connect tools — Google Drive, your ATS, LinkedIn — via MCP connectors.
Brady can walk you through that. You don't need any of it for day one.)*

## 3. Your first deliverable — optimize a job posting (8 minutes)

**Fastest path of all:** just type **`go`**. Hunter will introduce itself, show you the menu, and
run this exact JD-optimization demo on a bundled sample posting automatically — so you get a finished,
shippable optimized job description on your first message. The steps below are the same thing done
with *your* posting.

This is the fastest "holy cow" moment and it maps to a live problem in the engagement.

1. Grab a real job posting you want to improve — the retail sales associate (RSA) posting is
   the perfect first target. Save it as a `.md` or `.txt` file in **`intake/roles/`**, or just
   have it ready to paste.
2. In Claude Code, say:

   > **you:** optimize the RSA job posting — it's in intake/roles. The role is 100% commission
   > after an 8-week ramp, requires weekends and holidays, and can earn $60–100K. We keep
   > wasting manager time on people who bail when they hear "commission" or "weekends."

3. Hunter loads `skills/jd-optimizer/SKILL.md` and hands you back, in `deliverables/`:
   - a rewritten, ready-to-post JD that *sells* the earning potential and states the schedule
     and commission model up front (so the wrong people self-select out before a manager ever
     talks to them),
   - a short sponsored/boosted version for Indeed,
   - a set of pre-apply screening questions,
   - a compliance note flagging anything risky (e.g. language that could screen out a great
     non-traditional hire).

4. Read it, tell Hunter what to change ("make the hook punchier", "add a Spanish version"),
   and ship it.

That's the pattern for everything. Different folder, different one-liner, different skill.

## 4. What to run next

| When you're... | Say | Skill |
|---|---|---|
| Kicking off the engagement with stakeholder interviews | `run the talent diagnostic on my notes in intake/interviews` | `talent-strategy-diagnostic` |
| Standardizing how managers interview | `build an interview guide for the RSA role` | `interview-guide-builder` |
| Drowning in applicants | `screen the resumes in intake/resumes for RSA` | `candidate-screener` |
| Ready for the wow | `design a phone AI interviewer for RSA screening` | `phone-ai-interviewer` |
| Planning headcount against growth | `run a workforce plan` | `workforce-plan` |
| Building onboarding | `build a 30/60/90 for a new store manager` | `onboarding-ramp` |
| Reading the culture | `run a culture diagnostic` | `culture-diagnostic` |
| Working comp / benefits | `run total rewards for the RSA role` | `total-rewards` |

Full catalog: [`skills/README.md`](skills/README.md).

## 5. Three habits that make this sing

- **Drop, don't describe.** Put the actual file in `intake/`. The agent reads better than it
  guesses. Transcripts, exports, screenshots-of-text — all fair game.
- **One line is enough.** Because context and skills are loaded, you don't need a paragraph.
  "screen these for RSA" beats a 200-word prompt.
- **Iterate out loud.** The first output is a draft you *react to*, not a final. "Cut the
  fluff, tighten the rubric, add a knockout for schedule" — that's the loop where the value is.

## 6. The two rules (never skip)

1. **Confidential stays confidential.** Anything you drop in `intake/` or that lands in
   `deliverables/` is git-ignored — safe for real client data. Don't paste client names or
   comp into the kit's own files.
2. **You own every people decision.** Talent OS ranks and recommends; you decide. It never
   rejects a candidate or sends a message on its own. That's both good practice and how you
   stay clean on EEOC / adverse-action rules.

---

Stuck? Ask Hunter: *"how do I ..."* — it knows the kit. Bigger questions → Brady.
