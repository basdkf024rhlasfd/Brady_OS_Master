# Skills and Extensions

This document covers the parts of the system that sit between agents and doctrine: reusable workflows, external imports, and patterns that emerge once the base system is running.

## What Is a Skill

A skill is a reusable standard operating procedure. It lives in its own folder with a `SKILL.md` file as the entry point. Any agent can execute a skill.

Skills are not agents. They have no identity, no personality, no guardrails about tone. They are repeatable playbooks: a morning sweep, a weekly review, a client engagement sequence, an intake processing pipeline.

If it has a personality, it is an agent. If it is a repeatable procedure, it is a skill.

## Skills vs. Agents

| | Agent | Skill |
|---|---|---|
| Has identity and personality | Yes | No |
| Has guardrails and working style | Yes | No |
| Can be executed by other roles | No | Yes |
| Entry point | agent profile | SKILL.md |
| Lives in | `0-agents/` | `3-reference/skills/` |
| Example | "philosopher who pressure-tests decisions" | "weekly review that checks all projects" |

## Skill Composition

Skills can orchestrate other skills. A daily operating rhythm skill might sequence:

1. morning sweep
2. client briefings
3. content generation
4. evening archive

This is how small SOPs compose into larger workflows without becoming monolithic. Each sub-skill stays independently useful. The orchestrating skill just defines the sequence and handoffs.

Start simple. One skill that does one thing well. Compose later when you have multiple skills that naturally chain together.

## Recursive Learning

Some skills benefit from tracking their own performance over time.

A learning log is a simple file — YAML, markdown, or whatever fits your tools — appended after each run. It records:

- what methods or approaches were used
- what worked and what did not
- what gaps remain
- what to try differently next time

Future runs can reference the log to auto-suggest improvements. This turns a static SOP into a system that gets smarter over time.

You do not need this on day one. Add it when a skill has run enough times that you notice patterns worth capturing.

## Imported Skills

External SOP packs, frameworks, and playbooks can be imported into the system as standalone packages.

Governance rules:

- Store imports in their own folder (e.g. `3-reference/imported-skills/`) with the original structure intact
- Note provenance: where it came from, when it was imported, what version
- Core skills can reference imports, but imports do not modify core skills
- To promote an import into a core skill, decide which parts to absorb and which skill owns them
- Curate useful subsets for specific agents — do not dump an entire library on every agent

This keeps the core system clean while letting you absorb useful external material without rewriting it.

## Consulting-as-Product

When a skill becomes reliable and repeatable enough, it can be packaged as a deployable service for clients.

The skill definition becomes the product specification. You run it for the client, or ship the skill files to the client's own AI tools. Examples:

- a daily intelligence briefing skill becomes a paid daily deliverable
- a management accountability skill becomes a deployable CEO dashboard
- an ideation workshop skill becomes a repeatable innovation engagement

This is how a personal OS becomes a consulting product without building separate software. The skill is the product.

## Agent Debate / War Room

When a strategic decision needs pressure-testing, you can stage a structured debate between your agents.

The pattern:

1. Frame the question
2. Assign roles: protagonist, devil's advocate, moderator, and panel
3. Run rounds of argument and rebuttal
4. Produce a sharpened recommendation with the strongest objections addressed

This is a skill, not an agent. Any set of agents can participate. The debate skill defines the format and rules; the agents bring their perspectives.

Use it before high-stakes external communications, major scope decisions, or when you suspect groupthink.
