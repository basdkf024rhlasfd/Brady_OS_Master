/**
 * Email Classifier — Google Apps Script
 *
 * Classifies incoming Gmail using Claude API based on Brady's canonical
 * Email Classification Prompt Spec.
 *
 * Trigger: Time-driven, every 15 minutes
 * Flow: Fetch unread → Pre-classify (known senders) or Claude → Apply labels → Log → Optional Notion sync
 */

// ============================================================
// CONFIGURATION
// ============================================================

const SCRIPT_NAME = 'email-classifier';
const BATCH_SIZE = 10; // Max emails per run (stay under 6-min GAS limit)
const PROCESSED_LABEL = 'AI/Classified';
const PRIORITY_HIGH_LABEL = 'AI/High Priority';
const CATEGORY_LABEL_PREFIX = 'AI/'; // e.g., "AI/Consulting Inquiry"
const SEARCH_QUERY = 'is:unread -in:spam -in:trash newer_than:2d';
const PROCESSED_HISTORY_KEY = `${SCRIPT_NAME}_processed_history`;
const PROCESSED_HISTORY_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_PROCESSED_HISTORY = 200;

// ============================================================
// TRIGGER HANDLER
// ============================================================

/**
 * Main entry point — called by time-driven trigger.
 */
function onTimeTrigger() {
  withErrorHandling(SCRIPT_NAME, () => {
    logInfo(SCRIPT_NAME, 'Starting classification run');

    const history = loadProcessedHistory_();
    const processedIds = new Set(history.map(entry => entry[0]));

    // Fetch unread threads and classify the latest unread message in each one.
    const threads = GmailApp.search(SEARCH_QUERY, 0, BATCH_SIZE);
    logInfo(SCRIPT_NAME, `Found ${threads.length} threads to process`);

    if (threads.length === 0) {
      logInfo(SCRIPT_NAME, 'No new emails to classify');
      return;
    }

    let processed = 0;
    let preClassified = 0;
    let aiClassified = 0;
    let errors = 0;

    for (const thread of threads) {
      const latestMessage = getLatestUnreadMessage_(thread);

      if (!latestMessage) {
        continue;
      }

      const messageId = latestMessage.getId();

      // Skip if this unread message was already processed on a previous run.
      if (processedIds.has(messageId)) {
        continue;
      }

      try {
        // Try pre-classifier first (known senders + learned rules — no API call)
        let classification = preClassify(latestMessage);
        let source = 'pre-classified';

        // Fall back to Claude if no pre-classifier match
        if (!classification) {
          const rawEmail = buildRawEmail(latestMessage);
          classification = classifyEmail(rawEmail);
          source = 'ai';
          // Only pause for rate limiting on Claude calls
          Utilities.sleep(1500);
        }

        if (classification) {
          // Apply Gmail labels
          applyLabels(thread, classification);

          // Sync to Notion if enabled
          syncToNotion(latestMessage, classification);

          // Log result (include source so we can track pre-classifier hit rate)
          logInfo(SCRIPT_NAME, `Classified: ${classification.category} | ${classification.priority}`, {
            subject: latestMessage.getSubject().substring(0, 80),
            from: latestMessage.getFrom(),
            action: classification.action_type,
            source: source
          });

          // Only cache successfully processed messages
          history.push([messageId, Date.now()]);
          processedIds.add(messageId);
          persistProcessedHistory_(history);

          processed++;
          if (source === 'pre-classified') preClassified++;
          else aiClassified++;
        } else {
          logWarn(SCRIPT_NAME, `Classification failed for message ${messageId}`);
          errors++;
        }

      } catch (e) {
        logError(SCRIPT_NAME, `Error processing message ${messageId}: ${e.message}`);
        errors++;
        // Continue to next email, don't abort the batch
      }
    }

    // Weekly maintenance (Monday): purge old logs, run learner
    if (new Date().getDay() === 1) {
      purgeLogs(SCRIPT_NAME);
      learnFromHistory();
    }

    logInfo(SCRIPT_NAME, `Run complete: ${processed} classified (${preClassified} pre-classified, ${aiClassified} AI), ${errors} errors`);
  });
}

// ============================================================
// HELPERS
// ============================================================

