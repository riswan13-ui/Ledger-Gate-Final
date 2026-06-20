import React from "react";
import { GitBranch, FileText, ExternalLink, Sparkles } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { IconTile } from "../../design-system/IconTile";

export function AgentAvatar() {
  return <IconTile Icon={Sparkles} size={30} radius={8} bg={F.chip} fg={F.ink2} strokeWidth={2} />;
}

export default function Message({ m, onCite }) {
  if (m.role === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: "78%", background: F.ink, color: "#fff", padding: "11px 16px", borderRadius: 14, fontFamily: fonts.body, fontSize: 14.5, lineHeight: 1.5 }}>
          {m.text}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <AgentAvatar />
      <div style={{ maxWidth: "82%" }}>
        <div style={{ background: F.paper, border: `1px solid ${F.line}`, padding: "14px 16px", borderRadius: 14 }}>
          <p style={{ fontFamily: fonts.body, fontSize: 14.5, color: F.ink, lineHeight: 1.6, margin: 0 }}>{m.text}</p>
          {m.amended && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, padding: "4px 10px", background: F.chip, borderRadius: 999, color: F.ink2, fontFamily: fonts.body, fontSize: 12, fontWeight: 600 }}>
              <GitBranch size={13} strokeWidth={2.2} /> Reflects an amendment
            </div>
          )}
        </div>
        {m.citations && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            {m.citations.map((c, i) => (
              <button
                key={i}
                onClick={() => onCite(c)}
                className="clm-linear-card"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 11px", borderRadius: F.rSm, background: F.surface, border: `1px solid ${F.line}`, cursor: "pointer", fontFamily: fonts.body, fontSize: 12.5, color: F.ink2 }}
              >
                <FileText size={13} color={F.ink3} />
                <span style={{ fontWeight: 600, color: F.ink }}>{c.doc}</span>
                <span style={{ color: F.ink3 }}>· {c.section}</span>
                <ExternalLink size={12} color={F.ink4} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
