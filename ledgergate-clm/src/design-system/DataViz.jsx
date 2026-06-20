import React from "react";
import { tokens as F, fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * DataViz — the small, labelled inline visualizations used on renewal
 * signal cards (payment-term bars, escalation lines, SLA timelines).
 * Kept generic so future signal types can reuse the same shells
 * instead of hand-rolling new ones.
 * ------------------------------------------------------------------ */
export function Viz({ children }) {
  return (
    <div style={{ background: F.paper, borderRadius: F.rSm, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
      {children}
    </div>
  );
}

export function BarRow({ label, value, max, unit, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "3px 0" }}>
      <span style={{ width: 52, fontFamily: fonts.body, fontSize: 11.5, color: F.ink3 }}>{label}</span>
      <div style={{ flex: 1, height: 8, background: F.lineSoft, borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 999 }} />
      </div>
      <span className="num" style={{ width: 34, textAlign: "right", fontSize: 12, color: F.ink2, fontWeight: 600 }}>
        {value}
        {unit}
      </span>
    </div>
  );
}

export function Legend({ items }) {
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 2 }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fonts.body, fontSize: 11, color: F.ink3 }}>
          <span style={{ width: 14, height: 0, borderTop: `2px ${it.dash ? "dashed" : "solid"} ${it.c}` }} /> {it.label}
        </span>
      ))}
    </div>
  );
}
