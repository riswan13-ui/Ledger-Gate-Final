import { FileSignature, FileText, FilePlus2, GitBranch } from "lucide-react";

export const CONTRACTS = [
  { vendor: "Acme Corp",        type: "MSA",        value: 1840000, expiry: "2026-08-14", days: 56,  ces: 96, status: "Active" },
  { vendor: "ServiceNow",       type: "Order Form", value: 920000,  expiry: "2026-07-09", days: 20,  ces: 88, status: "Active" },
  { vendor: "Deloitte",         type: "MSA",        value: 3120000, expiry: "2026-11-30", days: 164, ces: 91, status: "Active" },
  { vendor: "AWS",              type: "MSA",        value: 5400000, expiry: "2027-01-31", days: 226, ces: 78, status: "Active" },
  { vendor: "TechCo Logistics", type: "SOW",        value: 410000,  expiry: "2026-07-02", days: 13,  ces: 54, status: "Review" },
  { vendor: "Cintas",           type: "Order Form", value: 188000,  expiry: "2026-09-21", days: 94,  ces: 83, status: "Active" },
  { vendor: "Iron Mountain",    type: "MSA",        value: 640000,  expiry: "2026-06-29", days: 10,  ces: 67, status: "Active" },
  { vendor: "Workday",          type: "Order Form", value: 1260000, expiry: "2026-12-15", days: 179, ces: 94, status: "Active" },
];

/* ----------------------- CES drill-down ----------------------- */
export const CES_TREE = [
  { id: "msa",  kind: "MSA",        title: "Acme Corp — Master Services Agreement", date: "2024-01-15", Icon: FileSignature, current: false },
  { id: "sow1", kind: "SOW",        title: "SOW-001 · Platform Implementation",     date: "2024-02-01", Icon: FileText,      current: false, indent: 1 },
  { id: "sow2", kind: "SOW",        title: "SOW-002 · Managed Support",             date: "2024-06-12", Icon: FileText,      current: false, indent: 1 },
  { id: "of1",  kind: "Order Form", title: "Order Form · Q3 Subscription",          date: "2025-01-09", Icon: FilePlus2,     current: false, indent: 1 },
  { id: "am1",  kind: "Amendment",  title: "Amendment 1 · Rate card revision",      date: "2025-03-20", Icon: GitBranch,     current: true,  indent: 2 },
  { id: "am2",  kind: "Amendment",  title: "Amendment 2 · Payment terms Net 45 → Net 30", date: "2025-09-04", Icon: GitBranch, current: true, indent: 2 },
];

export const CES_FIELDS = [
  { label: "Payment terms", value: "Net 30", note: "Amended — was Net 45", amended: true },
  { label: "Early-pay discount", value: "2% / 10 days", note: "Original MSA §7.2", amended: false },
  { label: "Senior consultant rate", value: "$245 / hr", note: "Amendment 1 · was $210", amended: true },
  { label: "Annual escalation cap", value: "CPI + 2%", note: "MSA §5.4", amended: false },
  { label: "Volume rebate", value: "3% above $1.5M YTD", note: "MSA Schedule B", amended: false },
  { label: "Auto-renewal notice", value: "60 days", note: "MSA §3.1", amended: false },
  { label: "Liability cap", value: "12 months fees", note: "MSA §11", amended: false },
  { label: "Governing law", value: "Delaware, USA", note: "MSA §18", amended: false },
];

export const CES_TIMELINE = [
  { date: "2024-01-15", label: "MSA executed", kind: "root" },
  { date: "2024-02-01", label: "SOW-001 linked to MSA", kind: "link" },
  { date: "2025-03-20", label: "Amendment 1 — rate card revised", kind: "amend" },
  { date: "2025-09-04", label: "Amendment 2 — payment terms changed", kind: "amend" },
];
