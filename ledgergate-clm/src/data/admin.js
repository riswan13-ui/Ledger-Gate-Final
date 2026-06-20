export const TEAM = [
  { name: "Dana Whitfield", email: "dana.w@northgate.com", role: "Admin", status: "Active", initials: "DW" },
  { name: "Marcus Lee", email: "marcus.lee@northgate.com", role: "AP Manager", status: "Active", initials: "ML" },
  { name: "Priya Nair", email: "priya.nair@northgate.com", role: "Legal Ops", status: "Active", initials: "PN" },
  { name: "Tom Alvarez", email: "tom.a@northgate.com", role: "Procurement", status: "Invited", initials: "TA" },
];

export const AUDIT_LOG = [
  { t: "2026-06-17 14:22", who: "Marcus Lee", action: "Overrode verdict on INV-44821", kind: "override" },
  { t: "2026-06-17 11:08", who: "Priya Nair", action: "Confirmed amendment link · Acme Amendment 2", kind: "edit" },
  { t: "2026-06-16 16:45", who: "System", action: "CES rebuilt for AWS — new version v7", kind: "system" },
  { t: "2026-06-16 09:30", who: "Dana Whitfield", action: "Re-authenticated SAP Ariba connector", kind: "auth" },
  { t: "2026-06-15 17:12", who: "Marcus Lee", action: "Disputed INV-44815 — sent to TechCo Logistics", kind: "dispute" },
];

export const NOTIF_PREFS = [
  { key: "expiry", label: "Contract expiry alerts", desc: "When a contract enters its renewal-notice window", on: true },
  { key: "findings", label: "Audit findings", desc: "When an invoice is flagged or rejected", on: true },
  { key: "conflict", label: "CES conflict flags", desc: "When document terms conflict and need review", on: true },
  { key: "sync", label: "Sync errors", desc: "When a connector fails to sync", on: false },
];
