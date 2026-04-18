/**
 * Email Classification Rules
 *
 * This is the single source of truth for how emails get classified.
 * Edit this file to change rules, then deploy:
 *   ./check.sh && ./build.sh email-classifier
 *
 * See CHEATSHEET.md for common edits.
 */

// ============================================================
// OWNER CONTEXT — who Brady is (sent to Claude with every email)
// ============================================================

const OWNER_CONTEXT = {
  name: 'Brady Smallwood',
  age: 41,
  location: 'Bentonville AR (Central Time)',
  background: 'Left COO role at IVFH (specialty food company) 12/31/24, now board-only. Building portfolio career: Broker Co (AI tools for food brokers), micro-app farm, consulting.',
  family: {
    wife: 'Karissa',
    kids: ['Lily', 'Faith', 'Isla', 'Luke', 'Quinn']
  },
  financial_advisor: 'LH Financial',

  // Expert networks — emails from these are ALWAYS High priority
  expert_networks: [
    'GLG',
    'Dialectica',
    'AlphaSights',
    'Guidepoint',
    'Arbolus',
    'Tegus'
  ],

  // VIP contacts — always High priority, always Person
  vip_contacts: [
    { name: 'Jay', email: 'jay@jukeboxbevs.com', note: 'Business partner' }
  ]
};

// ============================================================
// CATEGORY RULES — match first applicable rule
// ============================================================
// Each entry: { match: "description", category: "value", tags: ["optional"], note: "optional" }

const CATEGORY_RULES = [
  { match: 'Money, bills, statements, subscriptions, bank notifications', category: 'Financial' },
  { match: 'Kids, school, teachers, activities, permission slips', category: 'School Announcements or School Events or Family Activities', note: 'Pick most specific' },
  { match: 'Doctors, clinics, meds, health logistics', category: 'Personal', tags: ['health'] },
  { match: 'Flights, hotels, travel logistics', category: 'Personal', tags: ['travel'] },
  { match: 'Consulting inquiries, advisory calls, expert networks', category: 'Consulting Inquiry' },
  { match: 'Vendor/broker/data/automation/retail-ops themes', category: 'Business' },
  { match: 'Zapier/system alerts/password resets/errors/security alerts', category: 'Automated' },
  { match: 'Scheduling, invites, time coordination', category: 'Personal', tags: ['calendar'] },
  { match: 'Newsletters, blog digests, content roundups', category: 'Newsletter' },
  { match: 'Job board notifications, recruiter outreach', category: 'Executive Recruitment' },
  { match: 'Marketing, promos, sales pitches', category: 'Promotional Offers or Promotions' },
  { match: 'IVFH board business', category: 'Work-Related' },
  { match: 'Insurance anything', category: 'Insurance' },
  { match: 'Grocery orders, food delivery receipts, meal kit services, school lunch fund alerts, Walmart/DoorDash/Instacart notifications', category: 'Household', tags: ['household'] },
  { match: 'Everything else', category: 'Other' }
];

// ============================================================
// PRIORITY RULES
// ============================================================

const PRIORITY_RULES = {
  high: 'money/legal risk, due date ≤10 days, VIP sender asking for something, consulting lead with deadline',
  low: 'newsletters, promos, FYI updates, automated notifications with no problem'
};

// ============================================================
// HARD-CODED OVERRIDES — these always win over category rules
// ============================================================
// To add a new override: copy an existing entry and change the fields.
// Only include fields you want to force — omitted fields use normal rules.

const HARD_OVERRIDES = [
  {
    name: 'Betterment automated',
    match: 'Betterment automated notifications with no problem',
    mailbox_action: 'No Known Action',
    action_type: 'Archive',
    priority: 'Low'
  },
  {
    name: 'LinkedIn notifications',
    match: 'LinkedIn notification emails',
    action_type: 'Archive',
    priority: 'Low',
    ai_next_step: 'Archive. Check LinkedIn directly.'
  },
  {
    name: 'Expert networks',
    match: 'Expert network requests (GLG, Dialectica, AlphaSights, Guidepoint, Arbolus, Tegus)',
    mailbox_action: 'Other Action',
    category: 'Consulting Inquiry',
    priority: 'High',
    note: 'NEVER archive on first pass.'
  },
  {
    name: 'School (Karissa primary)',
    match: 'School emails where Karissa is primary contact',
    mailbox_action: 'No Known Action',
    ai_next_step: 'No action — Brady reviews daily summaries.'
  },
  {
    name: 'Franchise cold pitches',
    match: 'Franchise/business opportunity cold pitches',
    priority: 'Low',
    action_type: 'Archive'
  },
  {
    name: 'Jay',
    match: 'jay@jukeboxbevs.com',
    priority: 'High',
    person_or_bot: 'Person'
  },
  {
    name: 'Already replied',
    match: 'If Brady has already replied in the thread',
    action_type: 'Archive',
    ai_next_step: 'Already responded. Archive.'
  },
  {
    name: 'Google security (known apps)',
    match: 'Google security alerts for known app authorizations (Zapier, Notion, etc.)',
    action_type: 'Archive',
    priority: 'Low'
  }
];

