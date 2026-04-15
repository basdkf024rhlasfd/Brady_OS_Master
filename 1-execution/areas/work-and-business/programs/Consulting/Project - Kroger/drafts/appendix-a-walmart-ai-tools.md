# Appendix A: Walmart Developer AI Stack — Reference

> Competitive intelligence. Public sources only. Current as of March 2026.

---

## Overview

Walmart's internal developer AI tooling has matured from grassroots experimentation into enterprise-grade infrastructure. The stack has three layers — an open-source coding agent, a "super agent" orchestration platform, and a proprietary ML foundation — supported by retail-specific language models trained on decades of Walmart's own data. This represents organizational muscle-building, not just tool adoption.

---

## Layer 1: Code Puppy — The Grassroots Coding Agent

**What it is:** Open-source, MIT-licensed, command-line AI coding agent built by Michael Pfaffenberger, a Walmart principal data scientist. Terminal-based, model-agnostic, free.

**Origin:** Created in frustration after Cursor and Windsurf raised prices and restricted model access. Tagline: "Who needs an IDE when you have 1024 angry puppies?"

**Current state (March 2026):** Version 0.0.436, actively maintained with near-daily releases. Supports MCP server integrations, DBOS durable execution, 65+ providers and 1,000+ models via models.dev.

**Internal adoption signal:** John Choi at Walmart Global Tech self-identifies publicly as "The Code Puppy Guy @ Walmart" — indicating grassroots adoption beyond Pfaffenberger's personal use. Presentations at Walmart all-hands meetings. Developers chose this tool because they liked it, not because they were told to use it.

**Why it matters for Kroger:** The cultural signal. Walmart has an environment where a principal data scientist builds an open-source AI tool, it gains internal traction organically, and leadership sanctions it. Kroger's AI tools are heavily firewalled — employees can't scrape external data, even from government websites.

---

## Layer 2: WIBEY — The Super Agent

**Launched:** August 29, 2025, at Converge 2025. One of four Walmart "super agents" (alongside Sparky for customers, My Assistant for associates, Marty for suppliers).

**What it is:** An orchestration layer — not a code generation tool. WIBEY interprets developer intent and routes execution across Walmart's entire agentic ecosystem. A single prompt can scaffold a service, resolve a compliance issue, or fix a pipeline without the developer knowing which system handles what.

**Architecture:**
- Built on Element (Walmart's proprietary ML platform)
- Federated model — domain teams own their agents; WIBEY makes them discoverable and interoperable
- Protocols: MCP (discovery/access) + A2A (agent-to-agent delegation)
- Interfaces: CLI, Slack, Visual Studio Code
- Consolidates 200+ previously fragmented internal agents into one entry point

**Demonstrated capabilities:**
- Generates project starter kits from prompt + context (no portal searching)
- Scans for accessibility compliance, applies fixes, writes tests — 8-10x velocity improvement
- Analyzes legacy COBOL code, maps to modern APIs, suggests implementations in Java/Go/Rust
- Creates PRs that developers review — humans stay in the loop
- Self-bootstrapping: "We are developing WIBEY using WIBEY"

**Key quote (Sravana Karnati, EVP):** "This isn't just about code generation. It's about building systems that can make decisions, carry out actions, and improve over time."

---

## Layer 3: Element Platform + Wallaby LLMs

**Element:** Walmart's proprietary, multi-cloud, Kubernetes-based ML platform. Capabilities:
- Stateful architecture — tracks what agents say, do, and aim to achieve
- Agent-aware pipelines with context propagation
- Tool calling and plugin ecosystems
- Deep observability — decision paths, reasoning steps, tool usage monitoring

**Wallaby:** Retail-specific LLMs trained on decades of Walmart data — product catalog, customer purchase patterns, internal terminology. This is the proprietary data moat that generic LLMs cannot replicate.

---

## Timeline

| Date | Event |
|------|-------|
| 2021 | Pfaffenberger joins Walmart Global Tech |
| Nov 2023 | Pfaffenberger interviewed on MLOps/LLMs |
| Oct 2024 | Walmart publishes blog on internal developer AI tools |
| Feb 2025 | McMillon discloses 4M developer hours saved by AI coding tools |
| Mid 2025 | Code Puppy gains internal traction |
| July 2025 | CTO announces "super agent" consolidation strategy |
| Aug 2025 | WIBEY + Element upgrades announced at Converge 2025 |
| Nov 2025 | "Vibe coding" blog profiles internal adoption culture |
| Mar 2026 | Code Puppy v0.0.436 released — still actively maintained |

---

## The Gap

Kroger has internal AI tools. Employees can switch between LLM models. But the tools are firewalled, used as chat interfaces, not connected into workflows or agent architectures. There is no equivalent of Element (purpose-built ML platform), Wallaby (retail-specific LLMs), WIBEY (agent orchestration), or Code Puppy's cultural signal (grassroots builder adoption). The gap is not tools. It's organizational muscle.

---

*Sources: Walmart Global Tech Blog (Oct 2024, Aug 2025, Nov 2025), PyPI/GitHub (code-puppy), CIO Dive (Feb 2025), SiliconANGLE (Aug-Sep 2025), IT Brew (Dec 2025), LinkedIn (John Choi profile). Full source list available on request.*
