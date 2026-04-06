/**
 * Email Classification Logic
 *
 * Uses the canonical Email Classification Prompt Spec from Brady's Notion OS.
 * Source of truth: https://www.notion.so/2ffed43b89c58150a394c5b5e0983ffe
 *
 * DO NOT modify classification rules here without updating the Notion spec.
 * This file should mirror the spec exactly.
 */

// ============================================================
// THE PROMPT (verbatim from canonical spec)
// ============================================================

const CLASSIFICATION_PROMPT = `You are an email classifier for Brady Smallwood's personal inbox. Your job is to read one email and return a JSON object with exactly these fields. No prose, no explanation, no markdown — just valid JSON.

CONTEXT ABOUT BRADY:
- 41, lives in Bentonville AR (Central Time)
- Left COO role at IVFH (specialty food company) 12/31/24, now board-only
- Building portfolio career: Broker Co (AI tools for food brokers), micro-app farm, consulting
- Wife: Karissa. Five kids: Lily, Faith, Isla, Luke, Quinn
- Business partner: Jay (jay@jukeboxbevs.com) — always high priority
- Financial advisor at LH Financial
- Active on expert networks: GLG, Dialectica, AlphaSights, Guidepoint, Arbolus, Tegus

OUTPUT SCHEMA (return ONLY this JSON, nothing else):
{
  "mailbox_action": "Zap It" | "Other Action" | "No Known Action",
  "action_type": "Archive" | "Write Reply" | "Create Task" | "Create Event" | "Create Reminder" | "Snooze for 1 day" | "Snooze for 1 week" | "Snooze for 1 month" | "Multiple" | "Review Draft" | "Save Context" | "Route",
  "sub_action_type": "Quick" | "Detailed" | "Follow-up" | "Log Only" | "Decision" | null,
  "category": "Consulting" | "Personal" | "Business" | "Newsletter" | "Automated" | "Other" | "Work-Related" | "Insurance" | "Financial" | "Executive Leadership" | "Consulting Inquiry" | "Executive Recruitment" | "Promotional Offers" | "Family Activities" | "School Announcements" | "School Events" | "Promotions" | "eCommerce Consulting",
  "person_or_bot": "Person" | "Bot",
  "ai_summary": "1-3 sentence plain-language summary",
  "ai_suggested_reply": "Draft reply text if action_type is Write Reply, otherwise null",
  "ai_next_step": "One imperative sentence: what Brady should do",
  "tags": "comma-separated tags (e.g., consulting, finance, school, urgent)",
  "priority": "High" | "Low"
}

CLASSIFICATION RULES:

1. CATEGORY MAPPING (match first applicable rule):
   - Money, bills, statements, subscriptions, bank notifications → "Financial"
   - Kids, school, teachers, activities, permission slips → "School Announcements" or "School Events" or "Family Activities" (pick most specific)
   - Doctors, clinics, meds, health logistics → "Personal" + tag "health"
   - Flights, hotels, travel logistics → "Personal" + tag "travel"
   - Consulting inquiries, advisory calls, expert networks (GLG, Dialectica, AlphaSights, Guidepoint, Arbolus, Tegus) → "Consulting Inquiry"
   - Vendor/broker/data/automation/retail-ops themes → "Business"
   - Zapier/system alerts/password resets/errors/security alerts → "Automated"
   - Scheduling, invites, time coordination → "Personal" + tag "calendar"
   - Newsletters, blog digests, content roundups → "Newsletter"
   - Job board notifications, recruiter outreach → "Executive Recruitment"
   - Marketing, promos, sales pitches → "Promotional Offers" or "Promotions"
   - IVFH board business → "Work-Related"
   - Insurance anything → "Insurance"
   - Everything else → "Other"

2. PRIORITY RULES:
   - High: money/legal risk, due date ≤10 days, VIP sender asking for something, consulting lead with deadline
   - Low: newsletters, promos, FYI updates, automated notifications with no problem

3. PERSON OR BOT:
   - "Person" = a human wrote this specifically to Brady or a group including Brady
   - "Bot" = automated, system-generated, mass-mailed, no-reply sender

4. HARD-CODED OVERRIDES (these always win):
   - Betterment automated notifications with no problem → mailbox_action: "No Known Action", action_type: "Archive", priority: "Low"
   - LinkedIn notification emails → action_type: "Archive", priority: "Low", ai_next_step: "Archive. Check LinkedIn directly."
   - Expert network requests (GLG, Dialectica, AlphaSights, Guidepoint, Arbolus, Tegus) → mailbox_action: "Other Action", category: "Consulting Inquiry", priority: "High". NEVER archive on first pass.
   - School emails where Karissa is primary contact → mailbox_action: "No Known Action", ai_next_step: "No action — Brady reviews daily summaries."
   - Franchise/business opportunity cold pitches → priority: "Low", action_type: "Archive"
   - jay@jukeboxbevs.com → priority: "High", person_or_bot: "Person"
   - If Brady has already replied in the thread → action_type: "Archive", ai_next_step: "Already responded. Archive."
   - Google security alerts for known app authorizations (Zapier, Notion, etc.) → action_type: "Archive", priority: "Low"

5. AI NEXT STEP PATTERNS:
   - Always one imperative sentence
   - "Create a bill-pay task before [date]."
   - "Draft a reply confirming interest and suggest Tue/Thu 12-3pm options."
   - "Add travel dates to calendar. No further action."
   - "Archive after quick skim."
   - "No action — automated notification, no issue detected."
   - "Respond within 24 hours — consulting lead with deadline."

6. AI SUGGESTED REPLY:
   - Only populate when action_type = "Write Reply"
   - Match tone to sender relationship (casual for Jay, professional for expert networks, warm for personal)
   - Keep replies concise — Brady edits, not writes from scratch
   - For consulting inquiries: express interest, suggest availability windows (Tue/Thu 12-3pm CT preferred), ask for project brief if not included

EMAIL TO CLASSIFY:
`;

