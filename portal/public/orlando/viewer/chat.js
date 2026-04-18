// Orlando RE Chat Widget
// Requires: marked.js (already loaded by viewer), files[] and cache{} from viewer
(function() {
  'use strict';

  // ─── Config ───
  const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
  const MODEL = 'claude-sonnet-4-20250514';
  const MAX_TOKENS = 4096;
  const MAX_HISTORY = 10;
  const MAX_MESSAGES = 20;
  const LS_PREFIX = 'orlando_chat_';

  const STARTERS = [
    'What neighborhoods are good for families under $400K?',
    'Walk me through the buying process',
    'What are the hidden costs of buying in Florida?',
    "I'm moving from Brazil — what do I need to know?",
  ];

  // ─── KB Routing ───
  // Keyword → file IDs mapping (mirrors content-manifest.json quickRoutes + extras)
  const ROUTE_RULES = [
    { keywords: ['neighborhood', 'where to live', 'area', 'location', 'zip code', 'best place', 'family friendly', 'commute'], ids: ['neighborhoods'] },
    { keywords: ['cost', 'afford', 'tax', 'insurance', 'hoa', 'cdd', 'closing cost', 'how much', 'monthly', 'property tax'], ids: ['taxes'] },
    { keywords: ['buy', 'buying', 'process', 'step', 'first time', 'offer', 'closing', 'inspection', 'appraisal'], ids: ['buying'] },
    { keywords: ['brazil', 'brazilian', 'foreign', 'international', 'firpta', 'itin', 'visa', 'immigrant'], ids: ['brazilian'] },
    { keywords: ['invest', 'rental', 'cap rate', 'cash flow', 'str', 'airbnb', 'roi', 'pro forma'], ids: ['investment', 'casestudies'] },
    { keywords: ['brazilian business', 'brazilian restaurant', 'brazilian community', 'portuguese'], ids: ['directory'] },
    { keywords: ['utility', 'onboard', 'concierge', 'settle', 'moving', 'relocat', 'first 90', 'healthcare', 'doctor'], ids: ['concierge'] },
    { keywords: ['school', 'district', 'education', 'kid', 'children'], ids: ['schools'] },
    { keywords: ['hurricane', 'flood', 'sinkhole', 'risk', 'insurance crisis'], ids: ['risks'] },
    { keywords: ['finance', 'loan', 'fha', 'va', 'usda', 'down payment', 'mortgage', 'interest rate'], ids: ['financing'] },
    { keywords: ['new construction', 'builder', 'new build', 'new home', '55+', 'retirement'], ids: ['construction'] },
    { keywords: ['luxury', 'million', 'high end', 'isleworth', 'golden oak', 'windermere'], ids: ['luxury'] },
    { keywords: ['market', 'trend', 'price', 'median', 'inventory', 'appreciation'], ids: ['market'] },
    { keywords: ['agent', 'commission', 'mls', 'listing', 'transaction'], ids: ['agent'] },
    { keywords: ['economy', 'job', 'employer', 'salary', 'cost of living', 'population'], ids: ['economy'] },
    { keywords: ['commute', 'sunrail', 'brightline', 'traffic', 'highway', 'i-4', 'turnpike'], ids: ['infrastructure'] },
  ];

  function routeMessage(text) {
    const lower = text.toLowerCase();
    const matched = new Set();
    // Always include market overview for general questions
    for (const rule of ROUTE_RULES) {
      for (const kw of rule.keywords) {
        if (lower.includes(kw)) {
          rule.ids.forEach(id => matched.add(id));
          break;
        }
      }
    }
    // If nothing matched, give broad context
    if (matched.size === 0) {
      matched.add('market');
      matched.add('neighborhoods');
      matched.add('buying');
    }
    // Cap at 4 files to control costs
    return [...matched].slice(0, 4);
  }

  async function fetchKBFile(id) {
    // Reuse viewer's cache if available
    if (typeof cache !== 'undefined' && cache[id]) return cache[id];
    const entry = (typeof files !== 'undefined' ? files : []).find(f => f.id === id);
    if (!entry) return null;
    try {
      const res = await fetch(entry.file);
      if (!res.ok) return null;
      const text = await res.text();
      if (typeof cache !== 'undefined') cache[id] = text;
      return text;
    } catch { return null; }
  }

  function buildSystemPrompt(kbContents) {
    let prompt = `You are an Orlando, Florida real estate expert assistant. You help buyers, investors, and agents with questions about the Orlando metro real estate market.

IMPORTANT GUIDELINES:
- Be concise and practical. Lead with the answer, then provide supporting detail.
- When citing prices, rates, or statistics, note they are as of early 2026 and may have changed.
- If the question is outside your knowledge base, say so honestly.
- Format responses with markdown for readability.
- For cost questions, break down the full monthly cost stack (mortgage, taxes, insurance, HOA, CDD).
- For neighborhood questions, consider budget, lifestyle, commute, and family needs.

Data compiled February 2026 using ORRA, Redfin, Zillow, FEMA, Orlando Economic Partnership, Florida Realtors, and county property appraisers.

YOUR KNOWLEDGE BASE:
You have access to a curated Orlando real estate knowledge base. Relevant sections are automatically loaded into your context based on each user question. The knowledge base covers:
- Market overview (prices, inventory, trends, forecasts)
- Neighborhood profiles (50+ Orlando submarkets with pricing, demographics, investment metrics)
- Taxes, insurance, HOA, CDD, and closing costs
- Florida laws and regulations
- Buying process (step-by-step guide)
- Financing programs (FHA, VA, USDA, down payment assistance)
- Investment and rental analysis (cap rates, cash flow, pro formas, case studies)
- New construction and builders
- Luxury market
- Schools and quality of life
- Risks (hurricanes, floods, sinkholes, insurance)
- Economy and demographics
- Infrastructure and transportation (SunRail, Brightline, I-4)
- Brazilian/international buyer guide
- Community concierge (utilities, healthcare, onboarding)

When answering, draw on this knowledge base content confidently. Do not claim you cannot access data or URLs — the relevant data has already been provided to you. If asked what you can access, describe these knowledge base topics honestly. You ARE the knowledge base interface for this platform.\n\n`;

    for (const [id, content] of Object.entries(kbContents)) {
      const entry = (typeof files !== 'undefined' ? files : []).find(f => f.id === id);
      const label = entry ? entry.label : id;
      prompt += `--- ${label} ---\n${content}\n\n`;
    }
    return prompt;
  }

  // ─── State ───
  function loadState() {
    try {
      return {
        history: JSON.parse(localStorage.getItem(LS_PREFIX + 'history') || '[]'),
        activeId: localStorage.getItem(LS_PREFIX + 'activeId'),
        apiKey: localStorage.getItem(LS_PREFIX + 'apiKey'),
        mode: localStorage.getItem(LS_PREFIX + 'mode') || 'own-key',
      };
    } catch { return { history: [], activeId: null, apiKey: null, mode: 'own-key' }; }
  }

  function saveState(state) {
    localStorage.setItem(LS_PREFIX + 'history', JSON.stringify(state.history.slice(0, MAX_HISTORY)));
    localStorage.setItem(LS_PREFIX + 'activeId', state.activeId || '');
    if (state.apiKey) localStorage.setItem(LS_PREFIX + 'apiKey', state.apiKey);
    localStorage.setItem(LS_PREFIX + 'mode', state.mode);
  }

  function getActiveChat(state) {
    return state.history.find(c => c.id === state.activeId) || null;
  }

  function newChat(state) {
    const chat = {
      id: 'chat-' + Date.now(),
      title: 'New conversation',
      messages: [],
      kbFilesUsed: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.history.unshift(chat);
    state.activeId = chat.id;
    saveState(state);
    return chat;
  }

  // ─── Streaming API Call ───
  async function* streamChat(messages, apiKey, kbFileIds) {
    // Fetch KB files
    const kbContents = {};
    await Promise.all(kbFileIds.map(async id => {
      const content = await fetchKBFile(id);
      if (content) kbContents[id] = content;
    }));

    const systemPrompt = buildSystemPrompt(kbContents);

    const body = {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      stream: true,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    };

    const res = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`API error ${res.status}: ${err}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') return;
        try {
          const event = JSON.parse(data);
          if (event.type === 'content_block_delta' && event.delta?.text) {
            yield event.delta.text;
          }
        } catch { /* skip parse errors */ }
      }
    }
  }

  // ─── Export Functions ───
  function generateChatExport(chat, kbCache) {
    let out = `=== Orlando Real Estate Assistant ===\nUse this context to continue this conversation in your own AI tool.\nData: February 2026. Prices/rates may have changed.\n\n`;

    for (const id of chat.kbFilesUsed) {
      const content = kbCache[id];
      if (!content) continue;
      const entry = (typeof files !== 'undefined' ? files : []).find(f => f.id === id);
      const label = entry ? entry.label : id;
      out += `--- CONTEXT: ${label} ---\n${content}\n\n`;
    }

    out += `--- CONVERSATION ---\n`;
    for (const m of chat.messages) {
      out += `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}\n\n`;
    }
    return out;
  }

  async function generateKBExport() {
    let out = `# Orlando Real Estate Knowledge Base\n\n`;
    out += `> Upload this file to a Claude Project, ChatGPT Custom GPT, or any AI tool to get an Orlando real estate expert.\n`;
    out += `> Data compiled February 2026 using ORRA, Redfin, Zillow, FEMA, Orlando Economic Partnership, Florida Realtors, and county property appraisers.\n\n`;
    out += `## Instructions for your AI tool\n\n`;
    out += `You are an Orlando, Florida real estate expert. Use the knowledge below to answer questions about neighborhoods, costs, buying process, investment analysis, and more. When citing prices or rates, note they are as of early 2026 and may have changed.\n\n`;
    out += `---\n\n`;

    const allFiles = typeof files !== 'undefined' ? files.filter(f => f.id !== 'readme') : [];
    for (const f of allFiles) {
      const content = await fetchKBFile(f.id);
      if (content) {
        out += `# ${f.label}\n\n${content}\n\n---\n\n`;
      }
    }
    return out;
  }

  function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ─── Toast ───
  function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:80px;right:24px;background:#1a221a;color:#6b9e5a;padding:12px 20px;border-radius:8px;font-size:13px;z-index:100001;border:1px solid #2a322a;transition:opacity 0.3s;font-family:Source Sans 3,system-ui,sans-serif;';
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2500);
  }

  // ─── Build UI ───
  function createWidget() {
    // Inject CSS — rebranded minimalist theme
    const style = document.createElement('style');
    style.textContent = `
      #chat-fab {
        position: fixed; bottom: 24px; right: 24px; width: 52px; height: 52px;
        border-radius: 50%; background: var(--accent-primary, #c9a84c); border: none; cursor: pointer;
        box-shadow: 0 4px 16px rgba(0,0,0,0.4); z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.15s, background 0.15s;
      }
      #chat-fab:hover { transform: scale(1.08); background: #d4b65e; }
      #chat-fab svg { width: 22px; height: 22px; fill: #141414; }

      #chat-panel {
        position: fixed; bottom: 24px; right: 24px; width: 420px; height: 620px;
        background: var(--bg-secondary, #1c1c1c); border: 1px solid var(--border, #2a2a2a); border-radius: 12px;
        display: none; flex-direction: column; z-index: 100000;
        box-shadow: 0 8px 32px rgba(0,0,0,0.6); overflow: hidden;
        transition: width 0.25s, height 0.25s, top 0.25s, bottom 0.25s;
        font-family: 'Source Sans 3', -apple-system, system-ui, sans-serif;
      }
      #chat-panel.open { display: flex; }
      #chat-panel.maximized {
        width: 50vw; height: calc(100vh - 48px); top: 24px; bottom: auto;
        border-radius: 12px;
      }

      @media (max-width: 768px) {
        #chat-panel { top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; border-radius: 0; }
      }

      .chat-header {
        display: flex; align-items: center; padding: 10px 14px;
        border-bottom: 1px solid var(--border, #2a2a2a); background: var(--bg-primary, #141414); flex-shrink: 0;
      }
      .chat-header-title { flex: 1; font-size: 13px; font-weight: 600; color: var(--text-secondary, #888); letter-spacing: 0.3px; }
      .chat-header-actions { display: flex; gap: 2px; align-items: center; }
      .chat-header-actions button {
        background: none; border: none; color: var(--text-muted, #555); cursor: pointer; padding: 5px 7px;
        font-size: 11px; border-radius: 4px; transition: color 0.15s, background 0.15s;
        display: flex; align-items: center; gap: 4px;
      }
      .chat-header-actions button:hover { color: var(--text-primary, #e8e8e8); background: var(--bg-surface, #242424); }
      .chat-header-actions button svg { width: 14px; height: 14px; fill: currentColor; }
      .chat-header-actions .btn-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }

      .chat-messages {
        flex: 1; overflow-y: auto; padding: 16px;
        display: flex; flex-direction: column; gap: 12px;
      }

      .chat-msg { max-width: 92%; line-height: 1.6; font-size: 14px; }
      .chat-msg.user {
        align-self: flex-end; background: var(--bg-surface, #242424); color: var(--text-primary, #e8e8e8);
        padding: 10px 14px; border-radius: 12px 12px 4px 12px;
      }
      .chat-msg.assistant {
        align-self: flex-start; color: #bbb; padding: 4px 0;
      }
      .chat-msg.assistant h1, .chat-msg.assistant h2, .chat-msg.assistant h3 { color: var(--accent-primary, #c9a84c); margin: 12px 0 8px; }
      .chat-msg.assistant h1 { font-size: 18px; }
      .chat-msg.assistant h2 { font-size: 16px; }
      .chat-msg.assistant h3 { font-size: 14px; }
      .chat-msg.assistant p { margin: 0 0 8px; }
      .chat-msg.assistant ul, .chat-msg.assistant ol { margin: 0 0 8px; padding-left: 20px; }
      .chat-msg.assistant li { margin: 2px 0; }
      .chat-msg.assistant code { background: var(--bg-surface, #242424); padding: 1px 5px; border-radius: 3px; font-size: 13px; color: var(--accent-secondary, #6b8cae); }
      .chat-msg.assistant pre { background: var(--bg-primary, #141414); border: 1px solid var(--border, #2a2a2a); border-radius: 6px; padding: 10px; overflow-x: auto; margin: 0 0 8px; }
      .chat-msg.assistant strong { color: var(--text-primary, #e8e8e8); }
      .chat-msg.assistant a { color: var(--accent-secondary, #6b8cae); }
      .chat-msg.assistant table { width: 100%; border-collapse: collapse; margin: 0 0 8px; font-size: 13px; }
      .chat-msg.assistant th { text-align: left; padding: 6px 8px; background: var(--bg-surface, #242424); color: var(--accent-secondary, #6b8cae); border: 1px solid var(--border, #2a2a2a); }
      .chat-msg.assistant td { padding: 6px 8px; border: 1px solid var(--border-light, #1e1e1e); }
      .chat-msg.assistant blockquote { border-left: 3px solid var(--accent-secondary, #6b8cae); padding: 4px 12px; margin: 0 0 8px; background: #161620; border-radius: 0 4px 4px 0; }

      .chat-msg.system {
        align-self: center; color: var(--text-muted, #555); font-size: 12px; text-align: center;
        padding: 8px; font-style: italic;
      }

      .chat-typing {
        align-self: flex-start; color: var(--text-muted, #555); font-size: 13px; padding: 4px 0;
      }
      .chat-typing span { animation: blink 1.2s infinite; }
      @keyframes blink { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }

      .chat-starters {
        display: flex; flex-direction: column; gap: 6px; padding: 8px 0;
      }
      .chat-starter-category { font-size: 10px; color: var(--text-muted, #555); text-transform: uppercase; letter-spacing: 0.8px; padding: 8px 0 4px; font-weight: 600; }
      .chat-starter-category:first-child { padding-top: 0; }
      .chat-starter {
        background: var(--bg-primary, #141414); border: 1px solid var(--border, #2a2a2a); border-radius: 6px;
        padding: 9px 12px; color: #999; font-size: 13px; cursor: pointer;
        text-align: left; transition: all 0.15s;
      }
      .chat-starter:hover { background: var(--bg-surface, #242424); color: var(--text-primary, #e8e8e8); border-color: var(--accent-primary, #c9a84c); }

      .chat-input-bar {
        display: flex; gap: 8px; padding: 12px 14px;
        border-top: 1px solid var(--border, #2a2a2a); background: var(--bg-primary, #141414); flex-shrink: 0;
      }
      .chat-input-bar textarea {
        flex: 1; resize: none; background: var(--bg-surface, #242424); border: 1px solid #333;
        border-radius: 8px; padding: 10px 12px; color: var(--text-primary, #e8e8e8); font-size: 14px;
        font-family: inherit; outline: none; min-height: 42px; max-height: 120px;
      }
      .chat-input-bar textarea:focus { border-color: var(--accent-secondary, #6b8cae); }
      .chat-input-bar textarea::placeholder { color: var(--text-muted, #555); }
      .chat-send-btn {
        background: var(--accent-primary, #c9a84c); border: none; border-radius: 8px; padding: 0 16px;
        cursor: pointer; color: #141414; font-weight: 600; font-size: 13px;
        transition: background 0.15s; flex-shrink: 0; letter-spacing: 0.3px;
      }
      .chat-send-btn:hover { background: #d4b65e; }
      .chat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

      .chat-settings {
        padding: 16px; border-bottom: 1px solid var(--border, #2a2a2a); background: var(--bg-primary, #141414); display: none;
      }
      .chat-settings.open { display: block; }
      .chat-settings label { display: block; font-size: 12px; color: var(--text-secondary, #888); margin-bottom: 6px; }
      .chat-settings input {
        width: 100%; padding: 8px 10px; background: var(--bg-surface, #242424); border: 1px solid #333;
        border-radius: 6px; color: #ccc; font-size: 13px; outline: none; font-family: monospace;
      }
      .chat-settings input:focus { border-color: var(--accent-secondary, #6b8cae); }
      .chat-settings .hint { font-size: 11px; color: var(--text-muted, #555); margin-top: 6px; }

      .chat-history-list {
        padding: 8px 16px; border-bottom: 1px solid var(--border, #2a2a2a); background: var(--bg-primary, #141414); display: none;
        max-height: 200px; overflow-y: auto;
      }
      .chat-history-list.open { display: block; }
      .chat-history-item {
        display: flex; align-items: center; gap: 8px; padding: 6px 8px;
        cursor: pointer; border-radius: 4px; transition: background 0.15s;
      }
      .chat-history-item:hover { background: var(--bg-surface, #242424); }
      .chat-history-item.active { background: #1a1a22; }
      .chat-history-item .title { flex: 1; font-size: 12px; color: #999; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .chat-history-item .date { font-size: 10px; color: var(--text-muted, #555); }
      .chat-history-item .delete-chat {
        background: none; border: none; color: var(--text-muted, #555); cursor: pointer; font-size: 14px;
        padding: 0 4px; border-radius: 3px; transition: color 0.15s;
      }
      .chat-history-item .delete-chat:hover { color: var(--danger, #c45c5c); }
    `;
    document.head.appendChild(style);

    // FAB button
    const fab = document.createElement('button');
    fab.id = 'chat-fab';
    fab.title = 'Chat with AI';
    fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>';
    document.body.appendChild(fab);

    // SVG icon helpers
    const icons = {
      plus: '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
      history: '<svg viewBox="0 0 24 24"><path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7a6.98 6.98 0 01-4.95-2.05l-1.41 1.41A8.96 8.96 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>',
      copy: '<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
      expand: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
      collapse: '<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>',
      settings: '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.6 3.6 0 0112 15.6z"/></svg>',
      close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    };

    // Panel
    const panel = document.createElement('div');
    panel.id = 'chat-panel';
    panel.innerHTML = `
      <div class="chat-header">
        <span class="chat-header-title">Assistant</span>
        <div class="chat-header-actions">
          <button id="chat-new" title="New conversation">${icons.plus}<span class="btn-label">New</span></button>
          <button id="chat-history-btn" title="History">${icons.history}<span class="btn-label">History</span></button>
          <button id="chat-copy" title="Copy this chat">${icons.copy}<span class="btn-label">Copy</span></button>
          <button id="chat-expand" title="Expand">${icons.expand}</button>
          <button id="chat-settings-btn" title="Settings">${icons.settings}</button>
          <button id="chat-close" title="Close">${icons.close}</button>
        </div>
      </div>
      <div class="chat-settings" id="chat-settings">
        <label>Anthropic API Key</label>
        <input type="password" id="chat-api-key" placeholder="sk-ant-..." autocomplete="off">
        <div class="hint">Your key stays in your browser. Never sent anywhere except Anthropic's API.</div>
      </div>
      <div class="chat-history-list" id="chat-history-list"></div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input-bar">
        <textarea id="chat-input" placeholder="Ask about Orlando real estate..." rows="1"></textarea>
        <button class="chat-send-btn" id="chat-send">Send</button>
      </div>
    `;
    document.body.appendChild(panel);

    return { fab, panel, icons };
  }

  // ─── Structured Starter Menu ───
  const STARTER_MENU = [
    { category: 'Find Your Home', items: [
      'What neighborhoods fit my budget and lifestyle?',
      'What are the hidden costs of buying in Orlando?',
    ]},
    { category: 'Investment', items: [
      'Analyze a rental property for cash flow',
    ]},
    { category: 'Moving to Orlando', items: [
      "I'm relocating — walk me through the process",
      "I'm moving from Brazil — what do I need to know?",
    ]},
    { category: 'Market', items: [
      "What's the current market doing?",
    ]},
  ];

  // ─── Controller ───
  function init() {
    const { fab, panel, icons } = createWidget();
    let state = loadState();
    let isStreaming = false;
    let currentKBCache = {};
    let isMaximized = false;

    const messagesEl = document.getElementById('chat-messages');
    const inputEl = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const settingsPanel = document.getElementById('chat-settings');
    const apiKeyInput = document.getElementById('chat-api-key');
    const historyList = document.getElementById('chat-history-list');

    // Config-based API key: check window.ORLANDO_CONFIG first
    const cfg = window.ORLANDO_CONFIG || {};
    if (cfg.apiKey && !state.apiKey) {
      state.apiKey = cfg.apiKey;
      saveState(state);
    }

    // Restore API key
    if (state.apiKey) apiKeyInput.value = state.apiKey;

    // Open/close
    fab.addEventListener('click', () => {
      panel.classList.add('open');
      fab.style.display = 'none';
      if (!state.activeId || !getActiveChat(state)) {
        newChat(state);
      }
      renderMessages();
      inputEl.focus();
    });

    document.getElementById('chat-close').addEventListener('click', () => {
      panel.classList.remove('open');
      if (isMaximized) {
        panel.classList.remove('maximized');
        isMaximized = false;
        document.dispatchEvent(new Event('chat-collapsed'));
      }
      fab.style.display = 'flex';
      settingsPanel.classList.remove('open');
      historyList.classList.remove('open');
    });

    // Maximize toggle
    const expandBtn = document.getElementById('chat-expand');
    expandBtn.addEventListener('click', () => {
      isMaximized = !isMaximized;
      panel.classList.toggle('maximized', isMaximized);
      expandBtn.innerHTML = isMaximized ? icons.collapse : icons.expand;
      expandBtn.title = isMaximized ? 'Collapse' : 'Expand';
      document.dispatchEvent(new Event(isMaximized ? 'chat-expanded' : 'chat-collapsed'));
    });

    // New chat
    document.getElementById('chat-new').addEventListener('click', () => {
      newChat(state);
      renderMessages();
      historyList.classList.remove('open');
      inputEl.focus();
    });

    // Settings toggle
    document.getElementById('chat-settings-btn').addEventListener('click', () => {
      settingsPanel.classList.toggle('open');
      historyList.classList.remove('open');
      if (settingsPanel.classList.contains('open')) apiKeyInput.focus();
    });

    apiKeyInput.addEventListener('input', () => {
      state.apiKey = apiKeyInput.value.trim();
      saveState(state);
    });

    // History toggle
    document.getElementById('chat-history-btn').addEventListener('click', () => {
      historyList.classList.toggle('open');
      settingsPanel.classList.remove('open');
      if (historyList.classList.contains('open')) renderHistoryList();
    });

    // Copy chat
    document.getElementById('chat-copy').addEventListener('click', async () => {
      const chat = getActiveChat(state);
      if (!chat || chat.messages.length === 0) {
        showToast('No conversation to copy');
        return;
      }
      // Ensure KB files are cached
      for (const id of chat.kbFilesUsed) {
        if (!currentKBCache[id]) {
          const content = await fetchKBFile(id);
          if (content) currentKBCache[id] = content;
        }
      }
      const exported = generateChatExport(chat, currentKBCache);
      try {
        await navigator.clipboard.writeText(exported);
        showToast('Copied! Paste into Claude, ChatGPT, or any AI tool.');
      } catch {
        showToast('Copy failed — check browser permissions');
      }
    });

    // Auto-resize textarea
    inputEl.addEventListener('input', () => {
      inputEl.style.height = 'auto';
      inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
    });

    // Send on Enter (Shift+Enter for newline)
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    sendBtn.addEventListener('click', sendMessage);

    function renderMessages() {
      const chat = getActiveChat(state);
      messagesEl.innerHTML = '';

      if (!chat || chat.messages.length === 0) {
        // Show starters
        if (!state.apiKey) {
          const sysMsg = document.createElement('div');
          sysMsg.className = 'chat-msg system';
          sysMsg.textContent = 'Configure your API key in Settings to start chatting.';
          messagesEl.appendChild(sysMsg);
        }
        const startersDiv = document.createElement('div');
        startersDiv.className = 'chat-starters';
        STARTER_MENU.forEach(group => {
          const catLabel = document.createElement('div');
          catLabel.className = 'chat-starter-category';
          catLabel.textContent = group.category;
          startersDiv.appendChild(catLabel);
          group.items.forEach(text => {
            const btn = document.createElement('button');
            btn.className = 'chat-starter';
            btn.textContent = text;
            btn.addEventListener('click', () => {
              if (!state.apiKey) {
                settingsPanel.classList.add('open');
                apiKeyInput.focus();
                showToast('Add your API key first');
                return;
              }
              inputEl.value = text;
              sendMessage();
            });
            startersDiv.appendChild(btn);
          });
        });
        messagesEl.appendChild(startersDiv);
        return;
      }

      for (const m of chat.messages) {
        const div = document.createElement('div');
        div.className = 'chat-msg ' + m.role;
        if (m.role === 'assistant') {
          div.innerHTML = marked.parse(m.content);
        } else {
          div.textContent = m.content;
        }
        messagesEl.appendChild(div);
      }
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function renderHistoryList() {
      historyList.innerHTML = '';
      for (const chat of state.history) {
        const item = document.createElement('div');
        item.className = 'chat-history-item' + (chat.id === state.activeId ? ' active' : '');
        const d = new Date(chat.createdAt);
        const dateStr = `${d.getMonth()+1}/${d.getDate()}`;
        item.innerHTML = `<span class="title">${escapeHtml(chat.title)}</span><span class="date">${dateStr}</span><button class="delete-chat" title="Delete">&times;</button>`;
        item.querySelector('.title').addEventListener('click', () => {
          state.activeId = chat.id;
          saveState(state);
          renderMessages();
          renderHistoryList();
        });
        item.querySelector('.delete-chat').addEventListener('click', (e) => {
          e.stopPropagation();
          state.history = state.history.filter(c => c.id !== chat.id);
          if (state.activeId === chat.id) {
            state.activeId = state.history[0]?.id || null;
          }
          saveState(state);
          renderMessages();
          renderHistoryList();
        });
        historyList.appendChild(item);
      }
    }

    async function sendMessage() {
      const text = inputEl.value.trim();
      if (!text || isStreaming) return;

      if (!state.apiKey) {
        settingsPanel.classList.add('open');
        apiKeyInput.focus();
        showToast('Add your API key first');
        return;
      }

      let chat = getActiveChat(state);
      if (!chat) chat = newChat(state);

      if (chat.messages.length >= MAX_MESSAGES) {
        showToast('Conversation limit reached. Start a new chat.');
        return;
      }

      // Add user message
      chat.messages.push({ role: 'user', content: text });
      if (chat.messages.length === 1) {
        chat.title = text.slice(0, 40) + (text.length > 40 ? '...' : '');
      }
      chat.updatedAt = new Date().toISOString();
      saveState(state);

      inputEl.value = '';
      inputEl.style.height = 'auto';
      renderMessages();

      // Route to KB files
      const kbFileIds = routeMessage(text);
      // Merge with existing
      for (const id of kbFileIds) {
        if (!chat.kbFilesUsed.includes(id)) chat.kbFilesUsed.push(id);
      }

      // Show typing indicator
      isStreaming = true;
      sendBtn.disabled = true;
      const typingEl = document.createElement('div');
      typingEl.className = 'chat-typing';
      typingEl.innerHTML = '<span>Thinking...</span>';
      messagesEl.appendChild(typingEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;

      // Stream response
      let fullResponse = '';
      const responseEl = document.createElement('div');
      responseEl.className = 'chat-msg assistant';

      try {
        const stream = streamChat(chat.messages, state.apiKey, kbFileIds);
        messagesEl.removeChild(typingEl);
        messagesEl.appendChild(responseEl);

        for await (const chunk of stream) {
          fullResponse += chunk;
          responseEl.innerHTML = marked.parse(fullResponse);
          messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        chat.messages.push({ role: 'assistant', content: fullResponse });
        chat.updatedAt = new Date().toISOString();
        saveState(state);

        // Cache KB files for export
        for (const id of kbFileIds) {
          if (!currentKBCache[id]) {
            const content = await fetchKBFile(id);
            if (content) currentKBCache[id] = content;
          }
        }
      } catch (err) {
        if (typingEl.parentNode) messagesEl.removeChild(typingEl);
        const errEl = document.createElement('div');
        errEl.className = 'chat-msg system';
        errEl.textContent = 'Error: ' + (err.message || 'Something went wrong');
        messagesEl.appendChild(errEl);
        // Remove the user message that failed
        chat.messages.pop();
        saveState(state);
      }

      isStreaming = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }

    // Initial render
    if (state.activeId && getActiveChat(state)) {
      // Have an existing chat, ready to go
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ─── Export KB sidebar button ───
  function addExportButton() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    const sep = document.createElement('div');
    sep.style.cssText = 'border-top:1px solid #222;margin:16px 16px 8px;';
    navLinks.appendChild(sep);

    const exportBtn = document.createElement('a');
    exportBtn.href = '#';
    exportBtn.style.cssText = 'display:block;padding:8px 16px;color:#6b9e5a;text-decoration:none;font-size:13px;border-left:3px solid transparent;transition:all 0.15s;';
    exportBtn.textContent = 'Export Full KB';
    exportBtn.addEventListener('mouseenter', () => { exportBtn.style.background = '#1a221a'; });
    exportBtn.addEventListener('mouseleave', () => { exportBtn.style.background = ''; });
    exportBtn.addEventListener('click', async e => {
      e.preventDefault();
      exportBtn.textContent = 'Generating...';
      exportBtn.style.pointerEvents = 'none';
      try {
        const content = await generateKBExport();
        downloadFile(content, 'orlando-re-knowledge-base.md');
        showToast('Downloaded! Upload to Claude Projects, ChatGPT, or any AI tool.');
      } catch (err) {
        showToast('Export failed: ' + err.message);
      }
      exportBtn.textContent = 'Export Full KB';
      exportBtn.style.pointerEvents = '';
    });
    navLinks.appendChild(exportBtn);
  }

  // ─── Init on DOM ready ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); addExportButton(); });
  } else {
    init();
    addExportButton();
  }

})();
