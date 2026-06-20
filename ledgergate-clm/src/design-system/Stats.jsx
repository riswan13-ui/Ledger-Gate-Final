import React from "react";
import { tokens as F, fonts } from "./tokens";
import { IconTile } from "./IconTile";

/* StatPill — compact icon + label/value chip (Admin → Integration health) */
export function StatPill({ Icon, color, bg, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        background: F.surface,
        border: `1px solid ${F.line}`,
        borderRadius: F.rSm,
        padding: "11px 16px",
      }}
    >
      <IconTile Icon={Icon} size={32} bg={bg} fg={color} strokeWidth={2.3} />
      <div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: F.ink3, fontWeight: 500 }}>{label}</div>
        <div className="num" style={{ fontSize: 15, color: F.ink, fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );
}

/* BigStat — large headline number with a label underneath, used in the
 * stat-header row at the top of Contracts / Renewals (was "SoftStat"). */
export function BigStat({ big, label, divider = false }) {
  return (
    <div style={{ padding: "8px 0 22px", paddingLeft: divider ? 28 : 0, borderLeft: divider ? `1px solid ${F.line}` : "none" }}>
      <div className="num" style={{ fontSize: 40, fontWeight: 500, color: F.ink, lineHeight: 1, letterSpacing: "-0.02em" }}>{big}</div>
      <div style={{ fontSize: 13.5, color: F.ink3, marginTop: 10 }}>{label}</div>
    </div>
  );
}

/* LabelValue — label above value. The original file had two components
 * for this exact pattern (Meta, used in page-header metadata rows, and
 * SummaryStat, used in 2-column summary grids) that differed only in
 * scale. They're now one component with a `size` prop. */
export function LabelValue({ label, value, size = "sm", mono = false, warn = false }) {
  const fontSize = size === "lg" ? 18 : 14;
  const labelSize = size === "lg" ? 12.5 : 11.5;
  return (
    <div>
      <div style={{ fontFamily: fonts.body, fontSize: labelSize, color: F.ink3, fontWeight: 500 }}>{label}</div>
      <div
        className={mono ? "num" : undefined}
        style={{
          fontFamily: mono ? fonts.mono : fonts.body,
          fontSize,
          color: warn ? F.amber : F.ink,
          fontWeight: 600,
          marginTop: size === "lg" ? 4 : 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}
