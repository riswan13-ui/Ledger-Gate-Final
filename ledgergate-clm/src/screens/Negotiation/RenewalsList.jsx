import React from "react";
import { ChevronRight } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { Card } from "../../design-system/Card";
import { Avatar } from "../../design-system/Avatar";
import { BigStat } from "../../design-system/Stats";
import { PostureBadge } from "../../design-system/Badge";
import { RENEWALS } from "../../data/negotiation";
import { fmtLeverage } from "../../utils/format";

export default function RenewalsList({ onOpen }) {
  const totalLeverage = RENEWALS.reduce((s, r) => s + r.leverage, 0);
  const soonest = Math.min(...RENEWALS.map((r) => r.days));

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 4px 64px", fontFamily: fonts.body }}>
      {/* header */}
      <div style={{ marginBottom: 8 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 600, color: F.ink, margin: "0 0 10px", letterSpacing: "-0.01em" }}>Renewals</h1>
        <p style={{ fontSize: 15.5, color: F.ink3, margin: 0, lineHeight: 1.55, maxWidth: 640 }}>
          Contracts entering their renewal window, each with a data-backed brief generated from the CES and transaction history.
        </p>
      </div>

      {/* stat header */}
      <div className="clm-grid-stat3" style={{ borderBottom: `1px solid ${F.line}`, margin: "22px 0 6px" }}>
        <BigStat big={String(RENEWALS.length)} label="In the 90-day window" />
        <BigStat big={fmtLeverage(totalLeverage)} label="Total estimated leverage" divider />
        <BigStat big={`${soonest} days`} label="Soonest notice deadline" divider />
      </div>

      {/* list */}
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        {RENEWALS.map((r) => (
          <Card
            key={r.vendor}
            as="button"
            interactive
            padding={20}
            onClick={() => onOpen(r)}
            className="clm-card-btn clm-renewal-row"
            style={{ textAlign: "left", cursor: "pointer", display: "grid", gridTemplateColumns: "minmax(200px,1.4fr) 1fr 1fr auto", gap: 20, alignItems: "center" }}
          >
            {/* vendor + headline */}
            <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
              <Avatar label={r.vendor[0]} size={40} font="display" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: F.ink, marginBottom: 3 }}>{r.vendor}</div>
                <div style={{ fontSize: 13, color: F.ink3, lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 280 }}>{r.headline}</div>
              </div>
            </div>

            {/* expiry / notice */}
            <div>
              <div className="num" style={{ fontSize: 14, color: F.ink, fontWeight: 600 }}>{r.expiry}</div>
              <div style={{ fontSize: 12.5, color: r.days <= 30 ? F.red : r.days <= 60 ? F.amber : F.ink3, fontWeight: 500, marginTop: 2 }}>notice {r.notice}</div>
            </div>

            {/* leverage */}
            <div>
              <div className="num" style={{ fontSize: 16, color: F.ink, fontWeight: 600 }}>{fmtLeverage(r.leverage)}</div>
              <div style={{ fontSize: 12.5, color: F.ink3, marginTop: 2 }}>est. leverage</div>
            </div>

            {/* posture + chevron */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, justifySelf: "end" }}>
              <PostureBadge posture={r.posture} />
              <ChevronRight size={18} color={F.ink4} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
