# Weekly OS Recap — Configuration

## Delivery
- **recipient_email**: Brady's primary Gmail
- **delivery_day**: Friday
- **generation_time**: 7:00 AM CT (Conductor trigger)
- **email_time**: 7:15 AM CT (GAS trigger, 15 min after generation)
- **text_notification**: true (via Apple Shortcut on `[OS-RECAP]` subject)
- **subject_prefix**: `[OS-RECAP]`

## Scan
- **repo_path**: `.` (current Brady OS repo)
- **lookback_days**: 7
- **exclude_merges**: true
- **branch**: main (or current branch)

## Output
- **output_dir**: `~/Documents/OS-Recaps/`
- **drive_folder**: `OS-Recaps/`
- **filename_pattern**: `os-recap-YYYY-MM-DD`
- **formats**: HTML (dark), PDF (light)

## Categories

| Category | Color Token | Detection Paths |
|----------|-------------|-----------------|
| New Skills | `--gold` | `3-reference/skills/*/SKILL.md` |
| New Agents | `--blue` | `0-agents/custom-built-agents/` |
| Project Work | `--red-dim` | `1-execution/`, `Consulting/`, `Project` |
| Infrastructure | `--gray` | `CLAUDE.md`, `governance/`, `scripts/`, `config-sync` |
| Publishing | `--gold-dim` | `mception-ai-projects.yml`, `viewer`, `publishing/` |
| Programs & Planning | `--blue` | Programs, project kickoffs, career/ |

## Stat Cards
- New Skills (count of new SKILL.md files)
- New Agents (count of new agent profiles)
- Projects Touched (count of distinct project directories changed)
- PRs Merged (count of merge commits in window)

## Customization
To adapt for a different Brady OS fork:
1. Update `repo_path` if not running from the repo root
2. Adjust `categories` and detection paths for your directory structure
3. Change `recipient_email` to your address
4. Modify `delivery_day` and times as needed
