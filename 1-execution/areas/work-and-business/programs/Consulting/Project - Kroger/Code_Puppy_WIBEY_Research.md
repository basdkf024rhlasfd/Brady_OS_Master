# Walmart Developer AI: Code Puppy & WIBEY

**Research Report — March 31, 2026**
**Classification: Public Sources Only**

---

## Executive Summary

Walmart's internal developer AI tooling has matured rapidly since 2024, culminating in WIBEY — a "super agent" for developers that consolidates 200+ internal AI agents into a single orchestration layer. The story includes an open-source agentic coding tool built by a Walmart principal data scientist (Code Puppy) that gained grassroots internal adoption, and a full enterprise agentic platform (WIBEY) built on Walmart's proprietary Element ML platform. This evolution is significant because it represents the organizational muscle-building that separates Walmart's AI strategy from competitors who are purchasing off-the-shelf solutions.

---

## 1. Code Puppy — The Open-Source Agentic Coding Tool

### The Creator: Michael Pfaffenberger

**Background:** Joined Walmart Global Tech in 2021 as a **principal data scientist**, working on machine learning engineering, AI/ML governance, and fostering technological innovation. Later transitioned to a role within **Walmart's Global Investigations Technology** division.

**Interview source:** Featured in the Walmart Global Tech Blog's "Ideas in Action" TEDx Talk series (November 2023), where he discussed MLOps, LLMs, RAG systems, LoRA/QLoRA fine-tuning, and the challenges of GenAI governance at enterprise scale.

**Key quote from the interview:** On enterprise AI challenges — large companies "necessarily must move slower than small startups." On technique — "Prioritize prompt-engineering over fine-tuning and resort to fine-tuning when prompt-engineering alone doesn't live up to performance expectations."

### The Project Itself

**What it is:** An open-source, MIT-licensed, command-line AI coding agent. Think Cursor or Windsurf, but terminal-based, model-agnostic, and free.

**Origin story (from the PyPI description):** *"This project was coded angrily in reaction to Windsurf and Cursor removing access to models and raising prices."* The tagline: *"Who needs an IDE when you have 1024 angry puppies?"*

**GitHub:** github.com/mpfaffenberger/code_puppy
**PyPI:** pypi.org/project/code-puppy/
**Current version:** 0.0.436 (March 29, 2026) — actively maintained with near-daily releases
**Python:** Requires 3.11–3.13

**Core capabilities:**
- Agentic CLI/TUI interface for interactive code generation
- Customizable coding standards via "puppy rules" policy file
- Pluggable architecture: supports multiple LLM providers via API keys
- MCP (Model Context Protocol) server integrations for external tools
- DBOS durable execution support — checkpointing agent interactions for recovery
- Round Robin model distribution to overcome rate limits
- Custom JSON agent definitions for specialized assistants
- Integration with models.dev — access to 65+ providers and 1,000+ models

**Privacy stance:** Zero behavioral profiling, zero third-party data sharing, complete local option available (run your own VLLM/SGLang/Llama.cpp server — zero data leaves your network).

**Extended ecosystem:**
- **iPuppy Notebooks** — an agentic Jupyter-style notebook environment where a "Puppy Scientist" AI agent autonomously controls notebooks, writes code, executes analyses. FastAPI backend, React frontend, dark theme, LaTeX support.

### Internal Walmart Adoption

A LinkedIn profile for **John Choi** at Walmart Global Tech identifies himself as *"The Code Puppy Guy @ Walmart"*, suggesting the open-source tool gained internal traction beyond Pfaffenberger's personal use. Choi's posts reference Code Puppy presentations at Walmart all-hands meetings and associate adoption. The grassroots adoption — developers choosing this tool because they liked it, not because they were told to use it — is a cultural signal about the kind of builder-first environment Walmart has cultivated.

---

## 2. WIBEY — The Super Agent (August 2025)

### Launch Context

Announced at **Converge 2025**, Walmart's flagship retail technology event, on **August 29, 2025**. Blog post authored by **Sravana Karnati**, EVP of Global Technology Platforms, Walmart Global Tech.

