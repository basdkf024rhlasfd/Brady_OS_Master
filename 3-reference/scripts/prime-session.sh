#!/usr/bin/env bash
# prime-session.sh
# Assembles a session primer for any new Claude agent working in this workspace.
# Triggered by the SessionStart hook in .claude/settings.json.
#
# Output: markdown-formatted primer printed to stdout.
# Sections: Purpose → Glossary → Recent git → Recent Notion (if NOTION_API_KEY set)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
GLOSSARY="$REPO_ROOT/3-reference/skills/_shared/brady-glossary.md"
ENV_FILE="$HOME/telly-bot/.env.production.local"

# Load NOTION_API_KEY from telly-bot .env if not already in environment
if [[ -z "${NOTION_API_KEY:-}" && -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  NOTION_API_KEY="$(grep -E '^NOTION_API_KEY=' "$ENV_FILE" | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'")"
fi

STREAMING_NOTES_DB="2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83"
RULES_PAGE="344ed43b-89c5-813d-bded-f1d5689510e2"
SEVEN_DAYS_AGO="$(date -v-7d -u +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || date -u -d '7 days ago' +"%Y-%m-%dT%H:%M:%SZ")"

cat <<EOF
# Brady OS Workspace Primer

You are starting a session in Brady Smallwood's personal OS repository (\`brady_os_master/rome\`). This primer gives you the compressed context needed to operate without re-deriving who's who.

## Workspace Purpose

Brady OS is a personal + consulting operating system: 4 layers (agents / execution / memory / reference) + a Next.js portal (\`mception.ai\`). It runs Brady's daily rhythm (morning/evening/weekly sweeps), tracks consulting engagements, governs a council of AI agents, and owns publishing to the client-facing portal. Your default posture is **T1 — Internal**: write freely inside the repo and to Notion (tasks, notes, status), but escalate external sends (T2+) to Brady.

EOF

# ── Glossary ─────────────────────────────────────────────────────────────
if [[ -f "$GLOSSARY" ]]; then
  echo "## Glossary (canonical who's-who)"
  echo
  # Strip the glossary's own header + "Last updated" line — keep the content
  tail -n +5 "$GLOSSARY"
  echo
else
  echo "## Glossary"
  echo "_Glossary file missing at $GLOSSARY — rebuild from brady-glossary template._"
  echo
fi

# ── Recent git activity ──────────────────────────────────────────────────
echo "## Recent Repo Activity (last 7 days)"
echo
cd "$REPO_ROOT"
GIT_OUT="$(git log --since="7 days ago" --pretty=format:"- %ad · %s" --date=short 2>/dev/null | head -20 || true)"
if [[ -n "$GIT_OUT" ]]; then
  echo "$GIT_OUT"
else
  echo "_no git history available_"
fi
echo
echo

# ── Latest evening journal ───────────────────────────────────────────────
LATEST_JOURNAL_DIR="$(find "$HOME/Documents/Daily-Journal" -maxdepth 3 -type d -name "[0-9][0-9]" 2>/dev/null | sort -r | head -1 || true)"
if [[ -n "$LATEST_JOURNAL_DIR" && -f "$LATEST_JOURNAL_DIR/evening-journal.md" ]]; then
  echo "## Most Recent Evening Journal"
  echo
  echo "\`$LATEST_JOURNAL_DIR/evening-journal.md\`"
  echo
  # Show only headers + first line under each header for a skim
  grep -E "^#{1,3} " "$LATEST_JOURNAL_DIR/evening-journal.md" | head -15 || true
  echo
fi

# ── Recent Notion activity ───────────────────────────────────────────────
if [[ -n "${NOTION_API_KEY:-}" ]]; then
  echo "## Recent Notion Activity (last 7 days)"
  echo

  # New Streaming Notes in last 7 days
  NOTES_JSON="$(curl -s -X POST "https://api.notion.com/v1/databases/$STREAMING_NOTES_DB/query" \
    -H "Authorization: Bearer $NOTION_API_KEY" \
    -H "Notion-Version: 2022-06-28" \
    -H "Content-Type: application/json" \
    -d "{\"filter\":{\"timestamp\":\"created_time\",\"created_time\":{\"after\":\"$SEVEN_DAYS_AGO\"}},\"sorts\":[{\"timestamp\":\"created_time\",\"direction\":\"descending\"}],\"page_size\":15}" 2>/dev/null || echo '{}')"

  if command -v jq >/dev/null 2>&1; then
    echo "### Streaming Notes (newest first)"
    echo "$NOTES_JSON" | jq -r '
      if .results then
        .results[] |
        "- [" + (.properties.Type.select.name // "?") + " / " + (.properties.Priority.select.name // "?") + "] " +
        (.properties.Name.title[0].plain_text // "_untitled_") +
        " · " + (.created_time | split("T")[0])
      else
        "_Notion query returned no results — check API key or DB permissions_"
      end
    ' 2>/dev/null || echo "_could not parse Notion response_"
  else
    echo "_jq not installed — skipping pretty-print of Notion data._"
    echo "$NOTES_JSON" | head -100
  fi
  echo

  # Rules & Preferences page last-edited
  RULES_JSON="$(curl -s -X GET "https://api.notion.com/v1/pages/$RULES_PAGE" \
    -H "Authorization: Bearer $NOTION_API_KEY" \
    -H "Notion-Version: 2022-06-28" 2>/dev/null || echo '{}')"

  if command -v jq >/dev/null 2>&1; then
    LAST_EDITED="$(echo "$RULES_JSON" | jq -r '.last_edited_time // "unknown"' 2>/dev/null)"
    echo "### Rules & Preferences page"
    echo "- Last edited: $LAST_EDITED"
    echo "- URL: https://www.notion.so/${RULES_PAGE//-/}"
  fi
  echo
else
  echo "## Recent Notion Activity"
  echo
  echo "_NOTION_API_KEY not set — skipping. Export it from \`~/telly-bot/.env.production.local\` or set in shell env to enable._"
  echo
fi

echo "---"
echo "_Primer generated: $(date '+%Y-%m-%d %H:%M:%S %Z')_"
