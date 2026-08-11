#!/usr/bin/env bash
# Substrate Audit — objective legibility checks for Brady OS.
#
# Premise: when the underlying model improves, the multiplier lands on the
# substrate it can SEE — CLAUDE.md, the skill registry, agent profiles, trigger
# phrases. Capability that exists on disk but is not registered is invisible to
# a future model and therefore does not compound. This script measures that gap.
#
# Used two ways:
#   1. Hygiene Heidi Rule 8 (weekly Saturday run): ./substrate-audit.sh
#   2. CI gate (.github/workflows/substrate-audit.yml): ./substrate-audit.sh --ci <base-ref>
#      In CI mode only files ADDED relative to <base-ref> are checked, so
#      pre-existing debt doesn't block unrelated PRs.
#
# Checks (each prints PASS/AMBER/RED; exit code 1 if any RED):
#   S8.1  Every skill on disk is registered in CLAUDE.md          (RED)
#   S8.2  Every agent profile on disk is registered in CLAUDE.md  (RED)
#   S8.3  Every SKILL.md has routable frontmatter (name + description)  (RED)
#   S8.4  Substrate yield — % of active days that added capability (report only)
#
# Doctrine: 3-reference/substrate-doctrine.md

set -uo pipefail
cd "$(git rev-parse --show-toplevel)"

REGISTRY="CLAUDE.md"
SKILLS_DIR="3-reference/skills"
AGENTS_DIR="0-agents/custom-built-agents"
YIELD_WINDOW_DAYS=90

# Directories under $SKILLS_DIR that are shared includes, not skills.
SKILL_EXCLUDE_RE='^(_shared)$'

CI_MODE=0
BASE_REF=""
if [ "${1:-}" = "--ci" ]; then
  CI_MODE=1
  BASE_REF="${2:?--ci requires a base ref}"
fi

fail=0
note() { printf '%s\n' "$*"; }

if [ ! -f "$REGISTRY" ]; then
  note "RED  S8.0  $REGISTRY not found — cannot audit substrate legibility."
  exit 1
fi
REGISTRY_TEXT="$(cat "$REGISTRY")"

# In CI mode, restrict to files added in this PR.
if [ "$CI_MODE" = 1 ]; then
  mapfile -t ADDED < <(git diff --name-only --diff-filter=A "$BASE_REF"...HEAD)
fi

# was_added <path> — true if we should check this path in the current mode.
was_added() {
  [ "$CI_MODE" = 0 ] && return 0
  local target="$1" f
  for f in "${ADDED[@]:-}"; do
    [ "$f" = "$target" ] && return 0
  done
  return 1
}