// ============================================================
// KNOWN SENDERS — pre-classified in pure JS, never hits Claude
// ============================================================
// Domain or exact email → full classification object.
// The pre-classifier checks these BEFORE sending to Claude.
// This saves tokens and is instant.
//
// To add a new known sender: add a domain or email key with the
// classification fields you want to force. Use '*' for fields
// you don't care about (they'll get sensible defaults).
//
// Household-tagged senders feed the Household Assistant project.

const KNOWN_SENDERS = {
  // ---- Household / Grocery / Food ----
  'walmart.com':          { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', tags: 'household, grocery', ai_summary: 'Walmart notification.', ai_next_step: 'Archive. Logged for household budget tracking.' },
  'doordash.com':         { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', tags: 'household, dining', ai_summary: 'DoorDash notification.', ai_next_step: 'Archive. Logged for household budget tracking.' },
  'grubhub.com':          { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', tags: 'household, dining', ai_summary: 'Grubhub notification.', ai_next_step: 'Archive.' },
  'ubereats.com':         { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', tags: 'household, dining', ai_summary: 'Uber Eats notification.', ai_next_step: 'Archive.' },
  'dominos.com':          { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', tags: 'household, dining', ai_summary: 'Dominos notification.', ai_next_step: 'Archive.' },
  'instacart.com':        { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', tags: 'household, grocery', ai_summary: 'Instacart notification.', ai_next_step: 'Archive.' },
  'samsclub.com':         { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', tags: 'household, grocery', ai_summary: 'Sams Club notification.', ai_next_step: 'Archive. Logged for household budget tracking.' },

  // ---- Financial (known bots) ----
  'betterment.com':       { category: 'Financial', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', mailbox_action: 'No Known Action', ai_summary: 'Betterment automated notification.', ai_next_step: 'Archive. No action needed.' },
  'venmo.com':            { category: 'Financial', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'Venmo notification.', ai_next_step: 'Archive.' },
  'paypal.com':           { category: 'Financial', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'PayPal notification.', ai_next_step: 'Archive.' },

  // ---- Social / Low-value notifications ----
  'linkedin.com':         { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'LinkedIn notification.', ai_next_step: 'Archive. Check LinkedIn directly.' },
  'facebookmail.com':     { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'Facebook notification.', ai_next_step: 'Archive.' },
  'twitter.com':          { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'Twitter/X notification.', ai_next_step: 'Archive.' },
  'x.com':                { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'Twitter/X notification.', ai_next_step: 'Archive.' },

  // ---- System / Infra ----
  'noreply@google.com':   { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'Google system notification.', ai_next_step: 'Archive.' },
  'zapier.com':           { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'Zapier automation alert.', ai_next_step: 'Archive.' },
  'notion.so':            { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'Notion notification.', ai_next_step: 'Archive.' },
  'github.com':           { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', ai_summary: 'GitHub notification.', ai_next_step: 'Archive.' }
};

// ============================================================
// AI NEXT STEP PATTERNS — examples for Claude to follow
// ============================================================

const NEXT_STEP_PATTERNS = [
  'Create a bill-pay task before [date].',
  'Draft a reply confirming interest and suggest Tue/Thu 12-3pm options.',
  'Add travel dates to calendar. No further action.',
  'Archive after quick skim.',
  'No action — automated notification, no issue detected.',
  'Respond within 24 hours — consulting lead with deadline.'
];

// ============================================================
// AI SUGGESTED REPLY RULES
// ============================================================

const REPLY_RULES = [
  'Only populate when action_type = "Write Reply"',
  'Match tone to sender relationship (casual for Jay, professional for expert networks, warm for personal)',
  'Keep replies concise — Brady edits, not writes from scratch',
  'For consulting inquiries: express interest, suggest availability windows (Tue/Thu 12-3pm CT preferred), ask for project brief if not included'
];

// ============================================================
// VALID ENUM VALUES — used for validation
// ============================================================

const VALID_CATEGORIES = [
  'Consulting', 'Personal', 'Business', 'Newsletter', 'Automated', 'Other',
  'Work-Related', 'Insurance', 'Financial', 'Executive Leadership',
  'Consulting Inquiry', 'Executive Recruitment', 'Promotional Offers',
  'Family Activities', 'School Announcements', 'School Events',
  'Promotions', 'eCommerce Consulting', 'Household'
];

const VALID_ACTIONS = [
  'Archive', 'Write Reply', 'Create Task', 'Create Event', 'Create Reminder',
  'Snooze for 1 day', 'Snooze for 1 week', 'Snooze for 1 month',
  'Multiple', 'Review Draft', 'Save Context', 'Route'
];

const VALID_MAILBOX_ACTIONS = ['Zap It', 'Other Action', 'No Known Action'];
const VALID_SUB_ACTIONS = ['Quick', 'Detailed', 'Follow-up', 'Log Only', 'Decision'];
