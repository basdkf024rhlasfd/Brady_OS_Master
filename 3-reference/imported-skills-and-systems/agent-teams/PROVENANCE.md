# PROVENANCE — agent-teams

**Source:** https://github.com/wshobson/agents  
**Plugin path:** `plugins/agent-teams/`  
**Author:** wshobson  
**Imported:** 2026-04-27  
**Commit/version:** latest main as of import date (34k+ stars)  
**License:** see parent repo

## What this is

Multi-agent team orchestration for Claude Code. Implements patterns for spawning parallel sub-agents, coordinating work across team roles (lead, implementer, reviewer, debugger), and managing handoffs between agents.

Directly relevant to Brady OS because: this is the native Claude Code implementation of the super-agent/sub-agent architecture — specifically the pattern where Musashi San (Head Coach) spawns Yuki Ronin (builder) instances or deploy sub-agents.

## Skills included

- `multi-reviewer-patterns` — parallel code review across multiple agent instances
- `parallel-debugging` — hypothesis-driven debugging with parallel agent tracks
- `parallel-feature-development` — file ownership and merge strategy for parallel builds
- `task-coordination-strategies` — dependency graphs and task decomposition for multi-agent runs
- `team-communication-protocols` — messaging patterns between coordinating agents
- `team-composition-patterns` — how to select agent types and compose preset teams

## Agents included

- `team-lead.md` — orchestrator role (maps to Musashi's Head Coach function)
- `team-implementer.md` — builder role (maps to Yuki Ronin)
- `team-reviewer.md` — review role
- `team-debugger.md` — debug role

## Brady OS integration notes

- **Musashi ↔ team-lead**: team-lead's orchestration patterns are reference implementations for how Musashi should spawn and coordinate sub-agents in Deploy Mode and post-approval build execution
- **Yuki Ronin ↔ team-implementer**: Yuki's "Scale Mode (Fubuki-tai)" maps directly to the parallel-feature-development patterns here
- **Experimental flag**: Agent Teams requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` env var — not yet wired in Brady OS settings. Check `3-reference/skills/_shared/` for where to add this.

## Status

Standalone — imported for reference. Promote individual skills to core OS when wiring specific multi-agent flows.
