---
name: mception-fast-path
created: 2026-07-16
description: >
  One-line control of mception.ai publishing and access — no elaborate instructions
  required, because the guardrails live here instead of in Brady's prompt. Brady says
  "publish X for email Y" or "grant Y on X" and the executing agent (Musashi deploy
  mode, or any Claudine-tier session) runs the full safe workflow: allowlist check,
  scoped grant, mandatory UAT, one-line receipt, audit trail.

  TRIGGER: "publish <slug> for <email>", "grant <email> on <slug>", "revoke <email>
  on <slug>", "who sees <slug>", "access audit", "family page <name>", or any
  short-form mception access/publishing command.

  BOUNDARY: this skill is the grammar + guardrails. The mechanics (Vercel env vars,
  Clerk, deploy, UAT) are executed via the runbooks in
  `0-agents/custom-built-agents/webster-SKILL.md` (Musashi deploy mode). This skill
  never bypasses those runbooks — it makes them invokable in one line.
---

# mception Fast Path — one-line control, guardrails included

**The contract:** Brady never has to restate the safety rules. Saying less must never
mean getting less safety. Every command below expands to the full checked workflow;
if any check can't be satisfied, the command **fails closed and says why** instead of
partially executing.

---

## The command grammar

| Brady says | What runs |
|---|---|
| `publish <slug> for <email,email>` | Full new-slug publish (webster Runbook 1): viewer/route/`projects.yml`/sidebar → per-slug allowlist env var with exactly those emails → deploy → **mandatory UAT** (Runbook 5) → receipt. |
| `family page <name>: <one-line purpose>` | Same as publish, with family defaults: Family sidebar group, `magic_link: false`, allowlist = the family set (below) unless emails are named. |
| `grant <email> on <slug[,slug]>` | Add email to exactly those slugs' allowlists (Runbook 2). Nothing else. |
| `revoke <email> on <slug>` / `revoke <email> everywhere` | Remove from named slug(s), or sweep every `MCEPTION_*_EMAILS` var for the email. |
| `who sees <slug>` | Access report for one slug (env var + Clerk metadata grants). |
| `access audit` | Full matrix: every slug → every allowlisted email, plus ADMIN / ALL-PROJECTS / PREVIEW lists. |
| `update <slug>` | Maintenance on an already-live slug. Allowed without re-approval **only if** the slug is already in `projects.yml` and the change does not broaden visibility. |

**Named page-sets** (so grants stay least-privilege without listing slugs):

| Set | Slugs | Notes |
|---|---|---|
| `family-shared` | `family-budget`, `grocery-assistant`, `school-hub` | Safe for Karissa / family users. |
| *(everything else)* | — | No other set exists on purpose. "All projects" is never a set — see Guardrail 3. |

---

## The guardrails (why one line is still safe)

1. **Nothing on mception.ai is public internet.** Every slug sits behind Clerk sign-in
   plus a per-slug email allowlist (`MCEPTION_<SLUG>_EMAILS`, hyphens → underscores).
   "Publish" means *visible inside the portal to the named emails* — never anonymous web.
2. **Private by default, fail closed.** New slugs ship with an allowlist containing only
   the emails Brady named (owner always has access implicitly). Unreadable allowlist or
   ambiguous slug = stop and report, never guess. (This restates the CLAUDE.md
   publishing rules; they always win on conflict.)
3. **Least privilege, always.** A grant touches exactly the named slugs. Never use
   `MCEPTION_ALL_PROJECTS_EMAILS`, `MCEPTION_ADMIN_EMAILS`, or Clerk `role` metadata
   unless Brady literally says "all projects" or "admin" — and even then, confirm back
   before executing.
4. **Protected surfaces need an explicit confirm.** Grants to `financial-assistant`,
   `bucket-system`, any `1915-south*` slug, or `/admin` get one confirm-back
   ("that's a Brady-only surface — confirm?") before running. Everything else runs
   without questions.
5. **Mandatory UAT after every publish** (webster Runbook 5): curl the slug (expect the
   Clerk 307), then verify as an allowlisted user. A publish without UAT is not done.
6. **One-line receipt, every time.** The command isn't complete until the agent echoes
   exactly what changed and confirms nothing else did:
   `RECEIPT: family-budget live · allowlist = karissa.smallwood@gmail.com · UAT pass · nothing else changed.`
7. **Audit trail.** Every fast-path execution appends a Routing Log row
   (`3-reference/skills/_shared/routing-log.md`) and uses the commit convention
   `mception: <command as Brady said it>` so `access audit` + git history reconstruct
   every grant ever made.

---

## Execution map (what the agent actually does)

- **Publish mechanics** → `webster-SKILL.md` Runbook 1 (slug, viewer, `page.tsx` with
  `requireProjectAccess("<slug>")`, `projects.yml`, `sidebar-groups.ts`, env var, deploy).
- **Grant/revoke mechanics** → Runbook 2 (`vercel env rm/add MCEPTION_<SLUG>_EMAILS`
  for production+preview+development, then redeploy). Alternative that needs no
  redeploy: Clerk `publicMetadata.allowedProjects` via the `/admin/access` UI.
- **Audit mechanics** → Runbook 5's access-report loop over `vercel env ls`.
- **Who executes:** Musashi San (deploy authority) for anything touching Vercel/Clerk;
  any Claudine-tier session may do the repo-side steps and hand off the env-var step
  to Musashi with the exact commands prepared.

---

## Worked example (the inaugural run, 2026-07-16)

Brady: *"Publish the family budget page and add karissa.smallwood@gmail.com as a user
only on those pages."*

Expansion:
1. Repo side: `portal/public/family-budget/viewer/index.html` (The Daily Five —
   5-minute budget cockpit powered by `budget-guidance`), route
   `src/app/(portal)/family-budget/page.tsx`, `projects.yml` entry (Family group,
   `magic_link: false`), `sidebar-groups.ts`.
2. Access (Musashi, after merge — production + preview + development):
   ```bash
   for env in production preview development; do
     printf "%s" "karissa.smallwood@gmail.com" | vercel env add MCEPTION_FAMILY_BUDGET_EMAILS $env
     printf "%s" "karissa.smallwood@gmail.com" | vercel env add MCEPTION_GROCERY_ASSISTANT_EMAILS $env
     printf "%s" "karissa.smallwood@gmail.com" | vercel env add MCEPTION_SCHOOL_HUB_EMAILS $env
   done
   # if a var already exists: vercel env rm <VAR> $env --yes first, then add with the merged csv
   ```
   Scope = the `family-shared` set only. **Not** `financial-assistant`, **not**
   `bucket-system` (Guardrail 4), no admin/all-projects flags (Guardrail 3).
   Karissa signs in at mception.ai with Google using this email — no Clerk-side setup needed.
3. Redeploy, UAT as Karissa's tier (sidebar should show exactly Family Budget,
   Grocery Assistant, School Hub), receipt, Routing Log row.
