import React from "react";
import { AlertTriangle } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { Badge } from "../../design-system/Badge";
import { IconTile } from "../../design-system/IconTile";
import { Viz, BarRow, Legend } from "../../design-system/DataViz";

/* Tiny inline SVG visualizations — labelled, ≥3:1 contrast, not color-only */
function SignalViz({ kind }) {
  if (kind === "paymentBars") {
    return (
      <Viz>
        <BarRow label="Acme" value={30} max={45} unit="d" color={F.ink} />
        <BarRow label="Market" value={45} max={45} unit="d" color={F.ink4} />
      </Viz>
    );
  }
  if (kind === "volumeGauge") {
    const pct = 112;
    return (
      <Viz>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 10, background: F.lineSoft, borderRadius: 999, position: "relative", overflow: "visible" }}>
            <div style={{ width: "100%", height: "100%", background: F.lineSoft, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: `${(100 / pct) * 100}%`, height: "100%", background: F.ink4, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: `${(100 / pct) * 100}%`, top: -3, width: `${((pct - 100) / pct) * 100}%`, height: 16, background: F.ink, borderRadius: 999 }} />
          </div>
          <span className="num" style={{ fontSize: 14, fontWeight: 600, color: F.ink }}>112%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontFamily: fonts.body, fontSize: 11, color: F.ink3 }}>Committed</span>
          <span style={{ fontFamily: fonts.body, fontSize: 11, color: F.ink2, fontWeight: 600 }}>+12% over</span>
        </div>
      </Viz>
    );
  }
  if (kind === "escalationLines") {
    return (
      <Viz>
        <svg viewBox="0 0 200 56" width="100%" height="56" role="img" aria-label="Contracted escalation running above actual inflation">
          <polyline points="0,44 50,38 100,28 150,18 200,8" fill="none" stroke={F.amber} strokeWidth="2.5" />
          <polyline points="0,46 50,44 100,40 150,38 200,36" fill="none" stroke={F.ink4} strokeWidth="2.5" strokeDasharray="4 3" />
        </svg>
        <Legend items={[{ c: F.amber, label: "Contracted CPI+2%" }, { c: F.ink4, label: "Actual CPI", dash: true }]} />
      </Viz>
    );
  }
  if (kind === "slaTimeline") {
    return (
      <Viz>
        <div style={{ position: "relative", height: 28 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 13, height: 2, background: F.lineSoft }} />
          {[18, 52, 80].map((x, i) => (
            <div key={i} title={`Breach ${i + 1}`} style={{ position: "absolute", left: `${x}%`, top: 7, width: 14, height: 14, borderRadius: 999, background: F.amberSoft, border: `2px solid ${F.amber}`, display: "grid", placeItems: "center" }}>
              <AlertTriangle size={8} color={F.amber} />
            </div>
          ))}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 11, color: F.ink3 }}>3 breaches across the term · $12.4K credits</div>
      </Viz>
    );
  }
  if (kind === "scopeBars") {
    return (
      <Viz>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 44 }}>
          {[10, 18, 14, 26, 22].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${(h / 26) * 100}%`, background: i === 3 ? F.amber : F.amberSoft, borderRadius: "3px 3px 0 0" }} title={`Invoice ${i + 1}`} />
          ))}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 11, color: F.ink3 }}>Out-of-scope $ across 5 invoices</div>
      </Viz>
    );
  }
  return null;
}

export default function SignalCard({ s }) {
  const isRisk = s.tone === "risk";
  const toneLabel = s.tone.charAt(0).toUpperCase() + s.tone.slice(1);
  return (
    <div style={{ background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0 }}>
          <IconTile Icon={s.Icon} size={34} />
          <div style={{ fontSize: 14, fontWeight: 600, color: F.ink, lineHeight: 1.2 }}>{s.title}</div>
        </div>
        <Badge tone={isRisk ? "caution" : "positive"} label={toneLabel} />
      </div>
      <div className="num" style={{ fontSize: 17, fontWeight: 600, color: F.ink, lineHeight: 1.15 }}>{s.headline}</div>
      <SignalViz kind={s.viz} />
      <p style={{ fontSize: 13, color: F.ink2, margin: 0, lineHeight: 1.5 }}>{s.detail}</p>
    </div>
  );
}
