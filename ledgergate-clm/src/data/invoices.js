export const INVOICES = [
  { id: "INV-44821", vendor: "Acme Corp",        date: "2026-06-17", amount: 184200, verdict: "Flagged",  checks: 12, failed: 2, reason: "Rate above contracted card; missed early-pay discount" },
  { id: "INV-44818", vendor: "AWS",              date: "2026-06-17", amount: 452900, verdict: "Cleared",  checks: 9,  failed: 0, reason: "All applicable checks passed" },
  { id: "INV-44815", vendor: "TechCo Logistics", date: "2026-06-16", amount: 38640,  verdict: "Rejected", checks: 14, failed: 4, reason: "Out-of-scope freight + unapproved surcharge" },
  { id: "INV-44812", vendor: "Deloitte",         date: "2026-06-16", amount: 96000,  verdict: "Cleared",  checks: 8,  failed: 0, reason: "All applicable checks passed" },
  { id: "INV-44809", vendor: "ServiceNow",       date: "2026-06-15", amount: 76700,  verdict: "Pending",  checks: 0,  failed: 0, reason: "No contract match — manual link required" },
  { id: "INV-44806", vendor: "Cintas",           date: "2026-06-15", amount: 15680,  verdict: "Flagged",  checks: 10, failed: 1, reason: "Fuel surcharge not permitted in contract" },
  { id: "INV-44803", vendor: "Iron Mountain",    date: "2026-06-14", amount: 53400,  verdict: "Cleared",  checks: 7,  failed: 0, reason: "All applicable checks passed" },
  { id: "INV-44799", vendor: "Workday",          date: "2026-06-14", amount: 105000, verdict: "Flagged",  checks: 9,  failed: 1, reason: "Inflation cap breach vs prior period" },
  { id: "INV-44795", vendor: "Acme Corp",        date: "2026-06-13", amount: 184200, verdict: "Rejected", checks: 12, failed: 3, reason: "Exact duplicate of INV-44821" },
];

/* Audit report content keyed by invoice id (falls back to a default set) */
export const AUDIT_CHECKS = {
  "INV-44821": {
    summary: "2 of 12 applicable checks failed. Payable with adjustment once the rate and discount are corrected.",
    modules: [
      {
        name: "Payment Integrity",
        checks: [
          { n: "Exact duplicate", pass: true },
          { n: "Fuzzy duplicate", pass: true },
          { n: "Transposition error", pass: true },
        ],
      },
      {
        name: "Pricing & Terms",
        checks: [
          { n: "Price variance (PPV)", pass: false, contracted: "$245 / hr", billed: "$268 / hr", delta: "+$23 / hr", clause: "Amendment 1 · rate card", sev: "high" },
          { n: "Extension / calculation error", pass: true },
          { n: "Inflation cap breach", pass: true },
        ],
      },
      {
        name: "Allowances & Discounts",
        checks: [
          { n: "Missed cash discount", pass: false, contracted: "2% / 10 days", billed: "Paid day 22 — 0%", delta: "−$3,684", clause: "MSA §7.2", sev: "med" },
          { n: "Volume rebate (tiered)", pass: true },
        ],
      },
      {
        name: "Currency & Tax",
        checks: [
          { n: "Tax mismatch", pass: true },
          { n: "Sales / tax overcharge", pass: true },
        ],
      },
    ],
  },
};

export const DEFAULT_AUDIT = {
  summary: "All applicable checks passed. Routed to the payment approval queue.",
  modules: [
    { name: "Payment Integrity", checks: [{ n: "Exact duplicate", pass: true }, { n: "Cross-vendor duplicate", pass: true }] },
    { name: "Pricing & Terms", checks: [{ n: "Price variance (PPV)", pass: true }, { n: "Extension / calculation error", pass: true }] },
    { name: "Currency & Tax", checks: [{ n: "Currency mismatch", pass: true }, { n: "Tax mismatch", pass: true }] },
  ],
};
