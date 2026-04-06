/**
 * Standard Error Handler for Google Apps Script
 * Wraps script entry points with try/catch, logging, and email alerting.
 */

const ERROR_ALERT_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes between alert emails

/**
 * Wrap a script's main function with standard error handling.
 * Catches errors, logs them, and sends email alerts for critical failures.
 *
 * @param {string} scriptName - Script identifier for logging
 * @param {Function} fn - The function to execute
 */
function withErrorHandling(scriptName, fn) {
  try {
    fn();
  } catch (e) {
    const errorMsg = `${scriptName} failed: ${e.message}`;

    // Log the error
    logError(scriptName, errorMsg, { stack: e.stack });

    // Send email alert if cooldown has passed
    sendErrorAlert_(scriptName, e);

    // Re-throw so GAS marks the execution as failed
    throw e;
  }
}

/**
 * Send an email alert for critical errors, with cooldown to avoid spam.
 * @private
 */
function sendErrorAlert_(scriptName, error) {
  try {
    const props = PropertiesService.getScriptProperties();
    const cooldownKey = `LAST_ALERT_${scriptName}`;
    const lastAlert = props.getProperty(cooldownKey);
    const now = Date.now();

    if (lastAlert && (now - parseInt(lastAlert)) < ERROR_ALERT_COOLDOWN_MS) {
      return; // Still in cooldown
    }

    const email = Session.getActiveUser().getEmail();
    if (!email) return;

    MailApp.sendEmail({
      to: email,
      subject: `[GAS Alert] ${scriptName} error`,
      body: `Script "${scriptName}" encountered an error:\n\n${error.message}\n\nStack trace:\n${error.stack}\n\nTimestamp: ${new Date().toISOString()}`
    });

    props.setProperty(cooldownKey, now.toString());
  } catch (e) {
    // Don't fail the error handler itself
    Logger.log(`Alert email failed: ${e.message}`);
  }
}
