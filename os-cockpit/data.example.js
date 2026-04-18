// Brady OS Cockpit — Example Data Template
// Copy to data.js and populate with live values.
// data.js is gitignored — NEVER commit it.
// Regenerate: run cockpit-refresh from any sweep or manually.

window.COCKPIT_DATA = {
  generated: "2026-01-01T06:00:00-06:00",

  // -- Health Dimensions --
  health: [
    { name: "Sweep Cadence",      value: "On schedule",  score: 9, status: "green" },
    { name: "Task Progress",      value: "In progress",  score: 6, status: "yellow" },
    { name: "Capture Processing", value: "0 pending",    score: 9, status: "green" },
    { name: "Client Delivery",    value: "All current",  score: 9, status: "green" },
    { name: "Calendar Guard",     value: "No conflicts", score: 9, status: "green" },
    { name: "OS Integrity",       value: "Synced",       score: 9, status: "green" },
    { name: "Email Triage",       value: "0 in inbox",   score: 9, status: "green" },
    { name: "Financial Review",   value: "Today",        score: 9, status: "green" },
  ],

  // -- Inbound: Email --
  email: {
    unread: 0,
    inbox_threads: 0,
    action_required: 0,
    starred: 0,
    last_triage: "6:00 AM",
    flagged: [
      // { from: "[sender]", subject: "[subject]", age: "1h" },
    ]
  },

  // -- Inbound: Calendar --
  calendar: {
    today: [
      // { time: "8:00 AM", title: "[event]", color: "blue", type: "focus" },
    ],
    tomorrow: [
      // { time: "8:00 AM", title: "[event]", color: "blue", type: "focus" },
    ],
    conflicts: [
      // { a: "[event A]", b: "[event B]", resolution: "[how to resolve]" }
    ]
  },

  // -- Inbound: Capture Surfaces --
  capture: {
    unprocessed_notes: 0,
    pending_voice_notes: 0,
    diary_last_entry: "2026-01-01",
    pending_transcripts: 0,
  },

  // -- Processing: Projects --
  projects: [
    // { name: "[project]", program: "[program]", status: "on-track", note: "[detail]" },
  ],

  // -- Processing: Action Items --
  actions: [
    // { text: "[action]", due: "today", priority: "high", done: false },
  ],

  // -- Processing: Conductor --
  conductor: {
    morning_sweep: { ran: false, time: null },
    daily_whitepaper: { ran: false, time: null },
    evening_sweep: { ran: false, scheduled: "9:00 PM" },
    active_workspaces: 0,
  },

  // -- Processing: Finances --
  finances: {
    last_reviewed: "2026-01-01",
    arvest_balance: "$X,XXX.XX",
    pending_alerts: 0,
    alert_detail: null,
  },

  // -- Outbound: Deliverables --
  deliverables: [
    // { name: "[deliverable]", status: "draft", detail: "[detail]" },
  ],

  // -- Outbound: mception.ai --
  live_projects: [
    // "project-slug",
  ],

  // -- Outbound: Email --
  email_outbound: {
    drafts_pending: 0,
    sent_today: 0,
    awaiting_reply: 0,
    key_threads: [
      // { to: "[recipient]", subject: "[subject]", status: "awaiting" },
    ]
  },

  // -- Outbound: GitHub --
  github: {
    commits_today: 0,
    open_prs: 0,
    active_branch: "main",
    recent: [
      // "commit message",
    ]
  },

  // -- Outbound: Content --
  content: {
    drafts_in_progress: 0,
    published_this_week: 0,
    whitepaper_today: false,
  }
};
