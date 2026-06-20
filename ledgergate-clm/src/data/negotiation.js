import { Scale, Gauge, TrendingUp, ShieldAlert, Layers } from "lucide-react";

export const SIGNALS = [
  {
    key: "payment", Icon: Scale, title: "Payment terms",
    headline: "Net 30 vs market Net 45", tone: "opportunity",
    detail: "Acme pays 15 days faster than the category norm. Moving to Net 45 frees roughly $61K in working capital across the term.",
    viz: "paymentBars",
  },
  {
    key: "volume", Icon: Gauge, title: "Volume commitment vs actual",
    headline: "112% of committed volume", tone: "opportunity",
    detail: "You exceeded the committed spend tier by 12% — leverage for a deeper volume discount at renewal.",
    viz: "volumeGauge",
  },
  {
    key: "escalation", Icon: TrendingUp, title: "Rate escalation",
    headline: "Contracted CPI+2% vs actual CPI", tone: "risk",
    detail: "The escalator has run 2.1 points above realized inflation, a cumulative $48K drift over two years.",
    viz: "escalationLines",
  },
  {
    key: "sla", Icon: ShieldAlert, title: "SLA credits",
    headline: "3 breaches · $12.4K unclaimed", tone: "opportunity",
    detail: "Three uptime breaches occurred during the term with credits never applied — recoverable now and a renewal talking point.",
    viz: "slaTimeline",
  },
  {
    key: "scope", Icon: Layers, title: "Scope creep",
    headline: "$74K billed beyond SOW scope", tone: "risk",
    detail: "Out-of-scope line items recurred across five invoices. Either fold into the base or formalize as a priced add-on.",
    viz: "scopeBars",
  },
];

/* Renewals entering the 90-day window — derived view over the contract
 * portfolio (in the real product, computed from CONTRACTS + leverage model). */
export const RENEWALS = [
  {
    vendor: "Iron Mountain", value: 640000, expiry: "2026-06-29", days: 10, notice: "by 2026-06-22",
    posture: "Renegotiate", leverage: 84000, relationship: "3 yr 1 mo",
    headline: "Above-market rate escalation; weak SLA performance",
    risks: 2, topSignal: "Rate escalation",
  },
  {
    vendor: "Acme Corp", value: 1840000, expiry: "2026-08-14", days: 56, notice: "by 2026-06-15",
    posture: "Renegotiate", leverage: 318000, relationship: "2 yr 5 mo",
    headline: "Strong over-delivery and an above-inflation escalator",
    risks: 3, topSignal: "Scope creep",
  },
  {
    vendor: "Cintas", value: 188000, expiry: "2026-09-21", days: 94, notice: "by 2026-08-22",
    posture: "Renew", leverage: 12000, relationship: "1 yr 8 mo",
    headline: "Terms in line with market; modest unclaimed allowances",
    risks: 0, topSignal: "Allowances",
  },
];

export const SUGGESTED_ASKS = [
  "Reset senior-consultant rate to $228/hr (peer benchmark)",
  "Extend payment terms to Net 45",
  "Claim $12.4K in unapplied SLA credits",
  "Cap next-term escalator at CPI flat",
];
