/**
 * Notion Sync for Email Classifier
 *
 * Pushes classification results to Brady's Notion Email Hub database.
 * Controlled by NOTION_SYNC_ENABLED property (default: false).
 *
 * Setup:
 *   PropertiesService.getScriptProperties().setProperty('NOTION_API_KEY', 'ntn_...');
 *   PropertiesService.getScriptProperties().setProperty('NOTION_SYNC_ENABLED', 'true');
 */

const NOTION_API_URL = 'https://api.notion.com/v1/pages';
const NOTION_API_VERSION = '2022-06-28';
const NOTION_EMAIL_HUB_DB_ID = '9b63f611b5744195b18e9f122579d4e2';

/**
 * Sync a classified email to Notion Email Hub.
 * No-ops if NOTION_SYNC_ENABLED is not 'true'.
 *
 * @param {GmailMessage} message - The Gmail message that was classified
 * @param {Object} classification - The classification result from classifyEmail()
 * @returns {Object|null} Notion API response, or null if sync is disabled/failed
 */
function syncToNotion(message, classification) {
  const enabled = getOptionalProperty('NOTION_SYNC_ENABLED', 'false');
  if (enabled !== 'true') return null;

  const apiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY');
  if (!apiKey) {
    logWarn(SCRIPT_NAME, 'NOTION_SYNC_ENABLED is true but NOTION_API_KEY is not set');
    return null;
  }

  try {
    const payload = buildNotionPayload_(message, classification);

    const response = UrlFetchApp.fetch(NOTION_API_URL, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_API_VERSION
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    const statusCode = response.getResponseCode();
    const body = response.getContentText();

    if (statusCode === 200) {
      logInfo(SCRIPT_NAME, 'Synced to Notion Email Hub', {
        subject: message.getSubject().substring(0, 80)
      });
      return JSON.parse(body);
    }

    logError(SCRIPT_NAME, `Notion API error (${statusCode})`, {
      body: body.substring(0, 500),
      subject: message.getSubject().substring(0, 80)
    });
    return null;

  } catch (e) {
    logError(SCRIPT_NAME, `Notion sync failed: ${e.message}`, {
      subject: message.getSubject().substring(0, 80)
    });
    return null;
  }
}

/**
 * Build the Notion API payload for creating a page in Email Hub.
 * @private
 */
function buildNotionPayload_(message, classification) {
  const properties = {
    // Title — use the email subject
    'Name': {
      title: [{ text: { content: message.getSubject().substring(0, 200) } }]
    },
    // Gmail metadata
    'Sender': {
      rich_text: [{ text: { content: message.getFrom().substring(0, 200) } }]
    },
    'Date': {
      date: { start: message.getDate().toISOString() }
    },
    // Classification fields
    'Mailbox Action': {
      select: { name: classification.mailbox_action || 'No Known Action' }
    },
    'Action Type': {
      select: { name: classification.action_type || 'Archive' }
    },
    'Category': {
      select: { name: classification.category || 'Other' }
    },
    'Person or Bot': {
      select: { name: classification.person_or_bot || 'Bot' }
    },
    'Priority': {
      select: { name: classification.priority || 'Low' }
    },
    'AI Summary': {
      rich_text: [{ text: { content: (classification.ai_summary || '').substring(0, 2000) } }]
    },
    'AI Next Step': {
      rich_text: [{ text: { content: (classification.ai_next_step || '').substring(0, 2000) } }]
    }
  };

  // Optional fields — only add if present
  if (classification.sub_action_type) {
    properties['Sub Action Type'] = {
      select: { name: classification.sub_action_type }
    };
  }

  if (classification.ai_suggested_reply) {
    properties['AI Suggested Reply'] = {
      rich_text: [{ text: { content: classification.ai_suggested_reply.substring(0, 2000) } }]
    };
  }

  if (classification.tags) {
    const tagNames = classification.tags.split(',').map(t => t.trim()).filter(Boolean);
    properties['Tags'] = {
      multi_select: tagNames.map(name => ({ name: name.substring(0, 100) }))
    };
  }

  return {
    parent: { database_id: NOTION_EMAIL_HUB_DB_ID },
    properties: properties
  };
}

// ============================================================
// TESTING
// ============================================================

/**
 * Test Notion sync with a mock classification result.
 * Run this from the GAS editor to verify the Notion integration.
 */
function testNotionSync() {
  const mockClassification = {
    mailbox_action: 'Other Action',
    action_type: 'Write Reply',
    sub_action_type: 'Quick',
    category: 'Consulting Inquiry',
    person_or_bot: 'Person',
    ai_summary: 'Test classification from GAS email classifier.',
    ai_suggested_reply: 'Thanks for reaching out. I am available Tue/Thu 12-3pm CT.',
    ai_next_step: 'Reply within 24 hours.',
    tags: 'consulting, test',
    priority: 'High'
  };

  // Create a minimal mock message object for testing
  const threads = GmailApp.search('is:read', 0, 1);
  if (threads.length === 0) {
    Logger.log('No emails found for testing. Send yourself a test email first.');
    return;
  }

  const msg = threads[0].getMessages()[0];
  Logger.log(`Testing Notion sync with email: ${msg.getSubject()}`);

  // Temporarily force sync on for the test
  const props = PropertiesService.getScriptProperties();
  const wasEnabled = props.getProperty('NOTION_SYNC_ENABLED');
  props.setProperty('NOTION_SYNC_ENABLED', 'true');

  const result = syncToNotion(msg, mockClassification);

  // Restore original setting
  if (wasEnabled === null) {
    props.deleteProperty('NOTION_SYNC_ENABLED');
  } else {
    props.setProperty('NOTION_SYNC_ENABLED', wasEnabled);
  }

  if (result) {
    Logger.log(`Notion sync succeeded. Page ID: ${result.id}`);
    Logger.log(`Page URL: ${result.url}`);
  } else {
    Logger.log('Notion sync failed. Check NOTION_API_KEY and database permissions.');
  }
}
