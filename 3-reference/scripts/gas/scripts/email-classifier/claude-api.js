/**
 * Claude API wrapper for Google Apps Script
 * Uses UrlFetchApp (GAS built-in HTTP client)
 *
 * Setup: Store your Anthropic API key in PropertiesService:
 *   PropertiesService.getScriptProperties().setProperty('ANTHROPIC_API_KEY', 'sk-ant-...');
 */

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_DEFAULT_MODEL = 'claude-sonnet-4-5-20250929';
const CLAUDE_MAX_RETRIES = 3;
const CLAUDE_RETRY_DELAY_MS = 2000;

/**
 * Send a message to Claude and get a response.
 *
 * @param {string} prompt - The user message
 * @param {Object} options - Optional overrides
 * @param {string} options.model - Model to use (default: claude-sonnet-4-5-20250929)
 * @param {number} options.maxTokens - Max response tokens (default: 1024)
 * @param {string} options.system - System prompt
 * @param {number} options.temperature - Temperature (default: 0 for deterministic)
 * @returns {Object} Parsed JSON response or raw text
 */
function callClaude(prompt, options = {}) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not found in PropertiesService. Run setup first.');
  }

  const payload = {
    model: options.model || CLAUDE_DEFAULT_MODEL,
    max_tokens: options.maxTokens || 1024,
    temperature: options.temperature !== undefined ? options.temperature : 0,
    messages: [{ role: 'user', content: prompt }]
  };

  if (options.system) {
    payload.system = options.system;
  }

  const fetchOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  let lastError = null;

  for (let attempt = 1; attempt <= CLAUDE_MAX_RETRIES; attempt++) {
    try {
      const response = UrlFetchApp.fetch(CLAUDE_API_URL, fetchOptions);
      const statusCode = response.getResponseCode();
      const body = response.getContentText();

      if (statusCode === 200) {
        const parsed = JSON.parse(body);
        const text = parsed.content[0].text;

        // Try to parse as JSON (most of our scripts expect JSON output)
        try {
          return { success: true, data: JSON.parse(text), raw: text };
        } catch (e) {
          // Not JSON — return raw text
          return { success: true, data: null, raw: text };
        }
      }

      // Rate limited — retry
      if (statusCode === 429 || statusCode === 529) {
        lastError = `Rate limited (${statusCode}): ${body}`;
        if (attempt < CLAUDE_MAX_RETRIES) {
          Utilities.sleep(CLAUDE_RETRY_DELAY_MS * attempt);
          continue;
        }
      }

      // Server error — retry
      if (statusCode >= 500) {
        lastError = `Server error (${statusCode}): ${body}`;
        if (attempt < CLAUDE_MAX_RETRIES) {
          Utilities.sleep(CLAUDE_RETRY_DELAY_MS * attempt);
          continue;
        }
      }

      // Client error — don't retry
      return { success: false, error: `API error (${statusCode}): ${body}`, raw: body };

    } catch (e) {
      lastError = `Fetch error: ${e.message}`;
      if (attempt < CLAUDE_MAX_RETRIES) {
        Utilities.sleep(CLAUDE_RETRY_DELAY_MS * attempt);
        continue;
      }
    }
  }

  return { success: false, error: `Failed after ${CLAUDE_MAX_RETRIES} attempts. Last error: ${lastError}` };
}

/**
 * Quick health check — verifies API key works.
 */
function testClaudeConnection() {
  const result = callClaude('Respond with exactly: {"status": "ok"}', { maxTokens: 50 });
  Logger.log(result.success ? 'Claude API connected' : `Claude API failed: ${result.error}`);
  return result.success;
}
