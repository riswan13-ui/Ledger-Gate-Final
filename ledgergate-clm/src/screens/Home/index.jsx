import React, { useState } from "react";
import { Search, Handshake, ShieldCheck, TrendingDown, ArrowUp, Layers, ChevronDown, X } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { Card } from "../../design-system/Card";
import { IconButton } from "../../design-system/Button";
import { IconTile } from "../../design-system/IconTile";

const EXAMPLES = [
  { Icon: Search, title: "Ask about a contract", desc: "Query terms, rates, and amendments across the portfolio", to: "chat" },
  { Icon: Handshake, title: "Review a renewal", desc: "Open a data-backed brief for an expiring contract", to: "negotiation" },
  { Icon: ShieldCheck, title: "Audit an invoice", desc: "Check a bill against its governing contract terms", to: "invoices" },
];

const GLANCE = [
  { to: "invoices", Icon: TrendingDown, label: "Invoice savings", big: "$248,310", sub: "37 invoices flagged this month" },
  { to: "negotiation", Icon: Handshake, label: "Renewals in 90 days", big: "3", sub: "$612K estimated leverage" },
  { to: "contracts", Icon: ShieldCheck, label: "Portfolio health", big: "84%", sub: "average CES completeness" },
];

export default function HomeScreen({ go }) {
  const [draft, setDraft] = useState("");
  const [showExamples, setShowExamples] = useState(true);

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", fontFamily: fonts.body, background: F.canvas }}>
      <div style={{ maxWidth: 980, width: "100%", margin: "0 auto", padding: "44px 8px 64px" }}>
        {/* greeting — Ferndesk serif, left-aligned */}
        <div style={{ marginBottom: 26 }}>
          <h1 style={{ fontFamily: fonts.display, fontSize: 34, fontWeight: 600, color: F.ink, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
            Good morning, Dana <span style={{ fontFamily: fonts.body }}>👋</span>
          </h1>
          <p style={{ fontSize: 15.5, color: F.ink3, margin: 0 }}>
            You cleared <span style={{ color: F.ink, fontWeight: 600 }}>28 invoices</span> and caught{" "}
            <span style={{ color: F.ink, fontWeight: 600 }}>$248K</span> in leakage this month.
          </p>
        </div>

        {/* command input */}
        <div
          style={{
            background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: "14px 14px 12px 18px",
            boxShadow: "0 1px 2px rgba(26,26,26,.04), 0 6px 20px -12px rgba(26,26,26,.08)", maxWidth: 760,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={1}
              placeholder="Ask anything about your contracts…"
              aria-label="Ask Ledger Gate"
              style={{
                flex: 1, border: "none", outline: "none", resize: "none", fontFamily: fonts.body,
                fontSize: 16, color: F.ink, lineHeight: 1.5, background: "transparent", padding: "4px 0", maxHeight: 140,
              }}
            />
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: F.ink4, flexShrink: 0 }}>⌘N</span>
            <IconButton Icon={ArrowUp} variant="solid" shape="circle" size={34} ariaLabel="Send" onClick={() => go("chat")} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${F.lineSoft}` }}>
            <button
              className="clm-press"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 10px",
                borderRadius: F.rSm, border: `1px solid ${F.line}`, background: F.surface, color: F.ink2,
                fontFamily: fonts.body, fontSize: 12.5, fontWeight: 500, cursor: "pointer",
              }}
            >
              <Layers size={13} color={F.ink3} /> Skills <ChevronDown size={12} color={F.ink4} />
            </button>
          </div>
        </div>

        {/* examples */}
        {showExamples && (
          <div style={{ marginTop: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 11.5, color: F.ink4, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Get started</span>
              <IconButton Icon={X} variant="plain" size={24} ariaLabel="Dismiss examples" onClick={() => setShowExamples(false)} />
            </div>
            <div className="clm-grid-3">
              {EXAMPLES.map((ex) => (
                <Card
                  key={ex.title}
                  as="button"
                  interactive
                  padding={18}
                  onClick={() => go(ex.to)}
                  style={{
                    textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, minHeight: 138,
                    backgroundImage: `linear-gradient(180deg, ${F.hover} 0%, ${F.surface} 46%)`,
                  }}
                >
                  <IconTile Icon={ex.Icon} size={34} bordered fg={F.ink2} />
                  <div style={{ marginTop: "auto" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: F.ink, marginBottom: 5 }}>{ex.title}</div>
                    <div style={{ fontSize: 13, color: F.ink3, lineHeight: 1.45 }}>{ex.desc}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* at a glance — quiet context row */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 11.5, color: F.ink4, fontWeight: 600, marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>At a glance</div>
          <div className="clm-grid-3">
            {GLANCE.map((g) => (
              <Card
                key={g.to}
                as="button"
                interactive
                padding={18}
                onClick={() => go(g.to)}
                style={{ textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5, color: F.ink3, fontWeight: 500 }}>{g.label}</span>
                  <g.Icon size={15} color={F.ink4} strokeWidth={2} />
                </div>
                <div className="num" style={{ fontSize: 28, fontWeight: 600, color: F.ink, lineHeight: 1, letterSpacing: "-0.01em" }}>{g.big}</div>
                <div style={{ fontSize: 12.5, color: F.ink3 }}>{g.sub}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
