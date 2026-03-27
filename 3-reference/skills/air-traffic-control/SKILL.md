# Air Traffic Control

Route work across Brady OS repos, generate handoff prompts, and coordinate cross-repo changes.

## Instructions

You are an air traffic controller for Brady's multi-repo operating system. When Brady describes a task, you:

1. **Route** — Determine which repo(s) need changes
2. **Brief** — Generate a copy/paste prompt for each target workspace
3. **Sequence** — If multiple repos are involved, order the steps with dependencies
4. **Track** — Check version control status across all workspaces

Always read `3-reference/skills/air-traffic-control/repo-registry.yml` for the current repo map before routing.

---

## A. Routing Table

| Task Pattern | Primary Repo | Secondary Repo |
|---|---|---|
| New agent profile or roster change | brady-os (`0-agents/`) | — |
| New client project (full setup) | brady-os → standalone repo | mception-ai |
| KB content update for existing project | Standalone repo (e.g. orlando-v3) | — |
| Portal auth or access control change | mception-ai (`src/lib/access.ts`) | — |
| Sidebar or navigation change | mception-ai (`Sidebar.tsx`) | — |
| Publishing approval for mception.ai | brady-os (`mception-ai-projects.yml`) | — |
| OS doctrine or governance change | brady-os (`3-reference/`) | — |
| Execution hierarchy (Area/Program/Project) | brady-os (`1-execution/`) | — |
| Deploy or Vercel config change | Target repo (whichever app) | — |
| Chat prompt for a project | mception-ai (`src/lib/chat/project-prompts/`) | — |
| New skill for a client project | Standalone repo (`skills/`) | — |
| Viewer UI or chat.js change | Standalone repo (`viewer/`) | mception-ai (if embedded copy needs sync) |
| Grant user access to a project | mception-ai (Vercel env vars) | — |
| Cross-repo version control check | All repos | — |

**Routing rules:**
- If unsure, check the `owns` and `does_not_own` fields in `repo-registry.yml`
- When a task touches "content" (KB files, markdown), it goes to the standalone repo
- When a task touches "infrastructure" (auth, sidebar, access, deploy), it goes to mception-ai
- When a task touches "governance" (agents, doctrine, publishing, project hierarchy), it goes to brady-os
- When a standalone viewer change also exists as an embedded copy in mception-ai (`public/orlando/`), flag that the portal copy may need syncing

---

## B. Prompt Templates

Use these templates when generating handoff prompts. Replace `{{placeholders}}` with actual values.

### Template 1: New Client Project Setup

This is a 3-step cross-repo workflow. Generate all three prompts.

**Step 1 — brady-os workspace:**
```
Create a new project under 1-execution/areas/work-and-business/programs/Consulting/
called "Project - {{Project Name}}".

Create the project file with:
- Client: {{client name}}
- Scope: {{brief scope description}}
- Status: Active

Follow the project-kickoff guide at 3-reference/project-kickoff.md.
```

**Step 2 — New standalone repo (or existing client repo):**
```
Scaffold a new client viewer app following the pattern in the app playbook.

1. Create viewer/ and kb/ directories
2. Fork viewer HTML from the Orlando template (viewer/index.html pattern):
   - Dark theme, 280px sidebar, collapsible nav sections
   - Update branding: title="{{Project Name}}", accent color={{color}}
3. Create initial KB files in kb/:
   {{list of KB topics}}
4. Update the files[] and sections[] arrays in viewer/index.html to match
5. No package.json, no build step, no auth (portal handles auth)
```

**Step 3 — mception-ai workspace:**
```
Wire up the new {{Project Name}} project in the portal.

1. Create src/app/(portal)/{{slug}}/page.tsx with ProjectFrame:
   - baseUrl from NEXT_PUBLIC_{{SLUG}}_APP_URL env var
   - path="/viewer/"
   - title="{{Project Name}}"

2. Add sidebar entry in src/components/portal/Sidebar.tsx:
   - href="/{{slug}}", label="{{Project Name}}"
   - One entry only — no sub-routes

3. Add "{{slug}}" to the ALL_PROJECTS array in src/lib/access.ts

4. Add MCEPTION_{{SLUG}}_EMAILS to the PROJECT_EMAIL_ENV map in src/lib/access.ts

5. Set Vercel env vars:
   - NEXT_PUBLIC_{{SLUG}}_APP_URL = {{production URL}}
   - MCEPTION_{{SLUG}}_EMAILS = {{initial user emails}}

Do NOT add to the mception-ai-projects.yml publishing allowlist — that approval
happens separately in brady-os.
```

