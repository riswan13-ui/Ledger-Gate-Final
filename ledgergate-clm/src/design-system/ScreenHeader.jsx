import React from "react";
import { tokens as F, fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * Eyebrow — small tracked uppercase label, set in monospace. Used on
 * its own (audit report, source drawer) and inside ScreenHeader.
 * ------------------------------------------------------------------ */
export function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 11.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: F.ink3,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * ScreenHeader — eyebrow + serif H1 + description. The one place a
 * page-level heading is defined; the serif display face is reserved
 * for this and the Home greeting, everywhere else stays sans-serif.
 * ------------------------------------------------------------------ */
export function ScreenHeader({ eyebrow, title, desc }) {
  return (
    <div style={{ marginBottom: 22, paddingTop: 8 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 600, color: F.ink, margin: "12px 0 8px", letterSpacing: "-0.02em" }}>
        {title}
      </h1>
      <p style={{ fontFamily: fonts.body, fontSize: 14.5, color: F.ink3, margin: 0, maxWidth: 680, lineHeight: 1.55 }}>{desc}</p>
    </div>
  );
}
