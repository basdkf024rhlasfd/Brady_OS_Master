#!/bin/bash
# Copies global-claude-code.md to ~/.claude/CLAUDE.md
# Run after editing global-claude-code.md

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE="$SCRIPT_DIR/global-claude-code.md"
TARGET="$HOME/.claude/CLAUDE.md"

if [ ! -f "$SOURCE" ]; then
  echo "ERROR: $SOURCE not found"
  exit 1
fi

mkdir -p "$HOME/.claude"
cp "$SOURCE" "$TARGET"
echo "Installed global-claude-code.md → ~/.claude/CLAUDE.md"
