import React from "react";
import { X } from "lucide-react";
import { tokens as F, fonts } from "./tokens";
import { useEscapeKey } from "../hooks";
import { IconButton } from "./Button";

/* ------------------------------------------------------------------ *
 * ConfirmDialog — centered modal for a destructive/consequential
 * action that needs a deliberate second step (e.g. overriding a
 * compliance verdict). One implementation, reused anywhere the product
 * needs a "are you sure" moment.
 * ------------------------------------------------------------------ */
export function ConfirmDialog({ Icon, title, body, confirmLabel, onConfirm, onCancel }) {
  useEscapeKey(onCancel);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{ position: "fixed", inset: 0, background: "rgba(15,27,45,0.55)", display: "grid", placeItems: "center", zIndex: 1000, padding: 20 }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: F.surface, borderRadius: F.r, padding: 28, maxWidth: 440, width: "100%", border: `1px solid ${F.ink}` }}
      >
        <div style={{ width: 44, height: 44, borderRadius: F.rSm, background: F.amberSoft, display: "grid", placeItems: "center", marginBottom: 14 }}>
          {Icon && <Icon size={22} color={F.amber} strokeWidth={2.3} />}
        </div>
        <h2 style={{ fontFamily: fonts.display, fontSize: 19, fontWeight: 600, color: F.ink, margin: "0 0 8px" }}>{title}</h2>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: F.ink2, margin: "0 0 20px", lineHeight: 1.55 }}>{body}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            className="clm-press"
            autoFocus
            style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 600, color: F.ink2, background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.rSm, padding: "10px 18px", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="clm-press"
            style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 600, color: "#fff", background: F.amber, border: "none", borderRadius: F.rSm, padding: "10px 18px", cursor: "pointer" }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Drawer — slide-over panel anchored to the right edge, with a scrim,
 * header (icon + title + subtitle + close button), and Escape-to-close.
 *
 * The source-citation drawer in Chat and the notifications panel each
 * reimplemented this shell independently (overlay div, slide-in panel,
 * header row, close button, keydown listener). They're now both built
 * on this one component, so a change to how drawers look or behave —
 * width, scrim opacity, animation — only has to happen once.
 * ------------------------------------------------------------------ */
export function Drawer({
  title, subtitle, Icon, onClose, children,
  width = "min(480px, 92vw)", scrimOpacity = 0.45, scrimColor = "15,27,45",
  zIndex = 900, headerExtra, closeSize = 32,
}) {
  useEscapeKey(onClose);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: `rgba(${scrimColor},${scrimOpacity})` }} />
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={title}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width,
          background: F.surface,
          borderLeft: `1px solid ${F.line}`,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-12px 0 40px -16px rgba(26,26,26,.18)",
        }}
      >
        <div style={{ padding: "18px 20px", borderBottom: `1px solid ${F.line}`, display: "flex", alignItems: "center", gap: 12 }}>
          {Icon && <Icon size={18} color={F.ink2} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && <div style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 600, color: F.ink }}>{title}</div>}
            {subtitle && <div style={{ fontFamily: fonts.body, fontSize: 12, color: F.ink3 }}>{subtitle}</div>}
          </div>
          {headerExtra}
          <IconButton Icon={X} size={closeSize} ariaLabel="Close" onClick={onClose} />
        </div>
        <div className="clm-scroll" style={{ flex: 1, overflowY: "auto", padding: 22 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
