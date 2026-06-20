import React from "react";
import { tokens as F, fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * Tag — a small neutral pill for a category label (contract type,
 * connector category). The original file defined this twice: TypeTag
 * (never actually used anywhere) and SoftTypeTag (the one every screen
 * called). This keeps the one that's used and gives it a generic name
 * so it can label more than just contract types.
 * ------------------------------------------------------------------ */
export function Tag({ children, size = "md" }) {
  const fontSize = size === "sm" ? 11.5 : 12.5;
  const padding = size === "sm" ? "2px 8px" : "3px 11px";
  return (
    <span
      style={{
        display: "inline-block",
        padding,
        borderRadius: 999,
        fontSize,
        fontWeight: 500,
        fontFamily: fonts.body,
        color: size === "sm" ? F.ink4 : F.ink2,
        background: F.chip,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export default Tag;
