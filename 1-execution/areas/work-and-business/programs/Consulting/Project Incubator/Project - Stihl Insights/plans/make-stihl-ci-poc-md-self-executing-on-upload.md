# Plan: Make stihl-ci-poc.md Self-Executing on Upload

## Context
When Brady adds `stihl-ci-poc.md` to a ChatGPT Project, ChatGPT treats it as a document to assess/review instead of following the embedded instructions. The root cause: the current instruction block uses blockquote format (`>`), which both ChatGPT and Claude interpret as "quoted content to discuss" rather than directives to follow. Additionally, there's no auto-execute behavior — the file waits passively for Rob to know what to do.

**Goal:** When Rob opens a new conversation in the project, the AI immediately runs an abbreviated daily brief and gives him breadcrumbs to explore further. No assessment, no summary of the document.

## File to Edit
`/Users/bs/conductor/workspaces/agency-agents/charlotte/.context/stihl-ci-poc.md`

## Changes

### 1. Replace lines 1-12 (instruction header)
Remove blockquote-formatted instructions. Replace with:

- **H1 title** (keep existing)
- **H2 subtitle** (keep existing)
- `---` delimiter
- **`## SYSTEM INSTRUCTIONS`** heading with plain imperative text (no blockquotes)
  - Identity statement: "You are Rob Jenson's competitive intelligence analyst..."
  - **Rule 1 — Auto-brief:** On the FIRST user message in every conversation, regardless of content, lead with an abbreviated intelligence snapshot, then respond to whatever they asked. If they said nothing specific, point them to `menu`.
  - **Rule 2 — Command execution:** Execute commands immediately, no clarifying questions
  - **Rule 3 — Menu display:** Show COMMAND MENU on "menu"/"help"/"options"
  - **Rule 4 — Full artifacts:** Complete deliverables, never outlines
  - **Rule 5 — Default to action:** Pick most useful interpretation, note assumptions
- **Welcome Brief template** — a 3-4 line output format the AI should use:
  - Stock pulse (2-3 peers, one line each)
  - Top competitive/macro signal (one sentence)
  - One action item for Rob's team
  - Breadcrumbs: "Type **daily brief** for the full version. Type **menu** for all commands."
- **"For Rob" note** — moved below instructions, between `---` delimiters, clearly human-facing
- `---` delimiter before COMMAND MENU

### 2. Remove "Ready to See This in Action?" sales pitch (lines 70-77)
This section ("Two things I need from you... Give me 30 minutes on a call") breaks the analyst persona. Rob is now USING the system, not being pitched. Remove it. The bottom CTA in the YOUR FRACTIONAL INTELLIGENCE TEAM section already handles this.

### 3. Add version log entry (line 1168)
Add: `| 2026-03-16 | v1.1 -- Restructured instruction header for reliable execution in ChatGPT/Claude Projects; added auto-brief on first message | Brady |`

## Why This Fixes It
- **Heading + imperative text > blockquotes.** Both ChatGPT and Claude treat `## SYSTEM INSTRUCTIONS` with second-person imperatives ("You are...", "You must...") as behavioral directives, not content to review.
- **Unconditional auto-brief** removes ambiguity — the model can't decide "maybe I should assess this first."
- **Clear delimiter** (`---` + transitional heading) separates "how to behave" from "what you know."

## Risks
- **Claude Projects lack web search** — the welcome brief will use knowledge base data rather than live prices. Acceptable; the format still demonstrates capability.
- **ChatGPT may still occasionally summarize** on very first use if the project has other instructions competing. Mitigation: the `SYSTEM INSTRUCTIONS` heading and unconditional rule are the strongest signals available.

## Verification
1. Read the edited file end-to-end for clean markdown rendering
2. Copy to Desktop: `cp .context/stihl-ci-poc.md ~/Desktop/stihl-ci-poc.md`
3. Upload to a fresh ChatGPT Project → send any message → confirm it auto-briefs
4. Upload to a Claude Project → send any message → confirm it auto-briefs
5. Type "menu" → confirm COMMAND MENU displays
6. Type "daily brief" → confirm full brief executes without clarifying questions
