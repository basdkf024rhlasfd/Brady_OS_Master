---
name: mception-action-scanner
description: >
  Scans all mception.ai chat config YAML files for data sources that need action.
  Reports items grouped by status (not-started > partial > recommended) and actor
  (brady, chrome-agent, claude-desktop, conductor). Runs standalone or as a sub-step
  in morning/weekly sweeps.

  Trigger this skill whenever Brady says "scan mception", "what needs action on mception",
  "mception status", "portal action items", "what's next on mception", "action scan",
  or any variation requesting a summary of incomplete data sources across the portal.

  When starting any session with Brady, silently check for action items and proactively
  surface Brady-assigned items as natural suggestions — don't wait for him to ask.
trust_tier: T0
---

# mception Action Scanner

One command, full visibility into what's incomplete across every mception.ai page.

## Why This Exists

Brady's mception portal has a growing number of group pages, each with data sources at various
stages of readiness. Each data source tracks its status and the next step needed. Without a
single scan, it's easy to forget what's blocked, what's half-done, and what needs which agent.
This skill gives any agent a one-command view of the full mception backlog and proactively
surfaces Brady's action items so he doesn't have to go looking.

## Execution Environment

**Runs on**: Any Claude surface with file system access (Conductor, Claude Code CLI, CoWork)
**Local access**: File system only — reads YAML configs
**Scheduled**: On-demand, or embedded in morning/weekly sweeps
**Output**: Conversation only — no file writes
**Duration**: Under 5 seconds

## Phase 1: SCAN

1. Read all `.yml` files in `portal/src/config/chat-configs/`
2. For each file, parse the `dataSources` array (skip files that don't have one)
3. Filter to items where `status` is NOT `"ready"`
4. Collect each item as:
   ```
   { page: <filename without .yml>, label, type, status, description, nextStep, nextStepActor }
   ```

### DataSourceConfig Schema (from `portal/src/lib/chat/chat-config.ts`)

```typescript
interface DataSourceConfig {
  label: string;
  type: "notion-db" | "notion-page" | "notion-wiki" | "google-calendar" | "kb-directory" | "skill" | "external";
  status: "ready" | "partial" | "not-started" | "recommended";
  id?: string;
  url?: string;
  description: string;
  nextStep?: string;
  nextStepActor?: "brady" | "chrome-agent" | "claude-desktop" | "conductor";
}
```

## Phase 2: REPORT

### Standalone Mode (Full Report)

```
═══════════════════════════════════════════════════
MCEPTION ACTION SCAN — [date]
═══════════════════════════════════════════════════
[N] items need action across [M] pages

NOT STARTED ([count])
• [Page] → [Label]: [nextStep] — [actor]
• ...

PARTIAL ([count])
• [Page] → [Label]: [nextStep] — [actor]
• ...

RECOMMENDED ([count])
• [Page] → [Label]: [nextStep] — [actor]
• ...

───────────────────────────────────────────────────
BY ACTOR:
  Brady: [N] items
  Claude Desktop: [N] items
  Conductor: [N] items
  Chrome Agent: [N] items
───────────────────────────────────────────────────
Handoff prompts: open mception.ai/group/[page] → click "Summarize Next Steps" → copy per-actor prompt
═══════════════════════════════════════════════════
```

Priority order within each status group: not-started (highest) → partial → recommended (lowest).

### Compact Mode (For Sweeps)

When invoked as a sub-step of morning-sweep or weekly-sweep, use this format:

```
MCEPTION: [N] items across [M] pages ([X] not-started, [Y] partial, [Z] recommended)
  Your turn: [list any nextStepActor="brady" items, one line each]
  Agent queue: [count] for claude-desktop, [count] for conductor, [count] for chrome-agent
```

### Proactive Mode (Session Start)

When checking at the start of a session (not explicitly invoked), surface Brady items naturally:

> "By the way — you have [N] mception items waiting on you: [brief list]. Want to knock any out?"

Only mention items where `nextStepActor="brady"`. Don't dump the full scan unsolicited.

## Edge Cases

- **No YAML files have `dataSources`**: Output "No data sources configured on any mception page yet."
- **All items are `ready`**: Output "All [N] data sources across [M] pages are fully set up."
- **YAML file has malformed `dataSources`**: Skip it, warn: "Skipped [filename] — malformed dataSources"
- **No file system access**: Fail with: "This skill requires local file system access to read portal configs."
- **New group page added without dataSources**: Not flagged — absence of dataSources is normal for pages that haven't adopted the pattern yet.

## What This Skill Does NOT Do

- Modify any YAML files or data source statuses (read-only)
- Check the live mception.ai portal (reads local YAML only)
- Generate handoff prompts (the portal UI's "Summarize Next Steps" already does this)
- Track status history (git provides that — use `git log -- portal/src/config/chat-configs/`)
- Create Notion tasks (the sweep can do that if Brady wants)
