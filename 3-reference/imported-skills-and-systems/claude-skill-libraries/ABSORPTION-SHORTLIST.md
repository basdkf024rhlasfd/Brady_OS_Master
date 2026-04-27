# Absorption Shortlist — Claude Skill Libraries

**Date:** 2026-04-27
**Reviewer:** Claudine (autonomous research run)
**Question:** Of the ~50 skills across these four packages, which are worth absorbing into core Brady OS?

Verdict legend:
- 🟢 **ABSORB** — wrap as a new core skill or fold into an existing one. High fit, low overlap with what Brady has.
- 🟡 **MINE PATTERN** — don't import wholesale, but lift the technique into an existing skill. Adds capability to something Brady already runs.
- ⚪ **SKIP** — overlaps with existing skills (Brady's are usually better-tuned), or out of scope.

---

## 🟢 ABSORB (3)

### 1. `anthropics-skills/skills/mcp-builder/` — wrap as core skill

- **Why:** Brady has 20+ MCP integrations consumed but no SOP for *building* a new MCP server. When he wants to expose a private system (e.g., Streaming Notes DB, Routing Log, Companies DB) as an MCP for any LLM client to consume, this is the gap.
- **Proposed home:** New skill `3-reference/skills/mcp-builder/SKILL.md` that references the imported package as the source-of-truth playbook. Trigger: "build an MCP for X", "expose Y as an MCP server".
- **Pairs with:** `agent-scheduler` (creates new agents), `webster` (handles deployment of the resulting server).
- **Effort:** 30 min wrapper skill.

### 2. `anthropics-skills/skills/webapp-testing/` — fold into Webster

- **Why:** Brady's `feedback_webster_uat_rules.md` says Webster has 3 non-negotiable UAT checks (images, chatbots, permissions) before any mception publish. Currently those run as ad-hoc human clicks. webapp-testing is a Playwright-with-server-lifecycle helper that turns each into a deterministic script.
- **Proposed home:** Augment `0-agents/custom-built-agents/webster-SKILL.md` with a UAT-test-runner runbook that uses `with_server.py` + Playwright per the imported pattern. Could also stand up a separate `3-reference/skills/mception-uat/SKILL.md`.
- **Effort:** 1 hour to write the wrapper + first three Playwright UAT scripts.

### 3. `anthropics-skills/skills/skill-creator/` (eval portion only) — augment agent-scheduler

- **Why:** Brady's `agent-scheduler` skill creates new scheduled agents (Phil/Finn pattern) but has no eval/benchmark step. skill-creator's contribution is the **iteration loop**: write skill → generate test prompts → run them → quantitative + qualitative review → rewrite. That's the missing piece in agent-scheduler.
- **Proposed home:** Add a "Phase 5: Eval" section to `3-reference/skills/agent-scheduler/SKILL.md` that adopts skill-creator's eval pattern. Don't import the whole skill; lift the eval-viewer concept and the test-prompt template.
- **Effort:** 30 min addendum to agent-scheduler.

---

## 🟡 MINE PATTERN (3)

### 4. `anthropics-skills/skills/pptx/` + `anthropics-skills/skills/docx/` — borrow native generation

- **Why:** Brady's `presentation-engine` outputs PPTX via Marp. Marp's PPTX is image-of-slide, not editable. Anthropic's pptx skill uses python-pptx to generate **native, editable** PPTX. Same story for docx — `marketing-templates` could output editable Word docs for Word-loving clients (Justin Woods, Russell Turner).
- **Proposed action:** Add an "editable export" mode to `presentation-engine` and `marketing-templates` that calls python-pptx / python-docx instead of Playwright PDF. Keep current modes default.
- **Effort:** 2-3 hours when next deck request arrives.

### 5. `composio-awesome-claude-skills/competitive-ads-extractor/` — fold into prospect-research-kit

- **Why:** Pulls competitor ads from FB/LinkedIn ad libraries to surface their messaging. Useful as an enrichment step for `prospect-research-kit` and `exec-intel-brief` — "what is this competitor publicly *saying* about themselves" is a higher-signal channel than press releases.
- **Proposed action:** Add a "competitive-ads sweep" step to `prospect-research-kit` that runs only when the target has a measurable ad spend (B2C, mid-market+). Skip for B2B prospects.
- **Effort:** 1 hour skill addendum.

### 6. `composio-awesome-claude-skills/meeting-insights-analyzer/` — augment evening-sweep + claudine-scorecard

- **Why:** Analyzes meeting transcripts for behavioral patterns — conflict avoidance, filler words, who dominated. Brady has Otter integration but no analysis layer over his own performance. Could be a leading indicator for the Claudine Scorecard ("Brady listening ratio" type metric) and a feed for evening-sweep self-reflection.
- **Proposed action:** Optional opt-in module in evening-sweep. Don't make it default — Brady should choose when he wants the mirror held up.
- **Effort:** 1 hour, deferred until Brady asks for it.

---

## ⚪ SKIP (the rest)

| Skill | Why Skip |
|-------|----------|
| `algorithmic-art`, `canvas-design`, `slack-gif-creator`, `theme-factory` | Out of scope; mception-design-system covers Brady's visual needs. |
| `brand-guidelines`, `frontend-design` | mception-design-system already does this with Brady-specific tokens. |
| `claude-api` | Brady has it loaded as a CLI skill already. |
| `pdf` | Brady's Playwright pipeline is more flexible than the imported one. |
| `internal-comms` | Overlaps with commissioner-brief / weekly-os-recap; Brady's are voice-tuned. |
| `web-artifacts-builder`, `composio-skills`, `connect*`, `langsmith-fetch`, `template-skill`, `skill-share` | Plumbing for Composio/LangSmith ecosystems Brady doesn't use. |
| `lead-research-assistant` | prospect-research-kit + exec-intel-brief are already Brady's better-tuned versions. |
| `changelog-generator` | weekly-os-recap is more sophisticated and Brady-voiced. |
| `tailored-resume-generator`, `domain-name-brainstormer`, `raffle-winner-picker`, `twitter-algorithm-optimizer`, `video-downloader`, `image-enhancer`, `file-organizer`, `invoice-organizer`, `developer-growth-analysis`, `content-research-writer`, `artifacts-builder` | Single-purpose utilities outside Brady's daily flow. Revisit only if a specific need surfaces. |
| `awesome-claude-code` (entire repo) | Curated list, not a skill package. Treat as periodic browsing reference. |
| `travisvn-awesome-claude-skills` (entire repo) | README-only; deleted in next quarterly re-import unless it grows. |

---

## Recommended Order of Operations for Brady

If picking only one this week: **#1 (mcp-builder)** — unlocks every "I want to expose X via MCP" request.

If picking two: add **#2 (webapp-testing → Webster)** — hardens the mception publish flow that Brady already uses constantly.

#3-6 should wait until a specific trigger (next deck request → #4, next prospect → #5, next time Brady asks "how am I showing up in meetings" → #6).

---

## Handoff Items

The following should land in Streaming Notes DB as `Type=To Do` with owner=Claudine (or owner=Brady where review is required):

1. **[Claudine]** Build `3-reference/skills/mcp-builder/SKILL.md` wrapper that references the imported anthropic skill. Trigger phrasing + integration with agent-scheduler.
2. **[Claudine]** Add UAT-runner subsection to `webster-SKILL.md` referencing `webapp-testing/`. Write three first Playwright scripts: image presence, chatbot wiring, Clerk allowlist.
3. **[Claudine]** Add Phase 5 (Eval) to `agent-scheduler/SKILL.md` lifting the test-prompt + review pattern from `skill-creator`.
4. **[Brady]** Approve the absorption verdicts above (or override). Reply: `approve absorbs 1,2,3` or `defer 2`.
