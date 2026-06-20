import React, { useState } from "react";
import { ChevronLeft, Check, Download, ShieldX, Clock, Activity, Sparkles } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { Button } from "../../design-system/Button";
import { PostureBadge } from "../../design-system/Badge";
import { LabelValue } from "../../design-system/Stats";
import { SIGNALS, SUGGESTED_ASKS } from "../../data/negotiation";
import { fmtMoney } from "../../utils/format";
import RiskFlag from "./RiskFlag";
import SignalCard from "./SignalCard";

export default function RenewalBrief({ renewal, back }) {
  const [exported, setExported] = useState(false);
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "12px 4px 64px", fontFamily: fonts.body }}>
      {/* back */}
      <button
        onClick={back}
        className="clm-press"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: fonts.body, fontSize: 13.5, color: F.ink3, fontWeight: 500, padding: "4px 0", marginBottom: 16 }}
      >
        <ChevronLeft size={16} /> Renewals
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 13, color: F.ink3, fontWeight: 500, marginBottom: 8 }}>Renewal brief</div>
          <h1 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 600, color: F.ink, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{renewal.vendor}</h1>
          <p style={{ fontSize: 14.5, color: F.ink3, margin: 0, maxWidth: 620, lineHeight: 1.55 }}>
            Generated from the CES and two years of transaction history. Five signals, ranked by leverage.
          </p>
        </div>
        <Button variant={exported ? "outline" : "solid"} Icon={exported ? Check : Download} onClick={() => setExported(true)}>
          {exported ? "Exported" : "Export PDF"}
        </Button>
      </div>

      {/* summary + posture */}
      <div className="clm-detail-2col" style={{ gridTemplateColumns: "1.4fr 1fr", marginBottom: 14 }}>
        <div style={{ background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: 22 }}>
          <div style={{ fontSize: 12.5, color: F.ink3, fontWeight: 500, marginBottom: 18 }}>Contract summary</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <LabelValue size="lg" label="Total value" value={fmtMoney(renewal.value)} />
            <LabelValue size="lg" label="Expiry" value={renewal.expiry} />
            <LabelValue size="lg" label="Auto-renewal notice" value={renewal.notice} warn />
            <LabelValue size="lg" label="Relationship" value={renewal.relationship} />
          </div>
        </div>
        <div style={{ background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: 22, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 12.5, color: F.ink3, fontWeight: 500 }}>Recommended posture</div>
          <div style={{ marginTop: 14, alignSelf: "flex-start" }}>
            <PostureBadge posture={renewal.posture} size="lg" />
          </div>
          <p style={{ fontSize: 13.5, color: F.ink2, margin: "14px 0 0", lineHeight: 1.55 }}>
            {renewal.headline}. Renew the relationship, but reset rate and terms before the notice deadline.
          </p>
        </div>
      </div>

      {/* risk flags */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <RiskFlag Icon={ShieldX} label="Sole-source dependency" detail="No qualified alternate for this category" />
        <RiskFlag Icon={Clock} label={`Notice deadline ${renewal.notice}`} detail="Auto-renews at current rate if missed" urgent />
        <RiskFlag Icon={Activity} label="Est. switching cost $220K" detail="Migration + re-integration" />
      </div>

      {/* signals */}
      <div style={{ fontSize: 11.5, color: F.ink4, fontWeight: 600, marginBottom: 14, letterSpacing: "0.05em", textTransform: "uppercase" }}>Five negotiation signals</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        {SIGNALS.map((s) => (
          <SignalCard key={s.key} s={s} />
        ))}
        {/* suggested asks card */}
        <div style={{ background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Sparkles size={17} color={F.ink2} strokeWidth={2} />
            <div style={{ fontFamily: fonts.body, fontSize: 14.5, fontWeight: 600, color: F.ink }}>Suggested asks</div>
          </div>
          {SUGGESTED_ASKS.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: "9px 0", borderBottom: i < SUGGESTED_ASKS.length - 1 ? `1px solid ${F.lineSoft}` : "none" }}>
              <span className="num" style={{ fontSize: 12, color: F.ink3, fontWeight: 600, marginTop: 1 }}>{i + 1}</span>
              <span style={{ fontSize: 13.5, color: F.ink, lineHeight: 1.45 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