/**
 * Build a raw email string from a GmailMessage for classification.
 */
function buildRawEmail(message) {
  const parts = [
    `From: ${message.getFrom()}`,
    `To: ${message.getTo()}`,
    `Subject: ${message.getSubject()}`,
    `Date: ${message.getDate().toISOString()}`,
    `---`,
    message.getPlainBody().substring(0, 3000) // Truncate to save tokens
  ];

  // Check if Brady has already replied in this thread
  const thread = message.getThread();
  const messages = thread.getMessages();
  const ownerReplied = messages.some(m => senderMatchesOwner_(m.getFrom()));
  if (ownerReplied) {
    parts.unshift('[NOTE: Brady has already replied in this thread]');
  }

  return parts.join('\n');
}

/**
 * Apply Gmail labels and manage read state based on classification result.
 *
 * Read-state rules:
 *   - High priority → stays UNREAD (visible in Gmail's "Unread" section until Brady handles it)
 *   - Low priority  → marked as READ (drops to "Everything else" so it doesn't clutter the top)
 *
 * Safety rail: NEVER auto-archive High priority emails.
 */
function applyLabels(thread, classification) {
  // Always apply "Classified" label
  getOrCreateLabel(PROCESSED_LABEL).addToThread(thread);

  // Apply priority label
  if (classification.priority === 'High') {
    getOrCreateLabel(PRIORITY_HIGH_LABEL).addToThread(thread);
  }

  // Apply category label
  if (classification.category) {
    const categoryLabel = CATEGORY_LABEL_PREFIX + classification.category;
    getOrCreateLabel(categoryLabel).addToThread(thread);
  }

  // Read-state management: Low priority gets marked read, High stays unread
  if (classification.priority === 'Low') {
    thread.markRead();
  }
  // High priority: explicitly keep unread so it stays in Brady's face
  // (no action needed — it's already unread)

  // Auto-archive low-priority bot emails — NEVER archive High priority
  if (classification.priority === 'Low' &&
      classification.person_or_bot === 'Bot' &&
      classification.action_type === 'Archive') {
    logAutoArchive_(thread, classification);
    thread.moveToArchive();
  }
}

/**
 * Get or create a Gmail label.
 */
function getOrCreateLabel(name) {
  let label = GmailApp.getUserLabelByName(name);
  if (!label) {
    label = GmailApp.createLabel(name);
  }
  return label;
}

/**
 * Return the latest unread message in a thread, or null if there isn't one.
 */
function getLatestUnreadMessage_(thread) {
  const unread = thread.getMessages().filter(m => m.isUnread());
  return unread.length > 0 ? unread[unread.length - 1] : null;
}

/**
 * Determine whether a sender header belongs to the inbox owner.
 * Prefers exact email matches from OWNER_EMAIL_ALIASES; falls back to
 * the historical display-name substring check for backwards compatibility.
 */
function senderMatchesOwner_(senderHeader) {
  const aliases = getCsvProperty('OWNER_EMAIL_ALIASES', [])
    .map(a => normalizeEmailAddress_(a));
  const normalized = normalizeEmailAddress_(senderHeader);

  if (aliases.length > 0) {
    return aliases.includes(normalized);
  }

  // Fallback: legacy substring match
  return String(senderHeader).toLowerCase().includes('brady');
}

/**
 * Extract and normalize the email address from a From header.
 */
function normalizeEmailAddress_(value) {
  const raw = String(value || '').trim().toLowerCase();
  const match = raw.match(/<([^>]+)>/);
  return match ? match[1].trim() : raw;
}

// ============================================================
// PROCESSED MESSAGE CACHE
// ============================================================

/**
 * Load recently processed message IDs from Script Properties.
 */
function loadProcessedHistory_() {
  const raw = PropertiesService.getScriptProperties().getProperty(PROCESSED_HISTORY_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return pruneHistory_(parsed);
  } catch (e) {
    logWarn(SCRIPT_NAME, 'Could not parse processed message history; resetting cache');
    return [];
  }
}

/**
 * Persist a compact, bounded history of processed message IDs.
 */
function persistProcessedHistory_(history) {
  const pruned = pruneHistory_(history);
  PropertiesService.getScriptProperties().setProperty(
    PROCESSED_HISTORY_KEY,
    JSON.stringify(pruned)
  );
}

