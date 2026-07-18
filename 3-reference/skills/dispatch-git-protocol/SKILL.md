---
name: dispatch-git-protocol
description: |
  Git coordination protocol for Dispatch (CoWork/claude.ai) when operating on the brady-os repo
  alongside Conductor. Defines branch ownership rules, push/merge gates, and conflict avoidance.
  Load this before doing ANY file writes, commits, or branch operations in brady-os.
  Trigger: any time Dispatch is about to touch the brady-os git tree.
trust_tier: T1
---

# Dispatch Git Protocol

You are Dispatch — the agent Brady uses in CoWork/claude.ai when he's away from Conductor.
You share the brady-os repo with Conductor, which runs parallel agents in isolated git worktrees.
This skill governs how you operate without stepping on Conductor.

**Rule zero: read before you write.** Run the branch check below before doing any file work.

---

## 1. The Tree Structure

Brady OS has one primary repo with two active remotes:

| Remote | Repo | Notes |
|--------|------|-------|
| `origin` | brady-os (main repo) | Primary — all Dispatch + Conductor work |
| `mception` | mception portal repo | Separate — never touch from Dispatch |

Conductor creates one branch per workspace. Each workspace = one focused build task.
Branches stay alive until Brady merges or closes the workspace.

**Current Conductor workspace branch (the one you're running inside right now):** `claudine-boss`

---

## 2. Branch Ownership Map

| Branch Pattern | Owner | Dispatch can push? |
|----------------|-------|--------------------|
| `main` | Shared | Never direct — PR only |
| `dispatch/*` | Dispatch | Yes — your exclusive lane |
| `claudine-boss` | Conductor (active) | Never |
| Any other named branch | Conductor (assume active) | Never without checking |

**Default assumption:** if a branch isn't `main` and isn't `dispatch/*`, Conductor owns it. Do not touch.

---

## 3. Before Any File Work — Run This Check

```bash
# 1. See all active Conductor branches
git fetch origin --prune
git branch -r | grep "origin/" | grep -v "origin/main\|origin/HEAD\|origin/dispatch"

# 2. See if anything was committed to main in the last 24h (Conductor may have just merged)
git log origin/main --since="24 hours ago" --oneline

# 3. Check for open PRs targeting main (don't merge if Conductor has one in flight)
gh pr list --base main --state open
```

If step 1 shows branches with commits in the last 48 hours that relate to your task, **stop and note the conflict** — don't proceed until those are merged or Brady clears you.

---

## 4. Starting Work

Always start from a fresh pull of main:

```bash
git checkout main
git pull origin main
git checkout -b dispatch/YYYY-MM-DD-slug
# example: dispatch/2026-04-25-finn-kb-update
```

Slug = short kebab-case description of the task. Date = today's date.

Never reuse a `dispatch/*` branch across sessions. Create a new one each time.

---

## 5. Push Rules

| Situation | Action |
|-----------|--------|
| Mid-task, not done | Push to your `dispatch/*` branch — no PR yet |
| Task complete, no Conductor conflicts | Open PR to `main` |
| Task complete, Conductor has open PR on related files | Push branch, note the dependency in PR body, do NOT merge |
| Task complete, Conductor branch modifying same files | Stop. Message Brady via Telly. Do not create PR. |

Push mid-task often. Conductor can see your branch without conflicting with it.

---

## 6. Merge to Main — Gate Checklist

Only merge (or ask Brady to merge) when ALL of these pass:

- [ ] Your `dispatch/*` branch is fully complete — no half-states, no TODO stubs
- [ ] `gh pr list --base main --state open` shows no Conductor PRs touching your files
- [ ] `git diff origin/main...dispatch/<slug> -- <your files>` shows no conflicts
- [ ] The work is self-contained — no dependency on an in-flight Conductor branch

If any gate fails: push your branch, open a draft PR, and message Brady.

```bash
# Open a draft PR so Brady can review/merge when Conductor clears
gh pr create --base main --head dispatch/<slug> --draft \
  --title "dispatch: <slug>" \
  --body "Dispatch work — ready to merge once <blocking-branch> lands."
```

---

## 7. When Conductor and Dispatch Touch the Same Files

This will happen. The protocol:

1. **Dispatch finishes first:** Push `dispatch/<slug>`, open PR, wait. Do not merge.
2. **Conductor finishes first:** Pull fresh `main` after Conductor merges, rebase your branch, then open your PR.
3. **Both in flight simultaneously:** Push your branch. Leave a `.context/dispatch-note.md` describing what you changed and why. Brady arbitrates.

Rebase (not merge) when catching up to main:

```bash
git fetch origin
git rebase origin/main
# resolve any conflicts, then:
git push origin dispatch/<slug> --force-with-lease
```

---

## 8. What Dispatch Should Never Do

- Direct push to `main`
- Push to any branch you didn't create (except your own `dispatch/*`)
- Force push without `--force-with-lease`
- Create files in `.context/plans/` that shadow an in-flight Conductor plan (check first)
- Merge a PR while another PR targeting the same files is open

---

## 9. Signaling Brady

When Dispatch finishes work and can't auto-merge, signal Brady via Telly:

```bash
curl -s -X POST "https://api.telegram.org/bot8650865761:AAGWaC5R9PLjtTd8SENV6Lr_HCKqM9tnvZQ/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": \"8764020256\", \"text\": \"<b>Dispatch done:</b> <slug>\\nPR open — needs merge after <blocking-branch> lands.\", \"parse_mode\": \"HTML\"}"
```

If Telly fails, create a Gmail draft to brady.smallwood@gmail.com with the same summary.

---

## 10. Detecting Active Conductor Workspaces (quick reference)

```bash
# Branches with commits in last 48h (likely active)
git for-each-ref --sort=-committerdate refs/remotes/origin \
  --format='%(committerdate:relative) %(refname:short)' | \
  grep -v "origin/main\|origin/dispatch\|origin/HEAD" | head -20
```

Any branch with "hours ago" or "days ago" (under 2 days) = treat as active Conductor workspace.

---

## Summary Decision Tree

```
About to write files?
  └─ Run branch check (Section 3)
       └─ Related Conductor work in flight?
            ├─ YES → Note conflict, wait or coordinate
            └─ NO → Create dispatch/YYYY-MM-DD-slug from fresh main
                      └─ Work complete?
                           ├─ NO → Push branch, continue later
                           └─ YES → Run merge gate checklist (Section 6)
                                     ├─ All pass → Open PR to main
                                     └─ Any fail → Draft PR + Telly message
```
