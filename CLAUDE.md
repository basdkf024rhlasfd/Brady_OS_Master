# Brady OS Repository

## Structure (4 Layers + Portal)
- `0-agents/` — Agent profiles in `custom-built-agents/`. Agent operational files (SKILL.md, STATUS-TEMPLATE.md) live alongside profiles, not in skills/.
- `1-execution/` — Areas > Programs > Projects > Tasks. Consulting projects live under work-and-business.
- `2-memory/` — Unstructured intake (lives in Notion, not repo).
- `3-reference/` — Rules, governance, skills, publishing. Standalone reusable skills go in `3-reference/skills/<name>/`.
- `portal/` — mception.ai Next.js app (Clerk auth, project portal). Deployed to Vercel project **`mception-ai`** (the "munich" project is legacy — do not use). Config: `portal/src/config/projects.yml`. Webster agent owns all deploy + env-var operations here.

## Key Files
- `3-reference/os-doctrine.md` — Authority horizons, Trust Loop
- `3-reference/app-playbook.md` — Client app setup pattern
- `3-reference/project-kickoff.md` — Project initialization workflow
- `3-reference/governance/` — Agent enforcement rules, contracts, council charter, information flow standards. Index: `governance-index.md`
- `REBUILD-BRADY-OS.md` — Comprehensive rebuild guide (client-facing)
- `TRANSPARENCY.md` — System map: external services, autonomous behaviors, secrets, sensitive data policy
- `3-reference/infrastructure-registry.yml` — Canonical source for Notion DB IDs, Google Drive folder IDs, secrets inventory

## mception.ai Publishing

- `mception.ai` is a curated client-facing layer, not a mirror of Brady OS.
- All projects are private by default unless they are already live on `mception.ai`.
- A project may be newly published on `mception.ai` only if:
  1. it is a consulting project,
  2. its project file includes a completed `Publishing` section,
  3. its slug is added to `portal/src/config/projects.yml` after approval.
- Agents may update an already-live `mception.ai` slug without treating it as a new publication request only if:
  1. the same slug already exists publicly in production,
  2. the work updates that same slug rather than creating a new slug or public surface,
  3. the change does not broaden visibility beyond what is already live.
- Folder placement alone does not make a project public.
- Brady OS operating docs, agent libraries, and internal reference material are never public by default.
- If an already-live slug is missing from the allowlist, treat that as documentation drift to reconcile, not a reason to block maintenance of that same live slug.
- When an agent is asked to "publish to mception.ai" or "make this available on mception.ai", it must check the allowlist in `portal/src/config/projects.yml` and treat absence from that allowlist as `private` for any new publication or visibility expansion.
- If the allowlist cannot be read or validated, agents must fail closed for any new publication or visibility expansion. Existing production maintenance may proceed only when the slug is independently verified as already live and the work does not broaden visibility.

