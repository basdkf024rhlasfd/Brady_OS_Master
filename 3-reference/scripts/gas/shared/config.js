/**
 * Shared Configuration Loader
 * Uses PropertiesService for secrets and runtime config.
 *
 * Properties are per-GAS-project, set via:
 *   PropertiesService.getScriptProperties().setProperty('KEY', 'value');
 */

/**
 * Get a required script property. Throws if missing.
 *
 * @param {string} key - Property name
 * @returns {string} Property value
 */
function getRequiredProperty(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) {
    throw new Error(`Required property "${key}" not found. Set it in Project Settings > Script Properties.`);
  }
  return value;
}

/**
 * Get an optional script property with a default.
 *
 * @param {string} key - Property name
 * @param {string} defaultValue - Fallback value
 * @returns {string} Property value or default
 */
function getOptionalProperty(key, defaultValue) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  return value !== null ? value : defaultValue;
}

/**
 * Save a checkpoint for a script (resume after interruption).
 * Stored in PropertiesService under "CHECKPOINT_{scriptName}".
 *
 * @param {string} scriptName - Script identifier
 * @param {Object} data - Checkpoint data (must be JSON-serializable)
 */
function saveCheckpoint(scriptName, data) {
  const key = `CHECKPOINT_${scriptName}`;
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(data));
}

/**
 * Get a saved checkpoint for a script.
 *
 * @param {string} scriptName - Script identifier
 * @returns {Object|null} Checkpoint data, or null if none exists
 */
function getCheckpoint(scriptName) {
  const key = `CHECKPOINT_${scriptName}`;
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

/**
 * Clear a checkpoint after successful completion.
 *
 * @param {string} scriptName - Script identifier
 */
function clearCheckpoint(scriptName) {
  const key = `CHECKPOINT_${scriptName}`;
  PropertiesService.getScriptProperties().deleteProperty(key);
}
