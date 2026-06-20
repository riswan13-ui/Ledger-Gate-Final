import React, { useState } from "react";
import { tokens as F } from "../design-system/tokens";
import { Drawer } from "../design-system/Overlay";
import { Button } from "../design-system/Button";
import { IconTile } from "../design-system/IconTile";
import { NOTIFS } from "../data/notifications";

const ROUTE_FOR_KIND = { finding: "invoices", expiry: "negotiation", conflict: "contracts", sync: "connectors" };

export default function NotificationsPanel({ onClose, go }) {
  const [items, setItems] = useState(NOTIFS);
  const markAll = () => setItems((xs) => xs.map((x) => ({ ...x, unread: false })));

  return (
    <Drawer
      title="Notifications"
      onClose={onClose}
      width="min(420px, 94vw)"
      scrimColor="26,26,26"
      scrimOpacity={0.18}
      closeSize={30}
      headerExtra={
        <Button variant="plain" size="sm" onClick={markAll} style={{ fontSize: 12.5 }}>
          Mark all read
        </Button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((n) => (
          <button
            key={n.id}
            onClick={() => {
              onClose();
              const r = ROUTE_FOR_KIND[n.kind];
              if (r) go(r);
            }}
            className="clm-row"
            style={{
              width: "100%", textAlign: "left", display: "flex", gap: 12, padding: "13px 12px", borderRadius: F.rSm, border: "none",
              background: n.unread ? F.hover : "transparent", cursor: "pointer",
            }}
          >
            <IconTile Icon={n.Icon} size={34} radius={F.rXs} bg={n.bg} fg={n.c} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: F.ink }}>{n.title}</span>
                {n.unread && <span style={{ width: 6, height: 6, borderRadius: 999, background: F.green, flexShrink: 0 }} />}
              </div>
              <div style={{ fontSize: 13, color: F.ink3, lineHeight: 1.45, marginTop: 2 }}>{n.body}</div>
              <div style={{ fontSize: 11.5, color: F.ink4, marginTop: 5 }}>{n.when}</div>
            </div>
          </button>
        ))}
      </div>
    </Drawer>
  );
}
