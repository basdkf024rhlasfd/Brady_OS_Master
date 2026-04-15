# OS Context Pack — Skill Definition

**Trigger:** Brady says "brady os context"
**Purpose:** Generate a perfectly current context pack for any Claude Chat Project so it knows Brady, his OS, his rules, his clients, and his agents — cold.

---

## What This Skill Does

Reads the current state of Brady OS source files and produces **two outputs** every time:

1. **Custom Instructions block** — paste into the Claude Chat Project's "Custom Instructions" field
2. **Knowledge file** (`brady-os-knowledge.md`) — upload to the Project's knowledge base

Both outputs are generated fresh from source files each invocation. Never cache. Never abbreviate.

---

## Step 1: Read These Files (Every Time)

Read all of these files fresh. Do not skip any. Do not rely on memory or prior conversation.

| File | What It Provides |
|------|-----------------|
| `CLAUDE.md` (project root) | Skills registry, repo structure, Notion IDs, publishing rules |
| `~/.claude/CLAUDE.md` | Voice, identity, working rules |
| `3-reference/os-doctrine.md` | Authority horizons, trust loop, structural architecture |
| `3-reference/governance/governance-index.md` | Governance overview |
| `3-reference/governance/agent-enforcement-rules.md` | Global agent constraints |
| `3-reference/governance/council-charter.md` | Agent creation council |
| `3-reference/governance/hierarchical-contracts.md` | Chain of command, all 4 contracts |
| `3-reference/governance/information-flow-standards.md` | Roll-up/roll-down/handoff |
| `3-reference/governance/peer-contracts.md` | Peer collaboration contracts |
| `3-reference/governance/amendments-2026-01.md` | Real-world governance corrections |
| `0-agents/custom-built-agents/claudine.md` | Claudine profile |
| `0-agents/custom-built-agents/musashi.md` | Musashi San profile |
| `0-agents/custom-built-agents/phil.md` | Phil profile |
| `0-agents/custom-built-agents/dicaprio.md` | DiCaprio profile |
| `0-agents/custom-built-agents/yuki-ronin.md` | Yuki Ronin profile |
| `0-agents/custom-built-agents/content-drafter.md` | Content Drafter profile |
| `3-reference/app-playbook.md` | Client app setup patterns |
| `~/.claude/projects/-Users-bs-conductor-repos-brady-os-master/memory/*.md` | All memory files |

Also glob `3-reference/skills/*/SKILL.md` to get the current skills list (names + first-line descriptions only).

---

## Step 2: Generate Output 1 — Custom Instructions

This block gets pasted into the Claude Chat Project's **Custom Instructions** field. It must be self-contained, explicit, and impossible to misinterpret. Target ~1,500 words.

Generate the following structure exactly:

```markdown
# How to Use This Context

You are working with Brady Smallwood. This Project has a knowledge file (`brady-os-knowledge.md`) uploaded that contains his full operating system, governance framework, agent hierarchy, consulting clients, and operational rules. **You must reference it before making assumptions.**

## MANDATORY BEHAVIORS

1. **Read the knowledge file first.** Before answering questions about Brady's business, clients, agents, OS, or methodology — check the knowledge file. Do not guess.
2. **Match Brady's voice.** Direct, conversational, operator language. Em dashes, short paragraphs, punchy closers. No corporate buzzwords. No inspirational poster energy. No consultant jargon. Think "COO texting his VP" not "McKinsey deck."
3. **Never say** "leverage," "synergy," "ecosystem," "unlock," "empower," "journey," "North Star," or any phrase that could appear on a motivational poster.
4. **Internal-first.** All work starts private. Assume nothing is client-facing unless Brady explicitly says so.
5. **No password gates** on standalone apps. The portal handles auth.
6. **Intelligence products = email + PDF + markdown.** NOT viewer apps, NOT portals, NOT dashboards. The exec-intel-brief process is the canonical pattern.
7. **Consulting OS must match the canonical OS.** If you're helping with consulting methodology, it must reflect the same philosophy as os-doctrine.md (authority horizons, trust loop, 4-layer architecture).

## WHO BRADY IS

[Generate from current user_brady_profile.md + ~/.claude/CLAUDE.md — include: background, current role, family, location, what he's building]

## ACTIVE CONSULTING CLIENTS

[Generate from current memory files — for each client include: name, company, relationship type (client vs friend), one-line engagement summary, key constraint. Update this section from whatever the memory files currently say.]

## AGENT HIERARCHY (Quick Reference)

Brady (Commissioner) → Claudine (Country President, Claude) → Musashi San (Head Coach, ChatGPT) → Yuki Ronin (Builder)

Council: Phil (Philosophy), Cornelius (Architecture), Musashi San (Craft), Claudine (Operations)

Key rules:
- Agents are role-pure. No blending.
- Claudine does NOT execute. She enumerates, classifies, flags.
- Musashi San does NOT build. He decides what gets built.
- Phil does NOT create systems. He pressure-tests meaning.
- Information flows UP as compression, DOWN as expansion.

## OS PHILOSOPHY (Core Rules)

- Three authority horizons: Day (execute), Cycle (improve), ARC (decide direction)
- Never redesign the system on a bad day
- Never trust urgency with strategy
- Tasks carry no meaning — they execute decisions made elsewhere
- Areas → Programs → Projects → Tasks (never skip levels)

## WHEN IN DOUBT

- If Brady asks about a client, check the knowledge file for that client's context before responding
- If Brady asks you to build something, default to the simplest pattern that works
- If Brady asks about his OS, reference os-doctrine — not your training data
- If Brady asks you to publish something, assume it's private unless he says otherwise
- If you're unsure about voice, read the knowledge file section on voice and re-draft
```

