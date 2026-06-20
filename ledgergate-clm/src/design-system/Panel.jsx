import React from "react";
import { tokens as F, fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * Panel — a bordered section with an icon + title header, used for
 * every grouped block of detail content (document hierarchy, checks
 * run, findings, amendment timeline...).
 *
 * The original file had two copies of this component (a "soft" one
 * used on the contract detail screen and a default one used on the
 * invoice audit screen) that had quietly drifted: one set panel
 * titles in the serif display face, the other in sans-serif, with
 * different header padding and icon weight. Screens right next to
 * each other in the product ended up looking subtly inconsistent.
 * This version standardizes on the sans-serif treatment (serif is
 * reserved for page-level H1s via ScreenHeader) so every panel in
 * the app now matches.
 * ------------------------------------------------------------------ */
export function Panel({ title, Icon, hint, children }) {
  return (
    <section style={{ background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px", borderBottom: `1px solid ${F.lineSoft}` }}>
        {Icon && <Icon size={17} color={F.ink2} strokeWidth={2} />}
        <h2 style={{ fontFamily: fonts.body, fontSize: 15, fontWeight: 600, color: F.ink, margin: 0 }}>{title}</h2>
        {hint && <span style={{ marginLeft: "auto", fontFamily: fonts.body, fontSize: 12, color: F.ink4 }}>{hint}</span>}
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </section>
  );
}

export default Panel;
