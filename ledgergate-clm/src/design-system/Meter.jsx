import React from "react";
import { tokens as F } from "./tokens";

/* ------------------------------------------------------------------ *
 * Meter — the small percentage progress bar used for CES completeness
 * scores. The original file had two near-identical implementations:
 * SoftMeter (actually used, 110×6px) and HealthMeter (120×7px, never
 * called anywhere — dead code). This is the one that remains.
 * ------------------------------------------------------------------ */
export function Meter({ value, width = 110, height = 6 }) {
  const color = value >= 85 ? F.greenInk : value >= 60 ? F.amber : F.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width, height, background: F.lineSoft, borderRadius: 999, overflow: "hidden", flexShrink: 0 }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 999 }} />
      </div>
      <span className="num" style={{ fontSize: 13, color: F.ink2, fontWeight: 500 }}>{value}%</span>
    </div>
  );
}

export default Meter;
