# Layer 0 - Agent Index

This is the drafting guide for Brady OS.

The roster is intentionally broad. Do not start by browsing all 148 agents. Start with the smallest useful team, then add specialists only when the work actually demands them.

## How To Draft

Use this order:

1. Pick the core decision owner.
2. Add one builder or operator.
3. Add one reviewer or scope guard.
4. Add specialists only for clear domain gaps.

Default rule: 3-5 agents is a team. More than that needs a reason.

## Custom-Built Agents

These are the house agents. Start here before drafting from the imported pool.

| Agent | Best Used For | Avoid Using For |
|-------|---------------|-----------------|
| [Bo](custom-built-agents/bo.md) | intake, triage, prioritization, scope control, sequencing | therapy, philosophy, speculative planning |
| [Burt](custom-built-agents/burt.md) | judgment calls, blunt advice, decision compression | operating the OS, formal workflows, system design |
| [Claudine](custom-built-agents/claudine.md) | synthesis, review, structured analysis, code-mode artifact generation | autonomous execution, outbound actions, task/database edits |
| [Cornelius](custom-built-agents/cornelius.md) | Notion operations, routing, archival structure, daily ops | strategy, coaching, meaning work |
| [Mason](custom-built-agents/mason.md) | rebuild guides, activation kits, public packaging, starter-kit creation | day-to-day operations, live execution management |
| [Musashi San](custom-built-agents/musashi.md) | product ownership, competitive intelligence, client-facing surface quality | building, architecture, direct client comms |
| [Phil](custom-built-agents/phil.md) | coherence checks, assumption testing, authority-horizon questions | task planning, SOP writing, operating changes |
| [Bertha](custom-built-agents/bertha.md) | state regulation, standards, self-alignment, grounded clarity | OS architecture, database design, clinical support |

## Imported Agent Categories

These are the community specialists. Use the category first, then the individual agent.

| Category | Count | Primary Use |
|----------|-------|-------------|
| `marketing/` | 26 | content, growth, social, channel-specific execution |
| `engineering/` | 23 | software delivery, architecture, data, security, devops |
| `specialized/` | 23 | niche domains, orchestration, compliance, automation, research ops |
| `design/` | 8 | UX, visual direction, storytelling, brand and image work |
| `testing/` | 8 | QA, accessibility, evidence collection, performance checks |
| `sales/` | 8 | pipeline, discovery, deals, proposals, account strategy |
| `paid-media/` | 7 | PPC, paid social, tracking, media buying |
| `project-management/` | 6 | planning, delivery coordination, studio operations |
| `support/` | 6 | reporting, summaries, legal/compliance, infra support |
| `spatial-computing/` | 6 | visionOS, XR, immersive interfaces, terminal integration |
| `examples/` | 6 | orchestration examples and sample workflows |
| `game-development/` | 5 | game design, narrative, audio, technical art |
| `product/` | 4 | research, prioritization, behavioral design, feedback synthesis |
| `strategy/` | 3 | high-level strategy references and imported strategic patterns |
| `integrations/` | 1 | tool-installation and distribution docs for imported agents |

## Drafting Matrix

Use these as default lineups, not rigid rules.

