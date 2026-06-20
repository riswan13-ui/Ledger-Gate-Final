import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Clock, Handshake } from "lucide-react";
import { fonts, semantic } from "./tokens";

/* ------------------------------------------------------------------ *
 * Badge — the colored pill used everywhere the product shows a state:
 * an invoice verdict, a renewal posture, a team member's status. One
 * shape, one set of semantic tones (see tokens.js `semantic`), so a
 * "positive" state always reads the same shade of green whether it's
 * a cleared invoice or an active teammate.
 * ------------------------------------------------------------------ */
const SIZE = {
  sm: { fontSize: 12, padIcon: "3px 9px 3px 7px", padPlain: "3px 10px" },
  md: { fontSize: 13, padIcon: "5px 12px 5px 9px", padPlain: "4px 12px" },
  lg: { fontSize: 14, padIcon: "6px 14px 6px 12px", padPlain: "6px 14px" },
};

export function Badge({ tone = "neutral", label, Icon, size = "sm", iconStrokeWidth = 2.4 }) {
  const { c, bg } = semantic[tone] || semantic.neutral;
  const sz = SIZE[size] || SIZE.sm;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: Icon ? sz.padIcon : sz.padPlain,
        borderRadius: 999,
        background: bg,
        color: c,
        fontSize: sz.fontSize,
        fontWeight: 600,
        fontFamily: fonts.body,
        whiteSpace: "nowrap",
      }}
    >
      {Icon && <Icon size={sz.fontSize + 2} strokeWidth={iconStrokeWidth} />}
      {label}
    </span>
  );
}

/* Compliance verdict on an invoice */
const VERDICT_MAP = {
  Cleared: { tone: "positive", Icon: CheckCircle2 },
  Flagged: { tone: "caution", Icon: AlertTriangle },
  Rejected: { tone: "negative", Icon: XCircle },
  Pending: { tone: "neutral", Icon: Clock },
};
export function VerdictBadge({ state, size = "sm" }) {
  const { tone, Icon } = VERDICT_MAP[state] || VERDICT_MAP.Pending;
  return <Badge tone={tone} label={state} Icon={Icon} size={size === "lg" ? "lg" : "sm"} />;
}

/* Recommended negotiation posture on a renewal */
const POSTURE_MAP = {
  Renegotiate: "caution",
  Renew: "positive",
  Exit: "negative",
};
export function PostureBadge({ posture, size = "sm" }) {
  const tone = POSTURE_MAP[posture] || "positive";
  return (
    <Badge
      tone={tone}
      label={posture}
      Icon={size === "lg" ? Handshake : undefined}
      iconStrokeWidth={2}
      size={size === "lg" ? "lg" : "sm"}
    />
  );
}

/* Simple two-state pill (team member Active/Invited, etc.) */
export function StatusBadge({ active, activeLabel = "Active", inactiveLabel = "Invited", size = "sm" }) {
  return <Badge tone={active ? "positive" : "caution"} label={active ? activeLabel : inactiveLabel} size={size} />;
}

export default Badge;
