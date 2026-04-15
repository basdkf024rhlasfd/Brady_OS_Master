/**
 * OS Recap Mailer — Google Apps Script
 *
 * Picks up the weekly OS recap HTML from Google Drive and emails it to Brady
 * with the PDF attached. Runs every Friday at 7:15 AM CT (15 min after
 * Conductor generates the recap).
 *
 * Trigger: Time-driven, every Friday at 7:00-8:00 AM CT
 * Flow: Find latest recap in Drive → Send email with HTML body + PDF attachment
 */

// ============================================================
// CONFIGURATION
// ============================================================

const SCRIPT_NAME = 'os-recap-mailer';
const DRIVE_FOLDER_NAME = 'OS-Recaps';
const SUBJECT_PREFIX = '[OS-RECAP]';
const RECIPIENT = 'me'; // GmailApp.sendEmail('me', ...) sends to self
const MAX_AGE_HOURS = 24; // Only send recaps generated in the last 24 hours

// ============================================================
// TRIGGER HANDLER
// ============================================================

/**
 * Main entry point — called by time-driven trigger every Friday.
 */
function onTimeTrigger() {
  withErrorHandling(SCRIPT_NAME, () => {
    logInfo(SCRIPT_NAME, 'Starting OS Recap email delivery');

    // Find the OS-Recaps folder in Google Drive
    const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
    if (!folders.hasNext()) {
      logWarn(SCRIPT_NAME, `Drive folder "${DRIVE_FOLDER_NAME}" not found`);
      sendNoRecapNotice('Drive folder not found. Create a folder named "OS-Recaps" in Google Drive.');
      return;
    }

    const folder = folders.next();

    // Find the latest HTML recap file
    const htmlFile = findLatestFile(folder, 'text/html');
    if (!htmlFile) {
      logWarn(SCRIPT_NAME, 'No recent HTML recap found in Drive');
      sendNoRecapNotice('No recap was generated this week. Check Conductor logs.');
      return;
    }

    // Check file age — skip if older than MAX_AGE_HOURS
    const fileAge = (new Date() - htmlFile.getLastUpdated()) / (1000 * 60 * 60);
    if (fileAge > MAX_AGE_HOURS) {
      logWarn(SCRIPT_NAME, `Latest recap is ${Math.round(fileAge)}h old — skipping`);
      sendNoRecapNotice('Latest recap is stale (older than 24h). Conductor may not have run.');
      return;
    }

    // Read HTML content
    const htmlContent = htmlFile.getBlob().getDataAsString();

    // Extract headline from HTML for subject line
    const headline = extractHeadline(htmlContent);
    const weekNumber = extractWeekNumber(htmlContent);

    // Find matching PDF attachment (optional)
    const pdfFile = findLatestFile(folder, 'application/pdf');
    const attachments = [];
    if (pdfFile) {
      const pdfAge = (new Date() - pdfFile.getLastUpdated()) / (1000 * 60 * 60);
      if (pdfAge <= MAX_AGE_HOURS) {
        attachments.push(pdfFile.getAs('application/pdf'));
      }
    }

    // Build subject
    const subject = `${SUBJECT_PREFIX} Week ${weekNumber} — ${headline}`;

    // Send email
    GmailApp.sendEmail(RECIPIENT, subject, 'View this email in HTML mode.', {
      htmlBody: htmlContent,
      attachments: attachments,
      name: 'Brady OS'
    });

    logInfo(SCRIPT_NAME, `Recap sent: ${subject}`, {
      htmlFile: htmlFile.getName(),
      pdfAttached: attachments.length > 0,
      headline: headline
    });
  });
}

// ============================================================
// HELPERS
// ============================================================

/**
 * Find the most recently modified file of a given MIME type in a folder.
 */
function findLatestFile(folder, mimeType) {
  const files = folder.getFilesByType(mimeType);
  let latest = null;
  let latestDate = new Date(0);

  while (files.hasNext()) {
    const file = files.next();
    const modified = file.getLastUpdated();
    if (modified > latestDate) {
      latestDate = modified;
      latest = file;
    }
  }

  return latest;
}

/**
 * Extract the headline from the thesis bar in the HTML.
 * Looks for content between <div class="thesis"> tags.
 */
function extractHeadline(html) {
  const match = html.match(/<div class="thesis">\s*<p>(.*?)<\/p>/s);
  if (match) {
    // Strip HTML tags and decode entities
    return match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&middot;/g, '·')
      .replace(/&mdash;/g, '—')
      .replace(/&amp;/g, '&')
      .trim()
      .substring(0, 120); // Cap length for email subject
  }
  return 'Weekly OS Recap';
}

/**
 * Extract week number from the HTML title/header.
 */
function extractWeekNumber(html) {
  const match = html.match(/Week\s*(?:<span>)?(\d+)/i);
  return match ? match[1] : new Date().toISOString().substring(0, 10);
}

/**
 * Send a notice email when no recap is available.
 */
function sendNoRecapNotice(reason) {
  const subject = `${SUBJECT_PREFIX} No recap this week`;
  const body = `The weekly OS recap was not delivered.\n\nReason: ${reason}\n\nCheck Conductor logs or run the recap manually: "weekly recap"`;

  GmailApp.sendEmail(RECIPIENT, subject, body, {
    name: 'Brady OS'
  });

  logInfo(SCRIPT_NAME, `No-recap notice sent: ${reason}`);
}

// ============================================================
// SETUP & TESTING
// ============================================================

/**
 * Run this once to set up the weekly Friday trigger.
 * GAS time-based triggers: everyWeeks(1).onWeekDay(ScriptApp.WeekDay.FRIDAY)
 */
function installTrigger() {
  // Remove existing triggers for this function
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'onTimeTrigger')
    .forEach(t => ScriptApp.deleteTrigger(t));

  // Create weekly Friday trigger at 7-8 AM CT
  ScriptApp.newTrigger('onTimeTrigger')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(7)
    .nearMinute(15)
    .everyWeeks(1)
    .create();

  Logger.log('Trigger installed: onTimeTrigger every Friday ~7:15 AM CT');
}

/**
 * Manual test — find and preview the latest recap without sending.
 */
function testFindRecap() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (!folders.hasNext()) {
    Logger.log(`Folder "${DRIVE_FOLDER_NAME}" not found`);
    return;
  }

  const folder = folders.next();
  const htmlFile = findLatestFile(folder, 'text/html');

  if (htmlFile) {
    const html = htmlFile.getBlob().getDataAsString();
    Logger.log(`Found: ${htmlFile.getName()}`);
    Logger.log(`Modified: ${htmlFile.getLastUpdated()}`);
    Logger.log(`Headline: ${extractHeadline(html)}`);
    Logger.log(`Week: ${extractWeekNumber(html)}`);
    Logger.log(`Size: ${html.length} chars`);
  } else {
    Logger.log('No HTML recap found');
  }
}

/**
 * Manual test — send the latest recap email (full pipeline test).
 */
function testSendRecap() {
  onTimeTrigger();
}
