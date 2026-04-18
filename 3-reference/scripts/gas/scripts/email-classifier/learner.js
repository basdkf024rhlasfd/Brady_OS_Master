/**
 * Classification Learner — auto-promotes consistent patterns to hard-coded rules.
 *
 * Runs weekly (or manually). Analyzes the classification log, groups by sender
 * domain, and promotes senders that have been classified the same way N+ times
 * to the "learned-rules" Sheet tab.
 *
 * The pre-classifier reads learned-rules on every trigger run, so promoted
 * senders stop hitting Claude automatically.
 *
 * Brady can review, edit, or delete learned rules directly in the Sheet.
 */

const LEARNER_SCRIPT_NAME = 'email-classifier-learner';
const LEARNED_RULES_TAB_NAME = 'learned-rules';

// Minimum number of consistent classifications before promoting a sender
const MIN_SAMPLES_TO_PROMOTE = 5;

// Minimum consistency ratio (e.g., 0.9 = 90% of emails from this sender
// were classified the same way)
const MIN_CONSISTENCY_RATIO = 0.9;

// Domains to never auto-learn (too diverse to have one rule)
const LEARNING_BLOCKLIST = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
  'aol.com', 'protonmail.com', 'me.com', 'live.com', 'msn.com'
];

// ============================================================
// MAIN ENTRY POINT
// ============================================================

/**
 * Analyze classification logs and promote consistent senders to learned rules.
 * Run manually or on a weekly trigger.
 */
function learnFromHistory() {
  withErrorHandling(LEARNER_SCRIPT_NAME, () => {
    logInfo(LEARNER_SCRIPT_NAME, 'Starting learning run');

    const sheetId = PropertiesService.getScriptProperties().getProperty('LOG_SHEET_ID');
    if (!sheetId) {
      logWarn(LEARNER_SCRIPT_NAME, 'No LOG_SHEET_ID set — cannot learn');
      return;
    }

    const ss = SpreadsheetApp.openById(sheetId);

    // Read classification log entries
    const logSheet = ss.getSheetByName(SCRIPT_NAME);
    if (!logSheet) {
      logWarn(LEARNER_SCRIPT_NAME, 'No classification log sheet found');
      return;
    }

    const logData = logSheet.getDataRange().getValues();
    // Log format: Timestamp, Level, Script, Message, Data

    // Parse classification results from log entries
    const senderStats = buildSenderStats_(logData);

    // Load existing learned rules to avoid overwriting manual edits
    const existingRules = loadExistingLearnedDomains_(ss);

    // Find promotable senders
    const promotions = [];
    for (const [domain, stats] of Object.entries(senderStats)) {
      if (LEARNING_BLOCKLIST.includes(domain)) continue;
      if (existingRules.has(domain)) continue; // Don't overwrite existing learned rules
      if (KNOWN_SENDERS[domain]) continue; // Already in static rules

      if (stats.total >= MIN_SAMPLES_TO_PROMOTE) {
        const topResult = findDominantClassification_(stats);
        if (topResult && topResult.ratio >= MIN_CONSISTENCY_RATIO) {
          promotions.push({
            domain: domain,
            classification: topResult.classification,
            confidence: Math.round(topResult.ratio * 100),
            sampleCount: stats.total
          });
        }
      }
    }

    if (promotions.length === 0) {
      logInfo(LEARNER_SCRIPT_NAME, 'No new patterns found to promote');
      return;
    }

    // Write promoted rules to Sheet
    writeLearnedRules_(ss, promotions);

    logInfo(LEARNER_SCRIPT_NAME, `Promoted ${promotions.length} new sender rules`, {
      domains: promotions.map(p => p.domain).join(', ')
    });
  });
}

// ============================================================
// ANALYSIS
// ============================================================

/**
 * Parse classification log entries and group by sender domain.
 * Returns { domain: { total, results: [{ category, priority, person_or_bot, action_type, tags }] } }
 */
function buildSenderStats_(logData) {
  const stats = {};

  for (let i = 1; i < logData.length; i++) {
    const row = logData[i];
    const message = String(row[3] || '');
    const dataStr = String(row[4] || '');

    // Only look at successful classification entries
    if (!message.startsWith('Classified:')) continue;

    let data;
    try {
      data = JSON.parse(dataStr);
    } catch (e) {
      continue;
    }

    if (!data || !data.from) continue;

    const senderEmail = normalizeEmailAddress_(data.from);
    const domain = extractDomain_(senderEmail);
    if (!domain) continue;

    // Parse category and priority from the message: "Classified: Category | Priority"
    const parts = message.replace('Classified: ', '').split(' | ');
    const category = (parts[0] || '').trim();
    const priority = (parts[1] || '').trim();

    if (!stats[domain]) {
      stats[domain] = { total: 0, results: [] };
    }

    stats[domain].total++;
    stats[domain].results.push({
      category: category,
      priority: priority,
      action_type: data.action || 'Archive'
    });
  }

  return stats;
}