## Skills Registry
- **Routing Log SOP (shared):** `3-reference/skills/_shared/routing-log.md` — Canonical write pattern for the Routing Log DB (`344ed43b-89c5-816a-ab54-ca49ca239748`). Every sweep/skill that routes, dispositions, or publishes appends a row with the 5-field schema (date, original_title, destination, reason, summary). Referenced by morning/evening/weekly sweeps, daily-whitepaper, and exec-intel-brief.
- **Air Traffic Control:** `3-reference/skills/air-traffic-control/SKILL.md` — Route tasks across repos, generate handoff prompts, coordinate cross-repo changes. Registry: `3-reference/skills/air-traffic-control/repo-registry.yml`
- **DiCaprio:** `0-agents/custom-built-agents/dicaprio-SKILL.md` — 20K-foot recon across all projects and workspaces. Template: `0-agents/custom-built-agents/dicaprio-STATUS-TEMPLATE.md`
- **Project Creator:** `3-reference/skills/project-creator/SKILL.md` — Turn a conversation into an execution-ready project brief. Template: `3-reference/skills/project-creator/BRIEF-TEMPLATE.md`
- **V0 to Portal:** `3-reference/skills/v0-to-portal/SKILL.md` — Deploy V0 apps into mception.ai portal via ProjectFrame
- **Page Chatbot:** `3-reference/skills/page-chatbot/SKILL.md` — Enable AI chat on any mception.ai portal page. Config-only: YAML chat config + system prompt markdown. Supports KB injection, keyword routing, streaming via AI SDK v6. Templates in `templates/`.
- **Client Project Cleanup:** `3-reference/skills/client-project-cleanup/SKILL.md` — Weekly audit of consulting project pages in Notion for SOP compliance, staleness, and privacy leaks
- **Config Sync:** `3-reference/skills/config-sync/SKILL.md` — Detects drift between Conductor workspace and Claude Code CLI checkout. Compares skills, agents, CLAUDE.md files. Reports which side is newer, offers one-command sync.
- **mception Design System:** `3-reference/skills/mception-design-system/SKILL.md` — Canonical design language for all visual docs, infographics, briefings. Dark-mode-first, CEO-scannable. Supersedes infographic-template.
- **Infographic Template:** `3-reference/skills/infographic-template/SKILL.md` — (Deprecated, see mception-design-system)
- **Morning Sweep:** `3-reference/skills/morning-sweep/SKILL.md` — Brady's canonical morning sweep across Gmail, iMessage, Notion, Calendar, Otter, and family logistics
- **Evening Sweep:** `3-reference/skills/evening-sweep/SKILL.md` — End-of-day archival and journaling workflow that captures the full day into a durable local record
- **Weekly Sweep:** `3-reference/skills/weekly-sweep/SKILL.md` — Sunday planning sweep for weekly priorities, calendar coverage, projects, finances, and family logistics
- **Daily Whitepaper:** `3-reference/skills/daily-whitepaper/SKILL.md` — Daily news-and-Substack synthesis that produces a polished two-page PDF intelligence brief
- **Pipeline Dashboard:** `3-reference/skills/pipeline-dashboard/SKILL.md` — Live snapshot of Streaming Notes DB pipeline (In/Processing/Out). Runs at end of each sweep.
- **Streaming Notes Disposition Audit:** `3-reference/skills/streaming-notes-disposition-audit/SKILL.md` — Weekly "never forget" audit. Surfaces stale items (>14 days), items missing next actions (>3 days), and blocked items for Brady's review and batch disposition. Final step of weekly-sweep. Trigger: "streaming notes audit", "disposition audit", "never forget audit".
- **Commissioner Brief:** `3-reference/skills/commissioner-brief/SKILL.md` — Weekly narrative synthesis from Routing Log + Streaming Notes + git history. Produces a single markdown brief (Headline / Wins / Signal / Blocked / 3 Bets) saved to `1-execution/areas/brady-os/commissioner-briefs/YYYY-MM-DD.md`. Final step of weekly-sweep or on demand. Trigger: "commissioner brief", "weekly commissioner brief".
- **Life Events Review:** `3-reference/skills/life-events-review/SKILL.md` — Weekly 90-day look-ahead of major life events (travel, college apps, financial meetings, family milestones) with countdown, owner, prep status, and blockers. Runs as Phase 2.2c of weekly-sweep and on-demand ("life events review"). Reads dedicated Life Events Notion DB + Google Calendar; syncs to `portal/public/family/kb/15-life-events.md`; writes prep tasks to Streaming Notes.
- **Deep Research:** `3-reference/skills/deep-research/SKILL.md` — Autonomous planner-executor-publisher research engine. Three depth levels (quick/standard/deep), five research types. Works standalone or as building block for other skills. Template: `3-reference/skills/deep-research/references/research-brief-template.md`
- **Exec Intel Brief:** `3-reference/skills/exec-intel-brief/SKILL.md` — Daily competitive intelligence PDF for consulting clients. Email-native delivery with scannable brief + LLM-ready markdown dossier. Client configs in `references/clients/`. Template: `references/client_template.md`
- **Financial Assistant (Finn):** `3-reference/skills/financial-assistant/SKILL.md` — Unified personal + business financial cockpit. Agent: `0-agents/custom-built-agents/finn.md`. Parses Monarch CSV exports, enriches with Gmail/Calendar/Notion consulting pipeline. Feeds morning-sweep and weekly-sweep financial sections. Publishes HTML dashboard to mception.ai.
- **Financial Anomaly Review (Finn):** `3-reference/skills/financial-anomaly-review/SKILL.md` — T0 cross-source anomaly detection across Monarch, Gmail, Walmart/Amazon orders, USPS Informed Delivery. 9 detectors (large txns, unusual merchants, cash-adjacent transfers, subscriptions, return irregularities, duplicates, velocity shifts, ship-to mismatches, unexpected mail). Neutral/factual output only. Private-only, never surfaced to family channels.
- **Full-Stack Ideation:** `3-reference/skills/full-stack-ideation/SKILL.md` — 100-method brainstorming toolkit for structured ideation across any problem domain. Method selection guide + scoring + output format.
- **Client Engagement Kit:** `3-reference/skills/client-engagement-kit/SKILL.md` — Orchestrates the full Day 1 consulting package. Sequences exec-intel-brief, full-stack-ideation, midjourney-prompt, and mception-design-system into a 7-step pipeline from research to polished deliverables.
- **Daily Operating Rhythm:** `3-reference/skills/daily-operating-rhythm/SKILL.md` — Brady's full daily cycle: morning-sweep → daily-whitepaper → exec-intel-brief (per client) → pipeline-dashboard → evening-sweep. Weekly-sweep on Sundays.
- **Content Publishing Kit:** `3-reference/skills/content-publishing-kit/SKILL.md` — Topic to publishable draft. Sequences full-stack-ideation (angles) → content-drafter agent (voice-matched writing) → mception-design-system (visuals). LinkedIn, Substack, white papers.
- **Prospect Research Kit:** `3-reference/skills/prospect-research-kit/SKILL.md` — Fast research on a person/company. Fact base + talk track + Notion records. No deliverables sent — Brady's internal prep. Upgrades to client-engagement-kit when ready.
- **Project Standup Kit:** `3-reference/skills/project-standup-kit/SKILL.md` — Consolidated status across all projects/repos/clients. Sequences DiCaprio (recon) → pipeline-dashboard → client-project-cleanup → air-traffic-control.
- **Doctrine Sync:** `3-reference/skills/doctrine-sync/SKILL.md` — Detects drift between OS doctrine/governance and agent profiles. Drift report + paste-ready updates. Runs standalone or as weekly sweep step.
- **Innovation Workshop:** `3-reference/skills/innovation-workshop/SKILL.md` — Full-stack product innovation engine. 20 ideas per run with Canva visuals, research-backed pitches, RTBs, executive summary, whitepaper appendix. Recursive learning engine tracks method performance across runs. Output: HTML + PDF. Orchestrates full-stack-ideation + midjourney-prompt style guidance + mception-design-system.
- **mception Action Scanner:** `3-reference/skills/mception-action-scanner/SKILL.md` — Scans all mception.ai chat config YAMLs for data sources needing action. Groups by status (not-started > partial > recommended) and actor. Runs standalone, in sweeps, or proactively at session start to surface Brady's action items.
- **Midjourney Prompt:** `3-reference/skills/midjourney-prompt/SKILL.md` — Generates one optimal Midjourney prompt per product idea. Handles packaging, industrial, tech, beverage, and lifestyle products with correct text rendering and matchable filenames.
- **Midjourney Generate:** `3-reference/skills/midjourney-generate/SKILL.md` — Runs one or many Midjourney prompts via Claude in Chrome. Submits all prompts first (exploits server-side queue), then polls + downloads each result to ~/Downloads. Batch-mode callable from innovation-workshop, content-publishing-kit, etc.
- **Project Agent:** `3-reference/skills/project-agent/SKILL.md` — Reusable template for a consulting project intelligence agent (Cycle-horizon coach). Knows everything about the project, sizes problems, routes frameworks, generates SFDRs, maintains a living Notion wiki. Canonical instance: OC Optimus (Panda). Trigger: "spin up a project agent for {client}", "instantiate project agent".
- **OC Optimus:** `0-agents/custom-built-agents/oc-optimus.md` + `oc-optimus-SKILL.md` — Panda Restaurant Group project intelligence agent. All-knowing on 14 DR threads, synthesis, people, KPIs. Notion wiki live at `34aed43b-89c5-81a1-8593-dc4bef3c121d`. Three modes: Synthesis / Problem Frame / Data Hunt.
- **Fran:** `0-agents/custom-built-agents/fran.md` + `fran-SKILL.md` — 1915 South (Ashley HomeStore franchisee) project intelligence agent. Fran = Furniture. All-knowing on Justin Woods / Russell Turner / Todd Wanek corpus, scenario matrix, talk track, Innovation Workshop in flight. Project folder: `1-execution/areas/work-and-business/programs/Consulting/Project - 1915 South/`. Notion Agent Wiki at `34aed43b-89c5-8133-9f37-cae04045d8c7` (under Research Wiki). Three modes: Synthesis / Problem Frame / Data Hunt. Trigger: "fran", "1915 south agent".
- **Deck Generator:** `3-reference/skills/deck-generator/SKILL.md` — Branded slide decks via Marp CLI with mception design tokens. Markdown in, HTML + PDF + PPTX out. Custom theme: `references/mception-marp-theme.css`
- **Marketing Templates:** `3-reference/skills/marketing-templates/SKILL.md` — Template-driven marketing assets (sell sheets, client one-pagers, capability overviews). Placeholder substitution + Playwright PDF. Templates in `references/`.
- **Claudine Onboarding:** `3-reference/skills/claudine-onboarding/SKILL.md` — Brady's AI strategic partner identity + operating system. Mandatory-load skill at session start. Loads Rules & Preferences page (`344ed43b-89c5-813d-bded-f1d5689510e2`), applies behavioral defaults, owns Jarvis Score + footer protocol.
- **Recursive Learning:** `3-reference/skills/recursive-learning/SKILL.md` — Captures working-style feedback to BOTH Streaming Notes pipeline (Type=System Instruction, picked up by morning sweep) AND Working Style Learnings table in Onboarding Brief.
- **Telly:** `0-agents/custom-built-agents/telly.md` — Telegram-to-Notion dispatch bot. Inbound: classic intake + feedback capture (`rule:/never:/always:/remember:` → Streaming Notes as System Instruction, promoted by morning sweep). Outbound: `POST /api/push` used by sweeps for completion notifications. SKILL: `0-agents/custom-built-agents/telly-SKILL.md`
- **Wyatt Earp:** `0-agents/custom-built-agents/wyatt-earp.md` — Ad hoc dissent agent. Pressure-tests pitches and strategic recommendations for being too timid. Activated under Dissent Protocol.
- **Webster:** `0-agents/custom-built-agents/webster.md` — Web publishing concierge. Owns mception.ai slug publishing, Vercel env vars, deploy diagnostics, Clerk allowlists, and API/token plumbing. SKILL: `0-agents/custom-built-agents/webster-SKILL.md` — 5 copy-paste runbooks covering publish-new-slug, edit-allowlist, diagnose-failed-deploy, wire-new-api, and spin-up-standalone-Vercel-app. Trigger on "publish to mception", "deploy [X]", "add access for [email]", "fix the build", "wire up [API]", or any web/deploy ops request.
- **OS Context Pack:** `3-reference/skills/os-context-pack/SKILL.md` — Generates a portable context pack for Claude Chat Projects. Trigger: "brady os context". Outputs custom instructions + knowledge file.
- **Agent Debate:** `3-reference/skills/agent-debate/SKILL.md` — Stages structured debates between Brady OS agents on strategic questions. War room transcript format. Trigger: "stage a debate", "agent debate", "war room".
- **Cascading Accountability:** `3-reference/skills/cascading-accountability/SKILL.md` — AI-native management system for CEO daily briefings. Surfaces performance signals, risk flags, and pre-drafted communications. Templates + OKR tracker + whitepaper.
- **Weekly OS Recap:** `3-reference/skills/weekly-os-recap/SKILL.md` — Weekly visual changelog of Brady OS. Scans 7-day git history, classifies into plain-language categories, renders mception-styled HTML + PDF. Auto-delivered Friday 7 AM CT via email + text. GAS mailer: `3-reference/scripts/gas/scripts/os-recap-mailer/`
- **mception Local Dev:** `3-reference/skills/mception-local-dev/SKILL.md` — Spin up mception.ai portal locally for rapid UI iteration. Auth bypass, known .env.local template, all Clerk/Vercel traps documented. Trigger: "spin up mception locally", "local dev server".
- **mception Navigator:** `3-reference/skills/mception-navigator/SKILL.md` — Browser-native portal navigator for Claude in Chrome. Orients to current page, scans Calendar/Gmail/Notion, presents prioritized action menu with guided navigation. Trigger: "what should I do next", "navigate mception", "portal check", "next actions".
- **Suno Songwriter:** `3-reference/skills/suno-songwriter/SKILL.md` — One-liner prompt to finished Suno song via Chrome automation. Generates lyrics in Brady's voice, submits to suno.com, waits for generation, downloads MP3. Trigger: "write me a song", "suno song", "song about".
- **All-Aware Agent:** `3-reference/skills/all-aware-agent/PROJECT-INSTRUCTIONS.md` — Full project instructions for a Claude.ai Project agent with complete OS orientation: all data sources, MCP tools, sweep outputs, trust tiers, authority horizons, and hands-off vision. Paste into Claude.ai Project Instructions field.

