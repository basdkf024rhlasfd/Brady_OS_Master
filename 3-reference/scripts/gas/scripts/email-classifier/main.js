/**
 * Email Classifier — Google Apps Script
 *
 * Classifies incoming Gmail using Claude API based on Brady's canonical
 * Email Classification Prompt Spec.
 *
 * Trigger: Time-driven, every 15 minutes
 * Flow: Fetch unread → Classify via Claude → Apply labels → Log → Optional Notion sync
 */

// ============================================================
// CONFIGURATION
// ============================================================

const SCRIPT_NAME = 'email-classifier';
const BATCH_SIZE = 10; // Max emails per run (stay under 6-min GAS limit)
const PROCESSED_LABEL = 'AI/Classified';
const PRIORITY_HIGH_LABEL = 'AI/High Priority';
const CATEGORY_LABEL_PREFIX = 'AI/'; // e.g., "AI/Consulting Inquiry"
const SEARCH_QUERY = 'is:unread -label:AI/Classified -in:spam -in:trash newer_than:2d';

// ============================================================
// TRIGGER HANDLER
// ============================================================

/**
 * Main entry point — called by time-driven trigger.
 */
function onTimeTrigger() {
  withErrorHandling(SCRIPT_NAME, () => {
    logInfo(SCRIPT_NAME, 'Starting classification run');

    // Resume from checkpoint if previous run was interrupted
    const checkpoint = getCheckpoint(SCRIPT_NAME);
    const processedIds = checkpoint ? new Set(checkpoint.processedIds) : new Set();

    // Fetch unread, unclassified emails
    const threads = GmailApp.search(SEARCH_QUERY, 0, BATCH_SIZE);
    logInfo(SCRIPT_NAME, `Found ${threads.length} threads to process`);

    if (threads.length === 0) {
      logInfo(SCRIPT_NAME, 'No new emails to classify');
      clearCheckpoint(SCRIPT_NAME);
      return;
    }

    let processed = 0;
    let errors = 0;

    for (const thread of threads) {
      const messages = thread.getMessages();
      const latestMessage = messages[messages.length - 1];
      const messageId = latestMessage.getId();

      // Skip if already processed in a previous partial run
      if (processedIds.has(messageId)) continue;

      try {
        // Build raw email text for classification
        const rawEmail = buildRawEmail(latestMessage);

        // Classify via Claude
        const classification = classifyEmail(rawEmail);

        if (classification) {
          // Apply Gmail labels
          applyLabels(thread, classification);

          // Sync to Notion if enabled
          syncToNotion(latestMessage, classification);

          // Log result
          logInfo(SCRIPT_NAME, `Classified: ${classification.category} | ${classification.priority}`, {
            subject: latestMessage.getSubject().substring(0, 80),
            from: latestMessage.getFrom(),
            action: classification.action_type
          });

          processed++;
        } else {
          logWarn(SCRIPT_NAME, `Classification failed for message ${messageId}`);
          errors++;
        }

        // Save checkpoint after each email
        processedIds.add(messageId);
        saveCheckpoint(SCRIPT_NAME, { processedIds: Array.from(processedIds) });

        // Rate limit pause
        Utilities.sleep(1500);

      } catch (e) {
        logError(SCRIPT_NAME, `Error processing message ${messageId}: ${e.message}`);
        errors++;
        // Continue to next email, don't abort the batch
      }
    }

    // Clear checkpoint on successful complete run
    clearCheckpoint(SCRIPT_NAME);

    // Purge old logs weekly (check if it's Monday)
    if (new Date().getDay() === 1) {
      purgeLogs(SCRIPT_NAME);
    }

    logInfo(SCRIPT_NAME, `Run complete: ${processed} classified, ${errors} errors`);
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
  const bradyReplied = messages.some(m => m.getFrom().includes('brady'));
  if (bradyReplied) {
    parts.unshift('[NOTE: Brady has already replied in this thread]');
  }

  return parts.join('\n');
}

/**
 * Apply Gmail labels based on classification result.
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

  // Auto-archive low-priority bot emails — NEVER archive High priority
  if (classification.priority === 'Low' &&
      classification.person_or_bot === 'Bot' &&
      classification.action_type === 'Archive') {
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
