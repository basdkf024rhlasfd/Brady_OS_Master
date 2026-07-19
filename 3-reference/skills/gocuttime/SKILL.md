---
name: gocuttime
agent: Finn (0-agents/custom-built-agents/finn.md)
description: >
  End-to-end handler for CutTime (app.gocuttime.com) school choir forms. Detects
  incoming requests from Terry Hicks / BHS Choir via iMessage, navigates to the form,
  fills all questions from Finn's data map, and submits. Brady should never have to
  touch these.

  TRIGGER whenever Brady says: "check CutTime", "fill out the choir form", "permission
  slip", "Terry Hicks sent something", "CutTime form", or any variation indicating a
  school choir form needs to be handled.

  Also runs automatically during morning-sweep Phase 1 iMessage scan when +18443858463
  has unread messages (CutTime SMS channel).

trust_tier: T1
surfaces: [cowork]
version: 0.1
created: 2026-04-22
---

# CutTime Skill

Brady's BHS Choir program uses CutTime (`app.gocuttime.com`) for permission slips,
announcements, and questionnaires. Terry Hicks sends requests via SMS from +18443858463.
Finn owns this channel end-to-end — detect, navigate, fill, submit.

---

## Micro-Skill 1: DETECT

**Purpose:** Find pending CutTime requests in iMessage.

**When to run:** Morning sweep iMessage phase, or any time Brady mentions Terry Hicks,
choir forms, or CutTime.

**How:**

```bash
sqlite3 ~/Library/Messages/chat.db "
SELECT datetime(m.date/1000000000 + 978307200, 'unixepoch', 'localtime') as sent_at,
       hex(m.attributedBody)
FROM message m
JOIN handle h ON m.handle_id = h.rowid
WHERE h.id = '+18443858463'
  AND m.date > (strftime('%s','now') - 978307200 - 604800) * 1000000000
ORDER BY m.date DESC
LIMIT 10;" 2>/dev/null
```

Then decode each hex body with Python:
```python
import sys, re, binascii
raw = bytes.fromhex(HEX_VALUE)
text = raw.decode('utf-8', errors='ignore')
readable = re.sub(r'[^\x20-\x7E\n]', ' ', text)
readable = re.sub(r' +', ' ', readable).strip()
```

**What to look for in decoded text:**
- `app.gocuttime.com/g/q/` → **Questionnaire/form** (permission slip, info form) → run Micro-Skill 3
- `app.gocuttime.com/g/a/` → **Announcement** → read and log to Streaming Notes, no form to fill
- `app.gocuttime.com/g/p/` → **Profile/document signature request** → navigate and sign

**Output:** List of pending CutTime items with URL, type, and date. If none, note "No pending CutTime forms."

---

## Micro-Skill 2: PARSE URL

**Purpose:** Extract the correct form URL to navigate to.

**Pattern:**
- Questionnaire URL: `https://app.gocuttime.com/g/q/[CODE]?idp=[GUARDIAN_ID]`
- Brady's guardian ID: `HZiSHFxQ`
- Example: `https://app.gocuttime.com/g/q/RU7TTR8E?idp=HZiSHFxQ`

**When multiple forms sent:** The message with "for Lily Smallwood" is the student-specific
form (use this one). The form without a student name is the general guardian form — check
if it's a duplicate or separate.

**Note on attributedBody:** CutTime messages don't have plain `text` in the SQLite DB —
the content is binary-encoded in `attributedBody`. Always use the hex decode approach
from Micro-Skill 1, not `m.text`.

---

## Micro-Skill 3: NAVIGATE

**Purpose:** Open the CutTime form in Chrome.

**Steps:**
1. Check current Chrome tabs via `tabs_context_mcp` — if CutTime is already open, use
   that tab. Otherwise create a new tab.
2. Navigate to the form URL from Micro-Skill 2.
3. If login is required: CutTime uses the guardian's phone number for auth. Brady's
   number: **801-376-3737**. Enter and wait for SMS code — prompt Brady if needed.
4. Read the page to confirm form title and current question number (N / total).

---

## Micro-Skill 4: FILL

**Purpose:** Work through all questions, using Finn's data map (below) for known answers.

**Loop:**
1. Read current page via `read_page` (filter: all, depth: 8)
2. Identify question heading
3. Look up answer in Data Map (Micro-Skill 5)
4. If known → fill via `form_input` + click Next/Finish
5. If unknown → pause, show Brady the question, wait for answer, log it to Data Map after
6. Take screenshot after each submit to confirm advance

**Question type handling:**
- `textbox (type="text")` → `form_input` with string value
- `textbox (type="textbox" / textarea)` → `form_input` with string value
- `button (type="submit")` → `computer left_click` via ref or find("Next button")
- `select` → `form_input` with option text
- `radio/checkbox` → `computer left_click` on the option ref

**Finish button:** The last question uses a "Finish" submit button instead of "Next" —
same click pattern, different label.

**Confirm submission:** After Finish, read the page title — look for "Request complete"
or "You're all done!" confirmation text.

---

## Micro-Skill 5: DATA MAP

