# §5.1 — AI Capability Gap vs. Walmart

## Situation

Walmart's developer-facing AI infrastructure has evolved from grassroots adoption to enterprise orchestration. By August 2025, Walmart consolidated over 200 internal AI agents into WIBEY — a "super agent" that interprets developer intent and routes execution across their entire technology stack. This platform runs on Element, Walmart's proprietary ML infrastructure, which itself is trained on the Wallaby series of retail-specific LLMs built from decades of Walmart's own business data.

Code Puppy, an MIT-licensed open-source coding agent built by Walmart principal data scientist Michael Pfaffenberger, gained grassroots internal traction as a developer tool. John Choi at Walmart Global Tech became "the Code Puppy guy," presenting the tool at all-hands meetings. This adoption pattern — engineers choosing tools because they work, not because they're mandated — signals organizational muscle that Kroger doesn't have.

By November 2025, Walmart published case studies on "vibe coding": engineers orchestrating AI-assisted development, with teams building automated bug-fix and incident-triage tools in 1.5 weeks that previously took months. The phrase "vibe testing" — using AI to validate code rather than just generate it — represented the shift from experimentation to production discipline. VP Jon Norwood: "What used to take days of frustration now takes minutes."

## Complication

Kroger has internal AI tools. Employees can switch between different LLM models via a multi-model interface. But they're heavily firewalled — can't scrape external data, even from government websites. People use them as chat interfaces. No agent orchestration. No workflow building. No scaling to developer productivity.

This is the adoption gap the AI Gap memo identified: pilots, not transformation. Kroger's internal tooling exists at roughly the same feature level Walmart had in 2023. The gap isn't tooling anymore — it's organizational muscle.

Walmart's developer AI stack is infrastructure-level. Kroger's is consumer-facing (Google Gemini shopping assistant). One accelerates how fast the company ships everything. The other is a feature. The speed delta will compound over the next 18 months.

Milen Mahadevan, newly promoted to Chief Data and AI Officer and still leading 84.51°, has significant capital allocated for 2026 and beyond. But capital doesn't close a 2-year infrastructure gap overnight. The gap exists because Walmart built it on top of in-house talent, governance, and platform decisions made incrementally since 2021. Kroger can't buy that — it has to be built.

## Resolution

Establish a "Developer AI Command Center" reporting directly to the CTO that mirrors WIBEY's architecture:

1. **Audit current AI tool adoption** — exactly how many Kroger technologists use internal LLM tools, what they use them for, friction points. This becomes your baseline.

2. **Build a federated agent model** — domain teams (merchandising, supply chain, e-commerce) own their agents; the command center makes them discoverable and interoperable. Start with three domain teams (not all 50+ teams at once).

3. **Hire or elevate a "Developer Experience" lead** — someone with track record at Walmart Global Tech or similar scale (15K+ engineer organization). This person sets tool standards and gets engineers excited about using them.

4. **Invest in MCP (Model Context Protocol) integration** — this is Walmart's protocol for agent discoverability and coordination. It's not proprietary, it's becoming retail standard. Start integrating KTD's major platforms to support agent-to-agent communication.

5. **Set adoption targets** — Walmart hit 4M developer hours saved by 2025. Target Kroger at 500K developer hours saved in Year 1 (by month 18), scaled to 2M by Year 2. Measure and report to the board quarterly.

The difference between Walmart and Kroger isn't talent or money. It's that Walmart built an infrastructure flywheel starting in 2021 and didn't stop. Kroger stopped building. You're starting fresh, which means you can move faster if you move decisively. The window is 18 months before Walmart's next-gen capabilities become standard competitive feature, not differentiator.
