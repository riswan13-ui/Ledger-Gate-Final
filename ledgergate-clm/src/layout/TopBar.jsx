import React, { useState } from "react";
import { Menu, Search, Bell as BellIcon, ChevronDown, User, CreditCard, Settings, HelpCircle, LogOut } from "lucide-react";
import { tokens as F, fonts } from "../design-system/tokens";
import { IconButton } from "../design-system/Button";
import { Avatar } from "../design-system/Avatar";

export default function TopBar({ onOpenNotifs, unread, onSignOut, go, onOpenSidebar }) {
  const [menu, setMenu] = useState(false);

  const menuItems = [
    { Icon: User, label: "Profile", act: () => go("admin") },
    { Icon: CreditCard, label: "Billing & plan", act: () => go("admin") },
    { Icon: Settings, label: "Settings", act: () => go("admin") },
    { Icon: HelpCircle, label: "Help & support", act: () => {} },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${F.line}`, background: F.surface, flexShrink: 0 }}>
      <IconButton Icon={Menu} ariaLabel="Open menu" size={38} className="clm-hamburger" onClick={onOpenSidebar} />

      <div
        style={{
          display: "flex", alignItems: "center", gap: 9, flex: "1 1 auto", maxWidth: 460,
          border: `1px solid ${F.line}`, borderRadius: F.rSm, padding: "0 12px", height: 38, background: F.canvas, minWidth: 0,
        }}
      >
        <Search size={16} color={F.ink3} style={{ flexShrink: 0 }} />
        <input
          placeholder="Search contracts, invoices, vendors…"
          aria-label="Global search"
          className="clm-topbar-search-text"
          style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: fonts.body, fontSize: 13.5, color: F.ink, height: "100%" }}
        />
        <span className="clm-topbar-search-text" style={{ fontFamily: fonts.mono, fontSize: 11, color: F.ink4, border: `1px solid ${F.line}`, borderRadius: 4, padding: "1px 5px", flexShrink: 0 }}>
          ⌘K
        </span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <button onClick={onOpenNotifs} aria-label="Notifications" className="clm-press" style={{ position: "relative", width: 38, height: 38, borderRadius: F.rSm, border: `1px solid ${F.line}`, background: F.surface, display: "grid", placeItems: "center", cursor: "pointer" }}>
          <BellIcon size={17} color={F.ink2} />
          {unread > 0 && (
            <span style={{ position: "absolute", top: 7, right: 7, minWidth: 15, height: 15, borderRadius: 999, background: F.red, color: "#fff", fontSize: 9.5, fontWeight: 700, display: "grid", placeItems: "center", padding: "0 3px" }}>
              {unread}
            </span>
          )}
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenu((v) => !v)}
            aria-label="Account"
            aria-expanded={menu}
            className="clm-press"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px 5px 5px", borderRadius: F.rSm, border: `1px solid ${menu ? F.line : "transparent"}`, background: menu ? F.hover : "transparent", cursor: "pointer" }}
          >
            <Avatar label="DW" size={28} shape="circle" tone="solid" font="body" />
            <ChevronDown size={14} color={F.ink3} />
          </button>
          {menu && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setMenu(false)} />
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 50, width: 240, background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: 6, boxShadow: "0 12px 32px -12px rgba(26,26,26,.20)" }}>
                <div style={{ padding: "10px 12px", borderBottom: `1px solid ${F.lineSoft}`, marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: F.ink }}>Dana Whitfield</div>
                  <div style={{ fontSize: 12.5, color: F.ink3 }}>dana.w@northgate.com</div>
                </div>
                {menuItems.map((it) => (
                  <button
                    key={it.label}
                    onClick={() => { setMenu(false); it.act(); }}
                    className="clm-row"
                    style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: F.rXs, border: "none", background: "transparent", cursor: "pointer", fontSize: 13.5, color: F.ink2, fontWeight: 500 }}
                  >
                    <it.Icon size={16} color={F.ink3} /> {it.label}
                  </button>
                ))}
                <div style={{ borderTop: `1px solid ${F.lineSoft}`, marginTop: 4, paddingTop: 4 }}>
                  <button
                    onClick={() => { setMenu(false); onSignOut(); }}
                    className="clm-row"
                    style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: F.rXs, border: "none", background: "transparent", cursor: "pointer", fontSize: 13.5, color: F.red, fontWeight: 500 }}
                  >
                    <LogOut size={16} color={F.red} /> Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
