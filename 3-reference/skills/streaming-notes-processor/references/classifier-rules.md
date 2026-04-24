# Classifier Rules — Streaming Notes Type Inference

Used by the processor when a Streaming Note has a missing or ambiguous `Type` field.
Telly and morning-sweep apply these at capture; processor back-stops when capture missed.

## Rule order (first match wins)

1. **Name prefix matches behavioral feedback syntax** → `Type = System Instruction`
   - Starts with `rule:`, `never:`, `always:`, `remember:` (case-insensitive).
   - Body mentions "Claudine should", "from now on", "default to", "stop doing".

2. **Body mentions build verbs + a system/repo concept** → `Type = Build Request`
   - Verbs: build, develop, create, implement, wire, ship, deploy, refactor, migrate, scaffold.
   - System concept: portal, Notion DB, skill, agent, workflow, API, endpoint, page, script, repo.
   - Example: "Build a processor for Streaming Notes" → Build Request.

3. **Body is a summary of a conversation, meeting, or call** → `Type = Thread Log`
   - Mentions "in the meeting", "Justin said", "on the call", "thread with", "transcript".
   - Has multiple speakers or a clear meeting header.

4. **Body describes how a sweep behaved** → `Type = Sweep Feedback`
   - Mentions "morning sweep", "evening sweep", "weekly sweep" + a behavior comment.
   - Example: "morning sweep missed the Zapier error" → Sweep Feedback.

5. **Body surfaces a one-off observation or anomaly** → `Type = Pulse Note`
   - Short (≤ 3 sentences), descriptive rather than action-oriented.
   - No clear verb for Brady to act on.
   - Example: "Faith got a $15 deposit from Zions Bank" → Pulse Note.

6. **Body contains a clear action verb directed at Brady** → `Type = Task` (fallback to `To Do`)
   - "remind me to", "I should", "need to", "don't forget to", "schedule [x]", "call [x]".

7. **Default fallback** → `Type = Note`
   - Anything not matching above. Treated with 72h SLA.

## Exemption markers (processor should skip these Types)

- `Daily State` — lifecycle owned by morning/evening sweep
- `Keep Handy` — intentionally persistent, Brady owns the lifecycle
- `Pin to Top` — intentionally persistent, Brady owns the lifecycle
- `Pulse Log` — auto-archived separately

## Priority inference (if `Priority` field is empty)

- Contains "urgent", "asap", "today", "blocker" → `Priority = Must`
- Contains "should", "important", "soon" → `Priority = Should`
- Contains "nice", "eventually", "someday" → `Priority = Could`
- Default → `Priority = Should`

Processor only sets `Priority` when field is empty — never overrides an existing value.

## Source inference (if `Source` field is empty)

Only Telly should set Source on capture. Processor should NOT infer Source — leave
empty and flag in the report. Unknown Source is a capture-side bug to fix, not a
processing-side guess.

## When classification fails

If no rule matches with confidence (multiple rules compete, or body is ambiguous):
- Leave `Type` as whatever it was (often empty or "Note" default)
- Do NOT action the item this run
- Surface it in the processor report under "Unclassified — surface for Brady"
- Let weekly disposition audit escalate if it ages past 14 days