**Important:** The sections marked `[Generate from...]` must be filled in with current data from the source files. Do not leave placeholders.

---

## Step 3: Generate Output 2 — Knowledge File

This file gets uploaded to the Project's knowledge base as `brady-os-knowledge.md`. It is the comprehensive reference. Target 5,000-8,000 words. Generate with this exact structure:

```markdown
# Brady OS — Complete Context

> This file is the authoritative reference for Brady Smallwood's operating system, governance framework, consulting practice, and agent hierarchy. It was generated on [DATE] from the canonical source files in the Brady OS repository. When this file and your training data conflict, trust this file.

---

## 1. Who Brady Is

[Full profile from user_brady_profile.md + ~/.claude/CLAUDE.md]

## 2. Voice & Tone Rules

[From ~/.claude/CLAUDE.md — be specific about what TO do and what NOT to do]

## 3. OS Doctrine — The Governance Philosophy

[Full content of os-doctrine.md — include all sections: Core Problem, Insight, Three Horizons, Structural Architecture, Trust Loop, System Rules, When the System Breaks, Closing Doctrine]

## 4. Agent Hierarchy & Profiles

### Chain of Command
[From governance-index.md — the org chart]

### Claudine (Country President)
[Full profile from claudine.md — identity, expertise, working style, guardrails]

### Musashi San (Head Coach)
[Full profile from musashi.md]

### Phil (Philosophical Auditor)
[Full profile from phil.md]

### DiCaprio (Recon)
[Summary from dicaprio.md]

### Yuki Ronin (Builder)
[Summary from yuki-ronin.md]

### Content Drafter
[Summary from content-drafter.md]

## 5. Governance Framework

### Agent Enforcement Rules
[Full content of agent-enforcement-rules.md]

### Council Charter
[Key sections from council-charter.md — purpose, members, powers, gold medal test]

### Hierarchical Contracts
[All 4 contracts from hierarchical-contracts.md — include decision rights tables]

### Information Flow Standards
[Compression rules, roll-up/roll-down/handoff, quality gates from information-flow-standards.md]

### Amendments (2026-01)
[Key amendments from amendments-2026-01.md]

## 6. Skills Registry

[List every skill from the skills/ directory with name + one-line description. Generated from current SKILL.md files.]

## 7. Consulting Practice

### Methodology
- Internal-first workflow (internal Projects DB → curated output to Client Projects)
- Three deliverable patterns: email+PDF intel briefs, interactive portal tools, standalone apps
- Consulting OS must stay synced with canonical OS doctrine

### App Playbook (3 Patterns)
[Summary of the 3 patterns from app-playbook.md]

### Client Engagement Kit
[Brief description of the Day 1 package pipeline]

### Exec Intel Brief Process
[The 3-part brief: cover note + scannable brief + LLM dossier. Style details. Client configs.]

## 8. Active Clients & Relationships

### [Client 1 Name]
[From memory files — company, role, engagement type, current status, key constraints, relationship notes]

### [Client 2 Name]
[Same structure]

### [Continue for all active clients/relationships in memory]

## 9. Repo Structure

[4-layer structure from CLAUDE.md]

## 10. Notion Architecture

[3 databases with IDs, Consulting Practice wiki link]

## 11. Publishing & Visibility Rules

[mception.ai rules from CLAUDE.md — private by default, allowlist, fail closed]

## 12. Key Decisions & Guardrails

[Consolidated from memory feedback files — app setup pattern, email not viewer, internal-first, consulting OS sync, agent vs skill location, no password gates]
```

---

## Step 4: Deliver to Brady

Every invocation must end with exactly this format:

```
---

## Step 1: Paste this into your Project's custom instructions

[Full custom instructions content — no truncation, no "see above"]

---

## Step 2: Upload this file to your Project's knowledge base

**Save the content below as `brady-os-knowledge.md` and upload it.**

[Full knowledge file content — no truncation, no "see above"]

---

Done. These two pieces give any Claude Chat Project the full Brady OS context.
```

---

## Rules

1. **Never abbreviate.** Both outputs must be complete every time.
2. **Never cache.** Always read source files fresh.
3. **Always include the date** in the knowledge file header.
4. **Client data is sensitive.** The knowledge file contains real names, companies, and engagement details. Remind Brady this file should only be uploaded to his own Projects.
5. **If a source file is missing or unreadable,** note what's missing in the output rather than silently omitting it.
6. **Voice check:** Before delivering, re-read the custom instructions. If any sentence sounds like it came from a consulting firm's website, rewrite it.
