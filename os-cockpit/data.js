// Brady OS Cockpit — Live Data
// Generated: 2026-04-06T10:30:00-05:00
// Source: Gmail, Google Calendar, Notion, GitHub
// Regenerate: run cockpit-refresh from any sweep or manually

window.COCKPIT_DATA = {
  generated: "2026-04-06T10:30:00-05:00",

  // ── Health Dimensions ──
  health: [
    { name: "Sweep Cadence",    value: "On schedule",    score: 9, status: "green" },
    { name: "Task Progress",    value: "In progress",    score: 6, status: "yellow" },
    { name: "Capture Processing", value: "1 voice note",  score: 8, status: "green" },
    { name: "Client Delivery",  value: "All current",    score: 9, status: "green" },
    { name: "Calendar Guard",   value: "1 conflict",     score: 6, status: "yellow" },
    { name: "OS Integrity",     value: "GitHub synced",  score: 9, status: "green" },
    { name: "Email Triage",     value: "16 in inbox",    score: 5, status: "yellow" },
    { name: "Financial Review",  value: "3d ago",         score: 7, status: "green" },
  ],

  // ── Inbound: Email ──
  email: {
    unread: 201,
    inbox_threads: 16,
    action_required: 3,
    starred: 5,
    last_triage: "6:14 AM",
    flagged: [
      { from: "Theatre Boosters", subject: "Volunteers + desserts needed", age: "5h" },
      { from: "Karissa", subject: "Make a Payment (medical)", age: "2d" },
      { from: "Mosaic/Instacart", subject: "New consultation", age: "today" },
    ]
  },

  // ── Inbound: Calendar ──
  calendar: {
    today: [
      { time: "6:00 AM",  title: "Get Ready (sweep complete)", color: "green", type: "system" },
      { time: "7:30 AM",  title: "Mercy claim call (colonoscopy)", color: "red", type: "action" },
      { time: "8:30 AM",  title: "Email Catchup", color: "blue", type: "focus" },
      { time: "12:00 PM", title: "Prep for Jorge", color: "orange", type: "work" },
      { time: "12:30 PM", title: "Faith dermatologist (CONFLICT)", color: "red", type: "family" },
      { time: "3:00 PM",  title: "Triplets home", color: "purple", type: "family" },
    ],
    tomorrow: [
      { time: "7:30 AM",  title: "Breakfast w/ Jorge @ Onyx", color: "orange", type: "work" },
      { time: "12:30 PM", title: "Brady/Joe reconnect @ Tuckaway", color: "orange", type: "work" },
      { time: "2:00 PM",  title: "Pick up Faith", color: "purple", type: "family" },
      { time: "3:00 PM",  title: "Triplets home", color: "purple", type: "family" },
      { time: "4:00 PM",  title: "Luke BJJ | Lily work", color: "purple", type: "family" },
    ],
    conflicts: [
      { a: "Prep for Jorge (12-2 PM)", b: "Faith dermatologist (12:30-2 PM)", resolution: "Compress Jorge prep to morning" }
    ]
  },

  // ── Inbound: Capture Surfaces ──
  capture: {
    unprocessed_notes: 0,
    pending_voice_notes: 0,
    diary_last_entry: "2026-04-05",
    pending_transcripts: 0,
  },

  // ── Processing: Projects ──
  projects: [
    { name: "Schmulen AI OS",   program: "Consulting", status: "on-track",  note: "CMO agent — emailed Mark today" },
    { name: "Baden Bagley",     program: "Consulting", status: "on-track",  note: "Viewer live on mception.ai" },
    { name: "STIHL Insights",   program: "Consulting", status: "on-track",  note: "Portal-native, active" },
    { name: "Content Engine",   program: "Creation",   status: "watch",     note: "6d since last touch" },
    { name: "OS Governance Migration", program: "Internal", status: "in-flight", note: "This session" },
    { name: "OS Cockpit",       program: "Internal",   status: "in-flight", note: "Building now" },
  ],

  // ── Processing: Action Items (from morning sweep) ──
  actions: [
    { text: "Call Mercy re: colonoscopy claim", due: "7:30 AM", priority: "high", done: false },
    { text: "Resolve Faith derm vs Jorge prep conflict", due: "today", priority: "high", done: false },
    { text: "Check Zapier Notion Snapshot error", due: "today", priority: "medium", done: false },
    { text: "Theatre Boosters — sign up volunteers/desserts", due: "today", priority: "medium", done: false },
    { text: "Follow up with Karissa on medical expenses doc", due: "today", priority: "medium", done: false },
    { text: "Review AmEx April statement", due: "today", priority: "low", done: false },
    { text: "Commit OS governance migration", due: "today", priority: "medium", done: true },
    { text: "Check Mark Schmulen CMO agent project status", due: "today", priority: "medium", done: true },
  ],

  // ── Processing: Conductor ──
  conductor: {
    morning_sweep: { ran: true, time: "6:14 AM" },
    daily_whitepaper: { ran: true, time: "6:32 AM" },
    evening_sweep: { ran: false, scheduled: "9:00 PM" },
    active_workspaces: 3,
  },

  // ── Processing: Finances ──
  finances: {
    last_reviewed: "2026-04-03",
    arvest_balance: "$4,168.60",
    pending_alerts: 1,
    alert_detail: "AmEx April statement — review",
  },

  // ── Outbound: Deliverables ──
  deliverables: [
    { name: "Schmulen — CMO Agent follow-up email", status: "shipped", detail: "Sent to Mark today" },
    { name: "Mosaic — Instacart consultation reply", status: "shipped", detail: "Sent today" },
    { name: "Baden Bagley — OS Pack email", status: "draft", detail: "In drafts since Mar 29" },
    { name: "Innovation Whitepaper deliverables", status: "draft", detail: "3 files ready, draft email" },
  ],

  // ── Outbound: mception.ai ──
  live_projects: [
    "mark-schmulen", "pauletteai", "stihl",
    "baden-bagley", "gary-schubert", "content-engine"
  ],

  // ── Outbound: Email ──
  email_outbound: {
    drafts_pending: 5,
    sent_today: 2,
    awaiting_reply: 2,
    key_threads: [
      { to: "Mark Schmulen", subject: "CMO Agent project", status: "awaiting" },
      { to: "Mosaic/Instacart", subject: "Consultation", status: "awaiting" },
    ]
  },

  // ── Outbound: GitHub ──
  github: {
    commits_today: 5,
    open_prs: 1,
    active_branch: "notion-agent-audit",
    recent: [
      "Add governance docs, client-project-cleanup skill, and os-cockpit",
      "Add client-project-cleanup skill",
      "Drop revenue range from global instructions",
    ]
  },

  // ── Outbound: Content ──
  content: {
    drafts_in_progress: 1,
    published_this_week: 0,
    whitepaper_today: true,
  }
};
