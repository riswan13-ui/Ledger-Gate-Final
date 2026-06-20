import React from "react";
import { ChevronLeft, ShieldCheck, CircleAlert, FileStack, Clock, Layers, GitBranch } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { Button } from "../../design-system/Button";
import { Panel } from "../../design-system/Panel";
import { Meter } from "../../design-system/Meter";
import { LabelValue } from "../../design-system/Stats";
import { CES_TREE, CES_FIELDS, CES_TIMELINE } from "../../data/contracts";
import { fmtFullMoney } from "../../utils/format";

export default function CESDetail({ contract, back }) {
  const cesColor = contract.ces >= 85 ? F.greenInk : F.amber;

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "12px 4px 64px", fontFamily: fonts.body }}>
      {/* breadcrumb / back */}
      <button
        onClick={back}
        className="clm-press"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: fonts.body, fontSize: 13.5, color: F.ink3, fontWeight: 500, padding: "4px 0", marginBottom: 16 }}
      >
        <ChevronLeft size={16} /> Contracts
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontSize: 13, color: F.ink3, fontWeight: 500, marginBottom: 8 }}>Contract Effective State</div>
          <h1 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 600, color: F.ink, margin: "0 0 12px", letterSpacing: "-0.01em" }}>
            {contract.vendor}
          </h1>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap", alignItems: "center" }}>
            <LabelValue label="Total value" value={fmtFullMoney(contract.value)} mono />
            <LabelValue label="Expires" value={`${contract.expiry} · in ${contract.days}d`} mono />
            <LabelValue label="Type" value={contract.type} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: "14px 18px" }}>
          <ShieldCheck size={20} color={cesColor} strokeWidth={2} />
          <div>
            <div style={{ fontSize: 12, color: F.ink3 }}>CES completeness</div>
            <Meter value={contract.ces} />
          </div>
        </div>
      </div>

      {/* conflict banner */}
      {contract.ces < 85 && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: F.amberSoft, border: `1px solid ${F.amber}33`, borderRadius: F.r, padding: "16px 18px", marginTop: 22 }}>
          <CircleAlert size={20} color={F.amber} strokeWidth={2.2} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: F.ink }}>1 unresolved conflict in this CES</div>
            <div style={{ fontSize: 13.5, color: F.ink2, marginTop: 3, lineHeight: 1.5 }}>
              SOW-002 and Amendment 1 specify different senior-consultant rates. Later-date override applied
              ($245/hr from Amendment 1), but the SOW clause should be confirmed.
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Button variant="solid" tone="amber" size="sm">Keep Amendment 1 rate</Button>
              <Button variant="outline" size="sm">Review clauses</Button>
            </div>
          </div>
        </div>
      )}

      {/* main grid */}
      <div className="clm-detail-2col" style={{ gridTemplateColumns: "minmax(300px, 1fr) minmax(360px, 1.25fr)", marginTop: 24, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Panel title="Document hierarchy" Icon={FileStack} hint="MSA → SOW → Order Form → Amendments">
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {CES_TREE.map((n) => (
                <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: F.rXs, marginLeft: (n.indent || 0) * 20, background: n.current ? F.hover : "transparent" }}>
                  <n.Icon size={17} color={n.current ? F.ink : F.ink4} strokeWidth={2} style={{ flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: F.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.title}</div>
                    <div className="num" style={{ fontSize: 11.5, color: F.ink4 }}>{n.kind} · {n.date}</div>
                  </div>
                  {n.current && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: F.ink2, background: "#fff", border: `1px solid ${F.line}`, borderRadius: 999, padding: "2px 9px", flexShrink: 0 }}>
                      governs
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Amendment timeline" Icon={Clock}>
            <div style={{ position: "relative", paddingLeft: 6 }}>
              {CES_TIMELINE.map((e, i) => {
                const c = e.kind === "amend" ? F.ink : e.kind === "root" ? F.ink : F.ink4;
                return (
                  <div key={i} style={{ display: "flex", gap: 14, position: "relative", paddingBottom: i === CES_TIMELINE.length - 1 ? 0 : 18 }}>
                    {i !== CES_TIMELINE.length - 1 && (
                      <div style={{ position: "absolute", left: 5, top: 14, bottom: 0, width: 2, background: F.lineSoft }} />
                    )}
                    <div style={{ width: 12, height: 12, borderRadius: 999, background: c, marginTop: 2, flexShrink: 0, zIndex: 1, boxShadow: `0 0 0 3px ${c}1a` }} />
                    <div>
                      <div className="num" style={{ fontSize: 12, color: F.ink4 }}>{e.date}</div>
                      <div style={{ fontSize: 13.5, color: F.ink, fontWeight: 500, marginTop: 2 }}>{e.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        {/* right: extracted field cards */}
        <Panel title="Extracted effective terms" Icon={Layers} hint="Resolved across all documents">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {CES_FIELDS.map((f) => (
              <div key={f.label} style={{ border: `1px solid ${f.amended ? F.ink + "22" : F.line}`, background: f.amended ? F.hover : F.surface, borderRadius: F.rSm, padding: "14px 15px" }}>
                <div style={{ fontSize: 12, color: F.ink3, fontWeight: 500, marginBottom: 6 }}>{f.label}</div>
                <div className="num" style={{ fontSize: 17, color: F.ink, fontWeight: 600, lineHeight: 1.1 }}>{f.value}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
                  {f.amended && <GitBranch size={12} color={F.ink2} strokeWidth={2.2} />}
                  <span style={{ fontSize: 11.5, color: f.amended ? F.ink2 : F.ink4, fontWeight: f.amended ? 600 : 400 }}>{f.note}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