## Feedback Capture (Rules & Preferences)

Brady may give behavioral feedback mid-conversation using any of these triggers:
- **rule: [x]** — hard constraint. Write immediately to Streaming Notes as Type="System Instruction", no confirmation.
- **never: [x]** — prohibition. Same as rule.
- **always: [x]** — permanent default. Same as rule.
- **remember: [x]** — softer preference. Write to Streaming Notes as Type="System Instruction" with a note that it's a preference not a rule.
- **log: [x]** — catch-all. Ask Brady: "Rule or note?" then write accordingly.
- No prefix but sounds like a behavioral correction — ask: "Want me to log that as a rule or just for this session?"

When writing a System Instruction to Streaming Notes, set:
- Type = "System Instruction"
- Status = "Not Started"
- Priority = "Must"
- Source = (whatever platform: "Cowork", "Chat", "Code")
- Name = the rule text
- Content body = full context of why Brady said it, what conversation it came from

Morning sweep picks up unprocessed System Instructions, appends them to the Rules & Preferences page (`344ed43b-89c5-813d-bded-f1d5689510e2`) in Reference Layer, and propagates to all surfaces.

## Imported Skills & Systems
External frameworks and skill packs stored as standalone packages in `3-reference/imported-skills-and-systems/`. These are NOT core OS skills — they can be summoned as-is or selectively promoted. See `3-reference/imported-skills-and-systems/README.md` for governance.

