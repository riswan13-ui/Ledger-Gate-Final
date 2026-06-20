import React from "react";
import { ChevronDown, ShieldCheck, X } from "lucide-react";
import { tokens as F, fonts } from "../design-system/tokens";
import { IconButton } from "../design-system/Button";
import { NAV_GROUPS } from "../data/nav";

/* ------------------------------------------------------------------ *
 * Sidebar — static column on desktop, slide-over drawer on tablet and
 * mobile (driven by the .clm-sidebar / .clm-sidebar-scrim rules in
 * GlobalStyles).
 * ------------------------------------------------------------------ */
export default function Sidebar({ route, go, sidebarOpen, setSidebarOpen, onOpenAuth }) {
  return (
    <>
      <div className={`clm-sidebar-scrim ${sidebarOpen ? "clm-open" : ""}`} onClick={() => setSidebarOpen(false)} />

      <aside
        className={`clm-sidebar ${sidebarOpen ? "clm-open" : ""}`}
        style={{ width: 244, flexShrink: 0, background: F.canvas, borderRight: `1px solid ${F.line}`, display: "flex", flexDirection: "column" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "10px 8px 0" }}>
          <button
            onClick={onOpenAuth}
            className="clm-press"
            style={{
              flex: 1, padding: "9px 10px", display: "flex", alignItems: "center", gap: 10,
              background: "transparent", border: "none", borderRadius: F.rSm, cursor: "pointer", textAlign: "left", minWidth: 0,
            }}
          >
            <div style={{ width: 30, height: 30, borderRadius: F.rSm, background: F.ink, display: "grid", placeItems: "center", flexShrink: 0 }}>
              <ShieldCheck size={17} color="#fff" strokeWidth={2.3} />
            </div>
            <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
              <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 600, color: F.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Ledger Gate
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: F.ink3 }}>Northgate Inc.</div>
            </div>
            <ChevronDown size={15} color={F.ink3} />
          </button>
          <IconButton Icon={X} ariaLabel="Close menu" size={34} className="clm-hamburger" onClick={() => setSidebarOpen(false)} />
        </div>

        <nav style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }} className="clm-scroll">
          {NAV_GROUPS.map((grp, gi) => (
            <div key={gi} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {grp.title && (
                <div
                  style={{
                    fontFamily: fonts.body, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                    textTransform: "uppercase", color: F.ink4, padding: "4px 10px 6px",
                  }}
                >
                  {grp.title}
                </div>
              )}
              {grp.items.map(({ key, label, Icon }) => {
                const active = route === key;
                return (
                  <button
                    key={key}
                    onClick={() => go(key)}
                    aria-current={active ? "page" : undefined}
                    className="clm-press"
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                      borderRadius: F.rSm, border: `1px solid ${active ? F.line : "transparent"}`, cursor: "pointer",
                      background: active ? F.surface : "transparent",
                      color: active ? F.ink : F.ink2,
                      fontFamily: fonts.body, fontSize: 13.5, fontWeight: active ? 600 : 500,
                      textAlign: "left", boxShadow: active ? "0 1px 2px rgba(26,26,26,.04)" : "none",
                    }}
                  >
                    <Icon size={17} strokeWidth={2} color={active ? F.ink : F.ink3} />
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: "auto", padding: 12 }}>
          <button
            onClick={() => go("connectors")}
            className="clm-linear-card"
            style={{ width: "100%", textAlign: "left", background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: "12px 13px", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: F.green }} />
              <span style={{ fontFamily: fonts.body, fontSize: 12.5, color: F.ink, fontWeight: 600 }}>9 of 11 sources live</span>
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: F.ink3, lineHeight: 1.45 }}>2 connectors need attention</div>
          </button>
        </div>
      </aside>
    </>
  );
}
