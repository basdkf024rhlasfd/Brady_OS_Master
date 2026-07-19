---
name: phone-ai-interviewer
trigger: "design a phone AI interviewer", "voice screener", "autonomous phone screen", "AI phone interview"
input: a role + screening criteria/knockouts (ideally the role scorecard)
output: deliverables/phone-ai-screener-<role>-YYYY-MM-DD/ (a complete, deployable screening design)
mode: Build
---

# Phone AI Interviewer

Designs a **complete, deployable autonomous phone (or voice/chat) screening process** for a
high-volume role — the piece that closes the follow-through gap. Instead of a coordinator
manually calling hundreds of applicants, an AI voice agent calls every qualified applicant within
minutes, runs a consistent knockout-first screen, scores it against the scorecard, and hands a
human a ranked "advance these" list. Humans still make every advance/pass call.

This is the flagship. It's what Brady meant by "walk him through creating a phone AI interview
autonomous process." The durable value is the **design + compliance + scoring** — the specific
vendor is a swappable implementation detail.

## What you produce (a package, not one file)

A folder `deliverables/phone-ai-screener-<role>-YYYY-MM-DD/` containing:
1. `01-screen-design.md` — objectives, knockouts, the conversation flow, scoring rubric.
2. `02-conversation-script.md` — the actual agent script/prompt (intro, consent, questions,
   branching, objection handling, close) — paste-ready into the chosen platform.
3. `03-build-spec.md` — the recommended stack, the wiring, the data write-back, a phased rollout.
4. `04-compliance.md` — consent, disclosures, EEOC/bias controls, recording-law notes, adverse
   action, accommodation path.
5. `05-pilot-plan.md` — how to test on a small batch, what to measure, go/no-go criteria.

## Process

1. **Load context.** `reference/hr-playbook.md` §1 (structured interviewing) + §5 (automated-screening
   compliance), `reference/retail-sales-hiring.md` (the two knockouts), `company-context.md` (ATS =
   Workable/Indeed; the daily-shortlist vision). Load the role scorecard.
2. **Define screen objectives & knockouts.** The AI screen exists to do the fast, consistent,
   knockout-first pass a human keeps failing to do at volume. For RSA that's: confirm **schedule
   availability** (weekends/holidays), **commission comfort**, **money-motivation**, basic
   **logistics** (location/commute, work authorization, start availability), and capture a **short
   work-sample** ("in 30 seconds, sell me something you love"). Everything else stays for the human
   manager onsite.
3. **Design the conversation flow.** Map the call: warm intro → **consent/disclosure** (AI agent,
   recording, purpose) with an easy opt-out to a human → knockout questions (branch: hard-fail →
   polite close + human-review flag, never an on-call rejection) → motivation + work-sample →
   candidate Q&A / role reality (sell the money honestly) → close + clear next step + timeline.
   Keep it 5–8 minutes. Natural, not robotic.
4. **Write the agent script/prompt** (`02`). Full language for each node, branch logic, objection
   handling ("is this really 100% commission?" → honest, motivating answer), and the scoring
   instruction the agent applies. Voice: friendly, direct, on-brand.
5. **Define the scoring rubric.** The agent (or a post-call LLM pass on the transcript) scores each
   criterion on the scorecard's anchored 1–5, extracts the knockout answers as structured fields,
   and produces advance/hold/pass **as a recommendation**. Show how it feeds `candidate-screener`'s
   daily digest.
6. **Spec the build** (`03`). Recommend a stack and wire it:
   - **Voice agent platform** (menu — pick by budget/control; verify current capabilities/pricing
     before committing): **Vapi**, **Bland AI**, **Retell AI** (voice-agent orchestration over
     telephony), or **Twilio + an LLM + a TTS/STT** for full control. For a text/SMS or async-video
     screen instead of live voice, note that lighter path too.
   - **Brain:** an LLM (Claude) driving the conversation + a post-call transcript-scoring pass.
   - **Trigger:** new qualified applicant in Workable → webhook → outbound call within minutes.
   - **Write-back:** structured result (knockout fields, scores, transcript, recommendation) → back
     to Workable/a sheet/the daily digest. Human reviews and advances.
   - Give a **phased rollout**: (v0) async — AI reviews the "sell us something" video + resume and
     ranks; (v1) inbound IVR or scheduled AI call for opted-in applicants; (v2) automatic outbound
     call on new qualified applicant. Start at the lowest-risk rung that clears value.
7. **Compliance design** (`04`). This is non-optional for automated screening:
   - **Disclosure & consent:** tell candidates they're speaking with an AI, that it's recorded, and
     why; offer a human alternative. Get consent before recording.
   - **Recording law:** flag **two-party-consent states** — the client operates across multiple
     states (incl. FL, a two-party state); the script must obtain consent up front everywhere.
   - **Bias & job-relatedness:** every question job-related; no protected-class questions or proxies;
     score only job-relevant content; plan a **bias audit / monitoring** and note NYC LL144-style
     and state ADMT/AI-hiring rules where applicable. Provide reasonable-accommodation and a
     non-AI path on request.
   - **No autonomous rejection / adverse action:** the AI recommends; a human decides. If a
     background check later drives rejection, FCRA adverse-action steps apply.
   - Flag material legal calls for the client's employment counsel — Hunter is not a lawyer.
8. **Pilot plan** (`05`). Small batch (one role, one-two locations), measure: completion rate,
   candidate sentiment, screen→interview lift, time-to-first-contact drop, false-knockout rate
   (audit a sample of "fails" by hand). Go/no-go before scaling.

## Quality bar

- Deployable, not conceptual: Brandon could hand `02`+`03` to a builder and stand up a pilot.
- Sounds human, respects the candidate's time, and *sells* the role while it screens.
- Compliance is designed in from line one, not bolted on.
- Every path preserves a human decision and a human alternative.

## Guardrails

- **The AI never rejects or hires.** Knockout "fails" are flagged for human review, framed to the
  candidate as "our team will follow up," never as an on-call no.
- **Consent + disclosure + recording law** handled before any recording, in every state.
- **Job-related only**, bias-audited, accommodation available, human-in-the-loop on every adverse
  decision. Surface the specific regulatory obligations; don't hand-wave them.
- Recommend verifying current platform capabilities/pricing — this space moves fast; don't hard-code
  vendor claims.

## Example

> **Brandon:** design a phone AI interviewer for RSA screening — knockouts are schedule and
> commission comfort, and I want it to grab a 30-second sell-me sample.

→ `deliverables/phone-ai-screener-retail-sales-associate-2026-07-18/` with a 6-minute consent-first
call flow, the full agent script, a Vapi/Bland-or-Twilio build spec that fires on a new Workable
applicant and writes scores back to the daily digest, a multi-state recording-consent compliance
doc, and a one-location pilot plan.
