---
name: config-sync
description: >
  Detects drift between Conductor workspace files, Claude Code CLI files, and
  CoWork execution prompts. Compares skills, agents, CLAUDE.md docs, and CoWork
  prompts across all surfaces. Reports which side is newer and offers sync commands.

  Trigger this skill whenever Brady says "config sync", "are my skills current",
  "check CLI files", "sync skills", "sync config", "are things in sync",
  "check for drift", or any variation requesting a check on whether Claude Code
  CLI has current OS files. Also trigger when Brady switches between Conductor
  and Claude Code CLI and wants to verify consistency.
---

# Config Sync

Detects when the Claude Code CLI checkout has fallen behind the Conductor workspace
(or vice versa). Skills, agents, and CLAUDE.md files should match — if they don't,
one surface is working with stale instructions.

## Why This Exists

Brady works in two surfaces: Conductor workspaces and Claude Code CLI. Both read
from the same Brady OS repo, but they can be different git checkouts on different
branches at different commits. When one gets ahead, the other surface silently uses
stale skills and agent profiles. There's no alarm — Brady just gets inconsistent
behavior and wonders why a skill "doesn't exist" in one place.

This skill closes that gap. It compares the two locations, flags what's drifted,
identifies which side is newer, and offers ready-to-run sync commands.

## Execution Environment

**Runs on**: Any Claude surface with file system access (Conductor, Claude Code, CoWork)
**Trigger**: Manual invocation or as part of weekly sweep / project standup
**Duration**: ~1 minute (read-only scan + git log queries)

## Sync Locations

| Location | Role | Path |
|----------|------|------|
| Conductor workspace | Primary development surface | Resolved from `repo-registry.yml` → `brady-os.conductor_workspace` + active workspace name |
| Claude Code CLI | Secondary surface, reads via symlink | Resolved by following `~/.claude/skills` symlink up to repo root |
| Global CLAUDE.md | Standalone config | `~/.claude/CLAUDE.md` (outside any repo) |

## Monitored Paths

Configured in `repo-registry.yml` under `brady-os.sync_paths`:

### Git-Tracked (compared via git commit history)
- `3-reference/skills/*/SKILL.md` — Skill definitions
- `3-reference/skills/*/references/**` — Skill support files
- `3-reference/skills/CLAUDE.md` — Skills registry
- `0-agents/custom-built-agents/*.md` — Agent profiles
- `0-agents/CLAUDE.md` — Agent layer docs
- `CLAUDE.md` — Repo-level instructions

### Standalone (compared via content hash)
- `~/.claude/CLAUDE.md` — Global Claude Code instructions (not in any repo)

### CoWork Prompts (compared via content hash against repo source)
CoWork execution prompts live outside the repo but must stay in sync with the repo SKILL.md they mirror.
Configured in `repo-registry.yml` under `brady-os.sync_paths.cowork_prompts`.

- `~/Documents/Claude/Scheduled/morning-sweep/SKILL.md` — mirrors `3-reference/skills/morning-sweep/SKILL.md`
- `~/Downloads/morning-sweep-v2-prompt.md` — backup copy, same source

## Execution Steps

### Step 1: Resolve Locations

1. Read `3-reference/skills/air-traffic-control/repo-registry.yml`
2. Get the `conductor_workspace` path for `brady-os`
3. Resolve `~/.claude/skills` symlink to find its target repo root
4. If the symlink is broken or missing, flag immediately and offer fix command
5. Record both paths, their current git branches, and latest commit hashes

### Step 2: Collect Sync Manifest

Read the `sync_paths` block from `repo-registry.yml`. Expand glob patterns against
both locations. Build a unified file list with entries from both sides.

For each file, record:
- Exists in workspace? (yes/no)
- Exists in CLI checkout? (yes/no)
- Exists in both? (yes/no)

### Step 3: Compare

For each file in the manifest:

**Git-tracked files (both locations are git repos):**
1. Run `git log -1 --format="%H %ai" -- <path>` in both checkouts
2. If commit hashes match → file is **CURRENT**
3. If hashes differ → the one with the newer commit date is **NEWER**
4. If commits match but `diff` shows differences → flag as **LOCAL CHANGES** (uncommitted edits on one or both sides)
5. If file exists in one location but not the other → flag as **MISSING**

**Standalone files (`~/.claude/CLAUDE.md`):**
1. Compute `shasum -a 256` of the file
2. Compare against the repo version (if a canonical source is tracked)
3. If hashes match → **CURRENT**
4. If hashes differ → show diff summary and let Brady decide

