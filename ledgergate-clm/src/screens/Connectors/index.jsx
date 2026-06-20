import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronRight, Plug2, RefreshCw, Check } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { Card } from "../../design-system/Card";
import { Button } from "../../design-system/Button";
import { IconTile } from "../../design-system/IconTile";
import { Tag } from "../../design-system/Tag";
import { StatusDot, HealthIndicator } from "../../design-system/StatusDot";
import { CONNECTORS, CONNECTOR_TABS, connectorDesc, syncLogFor } from "../../data/connectors";

/* Connect / Reconnect / Connected — status-driven action button.
 * Built on the shared Button primitive; only the "Connected" state needs
 * a manually-colored icon (green check, neutral text), so it's composed
 * with children instead of Button's built-in Icon prop. */
function ConnectorStatusButton({ status }) {
  if (status === "Not connected") return <Button variant="solid" size="sm" Icon={Plug2}>Connect</Button>;
  if (status === "Action needed" || status === "Error") return <Button variant="outline" tone="amber" size="sm" Icon={RefreshCw}>Reconnect</Button>;
  return (
    <Button variant="outline" size="sm">
      <Check size={15} color={F.greenInk} strokeWidth={2.6} /> Connected
    </Button>
  );
}

export default function ConnectorsScreen() {
  const [tab, setTab] = useState("All integrations");
  const [openLog, setOpenLog] = useState(null);

  const counts = useMemo(
    () => ({
      connected: CONNECTORS.filter((c) => c.status === "Connected").length,
      attention: CONNECTORS.filter((c) => ["Action needed", "Error"].includes(c.status)).length,
      total: CONNECTORS.length,
    }),
    []
  );

  const shown = useMemo(() => CONNECTORS.filter((c) => tab === "All integrations" || c.group === tab), [tab]);

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 4px 64px", fontFamily: fonts.body }}>
      {/* header */}
      <div style={{ marginBottom: 6 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 600, color: F.ink, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
          Integrations
        </h1>
        <p style={{ fontSize: 15.5, color: F.ink3, margin: 0, lineHeight: 1.55, maxWidth: 640 }}>
          Keep your contract data current automatically. Connect the systems where your contracts, invoices, and vendor records already live.
        </p>
      </div>

      {/* summary line */}
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap", margin: "18px 0 4px" }}>
        <StatusDot color={F.green} label={`${counts.connected} connected`} size={8} fontSize={13.5} fontWeight={500} ring={false} />
        <StatusDot color={F.amber} label={`${counts.attention} need attention`} size={8} fontSize={13.5} fontWeight={500} ring={false} />
        <StatusDot color={F.ink4} label={`${counts.total - counts.connected - counts.attention} not connected`} size={8} fontSize={13.5} fontWeight={500} ring={false} />
      </div>

      {/* tabs */}
      <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${F.line}`, margin: "20px 0 28px", overflowX: "auto" }}>
        {CONNECTOR_TABS.map((tb) => {
          const active = tab === tb;
          return (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              className="clm-press"
              style={{
                border: "none", background: "none", cursor: "pointer", padding: "10px 14px",
                fontFamily: fonts.body, fontSize: 14, fontWeight: active ? 600 : 500,
                color: active ? F.ink : F.ink3, borderBottom: `2px solid ${active ? F.ink : "transparent"}`,
                marginBottom: -1, whiteSpace: "nowrap",
              }}
            >
              {tb}
            </button>
          );
        })}
      </div>

      {/* gallery */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(312px, 1fr))", gap: 20 }}>
        {shown.map((c) => {
          const tint = F.brand[c.name] || { fg: F.ink2, bg: F.chip };
          const desc = connectorDesc(c);
          const isOpen = openLog === c.name;
          return (
            <Card key={c.name} padding={22} style={{ display: "flex", flexDirection: "column", minHeight: 210 }}>
              {/* glyph + health */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <IconTile Icon={c.glyph} size={46} radius={12} bg={tint.bg} fg={tint.fg} />
                <HealthIndicator health={c.health} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <h3 style={{ fontFamily: fonts.body, fontSize: 16.5, fontWeight: 600, color: F.ink, margin: 0 }}>{c.name}</h3>
                <Tag size="sm">{c.cat}</Tag>
              </div>
              <p style={{ fontSize: 13.5, color: F.ink3, margin: "0 0 18px", lineHeight: 1.5, flex: 1 }}>{desc}</p>

              {/* footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <ConnectorStatusButton status={c.status} />
                {c.status !== "Not connected" && (
                  <button
                    onClick={() => setOpenLog(isOpen ? null : c.name)}
                    className="clm-press"
                    aria-expanded={isOpen}
                    style={{ border: "none", background: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 12.5, fontWeight: 500, color: F.ink3 }}
                  >
                    Activity {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                )}
              </div>

              {/* activity log */}
              {isOpen && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${F.lineSoft}` }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: F.ink4, fontWeight: 600, marginBottom: 10 }}>
                    Last sync · {c.sync}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {syncLogFor(c).map((row, k) => (
                      <div key={k} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <span className="num" style={{ fontSize: 11.5, color: F.ink4, width: 64, flexShrink: 0 }}>{row.t}</span>
                        <span style={{ width: 6, height: 6, borderRadius: 999, flexShrink: 0, background: row.lvl === "err" ? F.red : row.lvl === "warn" ? F.amber : F.green }} />
                        <span style={{ fontSize: 12.5, color: F.ink2, lineHeight: 1.35 }}>{row.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
