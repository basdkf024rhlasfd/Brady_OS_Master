# Brady OS Repository

## Structure (4 Layers)
- `0-agents/` — Agent profiles in `custom-built-agents/`. Agent operational files (SKILL.md, STATUS-TEMPLATE.md) live alongside profiles, not in skills/.
- `1-execution/` — Areas > Programs > Projects > Tasks. Consulting projects live under work-and-business.
- `2-memory/` — Unstructured intake (lives in Notion, not repo).
- `3-reference/` — Rules, governance, skills, publishing. Standalone reusable skills go in `3-reference/skills/<name>/`.

## Key Files
- `3-reference/os-doctrine.md` — Authority horizons, Trust Loop
- `3-reference/app-playbook.md` — Client app setup pattern
- `3-reference/project-kickoff.md` — Project initialization workflow
- `3-reference/governance/` — Agent enforcement rules, contracts, council charter, information flow standards. Index: `governance-index.md`
- `REBUILD-BRADY-OS.md` — Comprehensive rebuild guide (client-facing)

## mception.ai Publishing

- `mception.ai` is a curated client-facing layer, not a mirror of Brady OS.
- All projects are private by default unless they are already live on `mception.ai`.
- A project may be newly published on `mception.ai` only if:
  1. it is a consulting project,
  2. its project file includes a completed `Publishing` section,
  3. its slug is added to `3-reference/publishing/mception-ai-projects.yml` after approval.
- Agents may update an already-live `mception.ai` slug without treating it as a new publication request only if:
  1. the same slug already exists publicly in production,
  2. the work updates that same slug rather than creating a new slug or public surface,
  3. the change does not broaden visibility beyond what is already live.
- Folder placement alone does not make a project public.
- Brady OS operating docs, agent libraries, and internal reference material are never public by default.
- If an already-live slug is missing from the allowlist, treat that as documentation drift to reconcile, not a reason to block maintenance of that same live slug.
- When an agent is asked to "publish to mception.ai" or "make this available on mception.ai", it must check the allowlist in `3-reference/publishing/mception-ai-projects.yml` and treat absence from that allowlist as `private` for any new publication or visibility expansion.
- If the allowlist cannot be read or validated, agents must fail closed for any new publication or visibility expansion. Existing production maintenance may proceed only when the slug is independently verified as already live and the work does not broaden visibility.

