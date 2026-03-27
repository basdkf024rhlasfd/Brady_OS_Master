# DiCaprio Status Report

**Date:** {{YYYY-MM-DD}}
**Scan time:** {{HH:MM}} local
**Active projects:** {{count}}
**Sources scanned:** {{GitHub / Local / Notion / Conductor — list which were available}}

---

## Alerts

### Stale (no activity >3 days)

| Project | Last Activity | Days Idle | Where to Look |
|---------|--------------|-----------|---------------|
| {{name}} | {{date — commit/edit}} | {{N}} | {{repo / path}} |

### Deadline Approaching (<48 hours)

| Project | Deadline | What | Owner |
|---------|----------|------|-------|
| {{name}} | {{date/time}} | {{milestone or deliverable}} | {{agent or person}} |

### Drift & Sync Issues

| Issue | Details | Fix Route |
|-------|---------|-----------|
| {{description}} | {{specifics}} | {{repo / file — suggested action}} |

### Orphaned Branches / Workspaces

| Branch or Workspace | Repo | Last Commit | Notes |
|--------------------|------|-------------|-------|
| {{name}} | {{repo}} | {{date}} | {{context if known}} |

---

## Project Status

### {{Project Name}}

| Field | Value |
|-------|-------|
| **Repos** | {{repo list from registry}} |
| **Status** | {{Active / Stale / Blocked / Complete}} |
| **Last Activity** | {{most recent commit or change, with date}} |
| **Active Branches** | {{branch names}} |
| **Blockers** | {{None / description}} |
| **Next Milestone** | {{description + date, or "None identified"}} |
| **Drift** | {{None / description of sync issue}} |
| **Open PRs** | {{count and titles, or "None"}} |

_Repeat this block for each project._

---

## Routing Suggestions

Instructions or fixes that need to land somewhere specific:

- {{Issue description}} → `{{repo}}` / `{{file or directory}}` — {{suggested action}}

---

## Summary for Claudine

### Observations
- {{Factual findings from the scan — what is, not what should be}}

### Risks
- {{Things that could go wrong if left unaddressed — stale projects, drift, blocked work}}

### Decision Points
- {{Choices Brady needs to make — prioritization, status changes, resource allocation}}
