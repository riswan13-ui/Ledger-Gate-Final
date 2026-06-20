import React from "react";
import { tokens as F } from "../../design-system/tokens";

export default function RiskFlag({ Icon, label, detail, urgent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, background: F.surface, border: `1px solid ${urgent ? F.amber + "44" : F.line}`, borderRadius: F.r, padding: "12px 15px", flex: "1 1 240px" }}>
      <Icon size={18} color={urgent ? F.amber : F.ink3} strokeWidth={2} style={{ flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: F.ink }}>{label}</div>
        <div style={{ fontSize: 12, color: F.ink3 }}>{detail}</div>
      </div>
    </div>
  );
}