WIBEY is one of **four "super agents"** in Walmart's consolidated AI framework:
1. **Sparky** — Customer-facing shopping agent
2. **My Assistant / Associate Agent** — For 1.5M+ store associates
3. **Marty** — For sellers, suppliers, and advertisers
4. **WIBEY** — For developers and technology operators

### What WIBEY Actually Is

WIBEY is **not** a code generation tool. It's an **invocation layer** — an orchestration agent that interprets developer intent and routes execution across Walmart's entire agentic ecosystem.

**From the official blog:** *"WIBEY is not a dashboard or portal — it's an invocation layer that interprets developer intent and orchestrates execution across Walmart's agentic ecosystem. It abstracts complexity and connects systems through clean prompts, shared context, and intelligent delegation."*

**Key distinction:** Code Puppy and similar tools help you write code. WIBEY helps you build, deploy, debug, comply, and operate software across Walmart's entire technology stack by routing your intent to the right agents automatically.

### Architecture

- **Built on Element** — Walmart's proprietary, multi-cloud ML platform (Kubernetes-based)
- **Federated model** — Domain teams own their agents; WIBEY makes them discoverable and interoperable
- **Protocols:** MCP (Model Context Protocol) for discovery and access, A2A (Agent-to-Agent) for delegation and chaining
- **Interfaces:** CLI, Slack, Visual Studio Code — meets developers where they work
- **Two user types:**
  - **Builders** (developers, engineers) who create agents and intelligent workflows
  - **Non-builders** (TPMs, PMs) who interact with agents to get work done

### What It Can Do

**From Sravana Karnati (EVP) interviews:**
- A single prompt can scaffold a service, resolve a compliance issue, or fix a pipeline — without needing to know which system handles what
- Generates tailored project starter kits based on prompt + preexisting context — no more searching internal portals for templates
- Scans codebases for accessibility compliance, applies fixes, writes test cases, runs automated browser tests — **8-10x improvement** in velocity for resolving accessibility issues
- Analyzes legacy COBOL code, maps to modern APIs, suggests equivalent implementations in Java, Go, or Rust
- Creates pull requests that developers review — keeps engineers in the driver's seat
- Consolidates 200+ previously fragmented internal agents into one entry point

**Key quote (Karnati):** *"This isn't just about code generation. It's about building systems that can make decisions, carry out actions, and improve over time."*

**Self-referential development:** *"We're at the point where we are developing WIBEY using WIBEY. The next-generation capabilities are developed using WIBEY CLI, and it's a bootstrapping technique."*

### The "Vibe Coding to Vibe Testing" Evolution

Walmart published a blog post on November 25, 2025 titled *"Think it. Prompt it. Build it. How our teams are vibe coding"* that profiles how associates use AI-assisted development internally.

**Key signals from the post:**
- Engineers are shifting from writing code to "orchestrating AI-assisted development"
- Teams built an automated bug fix and incident triage tool in **1.5 weeks** that previously would have taken months
- VP Jon Norwood: *"What used to take days of frustration now takes minutes."*
- The emphasis is on **oversight and guardrails**, not blind acceptance: *"There's no Control-Z in AI; you have to set up guardrails to get the right output."*
- Jeff Sandquist (Head of Product, Developer Experience & GenAI): *"I've regained my passion for coding."*

The phrase "vibe testing" — using AI to validate and test code rather than just generate it — represents the maturation from experimentation to production discipline.

---

## 3. The Element Platform Underneath Everything

All of Walmart's developer AI tools run on **Element**, their proprietary ML platform. Key capabilities as of August 2025:

- **Stateful architecture** — tracks what agents say, do, and aim to achieve (short-term and long-term memory)
- **Agent-aware pipelines** — propagates context and retrieves relevant information at the right time
- **Tool calling and plugin ecosystems** — agents interact with external systems natively
- **Standardized communication protocols** — seamless coordination between agents
- **API orchestration** — agents perform complex tasks across distributed systems
- **Deep observability** — decision paths, reasoning steps, tool usage monitoring
- **Multi-cloud deployment** — GPU-accelerated experimentation, enterprise service integration

