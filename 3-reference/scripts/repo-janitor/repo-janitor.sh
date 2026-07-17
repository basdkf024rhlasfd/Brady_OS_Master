#!/usr/bin/env bash
# Repo Janitor — objective repo-hygiene checks for Brady OS.
# Used two ways:
#   1. Hygiene Heidi Rule 7 (weekly Saturday run): ./repo-janitor.sh
#   2. CI gate (.github/workflows/repo-janitor.yml): ./repo-janitor.sh --ci <base-ref>
#      In CI mode only files ADDED relative to <base-ref> are checked, so
#      pre-existing debt doesn't block unrelated PRs.
#
# Checks (each prints PASS/AMBER/RED; exit code 1 if any RED):
#   R7.1  No tracked file >5MB outside the allowlist below
#   R7.2  No tracked build artifacts (renders/images in output dirs, .next, zips)
#   R7.3  No binary files under areas/family/ (photos/PDFs belong in ~/brady-os-local)
#   R7.4  No new byte-identical duplicate groups wasting >1MB
#   R7.5  Working-tree size trend (report only)
#
# Allowlist for R7.1 — client-facing deliverables served by the live portal:
ALLOWLIST_RE='^portal/public/.*\.(pdf|png|jpe?g|webp)$'
SIZE_LIMIT=$((5 * 1024 * 1024))

set -uo pipefail
cd "$(git rev-parse --show-toplevel)"

CI_MODE=0
BASE_REF=""
if [ "${1:-}" = "--ci" ]; then
  CI_MODE=1
  BASE_REF="${2:?--ci requires a base ref}"
fi

fail=0
note() { printf '%s\n' "$*"; }

if [ "$CI_MODE" = 1 ]; then
  mapfile -t FILES < <(git diff --name-only --diff-filter=A "$BASE_REF"...HEAD)
else
  mapfile -t FILES < <(git ls-files)
fi

# --- R7.1: oversized files ---
big=()
for f in "${FILES[@]}"; do
  [ -f "$f" ] || continue
  sz=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
  if [ "$sz" -gt "$SIZE_LIMIT" ] && ! [[ "$f" =~ $ALLOWLIST_RE ]]; then
    big+=("$(printf '%6.1fMB  %s' "$(echo "$sz/1048576" | bc -l)" "$f")")
  fi
done
if [ ${#big[@]} -gt 0 ]; then
  note "RED   R7.1 oversized files (>5MB, not portal deliverables):"
  printf '        %s\n' "${big[@]}"
  fail=1
else
  note "PASS  R7.1 no oversized files"
fi

# --- R7.2: build artifacts ---
ART_RE='(^\.next/|^output/.*\.(pdf|png)$|^3-reference/skills/[^/]+/output/.*\.(pdf|png)$|\.zip$)'
art=()
for f in "${FILES[@]}"; do
  [[ "$f" =~ $ART_RE ]] && art+=("$f")
done
if [ ${#art[@]} -gt 0 ]; then
  note "RED   R7.2 tracked build artifacts:"
  printf '        %s\n' "${art[@]}"
  fail=1
else
  note "PASS  R7.2 no tracked build artifacts"
fi

# --- R7.3: family binaries ---
FAM_RE='^1-execution/areas/family/.*\.(pdf|png|jpe?g|heic|gif|mov|mp4)$'
fam=()
for f in "${FILES[@]}"; do
  [[ "$f" =~ $FAM_RE ]] && fam+=("$f")
done
if [ ${#fam[@]} -gt 0 ]; then
  note "RED   R7.3 family photos/PDFs in git (policy: ~/brady-os-local):"
  printf '        %s\n' "${fam[@]}"
  fail=1
else
  note "PASS  R7.3 no family binaries in git"
fi

# --- R7.4: duplicate groups (full-repo mode only; too slow/noisy per-PR) ---
if [ "$CI_MODE" = 0 ]; then
  dupes=$(git ls-files -z | xargs -0 -r md5sum 2>/dev/null | sort | uniq -w32 -dD | awk '
    { if ($1 != prev) { groups++ }; prev = $1 }
    END { print groups+0 }')
  waste=$(git ls-files -z | xargs -0 -r md5sum 2>/dev/null | sort | awk '
    { if ($1 == prev) { cmd = "stat -c%s \"" substr($0,35) "\""; cmd | getline s; close(cmd); waste += s }; prev = $1 }
    END { printf "%.1f", waste/1048576 }')
  if awk "BEGIN{exit !($waste > 1)}"; then
    note "AMBER R7.4 duplicate files: $dupes groups wasting ${waste}MB (run md5 sweep for detail)"
  else
    note "PASS  R7.4 duplicate waste under 1MB"
  fi
fi

# --- R7.5: size report ---
if [ "$CI_MODE" = 0 ]; then
  tree=$(du -sh --exclude=.git . 2>/dev/null | cut -f1)
  pack=$(git count-objects -vH | awk '/size-pack/ {print $2$3}')
  note "INFO  R7.5 working tree: $tree | git pack: $pack"
fi

exit $fail