## Skills Registry
- **Air Traffic Control:** `3-reference/skills/air-traffic-control/SKILL.md` — Route tasks across repos, generate handoff prompts, coordinate cross-repo changes. Registry: `3-reference/skills/air-traffic-control/repo-registry.yml`
- **DiCaprio:** `0-agents/custom-built-agents/dicaprio-SKILL.md` — 20K-foot recon across all projects and workspaces. Template: `0-agents/custom-built-agents/dicaprio-STATUS-TEMPLATE.md`
- **Project Creator:** `3-reference/skills/project-creator/SKILL.md` — Turn a conversation into an execution-ready project brief. Template: `3-reference/skills/project-creator/BRIEF-TEMPLATE.md`
- **V0 to Portal:** `3-reference/skills/v0-to-portal/SKILL.md` — Deploy V0 apps into mception.ai portal via ProjectFrame
- **Client Project Cleanup:** `3-reference/skills/client-project-cleanup/SKILL.md` — Weekly audit of consulting project pages in Notion for SOP compliance, staleness, and privacy leaks
- **Config Sync:** `3-reference/skills/config-sync/SKILL.md` — Detects drift between Conductor workspace and Claude Code CLI checkout. Compares skills, agents, CLAUDE.md files. Reports which side is newer, offers one-command sync.
- **mception Design System:** `3-reference/skills/mception-design-system/SKILL.md` — Canonical design language for all visual docs, infographics, briefings. Dark-mode-first, CEO-scannable. Supersedes infographic-template.
- **Infographic Template:** `3-reference/skills/infographic-template/SKILL.md` — (Deprecated, see mception-design-system)
- **Morning Sweep:** `3-reference/skills/morning-sweep/SKILL.md` — Brady's canonical morning sweep across Gmail, iMessage, Notion, Calendar, Otter, and family logistics
- **Evening Sweep:** `3-reference/skills/evening-sweep/SKILL.md` — End-of-day archival and journaling workflow that captures the full day into a durable local record
- **Weekly Sweep:** `3-reference/skills/weekly-sweep/SKILL.md` — Sunday planning sweep for weekly priorities, calendar coverage, projects, finances, and family logistics
- **Daily Whitepaper:** `3-reference/skills/daily-whitepaper/SKILL.md` — Daily news-and-Substack synthesis that produces a polished two-page PDF intelligence brief
- **Pipeline Dashboard:** `3-reference/skills/pipeline-dashboard/SKILL.md` — Live snapshot of Streaming Notes DB pipeline (In/Processing/Out). Runs at end of each sweep.
- **Deep Research:** `3-reference/skills/deep-research/SKILL.md` — Autonomous planner-executor-publisher research engine. Three depth levels (quick/standard/deep), five research types. Works standalone or as building block for other skills. Template: `3-reference/skills/deep-research/references/research-brief-template.md`
- **Exec Intel Brief:** `3-reference/skills/exec-intel-brief/SKILL.md` — Daily competitive intelligence PDF for consulting clients. Email-native delivery with scannable brief + LLM-ready markdown dossier. Client configs in `references/clients/`. Template: `references/client_template.md`
- **Full-Stack Ideation:** `3-reference/skills/full-stack-ideation/SKILL.md` — 100-method brainstorming toolkit for structured ideation across any problem domain. Method selection guide + scoring + output format.
- **Client Engagement Kit:** `3-reference/skills/client-engagement-kit/SKILL.md` — Orchestrates the full Day 1 consulting package. Sequences exec-intel-brief, full-stack-ideation, midjourney-prompt, and mception-design-system into a 7-step pipeline from research to polished deliverables.
- **Daily Operating Rhythm:** `3-reference/skills/daily-operating-rhythm/SKILL.md` — Brady's full daily cycle: morning-sweep → daily-whitepaper → exec-intel-brief (per client) → pipeline-dashboard → evening-sweep. Weekly-sweep on Sundays.
- **Content Publishing Kit:** `3-reference/skills/content-publishing-kit/SKILL.md` — Topic to publishable draft. Sequences full-stack-ideation (angles) → content-drafter agent (voice-matched writing) → mception-design-system (visuals). LinkedIn, Substack, white papers.
- **Prospect Research Kit:** `3-reference/skills/prospect-research-kit/SKILL.md` — Fast research on a person/company. Fact base + talk track + Notion records. No deliverables sent — Brady's internal prep. Upgrades to client-engagement-kit when ready.
- **Project Standup Kit:** `3-reference/skills/project-standup-kit/SKILL.md` — Consolidated status across all projects/repos/clients. Sequences DiCaprio (recon) → pipeline-dashboard → client-project-cleanup → air-traffic-control.
- **Doctrine Sync:** `3-reference/skills/doctrine-sync/SKILL.md` — Detects drift between OS doctrine/governance and agent profiles. Drift report + paste-ready updates. Runs standalone or as weekly sweep step.
- **Midjourney Prompt:** `3-reference/skills/midjourney-prompt/SKILL.md` — Generates one optimal Midjourney prompt per product idea. Handles packaging, industrial, tech, beverage, and lifestyle products with correct text rendering and matchable filenames.
- **Deck Generator:** `3-reference/skills/deck-generator/SKILL.md` — Branded slide decks via Marp CLI with mception design tokens. Markdown in, HTML + PDF + PPTX out. Custom theme: `references/mception-marp-theme.css`
- **Marketing Templates:** `3-reference/skills/marketing-templates/SKILL.md` — Template-driven marketing assets (sell sheets, client one-pagers, capability overviews). Placeholder substitution + Playwright PDF. Templates in `references/`.
- **Telly:** `0-agents/custom-built-agents/telly.md` — Telegram-to-Notion dispatch bot. SKILL: `0-agents/custom-built-agents/telly-SKILL.md`
- **OS Context Pack:** `3-reference/skills/os-context-pack/SKILL.md` — Generates a portable context pack for Claude Chat Projects. Trigger: "brady os context". Outputs custom instructions + knowledge file.
- **Agent Debate:** `3-reference/skills/agent-debate/SKILL.md` — Stages structured debates between Brady OS agents on strategic questions. War room transcript format. Trigger: "stage a debate", "agent debate", "war room".
- **Cascading Accountability:** `3-reference/skills/cascading-accountability/SKILL.md` — AI-native management system for CEO daily briefings. Surfaces performance signals, risk flags, and pre-drafted communications. Templates + OKR tracker + whitepaper.

## Scripts
- **GAS Toolkit:** `3-reference/scripts/gas/CLAUDE.md` — Google Apps Script automations (email-classifier). Build/deploy: `3-reference/scripts/gas/build.sh`

## Notion Architecture
- **Client Projects DB** (workspace root, shareable): ID `c8a6b2d70d9343839a16c950c95a6066`
- **Internal Projects DB** (OS > Execution, private): ID `2c2ed43b-89c5-80af-ac9b-ededd48b98e7`
- **Consulting Practice wiki**: https://www.notion.so/333ed43b89c58123b019d1d108c53c11

For current projects and active client work, check Notion — not static instructions.