Finn's known answers for any CutTime form. Update this section immediately when new
answers are provided.

| Question (any variation) | Answer | Source | Last verified |
|---|---|---|---|
| Student Name | Lily Smallwood | family roster | 2026-04-22 |
| Student ID / 4000XXXXX | 400037467 | Lily via text | 2026-04-22 |
| Grade | 11th (Junior) | family roster | 2026-04-22 |
| School | Bentonville High School | family roster | 2026-04-22 |
| Parent/Guardian Name | Brady Smallwood | — | permanent |
| Parent/Guardian Phone | 801-376-3737 | Brady confirmed | 2026-04-22 |
| Parent/Guardian Email | brady.smallwood@gmail.com | — | permanent |
| Emergency Contact Name | Brady Smallwood | Brady confirmed | 2026-04-22 |
| Emergency Contact Phone | 801-376-3737 | Brady confirmed | 2026-04-22 |
| Insurance / Insurance Information | UHC Choice Plus \| Member ID: 10875116500 \| Group: 1747178 | finn.md | 2026-04-22 |
| Signature / Parent Signature | Brady Smallwood | Brady confirmed | 2026-04-22 |
| Today's Date / Date | current date (MM/DD/YYYY) | auto | — |
| Medical conditions / allergies | *(ask Brady — not yet on file)* | — | — |
| T-shirt size | *(ask Brady — not yet on file)* | — | — |
| Chaperone / volunteer interest | *(ask Brady — not yet on file)* | — | — |
| Room with / roommate preference | *(ask Brady — not yet on file)* | — | — |
| Dietary restrictions | *(ask Brady — not yet on file)* | — | — |

**Faith Smallwood data (for her forms when they arrive):**

| Question | Answer | Source | Last verified |
|---|---|---|---|
| Student Name | Faith Smallwood | family roster | 2026-04-22 |
| Student ID | *(still needed — ask Faith or BHS)* | — | — |
| Grade | 9th (Freshman) | family roster | 2026-04-22 |

**Rule:** If a question doesn't map to the Data Map, pause and ask Brady. After he answers,
add it to the table immediately before proceeding.

---

## Micro-Skill 6: SUBMIT & CONFIRM

**Purpose:** Submit the form and confirm receipt.

**Steps:**
1. Click "Finish" button on the final question
2. Read the resulting page — look for:
   - Title: "Request complete · Cut Time"
   - Body: "You're all done!" or "Your responses have been sent to your program admin."
3. If confirmed → log completion (Micro-Skill 7)
4. If error or still on a question → re-read the page, identify what's missing, fix and retry

---

## Micro-Skill 7: LOG

**Purpose:** Record completion in Streaming Notes so it's never lost.

**After every successful submission:**

Log to Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`):
```
Type: Thread Log
Name: CutTime — [Form Name] — [Student] — [YYYY-MM-DD]
Tags: ["Finn", "CutTime", "School", "Submitted"]
Status: Complete
Done: __YES__
Body:
  Form: [form title]
  Student: [student name]
  Submitted by: Finn (Brady Smallwood, guardian)
  Date submitted: [date]
  Questions answered: [N]
  Any items not in data map (Brady answered live): [list or "none"]
```

Also note in the morning sweep compact output if this ran automatically:
`📋 CutTime: "[form name]" submitted for [student]`

---

## Full Execution Sequence

When Brady says "fill out the choir form" (or Finn detects a pending form in morning sweep):

```
1. DETECT     → Micro-Skill 1: scan +18443858463 for CutTime messages
2. PARSE      → Micro-Skill 2: extract form URL(s), identify type
3. NAVIGATE   → Micro-Skill 3: open form in Chrome
4. FILL       → Micro-Skill 4: loop through all questions using Data Map
5. SUBMIT     → Micro-Skill 6: click Finish, confirm "You're all done!"
6. LOG        → Micro-Skill 7: write Streaming Note, close the loop
```

If multiple forms are pending, run the sequence for each.

---

## Edge Cases

- **CutTime login required mid-session:** Enter Brady's phone (801-376-3737), wait for
  SMS code, prompt Brady to read it out — do not proceed until authenticated
- **Question not in Data Map:** Pause, show Brady the question text, wait for answer,
  add to Data Map before continuing
- **Form already completed:** CutTime may show "Already submitted" — log it as already
  done, no action needed
- **Announcement (not a form):** Read the content, summarize in morning sweep output,
  log to Streaming Notes as Thread Log — do not try to "fill" it
- **Faith's forms:** Same process, student name = Faith Smallwood, grade = 9th. Student
  ID still needed (ask queue item) — pause on that question if it appears
- **attributedBody is empty or garbled:** Fall back to checking if Brady has the CutTime
  app tab open already (`tabs_context_mcp`) before re-scanning iMessage

## What This Skill Does NOT Do

- Does not handle CutTime payment flows (fundraisers, trip deposits) — those need Brady
- Does not handle CutTime for other programs (only BHS Choir under Terry Hicks)
- Does not auto-submit without at least a silent background scan confirmation — if running
  in morning sweep, log intent and confirm with Brady before filling if form has questions
  not in the Data Map
