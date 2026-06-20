import React, { useState } from "react";
import { Users, Bell, ScrollText, Activity, UserPlus, MoreHorizontal, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { ScreenHeader } from "../../design-system/ScreenHeader";
import { Button } from "../../design-system/Button";
import { Avatar } from "../../design-system/Avatar";
import { StatusBadge } from "../../design-system/Badge";
import { Toggle } from "../../design-system/FormControls";
import { Card } from "../../design-system/Card";
import { StatPill } from "../../design-system/Stats";
import { HealthIndicator } from "../../design-system/StatusDot";
import { TEAM, AUDIT_LOG, NOTIF_PREFS } from "../../data/admin";
import { CONNECTORS } from "../../data/connectors";
import { useViewport } from "../../hooks";

const AUDIT_COLOR = { override: F.amber, dispute: F.red, edit: F.ink, auth: F.ink2, system: F.ink3 };

const TABS = [
  { key: "users", label: "Users", Icon: Users },
  { key: "notifications", label: "Notifications", Icon: Bell },
  { key: "audit", label: "Audit log", Icon: ScrollText },
  { key: "health", label: "Integration health", Icon: Activity },
];

export default function AdminScreen() {
  const bp = useViewport();
  const isMobile = bp === "mobile";
  const [tab, setTab] = useState("users");
  const [prefs, setPrefs] = useState(NOTIF_PREFS);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "8px 4px 64px" }}>
      <ScreenHeader
        eyebrow="Admin · Settings"
        title="Settings"
        desc="Manage who has access, what the platform notifies on, and the immutable record of every compliance decision."
      />

      <div className="clm-scroll" style={{ display: "flex", gap: 4, borderBottom: `1px solid ${F.line}`, marginBottom: 22, overflowX: "auto", whiteSpace: "nowrap" }}>
        {TABS.map((tb) => {
          const active = tab === tb.key;
          return (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className="clm-press"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 16px", border: "none",
                background: "none", cursor: "pointer", fontFamily: fonts.body, fontSize: 14, fontWeight: 600, flexShrink: 0,
                color: active ? F.ink : F.ink3, borderBottom: `2px solid ${active ? F.ink : "transparent"}`, marginBottom: -1,
              }}
            >
              <tb.Icon size={16} strokeWidth={2.2} /> {tb.label}
            </button>
          );
        })}
      </div>

      {tab === "users" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <Button variant="solid" Icon={UserPlus}>Invite user</Button>
          </div>
          <Card padding={0} style={{ overflow: "hidden" }}>
            {TEAM.map((u, i) =>
              isMobile ? (
                <div key={u.email} style={{ display: "flex", flexDirection: "column", gap: 10, padding: "14px 16px", borderBottom: i === TEAM.length - 1 ? "none" : `1px solid ${F.lineSoft}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar label={u.initials} size={38} tone="solid" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: fonts.body, fontSize: 14.5, fontWeight: 600, color: F.ink }}>{u.name}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: 12.5, color: F.ink3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.email}</div>
                    </div>
                    <button className="clm-press" aria-label={`Manage ${u.name}`} style={{ width: 30, height: 30, borderRadius: F.rSm, border: `1px solid ${F.line}`, background: F.surface, cursor: "pointer", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <MoreHorizontal size={16} color={F.ink3} />
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 50 }}>
                    <span style={{ fontFamily: fonts.body, fontSize: 13, color: F.ink2, fontWeight: 500 }}>{u.role}</span>
                    <StatusBadge active={u.status === "Active"} inactiveLabel="Invited" />
                  </div>
                </div>
              ) : (
                <div key={u.email} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 20px", borderBottom: i === TEAM.length - 1 ? "none" : `1px solid ${F.lineSoft}` }}>
                  <Avatar label={u.initials} size={38} tone="solid" />
                  <div style={{ flex: "1 1 auto", minWidth: 0 }}>
                    <div style={{ fontFamily: fonts.body, fontSize: 14.5, fontWeight: 600, color: F.ink }}>{u.name}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 12.5, color: F.ink3 }}>{u.email}</div>
                  </div>
                  <span style={{ fontFamily: fonts.body, fontSize: 13, color: F.ink2, fontWeight: 500, width: 120, flexShrink: 0 }}>{u.role}</span>
                  <StatusBadge active={u.status === "Active"} inactiveLabel="Invited" />
                  <button className="clm-press" aria-label={`Manage ${u.name}`} style={{ width: 32, height: 32, borderRadius: F.rSm, border: `1px solid ${F.line}`, background: F.surface, cursor: "pointer", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <MoreHorizontal size={16} color={F.ink3} />
                  </button>
                </div>
              )
            )}
          </Card>
        </div>
      )}

      {tab === "notifications" && (
        <Card padding={0} style={{ overflow: "hidden" }}>
          {prefs.map((p, i) => (
            <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: i === prefs.length - 1 ? "none" : `1px solid ${F.lineSoft}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: fonts.body, fontSize: 14.5, fontWeight: 600, color: F.ink }}>{p.label}</div>
                <div style={{ fontFamily: fonts.body, fontSize: 13, color: F.ink3, marginTop: 2 }}>{p.desc}</div>
              </div>
              <Toggle on={p.on} onChange={() => setPrefs((ps) => ps.map((x) => (x.key === p.key ? { ...x, on: !x.on } : x)))} label={p.label} />
            </div>
          ))}
        </Card>
      )}

      {tab === "audit" && (
        <Card padding={0} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 20px", background: F.paper, borderBottom: `1px solid ${F.line}` }}>
            <ScrollText size={15} color={F.ink} />
            <span style={{ fontFamily: fonts.body, fontSize: 12.5, color: F.ink3 }}>Immutable record — every override, edit, and CES change is retained for statutory audit defensibility.</span>
          </div>
          {AUDIT_LOG.map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: i === AUDIT_LOG.length - 1 ? "none" : `1px solid ${F.lineSoft}` }}>
              <span className="num" style={{ fontSize: 12, color: F.ink3, width: 128, flexShrink: 0 }}>{e.t}</span>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: AUDIT_COLOR[e.kind], flexShrink: 0 }} />
              <span style={{ flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: F.ink }}>{e.action}</span>
              <span style={{ fontFamily: fonts.body, fontSize: 13, color: F.ink3 }}>{e.who}</span>
            </div>
          ))}
        </Card>
      )}

      {tab === "health" && (
        <div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <StatPill Icon={CheckCircle2} color={F.green} bg={F.greenSoft} label="Healthy" value="7 sources" />
            <StatPill Icon={AlertTriangle} color={F.amber} bg={F.amberSoft} label="Degraded" value="2 sources" />
            <StatPill Icon={XCircle} color={F.red} bg={F.redSoft} label="Failing" value="1 source" />
          </div>
          <Card padding={0} style={{ overflow: "hidden" }}>
            {CONNECTORS.slice(0, 7).map((c, i) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: i === 6 ? "none" : `1px solid ${F.lineSoft}` }}>
                <div style={{ width: 32, height: 32, borderRadius: F.rSm, background: F.chip, display: "grid", placeItems: "center", fontFamily: fonts.display, fontWeight: 700, fontSize: 13, color: F.ink2, flexShrink: 0 }}>
                  {c.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 600, color: F.ink }}>{c.name}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 12, color: F.ink3 }}>{c.cat}</div>
                </div>
                {/* uptime sparkline */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 22 }}>
                  {Array.from({ length: 14 }).map((_, k) => {
                    const bad = (c.health === "err" && k > 9) || (c.health === "warn" && k === 11);
                    return <div key={k} style={{ width: 4, height: bad ? 8 : 18 - (k % 3), background: bad ? F.red : F.green, borderRadius: 999, opacity: bad ? 1 : 0.6 }} />;
                  })}
                </div>
                <HealthIndicator health={c.health} />
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
