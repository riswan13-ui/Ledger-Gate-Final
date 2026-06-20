import React from "react";
import { tokens as F, fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * StatusDot — a colored dot + label. The generic building block behind
 * every "is this thing okay" indicator in the product.
 *
 * Before this consolidation, the connector gallery's dot (SoftHealthDot)
 * and the admin integration-health tab's dot (HealthDot) had quietly
 * drifted apart: the same "syncing" state rendered blue in one screen
 * and black in the other. Centralizing the color choice here means
 * that kind of drift can't happen again — there is exactly one place
 * that decides what "syncing" looks like.
 * ------------------------------------------------------------------ */
export function StatusDot({ color, label, size = 7, fontSize = 13, fontWeight = 400, ring = true }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          background: color,
          flexShrink: 0,
          boxShadow: ring ? `0 0 0 3px ${color}1f` : "none",
        }}
      />
      {label != null && (
        <span style={{ fontFamily: fonts.body, fontSize, color: F.ink2, fontWeight }}>{label}</span>
      )}
    </span>
  );
}

/* health: "ok" | "warn" | "err" | "sync" | "off" */
const HEALTH_MAP = {
  ok: { color: F.green, label: "Healthy" },
  warn: { color: F.amber, label: "Attention" },
  err: { color: F.red, label: "Error" },
  sync: { color: F.blue, label: "Syncing" },
  off: { color: F.ink4, label: "Not connected" },
};

export function HealthIndicator({ health, labelOverride, size = 7 }) {
  const { color, label } = HEALTH_MAP[health] || HEALTH_MAP.off;
  return <StatusDot color={color} label={labelOverride || label} size={size} />;
}

export default StatusDot;
