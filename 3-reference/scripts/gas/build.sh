#!/usr/bin/env bash
#
# build.sh — Stage a script with shared utilities and push via clasp.
#
# Usage: ./build.sh <script-name>
# Example: ./build.sh email-classifier
#
# This script:
#   1. Copies scripts/<script-name>/ into a temporary staging directory
#   2. Overlays shared/*.js into that staging directory
#   3. Runs `clasp push` from the staging directory
#   4. Removes the staging directory on exit

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

STAGING_DIR="$(mktemp -d "${TMPDIR:-/tmp}/gas-build.XXXXXX")"

cleanup() {
  rm -rf "$STAGING_DIR"
}

trap cleanup EXIT

echo "Preparing staging directory for $SCRIPT_NAME..."
cp -R "$TARGET_DIR"/. "$STAGING_DIR"/

echo "Overlaying shared utilities..."
for f in "$SHARED_DIR"/*.js; do
  if [ -f "$f" ]; then
    filename="$(basename "$f")"
    cp "$f" "$STAGING_DIR/$filename"
    echo "  + $filename"
  fi
done

echo ""
echo "Pushing to Google Apps Script..."
cd "$STAGING_DIR"

push_failed=0
clasp push || push_failed=1

cd "$REPO_ROOT"

if [ "$push_failed" -ne 0 ]; then
  echo ""
  echo "Error: clasp push failed. Staging files have been cleaned up."
  exit 1
fi

echo ""
echo "Done! $SCRIPT_NAME pushed successfully."