/**
 * Keep only recent entries and cap the cache size.
 */
function pruneHistory_(history) {
  const cutoff = Date.now() - PROCESSED_HISTORY_TTL_MS;
  const deduped = [];
  const seen = new Set();

  for (let i = history.length - 1; i >= 0; i--) {
    const entry = history[i];
    if (!Array.isArray(entry) || entry.length !== 2) continue;

    const id = String(entry[0] || '').trim();
    const ts = Number(entry[1]);

    if (!id || !Number.isFinite(ts) || ts < cutoff || seen.has(id)) continue;

    seen.add(id);
    deduped.push([id, ts]);

    if (deduped.length >= MAX_PROCESSED_HISTORY) break;
  }

  return deduped.reverse();
}

/**
 * Log an auto-archived email to a dedicated "auto-archive-audit" sheet tab.
 * Makes the invisible archive action reviewable.
 * @private
 */
function logAutoArchive_(thread, classification) {
  try {
    const msg = thread.getMessages().pop();
    const sheetId = PropertiesService.getScriptProperties().getProperty('LOG_SHEET_ID');
    if (!sheetId) return;

    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName('auto-archive-audit');
    if (!sheet) {
      sheet = ss.insertSheet('auto-archive-audit');
      sheet.appendRow(['Timestamp', 'From', 'Subject', 'Category', 'Priority', 'Person/Bot', 'Action']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toISOString(),
      msg.getFrom(),
      msg.getSubject().substring(0, 120),
      classification.category || '',
      classification.priority || '',
      classification.person_or_bot || '',
      classification.action_type || ''
    ]);
  } catch (e) {
    // Don't block archiving if audit logging fails
    Logger.log('Auto-archive audit log failed: ' + e.message);
  }
}

// ============================================================
// SETUP & TESTING
// ============================================================

/**
 * Run this once to set up the time trigger.
 */
function installTrigger() {
  // Remove existing triggers for this function
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'onTimeTrigger')
    .forEach(t => ScriptApp.deleteTrigger(t));

  // Create new 15-minute trigger
  ScriptApp.newTrigger('onTimeTrigger')
    .timeBased()
    .everyMinutes(15)
    .create();

  Logger.log('Trigger installed: onTimeTrigger every 15 minutes');
}

/**
 * Manual test — classify the 3 most recent unread emails.
 * Run this from the GAS editor to verify classification works.
 */
function testClassification() {
  const threads = GmailApp.search(SEARCH_QUERY, 0, 3);
  for (const thread of threads) {
    const msg = thread.getMessages().pop();
    const raw = buildRawEmail(msg);
    Logger.log(`\nSubject: ${msg.getSubject()}`);
    Logger.log(`   From: ${msg.getFrom()}`);

    const result = classifyEmail(raw);
    if (result) {
      Logger.log(`   Category: ${result.category}`);
      Logger.log(`   Priority: ${result.priority}`);
      Logger.log(`   Action: ${result.action_type}`);
      Logger.log(`   Next Step: ${result.ai_next_step}`);

      const warnings = validateClassification(result);
      if (warnings.length > 0) {
        Logger.log(`   Warnings: ${warnings.join('; ')}`);
      }
    } else {
      Logger.log('   Classification failed');
    }
    Utilities.sleep(1500);
  }
}

/**
 * Manual test — classify and sync to Notion (tests full pipeline).
 * Run this from the GAS editor.
 */
function testClassificationWithNotion() {
  const threads = GmailApp.search(SEARCH_QUERY, 0, 1);
  if (threads.length === 0) {
    Logger.log('No unread emails to test with');
    return;
  }

  const msg = threads[0].getMessages().pop();
  const raw = buildRawEmail(msg);
  Logger.log(`Subject: ${msg.getSubject()}`);

  const result = classifyEmail(raw);
  if (result) {
    Logger.log(`Classification: ${JSON.stringify(result, null, 2)}`);
    const notionResult = syncToNotion(msg, result);
    Logger.log(`Notion sync result: ${JSON.stringify(notionResult)}`);
  } else {
    Logger.log('Classification failed');
  }
}