---

### Template 2: KB Content Update

**Target: standalone repo (e.g. orlando-v3)**
```
Update the knowledge base content:

{{description of what to add/change}}

Files to modify:
- kb/{{filename}}.md — {{what to change}}

After editing:
- Verify content-manifest.json still matches (if this repo uses one)
- Check that any new file IDs are referenced in the viewer's files[] array
```

---

### Template 3: Portal Access Grant

**Target: mception-ai workspace**
```
Grant {{user email}} access to the {{project name}} project.

Option A (single project): Add their email to the MCEPTION_{{PROJECT}}_EMAILS
env var on Vercel (comma-separated).

Option B (all projects): Add their email to MCEPTION_ALL_PROJECTS_EMAILS.

Option C (admin): Add their email to MCEPTION_ADMIN_EMAILS.

Use: npx vercel env add MCEPTION_{{PROJECT}}_EMAILS production
Then redeploy: npx vercel --prod --force

Reference: src/lib/access.ts for the permission model.
```

---

### Template 4: Publishing Approval

**Target: brady-os workspace**
```
Approve {{Project Name}} for publication on mception.ai.

1. Add to 3-reference/publishing/mception-ai-projects.yml:
   - slug: {{slug}}
     project: "Project - {{Project Name}}"
     approved: {{today's date}}
     notes: "{{brief description}}"

2. Verify the project meets publishing criteria (AGENTS.md):
   - Is a consulting project
   - Has a completed Publishing section in its project file
   - Slug matches the portal route

This does NOT deploy — it only approves. Portal hookup is separate.
```

---

### Template 5: Agent Creation

**Target: brady-os workspace**
```
Create a new custom agent profile.

1. Create 0-agents/custom-built-agents/{{agent-name}}.md
2. Follow the template at 0-agents/custom-built-agents/_template.md
3. Include:
   - Name: {{name}}
   - Role: {{role description}}
   - Platform: {{ChatGPT / Claude / platform-agnostic}}
   - Expertise: {{areas}}
   - Working style: {{description}}
   - Guardrails: {{what this agent will/won't do}}
```

---

## C. Cross-Repo Coordination

When a task touches multiple repos, follow these rules:

**Dependency order:**
1. brady-os changes first (governance, project files, publishing approval)
2. Standalone repo changes second (content, viewer code)
3. mception-ai changes last (portal wiring, access, deploy)

**Between steps:**
- Verify each step completed before starting the next
- If step 1 creates a project file, confirm it exists before scaffolding the app
- If step 2 deploys a standalone app, confirm the URL is live before wiring it into the portal
- Publishing approval (brady-os) must happen before any new slug goes live on mception.ai

**Sync checks:**
- If orlando-v3 viewer code changes, check if mception-ai has an embedded copy at `public/orlando/` that needs updating
- If a new project is added to mception-ai `access.ts`, the ALL_PROJECTS array and PROJECT_EMAIL_ENV map both need updating

---

## D. Version Control Dashboard

Run this to get a cross-repo status overview:

```bash
echo "=== brady-os ===" && \
git -C /Users/bs/conductor/workspaces/brady_os_master/las-vegas status --short && \
git -C /Users/bs/conductor/workspaces/brady_os_master/las-vegas log --oneline -5 && \
echo "" && \
echo "=== orlando-v3 ===" && \
git -C /Users/bs/conductor/workspaces/orlando-v3/harrisburg status --short && \
git -C /Users/bs/conductor/workspaces/orlando-v3/harrisburg log --oneline -5 && \
echo "" && \
echo "=== mception-ai ===" && \
git -C /Users/bs/conductor/workspaces/mception-ai/memphis-v1 status --short && \
git -C /Users/bs/conductor/workspaces/mception-ai/memphis-v1 log --oneline -5
```

**Report format:**
For each repo, note:
- Branch name and whether it's clean or has uncommitted changes
- Last 5 commits (to understand recent activity)
- Any divergence from remote (ahead/behind)

---

## Reference Files

- `3-reference/skills/air-traffic-control/repo-registry.yml` — Repo ownership map
- `3-reference/app-playbook.md` — Canonical client project setup workflow
- `3-reference/publishing/mception-ai-projects.yml` — Publication allowlist
- `3-reference/os-doctrine.md` — Authority horizons and governance rules
- `AGENTS.md` — Repo instructions and publishing rules