# --- S8.1: skills registered in CLAUDE.md ---
unreg_skills=()
for d in "$SKILLS_DIR"/*/; do
  [ -d "$d" ] || continue
  s="$(basename "$d")"
  [[ "$s" =~ $SKILL_EXCLUDE_RE ]] && continue
  was_added "$SKILLS_DIR/$s/SKILL.md" || continue
  case "$REGISTRY_TEXT" in
    *"$SKILLS_DIR/$s/"*) ;;
    *) unreg_skills+=("$s") ;;
  esac
done

# Reverse direction: a registry line pointing at a path that no longer exists routes
# a future model to a dead file. Full-repo mode only — CI sees added files, not deletions.
dead_paths=()
if [ "$CI_MODE" = 0 ]; then
  while IFS= read -r p; do
    [ -e "$p" ] || dead_paths+=("$p")
  done < <(grep -oE '3-reference/skills/[a-z0-9_-]+/SKILL\.md' "$REGISTRY" | sort -u)
fi

if [ ${#unreg_skills[@]} -eq 0 ] && [ ${#dead_paths[@]} -eq 0 ]; then
  note "PASS S8.1  All skills registered in $REGISTRY; no dead registry paths."
else
  note "RED  S8.1  Skills registry out of sync with disk:"
  for s in "${unreg_skills[@]:-}"; do
    [ -n "$s" ] || continue
    note "           on disk, unregistered: $SKILLS_DIR/$s/  — add a Skills Registry line with its trigger phrases"
  done
  for p in "${dead_paths[@]:-}"; do
    [ -n "$p" ] || continue
    note "           registered, missing on disk: $p  — remove or correct the registry line"
  done
  fail=1
fi

# --- S8.2: agent profiles registered in CLAUDE.md ---
# An agent file X.md counts as registered if CLAUDE.md names X.md or X-SKILL.md.
# README/SKILL companions resolve to their base agent stem.
unreg_agents=()
if [ -d "$AGENTS_DIR" ]; then
  for f in "$AGENTS_DIR"/*.md; do
    [ -f "$f" ] || continue
    was_added "$f" || continue
    b="$(basename "$f" .md)"
    stem="${b%-README}"; stem="${stem%-SKILL}"
    case "$REGISTRY_TEXT" in
      *"$stem.md"*|*"$stem-SKILL.md"*) ;;
      *) unreg_agents+=("$(basename "$f")") ;;
    esac
  done
fi

if [ ${#unreg_agents[@]} -eq 0 ]; then
  note "PASS S8.2  All agent profiles registered in $REGISTRY."
else
  note "RED  S8.2  ${#unreg_agents[@]} agent profile(s) on disk but absent from the $REGISTRY registry:"
  for a in "${unreg_agents[@]}"; do
    note "           $AGENTS_DIR/$a  — add a registry line naming the file path"
  done
  fail=1
fi

# --- S8.3: SKILL.md routability (frontmatter name + description) ---
# A skill a future model cannot route to is capability that does not compound.
unroutable=()
for d in "$SKILLS_DIR"/*/; do
  [ -d "$d" ] || continue
  s="$(basename "$d")"
  [[ "$s" =~ $SKILL_EXCLUDE_RE ]] && continue
  skill_file="$SKILLS_DIR/$s/SKILL.md"
  [ -f "$skill_file" ] || continue
  was_added "$skill_file" || continue
  head -40 "$skill_file" | grep -qE '^name:' || { unroutable+=("$s — missing frontmatter 'name:'"); continue; }
  head -40 "$skill_file" | grep -qE '^description:' || unroutable+=("$s — missing frontmatter 'description:'")
done

if [ ${#unroutable[@]} -eq 0 ]; then
  note "PASS S8.3  All SKILL.md files carry routable frontmatter."
else
  note "RED  S8.3  ${#unroutable[@]} skill(s) not routable from frontmatter:"
  for u in "${unroutable[@]}"; do
    note "           $u"
  done
  fail=1
fi

# --- S8.4: substrate yield (report only) ---
# Substrate = what a future model reads to become more capable. A day that only
# wrote agent reports under 1-execution/ means the OS RAN but did not GROW.
#
# Single bucketed pass: the same `%cd --date=short` string keys both the day list
# and the file membership, so no timezone drift at day boundaries.
read -r n_active n_substrate n_autoonly <<EOF
$(git log --since="$YIELD_WINDOW_DAYS days ago" --format="C %cd" --date=short --name-only \
  | awk '
      /^C /            { day = $2; seen[day] = 1; next }
      /^$/             { next }
      {
        if ($0 ~ /^(0-agents\/|3-reference\/|portal\/src\/|\.github\/|CLAUDE\.md|AGENTS\.md)/)
          sub_[day] = 1
        else if ($0 ~ /^1-execution\//)
          auto[day] = 1
      }
      END {
        for (d in seen) {
          n++
          if (d in sub_) s++
          else if (d in auto) a++
        }
        printf "%d %d %d\n", n, s, a
      }')
EOF

if [ "${n_active:-0}" -gt 0 ]; then
  pct=$(( n_substrate * 100 / n_active ))
  band="RED "
  [ "$pct" -ge 40 ] && band="AMBER"
  [ "$pct" -ge 60 ] && band="PASS "
  note "$band S8.4  Substrate yield: $n_substrate/$n_active active days added capability (${pct}%) over ${YIELD_WINDOW_DAYS}d. Target >=60%. [report only]"
  note "           $n_autoonly day(s) wrote only agent output under 1-execution/ — the OS ran but did not grow."
else
  note "AMBER S8.4  No commits in the last ${YIELD_WINDOW_DAYS} days — no yield to measure. [report only]"
fi

note ""
if [ "$fail" = 1 ]; then
  note "SUBSTRATE AUDIT: RED — unregistered capability is invisible to future models. Fix the registry."
else
  note "SUBSTRATE AUDIT: PASS"
fi
exit "$fail"
