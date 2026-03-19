# Rebuild Packaging

This file defines how Brady OS should be packaged for replication by another person.

The current standalone package lives in [public-pack/](public-pack/README.md).

## The Core Split

There should be two different prompt layers.

### 1. Activation Prompt

This is the installation layer.

Use it when someone is standing up their version of the OS for the first time.

Its job is to:

- explain the four-layer model in plain language
- ask for the minimum configuration choices
- generate the initial files and folder scaffold
- define the first Programs and Projects
- map the starter tool stack
- hand off cleanly into runtime operation

The activation prompt is temporary. Once setup is complete, it should mostly disappear.

### 2. Operating Prompt

This is the runtime layer.

Use it after the system exists.

Its job is to:

- maintain doctrine and authority horizons
- route information to the correct layer
- preserve role boundaries between agents
- keep execution aligned with Programs and Projects
- prevent day-to-day chaos from rewriting the system

The operating prompt is durable. It governs the live system after installation.

### Optional 3. Project Overlay Prompt

Use this only when a specific customer, domain, or project needs its own dedicated point of view.

Examples:

- STIHL competitive intelligence
- a venture-specific product owner
- a board-governance overlay

This prompt must sit on top of the operating prompt, not replace it.

## Agent Ownership

Use the agents like this:

- [Mason](../0-agents/custom-built-agents/mason.md): owns rebuild files, starter kits, activation kits, and public packaging
- [Claudine](../0-agents/custom-built-agents/claudine.md): reviews clarity, structure, and artifact quality
- [Cornelius](../0-agents/custom-built-agents/cornelius.md): translates packaged structure into Notion/database-friendly operating forms
- [Phil](../0-agents/custom-built-agents/phil.md): checks coherence and prevents category errors

## What Mason Should Produce

The canonical packaging set should include:

1. `PUBLIC-OVERVIEW.md`
2. `REBUILD-BRADY-OS.md`
3. starter templates for one Area, one Program, and one Project
4. an activation prompt or install script for first-time setup
5. a minimal starter-agent pack description

## Decision Rule

If the question is "How does the OS work once it exists?" use the operating prompt.

If the question is "How do I give this to someone else so they can stand it up?" use Mason and the activation prompt.

If the question is "How does this specific project think?" use a project overlay prompt.
