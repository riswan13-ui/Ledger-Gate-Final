import React from "react";
import { tokens as F } from "./tokens";

/* ------------------------------------------------------------------ *
 * IconTile — a rounded box with a centered icon. This shape recurs
 * everywhere (connector glyphs, stat pills, the sidebar logo, signal
 * cards, notification rows) at different sizes and colors but was
 * hand-rolled inline at every call site. Now it's one component with
 * size/color props.
 * ------------------------------------------------------------------ */
export function IconTile({
  Icon,
  size = 34,
  radius = F.rSm,
  bg = F.chip,
  fg = F.ink2,
  strokeWidth = 2,
  bordered = false,
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: bordered ? F.surface : bg,
        border: bordered ? `1px solid ${F.line}` : "none",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={Math.round(size * 0.5)} color={fg} strokeWidth={strokeWidth} />
    </div>
  );
}

export default IconTile;
