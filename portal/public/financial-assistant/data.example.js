// Financial Cockpit Data — EXAMPLE TEMPLATE
// Copy to data.js and populate with real values
// The financial-assistant skill generates data.js on each run
window.COCKPIT_DATA = {
  generated: "2026-01-01T00:00:00-05:00",
  dataThrough: "2026-01-01",
  scrapedDate: "2026-01-01",
  csvStaleDays: 0,

  budget: {
    summary: {
      actualAvg12mo: 0,
      strippedFrivolous: 0,
      zeroIncomeFloor: 0
    },
    tiers: [
      { name: "Fixed Obligations", amount: 0, items: [{ name: "Mortgage", amount: null }] },
      { name: "Household Running", amount: 0, items: [{ name: "Groceries", amount: null }] },
      { name: "Kids & Medical", amount: 0, items: [{ name: "Medical", amount: null }] },
      { name: "Discretionary (Trimmed)", amount: 0, items: [{ name: "Restaurants", amount: null }] },
      { name: "Zeroed Out", amount: 0, items: [{ name: "Travel, charity, fine dining", amount: 0 }] }
    ],
    monthlyTotal: 0,
    annualized: 0
  },

  alerts: [],

  topline: {
    aprilMTD: { amount: 0, transactions: 0, days: 0 },
    marchTotal: { amount: 0, transactions: 0 },
    aprilReturns: { amount: 0, count: 0 },
    utahSpend: { amount: 0, transactions: 0, weeks: 0 }
  },

  byOwner: { month: "Month", owners: [] },
  karissaVelocity: [],
  categories: [],
  merchants: [],

  utah: {
    totalSpend: 0, transactions: 0,
    returns: { amount: 0, count: 0 },
    netSpend: 0, weeks: 0,
    address: "",
    merchants: []
  },

  recurring: [],
  openQuestions: [],
  dataSources: [],
  recentTransactions: [],

  // Family Budget — household vs business spend split
  familyBudget: {
    month: "April 2026",
    familyTotal: 0,
    businessTotal: 0,
    categories: [
      { name: "Groceries (Walmart+)", budget: 560, actual: 0, subscription: 360, notes: "$360 subscription + ~$200 ad hoc" },
      { name: "Kids Activities", budget: 350, actual: 0, notes: "BJJ $100-150, voice lessons $80-120" },
      { name: "Dining / DoorDash", budget: null, actual: 0, notes: "TBD — needs input" },
      { name: "School Expenses", budget: null, actual: 0, notes: "TBD — lunches, supplies, field trips" },
      { name: "Childcare (Serena)", budget: null, actual: 0, notes: "TBD — needs input" },
      { name: "Gas / Transportation", budget: null, actual: 0, notes: "TBD — needs input" },
      { name: "Entertainment", budget: null, actual: 0, notes: "TBD — needs input" }
    ],
    businessCategories: [
      { name: "Software / SaaS", budget: null, actual: 0, notes: "" },
      { name: "Consulting Expenses", budget: null, actual: 0, notes: "" }
    ]
  },

  // Revenue & Runway — consulting income vs burn
  revenue: {
    month: "April 2026",
    consulting: { invoiced: 0, collected: 0, pipeline: 0 },
    netIncome: 0,
    runwayMonths: 0,
    note: "Connect Notion API to populate from Consulting Practice Wiki"
  }
};
