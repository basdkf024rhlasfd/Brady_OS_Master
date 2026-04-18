/**
 * Email Classification Logic
 *
 * Assembles the classification prompt from rules.js constants and sends
 * emails to Claude for classification.
 *
 * To change classification rules, edit rules.js — not this file.
 */

// ============================================================
// PROMPT ASSEMBLY
// ============================================================

/**
 * Build the full classification prompt from rules.js constants.
 * Called once per classifyEmail() invocation.
 */
function buildClassificationPrompt_() {
  const ctx = OWNER_CONTEXT;
  const vips = ctx.vip_contacts.map(v => `- ${v.note}: ${v.name} (${v.email}) — always high priority`).join('\n');
  const networks = ctx.expert_networks.join(', ');

  const categoryLines = CATEGORY_RULES.map(r => {
    let line = `   - ${r.match} → "${r.category}"`;
    if (r.tags && r.tags.length > 0) line += ` + tag "${r.tags.join(', ')}"`;
    if (r.note) line += ` (${r.note})`;
    return line;
  }).join('\n');

  const overrideLines = HARD_OVERRIDES.map(o => {
    const fields = [];
    if (o.mailbox_action) fields.push(`mailbox_action: "${o.mailbox_action}"`);
    if (o.action_type) fields.push(`action_type: "${o.action_type}"`);
    if (o.category) fields.push(`category: "${o.category}"`);
    if (o.priority) fields.push(`priority: "${o.priority}"`);
    if (o.person_or_bot) fields.push(`person_or_bot: "${o.person_or_bot}"`);
    if (o.ai_next_step) fields.push(`ai_next_step: "${o.ai_next_step}"`);
    let line = `   - ${o.match} → ${fields.join(', ')}`;
    if (o.note) line += `. ${o.note}`;
    return line;
  }).join('\n');

  const nextStepLines = NEXT_STEP_PATTERNS.map(p => `   - "${p}"`).join('\n');
  const replyLines = REPLY_RULES.map(r => `   - ${r}`).join('\n');

  const categoriesEnum = VALID_CATEGORIES.map(c => `"${c}"`).join(' | ');
  const actionsEnum = VALID_ACTIONS.map(a => `"${a}"`).join(' | ');
  const mailboxEnum = VALID_MAILBOX_ACTIONS.map(m => `"${m}"`).join(' | ');
  const subActionsEnum = VALID_SUB_ACTIONS.map(s => `"${s}"`).join(' | ');

  return `You are an email classifier for ${ctx.name}'s personal inbox. Your job is to read one email and return a JSON object with exactly these fields. No prose, no explanation, no markdown — just valid JSON.

CONTEXT ABOUT ${ctx.name.toUpperCase().split(' ')[0]}:
- ${ctx.age}, lives in ${ctx.location}
- ${ctx.background}
- Wife: ${ctx.family.wife}. Five kids: ${ctx.family.kids.join(', ')}
${vips}
- Financial advisor at ${ctx.financial_advisor}
- Active on expert networks: ${networks}

OUTPUT SCHEMA (return ONLY this JSON, nothing else):
{
  "mailbox_action": ${mailboxEnum},
  "action_type": ${actionsEnum},
  "sub_action_type": ${subActionsEnum} | null,
  "category": ${categoriesEnum},
  "person_or_bot": "Person" | "Bot",
  "ai_summary": "1-3 sentence plain-language summary",
  "ai_suggested_reply": "Draft reply text if action_type is Write Reply, otherwise null",
  "ai_next_step": "One imperative sentence: what ${ctx.name.split(' ')[0]} should do",
  "tags": "comma-separated tags (e.g., consulting, finance, school, urgent)",
  "priority": "High" | "Low"
}

CLASSIFICATION RULES:

1. CATEGORY MAPPING (match first applicable rule):
${categoryLines}

2. PRIORITY RULES:
   - High: ${PRIORITY_RULES.high}
   - Low: ${PRIORITY_RULES.low}

3. PERSON OR BOT:
   - "Person" = a human wrote this specifically to ${ctx.name.split(' ')[0]} or a group including ${ctx.name.split(' ')[0]}
   - "Bot" = automated, system-generated, mass-mailed, no-reply sender

4. HARD-CODED OVERRIDES (these always win):
${overrideLines}

5. AI NEXT STEP PATTERNS:
   - Always one imperative sentence
${nextStepLines}

6. AI SUGGESTED REPLY:
${replyLines}

EMAIL TO CLASSIFY:
`;
}

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
  const prompt = buildClassificationPrompt_() + rawEmail;

  const result = callClaude(prompt, {
    maxTokens: 512,
    temperature: 0,
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
  }

  return result.data;
}

/**
 * Validate classification output against known enum values from rules.js.
 * Returns array of warnings (empty = valid).
 */
function validateClassification(classification) {
  const warnings = [];

  if (!VALID_CATEGORIES.includes(classification.category)) {
    warnings.push(`Unknown category: ${classification.category}`);
  }

  if (!VALID_ACTIONS.includes(classification.action_type)) {
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
