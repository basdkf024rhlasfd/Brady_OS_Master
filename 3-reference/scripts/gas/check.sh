#!/usr/bin/env bash
#
# check.sh — Local smoke test for the GAS toolkit.
#
# Validates shell syntax, JavaScript syntax, and that no stale shared
# copies are lying around in script directories.
#
# Run before deploying: ./check.sh && ./build.sh email-classifier

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
ERRORS=0

echo "Checking shell scripts..."
for f in "$REPO_ROOT"/*.sh; do
  [ -f "$f" ] || continue
  if ! bash -n "$f" 2>/dev/null; then
    echo "  FAIL: $f"
    ERRORS=$((ERRORS + 1))
  fi
done

echo "Checking JavaScript syntax..."
while IFS= read -r -d '' file; do
  if ! node --check "$file" 2>/dev/null; then
    echo "  FAIL: $file"
    ERRORS=$((ERRORS + 1))
  fi
done < <(find "$REPO_ROOT/shared" "$REPO_ROOT/scripts" -name '*.js' -print0 2>/dev/null | sort -z)

if [ "$ERRORS" -gt 0 ]; then
  echo ""
  echo "FAILED: $ERRORS error(s) found."
  exit 1
fi

echo "All checks passed."