**CoWork prompt files (compared via content hash against repo source):**
1. For each entry in `sync_paths.cowork_prompts`, compute `shasum -a 256` of the CoWork copy
2. Compute `shasum -a 256` of the `repo_source` file in the workspace
3. If hashes match → **CURRENT**
4. If hashes differ → flag as **COWORK STALE** — the repo is canonical, CoWork copy needs updating
5. If CoWork file is missing → flag as **MISSING** with the expected path
6. Note: CoWork prompts may intentionally contain extra sections (references, Notion IDs, etc.)
   that don't exist in the repo SKILL.md. Only compare the Phase 3 structure and skill logic,
   not supplementary reference sections. When hashes differ, show a summary of what's different.

**Ambiguous cases (both sides changed independently):**
- If both sides have different commits that are not ancestors of each other → flag as **CONFLICT**
- Do not auto-resolve. Show both commits and ask Brady which to keep.

### Step 4: Generate Drift Report

```
===============================================
CONFIG SYNC REPORT — [Date]
===============================================

SOURCE (Conductor workspace):
  Path: [workspace path]
  Branch: [branch name]
  Last commit: [hash] [date] [message]

TARGET (Claude Code CLI):
  Path: [CLI repo path]
  Branch: [branch name]
  Symlink: ~/.claude/skills → [resolved path]
  Last commit: [hash] [date] [message]

-----------------------------------------------
SYMLINK STATUS
-----------------------------------------------
  [OK — points to workspace | STALE — points to old checkout | BROKEN]

-----------------------------------------------
BRANCH STATUS
-----------------------------------------------
  [SAME BRANCH | DIVERGED — workspace on X, CLI on Y]
  Commits ahead/behind: [workspace +N / CLI +M]

-----------------------------------------------
FILE DRIFT
-----------------------------------------------

  Skills:
    [skill-name]/SKILL.md .............. [CURRENT | NEWER IN workspace | NEWER IN CLI | MISSING IN CLI | CONFLICT]
    [repeat]

  Agents:
    [agent-name].md .................... [CURRENT | NEWER IN workspace | NEWER IN CLI | MISSING | CONFLICT]
    [repeat]

  Config:
    CLAUDE.md (root) ................... [CURRENT | DIFFERS]
    0-agents/CLAUDE.md ................. [CURRENT | DIFFERS]
    3-reference/skills/CLAUDE.md ....... [CURRENT | DIFFERS]
    ~/.claude/CLAUDE.md ................ [CURRENT | DIFFERS]

  CoWork Prompts:
    morning-sweep (Documents) .......... [CURRENT | COWORK STALE | MISSING]
    morning-sweep (Downloads) .......... [CURRENT | COWORK STALE | MISSING]

-----------------------------------------------
SUMMARY
-----------------------------------------------
  Files checked: [N]
  Current: [N]
  Drifted: [N]
  Missing: [N]
  Conflicts: [N]

-----------------------------------------------
SYNC COMMANDS (if drift detected)
-----------------------------------------------

  # [Context-appropriate commands based on what's drifted]
  # Examples:
  cd [CLI repo path] && git fetch origin && git pull origin main
  ln -sf [workspace skills path] ~/.claude/skills
  cp [source] [target]
```

### Step 5: Surface Results & Offer Sync

- If everything is current: "All [N] files in sync. No action needed."
- If drift detected: Present the report and ask Brady to confirm sync direction
- If Brady confirms: Execute the appropriate sync commands
- Never force-checkout, force-push, or overwrite without explicit confirmation

## What This Skill Does NOT Do

- Does not modify git history (no rebases, no force pushes)
- Does not auto-resolve conflicts (asks Brady)
- Does not sync settings.json, session data, or ephemeral Claude Code state
- Does not run continuously — invoked on-demand, during sweeps, or during standup
- Does not replace git workflows — it surfaces drift, it doesn't manage branches

## Edge Cases

- **Symlink points to a deleted or moved directory**: Detect broken symlink, report it, offer the `ln -sf` fix command
- **One checkout has uncommitted changes**: Flag as LOCAL CHANGES, show which files, do not overwrite
- **Workspace is on a feature branch, CLI on main**: Report branch names. The symlink fix (pointing to workspace) means CLI always gets workspace content regardless of branch. For the repos checkout, suggest `git pull` not `git checkout`
- **New skill added in workspace but not merged to main**: If symlink points to workspace, CLI already has it. Flag in report for awareness that repos checkout is behind.
- **`~/.claude/CLAUDE.md` has intentional local customizations**: Show diff, let Brady decide. Support a `# config-sync: ignore-below` marker to preserve local-only sections
- **Conductor workspace path changes** (new workspace name): The symlink breaks. Detect and offer updated symlink command.