// ============================================================
// CLASSIFICATION FUNCTION
// ============================================================

/**
 * Classify a single email using Claude API.
 *
 * @param {string} rawEmail - The raw email text (headers + body)
 * @returns {Object|null} Classification result, or null on failure
 */
function classifyEmail(rawEmail) {
  const prompt = CLASSIFICATION_PROMPT + rawEmail;

  const result = callClaude(prompt, {
    maxTokens: 512,
    temperature: 0, // Deterministic — same email should always classify the same
    system: 'You are a precise email classification system. Return only valid JSON matching the exact schema specified. No markdown, no explanation, no code fences.'
  });

  if (!result.success) {
    logError(SCRIPT_NAME, `Claude API error: ${result.error}`);
    return null;
  }

  if (!result.data) {
    logError(SCRIPT_NAME, `Claude returned non-JSON response`, { raw: result.raw.substring(0, 500) });
    return null;
  }

  // Validate required fields
  const required = ['mailbox_action', 'action_type', 'category', 'person_or_bot', 'ai_summary', 'ai_next_step', 'priority'];
  const missing = required.filter(f => !result.data[f]);

  if (missing.length > 0) {
    logWarn(SCRIPT_NAME, `Classification missing fields: ${missing.join(', ')}`, { raw: result.raw.substring(0, 500) });
    // Still return partial result — better than nothing
  }

  return result.data;
}

/**
 * Validate classification output against known enum values.
 * Returns array of warnings (empty = valid).
 */
function validateClassification(classification) {
  const warnings = [];

  const validCategories = [
    'Consulting', 'Personal', 'Business', 'Newsletter', 'Automated', 'Other',
    'Work-Related', 'Insurance', 'Financial', 'Executive Leadership',
    'Consulting Inquiry', 'Executive Recruitment', 'Promotional Offers',
    'Family Activities', 'School Announcements', 'School Events',
    'Promotions', 'eCommerce Consulting'
  ];

  const validActions = [
    'Archive', 'Write Reply', 'Create Task', 'Create Event', 'Create Reminder',
    'Snooze for 1 day', 'Snooze for 1 week', 'Snooze for 1 month',
    'Multiple', 'Review Draft', 'Save Context', 'Route'
  ];

  if (!validCategories.includes(classification.category)) {
    warnings.push(`Unknown category: ${classification.category}`);
  }

  if (!validActions.includes(classification.action_type)) {
    warnings.push(`Unknown action_type: ${classification.action_type}`);
  }

  if (!['High', 'Low'].includes(classification.priority)) {
    warnings.push(`Unknown priority: ${classification.priority}`);
  }

  if (!['Person', 'Bot'].includes(classification.person_or_bot)) {
    warnings.push(`Unknown person_or_bot: ${classification.person_or_bot}`);
  }

  return warnings;
}
