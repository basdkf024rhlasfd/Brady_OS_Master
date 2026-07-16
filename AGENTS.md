# Repo Instructions

> **Note:** Core repo rules have moved to `CLAUDE.md` (auto-loaded by Claude Code). This file is kept as a human-readable reference.

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
- When an agent is asked to "publish to mception.ai" or "make this available on mception.ai", it must check the allowlist in `portal/src/config/projects.yml` (formerly `3-reference/publishing/mception-ai-projects.yml`, now a pointer file) and treat absence from that allowlist as `private` for any new publication or visibility expansion.
- If the allowlist cannot be read or validated, agents must fail closed for any new publication or visibility expansion. Existing production maintenance may proceed only when the slug is independently verified as already live and the work does not broaden visibility.

## Skills

- **Air Traffic Control:** `3-reference/skills/air-traffic-control/SKILL.md` — Route tasks across repos, generate handoff prompts, coordinate cross-repo changes, check version control status. Registry: `3-reference/skills/air-traffic-control/repo-registry.yml`
- **DiCaprio:** `0-agents/custom-built-agents/dicaprio-SKILL.md` — 20K-foot recon across all projects and workspaces. Scans GitHub, local files, Notion, and Conductor. Flags stale work, drift, blockers, and deadlines. Reports to Claudine. Template: `0-agents/custom-built-agents/dicaprio-STATUS-TEMPLATE.md`
- **Project Creator:** `3-reference/skills/project-creator/SKILL.md` — Turn a conversation into an execution-ready project brief. Extracts context, asks Brady 3–5 questions, applies OS defaults, generates a step-by-step brief for Conductor/Claude Code. Template: `3-reference/skills/project-creator/BRIEF-TEMPLATE.md`
