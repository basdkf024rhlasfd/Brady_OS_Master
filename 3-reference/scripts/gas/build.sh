#!/usr/bin/env bash
#
# build.sh — Copy shared utilities into a script directory and push via clasp.
#
# Usage: ./build.sh <script-name>
# Example: ./build.sh email-classifier
#
# This script:
#   1. Copies shared/*.js into scripts/<script-name>/
#   2. Runs `clasp push` from that directory
#   3. Cleans up the copied shared files (leaving script-specific files intact)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
SHARED_DIR="$REPO_ROOT/shared"
SCRIPTS_DIR="$REPO_ROOT/scripts"

if [ $# -lt 1 ]; then
  echo "Usage: ./build.sh <script-name>"
  echo "Example: ./build.sh email-classifier"
  echo ""
  echo "Available scripts:"
  ls -1 "$SCRIPTS_DIR" 2>/dev/null || echo "  (none)"
  exit 1
fi

SCRIPT_NAME="$1"
TARGET_DIR="$SCRIPTS_DIR/$SCRIPT_NAME"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Script directory not found: $TARGET_DIR"
  exit 1
fi

if [ ! -f "$TARGET_DIR/.clasp.json" ]; then
  echo "Error: No .clasp.json found in $TARGET_DIR"
  echo "Run 'clasp create' in that directory first."
  exit 1
fi

# Track which files we copy so we only clean up those
COPIED_FILES=()

echo "Copying shared utilities into $SCRIPT_NAME..."
for f in "$SHARED_DIR"/*.js; do
  if [ -f "$f" ]; then
    filename="$(basename "$f")"
    cp "$f" "$TARGET_DIR/$filename"
    COPIED_FILES+=("$filename")
    echo "  + $filename"
  fi
done

echo ""
echo "Pushing to Google Apps Script..."
cd "$TARGET_DIR"

push_failed=0
clasp push || push_failed=1

cd "$REPO_ROOT"

# Clean up copied shared files regardless of push success
echo ""
echo "Cleaning up shared files..."
for filename in "${COPIED_FILES[@]}"; do
  rm -f "$TARGET_DIR/$filename"
  echo "  - $filename"
done

if [ "$push_failed" -ne 0 ]; then
  echo ""
  echo "Error: clasp push failed. Files have been cleaned up."
  exit 1
fi

echo ""
echo "Done! $SCRIPT_NAME pushed successfully."
