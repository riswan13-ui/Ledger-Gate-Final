import { AlertTriangle, Clock, CircleAlert, RefreshCw, CheckCircle2 } from "lucide-react";
import { tokens as F } from "../design-system/tokens";

export const NOTIFS = [
  { id: 1, kind: "finding", Icon: AlertTriangle, c: F.amber, bg: F.amberSoft, title: "INV-44821 flagged", body: "Rate above contracted card; missed early-pay discount.", when: "12m ago", unread: true },
  { id: 2, kind: "expiry", Icon: Clock, c: F.amber, bg: F.amberSoft, title: "Iron Mountain renews in 10 days", body: "Notice deadline by 2026-06-22. Brief ready.", when: "1h ago", unread: true },
  { id: 3, kind: "conflict", Icon: CircleAlert, c: F.red, bg: F.redSoft, title: "CES conflict — TechCo Logistics", body: "SOW-002 and Amendment 1 specify different rates.", when: "3h ago", unread: true },
  { id: 4, kind: "sync", Icon: RefreshCw, c: F.red, bg: F.redSoft, title: "Dynamics 365 sync failed", body: "OAuth token rejected — reconnect required.", when: "5h ago", unread: false },
  { id: 5, kind: "cleared", Icon: CheckCircle2, c: F.greenInk, bg: F.greenSoft, title: "12 invoices cleared", body: "Routed to payment with no findings.", when: "Yesterday", unread: false },
];
