import React from "react";
import { FileText } from "lucide-react";
import { tokens as F } from "../../design-system/tokens";
import { Drawer } from "../../design-system/Overlay";
import { Eyebrow } from "../../design-system/ScreenHeader";

export default function SourceDrawer({ cite, onClose }) {
  return (
    <Drawer title={cite.doc} subtitle={cite.section} Icon={FileText} onClose={onClose} zIndex={900}>
      <Eyebrow>Cited clause</Eyebrow>
      <div style={{ marginTop: 14, padding: 18, background: F.chip + "55", border: `1px solid ${F.ink}33`, borderLeft: `3px solid ${F.ink}`, borderRadius: F.rSm }}>
        <div style={{ fontFamily: "inherit", fontSize: 14, color: F.ink, lineHeight: 1.65 }}>
          {cite.section} — Payment shall be due net thirty (30) days from invoice date. A discount of two percent (2%) applies to amounts paid within ten (10) days of receipt. This section supersedes the corresponding term in the original Master Services Agreement.
        </div>
      </div>
      <div style={{ marginTop: 18, fontSize: 13, color: F.ink3, lineHeight: 1.6 }}>
        The surrounding document continues here. In the full product, the drawer scrolls the executed PDF to this exact section with the cited language highlighted, so the AP or Legal Ops user verifies the answer against the source.
      </div>
    </Drawer>
  );
}
