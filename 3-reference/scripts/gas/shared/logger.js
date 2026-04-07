/**
 * Structured Logger for Google Apps Script
 * Logs to a dedicated Google Sheet tab per script.
 *
 * Setup: Store the log sheet ID in PropertiesService:
 *   PropertiesService.getScriptProperties().setProperty('LOG_SHEET_ID', 'your-sheet-id');
 */

const LOG_RETENTION_DAYS = 30;

/**
 * Log an INFO message.
 *
 * @param {string} scriptName - Script identifier
 * @param {string} message - Log message
 * @param {Object} [data] - Optional structured data to include
 */
function logInfo(scriptName, message, data) {
  writeLog_(scriptName, 'INFO', message, data);
}

/**
 * Log a WARN message.
 *
 * @param {string} scriptName - Script identifier
 * @param {string} message - Log message
 * @param {Object} [data] - Optional structured data to include
 */
function logWarn(scriptName, message, data) {
  writeLog_(scriptName, 'WARN', message, data);
}

/**
 * Log an ERROR message.
 *
 * @param {string} scriptName - Script identifier
 * @param {string} message - Log message
 * @param {Object} [data] - Optional structured data to include
 */
function logError(scriptName, message, data) {
  writeLog_(scriptName, 'ERROR', message, data);
}

/**
 * Purge log rows older than LOG_RETENTION_DAYS.
 *
 * @param {string} scriptName - Script identifier (used as sheet tab name)
 */
function purgeLogs(scriptName) {
  try {
    const sheet = getLogSheet_(scriptName);
    if (!sheet) return;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - LOG_RETENTION_DAYS);

    const data = sheet.getDataRange().getValues();
    const rowsToDelete = [];

    // Start from row 2 (skip header), check timestamp in column A
    for (let i = 1; i < data.length; i++) {
      const timestamp = new Date(data[i][0]);
      if (timestamp < cutoff) {
        rowsToDelete.push(i + 1); // 1-indexed sheet rows
      }
    }

    // Delete from bottom to top to preserve row indices
    for (let i = rowsToDelete.length - 1; i >= 0; i--) {
      sheet.deleteRow(rowsToDelete[i]);
    }

    if (rowsToDelete.length > 0) {
      Logger.log(`Purged ${rowsToDelete.length} old log rows from ${scriptName}`);
    }
  } catch (e) {
    Logger.log(`Log purge failed for ${scriptName}: ${e.message}`);
  }
}

// ============================================================
// INTERNAL HELPERS
// ============================================================

/**
 * Write a log entry to the sheet and to Logger.
 * @private
 */
function writeLog_(scriptName, level, message, data) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${level}] [${scriptName}] ${message}`;

  // Always log to GAS Logger (visible in Executions)
  Logger.log(logLine);

  // Try to log to Google Sheet
  try {
    const sheet = getLogSheet_(scriptName);
    if (sheet) {
      const row = [
        timestamp,
        level,
        scriptName,
        message,
        data ? JSON.stringify(data) : ''
      ];
      sheet.appendRow(row);
    }
  } catch (e) {
    // Don't fail the script just because logging failed
    Logger.log(`Sheet logging failed: ${e.message}`);
  }
}

/**
 * Get or create the log sheet tab for a script.
 * @private
 */
function getLogSheet_(scriptName) {
  const sheetId = PropertiesService.getScriptProperties().getProperty('LOG_SHEET_ID');
  if (!sheetId) return null;

  try {
    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName(scriptName);

    if (!sheet) {
      sheet = ss.insertSheet(scriptName);
      // Add header row
      sheet.appendRow(['Timestamp', 'Level', 'Script', 'Message', 'Data']);
      sheet.setFrozenRows(1);
    }

    return sheet;
  } catch (e) {
    Logger.log(`Could not open log sheet (${sheetId}): ${e.message}`);
    return null;
  }
}