/**
 * Find the dominant classification for a sender domain.
 * Returns { classification, ratio } or null.
 */
function findDominantClassification_(stats) {
  // Create a fingerprint for each classification: "category|priority|action"
  const fingerprints = {};

  for (const result of stats.results) {
    const key = `${result.category}|${result.priority}|${result.action_type}`;
    if (!fingerprints[key]) {
      fingerprints[key] = { count: 0, sample: result };
    }
    fingerprints[key].count++;
  }

  // Find the most common fingerprint
  let topKey = null;
  let topCount = 0;
  for (const [key, data] of Object.entries(fingerprints)) {
    if (data.count > topCount) {
      topCount = data.count;
      topKey = key;
    }
  }

  if (!topKey) return null;

  return {
    classification: fingerprints[topKey].sample,
    ratio: topCount / stats.total
  };
}

// ============================================================
// SHEET OPERATIONS
// ============================================================

/**
 * Load existing learned-rule domains so we don't overwrite manual edits.
 */
function loadExistingLearnedDomains_(ss) {
  const existing = new Set();
  const sheet = ss.getSheetByName(LEARNED_RULES_TAB_NAME);
  if (!sheet) return existing;

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const domain = String(data[i][0] || '').trim().toLowerCase();
    if (domain) existing.add(domain);
  }

  return existing;
}

/**
 * Write newly promoted rules to the learned-rules Sheet tab.
 */
function writeLearnedRules_(ss, promotions) {
  let sheet = ss.getSheetByName(LEARNED_RULES_TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(LEARNED_RULES_TAB_NAME);
    sheet.appendRow([
      'Domain', 'Category', 'Priority', 'Person/Bot', 'Action',
      'Tags', 'AI Summary', 'AI Next Step', 'Confidence %',
      'Sample Count', 'Last Updated'
    ]);
    sheet.setFrozenRows(1);
  }

  const now = new Date().toISOString();

  for (const promo of promotions) {
    const c = promo.classification;
    sheet.appendRow([
      promo.domain,
      c.category || 'Automated',
      c.priority || 'Low',
      'Bot', // learned senders are almost always bots
      c.action_type || 'Archive',
      '', // tags — can be manually added
      `Auto-classified: ${promo.domain}`,
      'Archive.',
      promo.confidence,
      promo.sampleCount,
      now
    ]);
  }
}

// ============================================================
// TRIGGER & TESTING
// ============================================================

/**
 * Install a weekly trigger for the learner (runs Sunday midnight).
 */
function installLearnerTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'learnFromHistory')
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('learnFromHistory')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(0)
    .create();

  Logger.log('Learner trigger installed: learnFromHistory every Sunday at midnight');
}

/**
 * Preview what the learner would promote without writing anything.
 * Run from the GAS editor.
 */
function previewLearning() {
  const sheetId = PropertiesService.getScriptProperties().getProperty('LOG_SHEET_ID');
  if (!sheetId) {
    Logger.log('No LOG_SHEET_ID set');
    return;
  }

  const ss = SpreadsheetApp.openById(sheetId);
  const logSheet = ss.getSheetByName(SCRIPT_NAME);
  if (!logSheet) {
    Logger.log('No classification log sheet found');
    return;
  }

  const logData = logSheet.getDataRange().getValues();
  const senderStats = buildSenderStats_(logData);
  const existingRules = loadExistingLearnedDomains_(ss);

  Logger.log('=== Sender Analysis ===');
  Logger.log(`Total unique domains: ${Object.keys(senderStats).length}`);
  Logger.log('');

  for (const [domain, stats] of Object.entries(senderStats)) {
    if (LEARNING_BLOCKLIST.includes(domain)) continue;
    if (stats.total < 3) continue; // Only show domains with some volume

    const isKnown = !!KNOWN_SENDERS[domain];
    const isLearned = existingRules.has(domain);
    const topResult = findDominantClassification_(stats);
    const ratio = topResult ? Math.round(topResult.ratio * 100) : 0;

    let status = '';
    if (isKnown) status = '[STATIC]';
    else if (isLearned) status = '[LEARNED]';
    else if (stats.total >= MIN_SAMPLES_TO_PROMOTE && ratio >= MIN_CONSISTENCY_RATIO * 100) status = '[PROMOTABLE]';
    else status = `[${stats.total} samples, ${ratio}% consistent]`;

    Logger.log(`${domain}: ${stats.total} emails → ${topResult ? topResult.classification.category + '/' + topResult.classification.priority : '?'} ${status}`);
  }
}