| Mission | Start With | Add When Needed |
|--------|------------|-----------------|
| OS triage or overloaded day | [Bo](custom-built-agents/bo.md), [Burt](custom-built-agents/burt.md), [Cornelius](custom-built-agents/cornelius.md) | [Phil](custom-built-agents/phil.md) if the problem is really a coherence problem |
| Rebuild or share the OS with a friend | [Mason](custom-built-agents/mason.md), [Claudine](custom-built-agents/claudine.md), [Phil](custom-built-agents/phil.md) | [Cornelius](custom-built-agents/cornelius.md) if the package needs Notion/database translation |
| New project kickoff | [Bo](custom-built-agents/bo.md), [Phil](custom-built-agents/phil.md), [project-management-project-shepherd.md](imported-agents/project-management/project-management-project-shepherd.md) | [Claudine](custom-built-agents/claudine.md) for structured specs |
| Product or client surface design | [Musashi San](custom-built-agents/musashi.md), [design-ux-architect.md](imported-agents/design/design-ux-architect.md), [product-trend-researcher.md](imported-agents/product/product-trend-researcher.md) | [design-ui-designer.md](imported-agents/design/design-ui-designer.md), [design-ux-researcher.md](imported-agents/design/design-ux-researcher.md) |
| Code build | [Claudine](custom-built-agents/claudine.md), [engineering-senior-developer.md](imported-agents/engineering/engineering-senior-developer.md), [engineering-software-architect.md](imported-agents/engineering/engineering-software-architect.md) | [engineering-devops-automator.md](imported-agents/engineering/engineering-devops-automator.md), [engineering-database-optimizer.md](imported-agents/engineering/engineering-database-optimizer.md) |
| Quality and release review | [testing-reality-checker.md](imported-agents/testing/testing-reality-checker.md), [testing-evidence-collector.md](imported-agents/testing/testing-evidence-collector.md), [testing-accessibility-auditor.md](imported-agents/testing/testing-accessibility-auditor.md) | [testing-performance-benchmarker.md](imported-agents/testing/testing-performance-benchmarker.md), [engineering-security-engineer.md](imported-agents/engineering/engineering-security-engineer.md) |
| Consulting engagement delivery | [Musashi San](custom-built-agents/musashi.md), [sales-account-strategist.md](imported-agents/sales/sales-account-strategist.md), [product-feedback-synthesizer.md](imported-agents/product/product-feedback-synthesizer.md) | [marketing-seo-specialist.md](imported-agents/marketing/marketing-seo-specialist.md), [support-executive-summary-generator.md](imported-agents/support/support-executive-summary-generator.md) |
| GTM and pipeline building | [sales-outbound-strategist.md](imported-agents/sales/sales-outbound-strategist.md), [sales-proposal-strategist.md](imported-agents/sales/sales-proposal-strategist.md), [marketing-growth-hacker.md](imported-agents/marketing/marketing-growth-hacker.md) | [marketing-linkedin-content-creator.md](imported-agents/marketing/marketing-linkedin-content-creator.md), [paid-media-ppc-strategist.md](imported-agents/paid-media/paid-media-ppc-strategist.md) |
| Writing and publishing | [marketing-content-creator.md](imported-agents/marketing/marketing-content-creator.md), [engineering-technical-writer.md](imported-agents/engineering/engineering-technical-writer.md), [design-visual-storyteller.md](imported-agents/design/design-visual-storyteller.md) | [marketing-podcast-strategist.md](imported-agents/marketing/marketing-podcast-strategist.md), [marketing-carousel-growth-engine.md](imported-agents/marketing/marketing-carousel-growth-engine.md) |
| Research or opportunity scan | [product-trend-researcher.md](imported-agents/product/product-trend-researcher.md), [sales-pipeline-analyst.md](imported-agents/sales/sales-pipeline-analyst.md), [specialized-data-consolidation-agent.md](imported-agents/specialized/data-consolidation-agent.md) | [specialized-report-distribution-agent.md](imported-agents/specialized/report-distribution-agent.md), [support-analytics-reporter.md](imported-agents/support/support-analytics-reporter.md) |

## Fast Picks

If you do not know where to start, use one of these:

- Need clarity on what to do next: [Bo](custom-built-agents/bo.md)
- Need a blunt recommendation: [Burt](custom-built-agents/burt.md)
- Need coherence and assumption pressure-testing: [Phil](custom-built-agents/phil.md)
- Need structured synthesis or review: [Claudine](custom-built-agents/claudine.md)
- Need a rebuild guide, starter kit, or friend-safe package: [Mason](custom-built-agents/mason.md)
- Need Notion or system routing: [Cornelius](custom-built-agents/cornelius.md)
- Need product judgment for a client-facing surface: [Musashi San](custom-built-agents/musashi.md)

## Operating Notes

- Do not use agent count as a proxy for rigor.
- Keep role separation clean: owner, builder, reviewer, specialist.
- Prefer named draft patterns over ad hoc agent piles.
- When a custom-built agent and an imported specialist overlap, the custom-built agent usually owns the decision and the imported specialist fills the domain gap.