- **Marketing Skills (Plugin):** `3-reference/imported-skills-and-systems/marketingskills/` — 36 marketing SOPs (CRO, SEO, copywriting, cold email, paid ads, pricing, etc.) from coreyhaines31/marketingskills. Skills: `skills/`. Tools: `tools/REGISTRY.md`.
- **Pitch Deck Framework:** `3-reference/imported-skills-and-systems/pitch-deck-framework/SKILL.md` — 12-section structured pitch deck framework (Purpose & Vision → Team). Source: VC Corner Newsletter (Ruben). Pairs with deck-generator for rendering.
- **Infographic Builder:** `3-reference/imported-skills-and-systems/infographic-builder/SKILL.md` — Charlie Hills' 9-step infographic system. 1080x1920 social format, QA gate (80/100), Playwright PNG export. Pairs with mception-design-system for brand tokens.

## Scripts
- **GAS Toolkit:** `3-reference/scripts/gas/CLAUDE.md` — Google Apps Script automations (email-classifier, os-recap-mailer). Build/deploy: `3-reference/scripts/gas/build.sh`

## Notion Architecture
<!-- Canonical source for all IDs: 3-reference/infrastructure-registry.yml -->
- **Client Projects DB** (workspace root, shareable): ID `c8a6b2d70d9343839a16c950c95a6066`
- **Internal Projects DB** (OS > Execution, private): ID `2c2ed43b-89c5-80af-ac9b-ededd48b98e7`
- **Consulting Practice wiki**: https://www.notion.so/333ed43b89c58123b019d1d108c53c11

For current projects and active client work, check Notion — not static instructions.
