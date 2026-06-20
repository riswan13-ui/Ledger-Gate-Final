import React from "react";
import { tokens as F } from "./tokens";

/* ------------------------------------------------------------------ *
 * Card — a bordered, rounded surface. The plainest building block in
 * the system: change the border color, radius, or shadow here and
 * every card-shaped thing in the product (connector tiles, stat tiles,
 * signal cards, list rows) updates together.
 * ------------------------------------------------------------------ */
export function Card({ children, padding = 20, interactive = false, style, as = "div", ...rest }) {
  const Tag = as;
  return (
    <Tag
      className={interactive ? "clm-card-btn" : undefined}
      style={{
        background: F.surface,
        border: `1px solid ${F.line}`,
        borderRadius: F.r,
        padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Card;
