---
name: recursive-learning
description: Captures and logs working style feedback to Brady's Onboarding Brief AND the Streaming Notes pipeline for persistent learning across sessions. Use this skill when Brady gives feedback on HOW Claudine works (not WHAT to do), when calibrating behavior/tone/approach, at session end to check for unlogged learnings, or when Brady says things like "remember this" or "learn from this" about working style.
trust_tier: T1
---

# Recursive Learning

Log behavioral feedback to the Streaming Notes pipeline (Type="System Instruction") AND the Working Style Learnings table in the Claude Onboarding Context page so future Claudine sessions benefit from accumulated calibration.

## When to Trigger

- Brady corrects HOW you're working (tone, approach, pacing, permission-seeking)
- Brady calibrates behavior ("be more direct", "just do it", "don't ask so much")
- Explicit: "remember this", "learn from this", "add this to your learnings"
- Brady uses the Feedback Capture triggers (`rule:`, `never:`, `always:`, `remember:`, `log:`)
- Session end: Check if any feedback was given that wasn't logged

## Workflow

### 1. Recognize Feedback

Distinguish between:
- **Task feedback** (what to do) → Don't log, just execute
- **Working style feedback** (how to work) → Log it

Examples of working style feedback:
- "Just do it without asking"
- "You're being too cautious"
- "More Bo mode, less Bertha"
- "Carry the cognitive load"
- "Don't add decision fatigue"

### 2. Propose the Learning

Before logging, confirm with Brady (skip if Brady used `rule:`/`never:`/`always:` triggers — those are pre-confirmed):

> "That sounds like a calibration. Want me to log this to Working Style Learnings?"
>
> **Learning:** [distilled version]
> **Source:** [this conversation's context]

If obvious or Brady said "remember this" explicitly, skip confirmation and just do it.

### 3. Log to Both Destinations

**A. Streaming Notes (canonical pipeline) — REQUIRED**

Create a new entry in Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`):
- Type = "System Instruction"
- Status = "Not Started"
- Priority = "Must" (for `rule:`/`never:`/`always:`) or "Should" (for `remember:`)
- Source = current platform ("Cowork", "Chat", "Code")
- Name = the rule text
- Content body = full context — why Brady said it, what conversation it came from, the calibration distilled

The morning sweep picks this up, appends it to the Rules & Preferences page (`344ed43b-89c5-813d-bded-f1d5689510e2`), and propagates to CLAUDE.md and Claudine Onboarding as needed.

**B. Working Style Learnings table — LEGACY/REINFORCEMENT**

Update the Claude Onboarding Context page (ID: `2f7ed43b89c58134bdfdc4114b866941`).

Insert a new row in the Working Style Learnings table:

| Date | Learning | Source |
|------|----------|--------|
| [today] | [concise learning] | [session context] |

Use `notion-update-page` with `update_content` targeting the last table row.

### 4. Acknowledge

Brief confirmation: "Logged. Future sessions will know."

## Why Both Destinations

- **Streaming Notes** is the canonical processing pipeline. Morning sweep reads it, routes it, propagates the rule to all surfaces (CLAUDE.md, Onboarding, etc.). This is how rules become permanent.
- **Working Style Learnings table** is the legacy summary view Brady references when reading the Onboarding Brief. Keeping it in sync gives Brady a single readable history.

If you only had to pick one, pick Streaming Notes — it feeds the table downstream via the morning sweep. The double-write here is a transitional pattern; eventually the morning sweep will fully maintain the table from the pipeline.

### Pipeline Integration
In addition to writing to the Onboarding Brief, ALSO create a Streaming Notes entry with:
- Type = "System Instruction"
- Status = "Not Started"
- Priority = "Must"
- Name = the feedback/learning text
- Content = full context

This ensures the learning enters the canonical processing pipeline: Streaming Notes → morning sweep → Rules & Preferences page → CLAUDE.md/Onboarding propagation. The Onboarding Brief becomes a downstream consumer of Rules & Preferences, not a separate store.

## Learnings Format

Keep learnings:
- **Concise** - One sentence, imperative or declarative
- **Actionable** - Claudine can apply it immediately
- **Specific** - Not vague ("be better") but concrete ("don't ask permission for every step")

Good: "Default to action - 'do as much as you can' is the standing order"
Bad: "Be more proactive sometimes"

## Session End Check

Before ending any substantial session, ask yourself:
- Did Brady give any feedback on how I worked?
- Did I already log it to BOTH destinations?
- If not, propose logging it now.

## Reference

- **Streaming Notes DB:** `2e9ed43b-89c5-80f4-8c21-000b4cfe812e` (canonical pipeline)
- **Onboarding Brief:** `2f7ed43b89c58134bdfdc4114b866941`
- **Section in Onboarding Brief:** Working Style Learnings (table at bottom of page)
- **Rules & Preferences:** `344ed43b-89c5-813d-bded-f1d5689510e2`
- **Related section in Onboarding Brief:** Reflexive Behaviors (Non-Negotiable)
