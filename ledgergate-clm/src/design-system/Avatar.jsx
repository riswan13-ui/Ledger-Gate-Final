import React from "react";
import { tokens as F, fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * Avatar — a letter or initials inside a circle or rounded square.
 * Used for vendor initials in contract/renewal rows, team member
 * initials in Admin, and the account-menu trigger in the top bar.
 *
 * tone: "chip" (light neutral background, the default for "this row
 *        represents a vendor") | "solid" (filled ink background, for
 *        "this represents a signed-in person") — or pass bg/fg directly
 *        for a connector brand tint.
 * ------------------------------------------------------------------ */
export function Avatar({
  label,
  size = 34,
  shape = "square", // "square" | "circle"
  tone = "chip", // "chip" | "solid"
  bg,
  fg,
  font = "display", // "display" | "body"
}) {
  const toneBg = tone === "solid" ? F.ink : F.chip;
  const toneFg = tone === "solid" ? "#fff" : F.ink2;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: shape === "circle" ? 999 : Math.max(6, Math.round(size * 0.26)),
        background: bg || toneBg,
        color: fg || toneFg,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        fontFamily: font === "display" ? fonts.display : fonts.body,
        fontWeight: font === "display" ? 600 : 600,
        fontSize: Math.max(11, Math.round(size * 0.36)),
      }}
    >
      {label}
    </div>
  );
}

export default Avatar;
