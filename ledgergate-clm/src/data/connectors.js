import {
  FileSignature, PenTool, ShoppingCart, Database, Boxes, FolderOpen, Cloud,
  FileSignature as SignIcon,
} from "lucide-react";

export const CONNECTORS = [
  { name: "Ironclad",         cat: "CLM",                via: "Native REST API",      status: "Connected",     health: "ok",    sync: "4 min ago",  records: "212 contracts",      glyph: FileSignature, group: "Contracts" },
  { name: "SpotDraft",        cat: "CLM",                via: "Native REST API",      status: "Connected",     health: "ok",    sync: "11 min ago", records: "64 contracts",       glyph: PenTool,       group: "Contracts" },
  { name: "DocuSign",         cat: "E-sign",             via: "eSignature REST v2.1", status: "Connected",     health: "ok",    sync: "9 min ago",  records: "318 envelopes",      glyph: SignIcon,      group: "Contracts" },
  { name: "Coupa",            cat: "AP / Procurement",   via: "Native API",           status: "Connected",     health: "ok",    sync: "2 min ago",  records: "1,204 invoices",     glyph: ShoppingCart,  group: "Procurement" },
  { name: "SAP Ariba",        cat: "AP / Procurement",   via: "Native API",           status: "Action needed", health: "warn",  sync: "6 hrs ago",  records: "Token expiring",     glyph: ShoppingCart,  group: "Procurement" },
  { name: "NetSuite",         cat: "ERP",                via: "Merge.dev",            status: "Connected",     health: "ok",    sync: "5 min ago",  records: "Vendor master · PO", glyph: Database,      group: "ERP" },
  { name: "SAP S/4HANA",      cat: "ERP",                via: "Merge.dev",            status: "Connected",     health: "ok",    sync: "18 min ago", records: "Vendor master · PO", glyph: Database,      group: "ERP" },
  { name: "Sage Intacct",     cat: "ERP",                via: "Merge.dev",            status: "Syncing",       health: "sync",  sync: "in progress",records: "Ledger · credits",   glyph: Boxes,         group: "ERP" },
  { name: "Dynamics 365",     cat: "ERP",                via: "Merge.dev",            status: "Error",         health: "err",   sync: "Failed · 1 hr ago", records: "Auth rejected", glyph: Boxes,         group: "ERP" },
  { name: "SharePoint",       cat: "Document store",     via: "Merge → MS Graph",     status: "Connected",     health: "ok",    sync: "22 min ago", records: "3 folders",          glyph: FolderOpen,    group: "Documents" },
  { name: "Google Drive",     cat: "Document store",     via: "Merge → Drive API",    status: "Not connected", health: "off",   sync: "—",          records: "—",                  glyph: Cloud,         group: "Documents" },
];

export function connectorDesc(c) {
  const map = {
    CLM: "Sync contract records, documents, and amendments into the effective state.",
    "E-sign": "Pull executed PDFs and envelope metadata as contracts complete.",
    "AP / Procurement": "Audit invoices in the approval workflow before payment is released.",
    ERP: "Bring in vendor master, PO data, and transaction history.",
    "Document store": "Ingest contract PDFs and DOCX from your designated folders.",
  };
  return map[c.cat] || "Keep your contract data current automatically.";
}

export function syncLogFor(c) {
  if (c.health === "err")
    return [
      { t: "11:04", lvl: "err", msg: "OAuth token rejected — refresh failed (401)" },
      { t: "10:04", lvl: "warn", msg: "Retry 3 of 3 exhausted" },
      { t: "09:04", lvl: "ok", msg: "Last successful sync — 940 records" },
    ];
  if (c.health === "warn")
    return [
      { t: "06:12", lvl: "warn", msg: "Access token expires in 36 hours" },
      { t: "06:12", lvl: "ok", msg: "Pulled 1,204 invoice records" },
      { t: "00:12", lvl: "ok", msg: "Incremental sync complete" },
    ];
  return [
    { t: "12:58", lvl: "ok", msg: "Incremental sync — 18 new records" },
    { t: "12:43", lvl: "ok", msg: "Webhook received — contract.updated" },
    { t: "12:28", lvl: "ok", msg: "Scheduled sync complete" },
  ];
}

export const CONNECTOR_TABS = ["All integrations", "Contracts", "Procurement", "ERP", "Documents"];