Element also supports the **Wallaby** series of retail-specific LLMs, trained on decades of Walmart's own business data — product catalog, customer purchase patterns, internal terminology. This is the proprietary data moat that generic LLMs can't replicate.

---

## 4. Timeline Summary

| Date | Event |
|------|-------|
| **2021** | Michael Pfaffenberger joins Walmart Global Tech as principal data scientist |
| **Nov 2023** | Pfaffenberger interviewed for Walmart's "Ideas in Action" series on MLOps/LLMs |
| **Oct 2024** | Walmart publishes blog on internal developer AI tools (DX AI Assistant, DX Platform) |
| **Feb 2025** | McMillon discloses 4M developer hours saved by AI coding tools; plans broader rollout |
| **~Mid 2025** | Pfaffenberger's Code Puppy project gains internal traction at Walmart |
| **July 2025** | CTO Suresh Kumar announces "super agent" consolidation strategy |
| **Aug 29, 2025** | WIBEY and Element upgrades announced at Converge 2025 |
| **Nov 25, 2025** | Walmart publishes "vibe coding" blog profiling internal adoption |
| **Dec 2025** | IT Brew deep-dive confirms WIBEY self-bootstrapping, 200+ agent consolidation |
| **Mar 29, 2026** | Code Puppy v0.0.436 released — still actively maintained as open-source project |

---

## 5. Implications for the Kroger Thesis

This evolution — from grassroots open-source coding tools to enterprise agentic orchestration platform — is exactly the kind of organizational muscle-building that your AI Gap memo identifies as the core competitive risk for Kroger.

**What Kroger doesn't have (and can't buy):**
- A proprietary ML platform purpose-built for retail AI (Element)
- Retail-specific LLMs trained on decades of internal data (Wallaby)
- An agent orchestration layer that unifies hundreds of internal tools (WIBEY)
- A culture of grassroots AI adoption where developers build their own tools (Code Puppy) and leadership sanctions experimentation (vibe coding blog)
- The self-reinforcing talent flywheel — engineers who build WIBEY using WIBEY, which attracts more engineers who want to work on hard problems

Kroger's Google Gemini shopping assistant is consumer-facing. Walmart's developer AI stack is infrastructure-level. The gap isn't just in what customers see — it's in how fast each company can build, ship, and iterate on everything else.

---

## Sources

1. Walmart Global Tech Blog — "How Walmart is empowering developers with AI" (Oct 22, 2024)
2. Walmart Global Tech Blog — "From models to agents: A new era of intelligent systems at Walmart" (Aug 29, 2025)
3. Walmart Global Tech Blog — "Think it. Prompt it. Build it. How our teams are vibe coding" (Nov 25, 2025)
4. Medium / Walmart Global Tech Blog — "Ideas in Action: An Interview with Michael Pfaffenberger" (Nov 28, 2023)
5. PyPI — code-puppy package (v0.0.436, Mar 29, 2026)
6. GitHub — mpfaffenberger/code_puppy, mpfaffenberger/iPuppy-Notebooks
7. CIO Dive — "Walmart doubles down on AI with broader rollout of coding tools" (Feb 20, 2025)
8. SiliconANGLE — "Walmart embraces agentic AI with major ML platform upgrade" (Aug 29, 2025)
9. SiliconANGLE — "Developer-focused AI agents transform Walmart" (Sep 30, 2025)
10. IT Brew — "Inside Walmart's AI strategy" (Dec 8, 2025)
11. Chain Store Age — "Walmart introduces AI platform, super agents" (Sep 2, 2025)
12. AIM — "How Walmart's Super Agent Is Transforming Developer Workflows" (Sep 9, 2025)
13. Digital Commerce 360 — "Ecommerce Trends: How Walmart is using AI" (Jan 8, 2026)
14. Klover.ai — "Walmart Uses AI Agents: 10 Ways to Use AI" (Aug 7, 2025)
15. LinkedIn — John Choi profile ("The Code Puppy Guy @ Walmart")
