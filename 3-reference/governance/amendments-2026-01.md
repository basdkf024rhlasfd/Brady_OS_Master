# AI Operating System — Amendments (2026-01)

**Status:** Active
**Version:** Amendments-2026-01
**Category:** SOP / Governance
**Notion source:** Systems & Operating Manuals (migrated to GitHub as canonical)

---

## Purpose

Record governance clarifications discovered through real execution, without modifying or deleting existing SOPs.

## Amendment 1 — Execution Reality (Chat vs Notion)

- ChatGPT agents **cannot directly operate Notion**.
- No agent may imply background execution, silent processing, or completed database actions.
- All execution inside Notion requires:
  - Explicit user action (e.g., pasting into Notion AI), or
  - Explicit confirmation by the user.
- Language such as "completed," "processed," or "done" is prohibited unless execution is user-verified.

## Amendment 2 — Cornelius Ontology Clarification

- Cornelius is **not an autonomous agent**.
- Cornelius = **role + SOP executor**, activated only via user-pasted instructions into Notion AI.
- Chat output does not equal Notion execution.
- Cornelius does not "run in the background."

## Amendment 3 — SOP Gatekeeping Rule

- Any action that affects system state **must reference a named SOP**.
- Implied patterns or historical behavior are **non-authoritative**.
- If no SOP exists, output must be advisory or paste-ready only.
- No SOP = no execution claims.

## Amendment 4 — Voice Notes Processing Gap (Acknowledged)

- There is currently **no canonical SOP** titled: "Voice Note Processing (Capture > Tasks > Context)".
- Until such SOP exists:
  - Voice note handling is advisory.
  - Outputs must be paste-ready.
  - No task creation or processing may be implied.
- Creation of this SOP is explicitly pending.

## Amendment 5 — Trust Tiers (Autonomous Execution Governance)

Skills and automations operate at one of four trust tiers. Tiers define what a skill can do without Brady present.

### Tier Definitions

- **T0 — Observation only.** Can read state, produce reports, write to Streaming Notes and Routing Log. Cannot modify Execution Layer, cannot send any outbound. Can run unattended on any schedule.
- **T1 — Internal modification.** Everything T0 does, plus can update Notion properties (Status, Action, Done on Streaming Notes and similar), create Tasks, route Thread Logs. Can run unattended on schedule. Requires logging every modification to Routing Log.
- **T2 — Drafting with review.** Everything T1 plus can draft emails, messages, calendar events — but everything drafted lands in a Pending Review queue. Nothing sends. Nothing invites. Can run unattended on schedule. Brady reviews and approves in batch.
- **T3 — Outbound with per-instance approval.** Sends emails, creates calendar invites with attendees, posts social, invites to mception, interacts with clients. Requires explicit per-instance approval via Agent Question (Telly outbound). Never runs fully unattended. Only triggered by explicit Brady command or by a T2 skill escalating a draft.

### Permanent T3 Gates (Never Bypassable)

These actions always require per-instance Brady approval regardless of skill maturity:

- Sending any email to any human
- Creating calendar events that include attendees other than Brady
- Posting to any social platform
- Inviting anyone to mception.ai or Sycamore Lane Holdings resources
- Sending Telegram messages to anyone other than Brady
- Creating, modifying, or deleting any external account
- Committing to GitHub branches that auto-deploy (without Brady approval)
- Any financial transaction or money movement

### Tier Assignment

Every skill file carries a `trust_tier` field in its YAML frontmatter (T0, T1, T2, or T3). This is the canonical source for what a skill is authorized to do.

### Promotion Rules

- All skills start at T0 by default.
- T1 requires: named SOP + defined guard conditions + audit trail + Claudine review.
- T2 requires: all of T1 + 5+ successful manual runs + defined failure modes + Claudine review.
- T3 requires: all of T2 + checkpoint list + rollback procedure + full Council review.
- Brady can demote any skill instantly. Promotion requires the review process.
- Trust tiers apply to **skills**, not agents. Agents are judgment layers; skills are execution layers.

### Agent Question Protocol

When a T1+ skill encounters a decision outside its SOP boundaries during autonomous execution:

1. Create an "Agent Question" entry in the AgentQuestion DB (or Streaming Notes with Type = "Agent Question") with Status = "Awaiting Brady."
2. Send Brady a Telegram notification via Telly outbound with the question text and enumerated options.
3. Halt the affected decision branch. Continue independent branches.
4. Next scheduled run checks for Brady's answer and proceeds accordingly.
5. If no answer after 24 hours, the question expires and the skill logs "EXPIRED: [question]" and skips that branch.

### Scheduling Policy

- T0 and T1 skills: may be cron-scheduled via Conductor remote triggers.
- T2 skills: may be cron-scheduled; output lands in Pending Review queue for Brady.
- T3 skills: never cron-scheduled. Triggered only by Brady or by a T2 skill escalating with Agent Question approval.

### Relationship to Amendments 1–4

- Amendments 1–2 (ChatGPT/Cornelius not autonomous) are unchanged. Trust tiers apply to skills running in Conductor and CoWork, not ChatGPT agents.
- Amendment 3 (SOP gatekeeping) is the foundation — T1+ requires a named SOP by definition.
- Amendment 4 (voice notes gap) is unaffected.

## Relationship to Existing SOPs

- These amendments **overlay** existing SOPs.
- They do **not** replace: "Bo — Front Door AI (Compressed Ops Mode)" or the Canonical AI Operating System.
- In case of conflict, **these amendments take precedence** until folded into a future version.
