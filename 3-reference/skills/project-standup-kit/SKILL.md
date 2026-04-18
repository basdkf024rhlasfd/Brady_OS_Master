---
name: project-standup-kit
description: |
  Full status check across all active projects, repos, and client work. Sequences
  DiCaprio (recon), pipeline-dashboard, client-project-cleanup, and air-traffic-control
  into one consolidated status picture.

  TRIGGER THIS SKILL whenever Brady says: "where are we on everything," "status check,"
  "project standup," "what's the state of things," "full status," "run the standup,"
  "what needs attention," or any variation requesting a consolidated view of all
  active work.

  This skill ORCHESTRATES sub-skills and agents. It does not duplicate their instructions.
trust_tier: T0
---

# Project Standup Kit

Consolidated status picture across all active projects, repos, and client work.
Designed for mid-week pulse checks or pre-weekly-sweep reconnaissance.

## Sub-Skills & Agents Used

| Component | Path | Role |
|-----------|------|------|
| **DiCaprio** (agent) | `0-agents/custom-built-agents/dicaprio-SKILL.md` | 20K-foot recon across all repos and projects |
| **Pipeline Dashboard** | `3-reference/skills/pipeline-dashboard/SKILL.md` | Streaming Notes pipeline (In/Processing/Out) |
| **Client Project Cleanup** | `3-reference/skills/client-project-cleanup/SKILL.md` | Audit for staleness, compliance, privacy leaks |
| **Air Traffic Control** | `3-reference/skills/air-traffic-control/SKILL.md` | Cross-repo coordination and routing |

## Pipeline

### Step 1: DiCaprio Recon (10-15 min)
**Owner:** DiCaprio agent

1. Read repo registry at `air-traffic-control/repo-registry.yml`
2. For each repo: git status, recent commits, active branches, divergence from remote, open PRs
3. Read project tree under `1-execution/` — check each project's status vs actual repo activity
4. Check Notion: Client Projects DB, Internal Projects DB, Streaming Notes for recent activity
5. Produce consolidated radar report using DiCaprio STATUS-TEMPLATE

**Flags:**
- Projects marked "Active" with no commits in 7+ days
- Branches with uncommitted changes
- Repos ahead/behind remote
- Notion pages not updated in expected cadence

### Step 2: Pipeline Dashboard (5 min)
**Owner:** pipeline-dashboard

1. Query Streaming Notes DB
2. Produce snapshot: what's In (new/unprocessed), Processing (being worked), Out (completed/archived)
3. Flag anything stuck in Processing for >48 hours

### Step 3: Client Project Cleanup (10 min)
**Owner:** client-project-cleanup

1. Audit all consulting project pages in Notion
2. Check for: SOP compliance, staleness (no update in expected cadence), privacy leaks (internal info on client-facing pages), missing fields
3. Produce cleanup report with specific remediation items

### Step 4: Cross-Repo Coordination Check (5 min)
**Owner:** air-traffic-control

1. Identify any tasks that span multiple repos
2. Check for sync issues (e.g., standalone repo changed but portal copy stale)
3. Flag any pending handoffs or blocked cross-repo work

### Step 5: Consolidated Report

Combine all four outputs into one structured status:

```
## Project Standup — [Date]

### 🔴 Needs Attention
[Items flagged by any of the four scans that need Brady's decision or action]

### 🟡 In Progress — On Track
[Active work that's moving as expected]

### 🟢 Recently Completed
[Items that moved to Done since last standup]

### 📊 Pipeline Snapshot
[In: X | Processing: Y | Out: Z]

### 🔄 Cross-Repo Status
[Any sync issues or pending handoffs]

### 🧹 Cleanup Items
[Staleness, compliance, or privacy issues from client-project-cleanup]

### Next Actions
[Top 3-5 things Brady should focus on]
```

## When to Run

| Timing | Purpose |
|--------|---------|
| **Mid-week (Wed)** | Pulse check — catch drift before it compounds |
| **Pre-weekly-sweep (Sun 2 PM)** | Input for weekly planning session |
| **After major delivery** | Confirm everything landed and records are updated |
| **Ad hoc** | When Brady feels out of touch with the state of things |

## What This Kit Does NOT Do

- Execute work or fix issues — it reports them
- Replace the weekly sweep — it feeds into it
- Make prioritization decisions — Brady decides
- Run automatically — Brady triggers it
