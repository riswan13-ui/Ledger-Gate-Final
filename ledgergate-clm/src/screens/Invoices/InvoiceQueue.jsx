import React, { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { ScreenHeader } from "../../design-system/ScreenHeader";
import { Select } from "../../design-system/FormControls";
import { VerdictBadge } from "../../design-system/Badge";
import { SortableTh } from "../../design-system/Table";
import { Card } from "../../design-system/Card";
import { INVOICES } from "../../data/invoices";
import { fmtFullMoney } from "../../utils/format";
import { useViewport } from "../../hooks";

const VERDICT_COLOR = { Cleared: F.green, Flagged: F.amber, Rejected: F.red, Pending: F.ink3 };
const GRID = "1fr 1.2fr 1fr 1fr 1.4fr 0.5fr";

export default function InvoiceQueue({ onOpen }) {
  const bp = useViewport();
  const isMobile = bp === "mobile";
  const [status, setStatus] = useState("All");
  const [vendor, setVendor] = useState("All vendors");
  const [sort, setSort] = useState({ key: "date", dir: "desc" });

  const vendors = useMemo(() => ["All vendors", ...Array.from(new Set(INVOICES.map((i) => i.vendor)))], []);
  const tabs = ["All", "Cleared", "Flagged", "Rejected", "Pending"];
  const tabCounts = useMemo(() => {
    const c = { All: INVOICES.length };
    for (const t of ["Cleared", "Flagged", "Rejected", "Pending"]) c[t] = INVOICES.filter((i) => i.verdict === t).length;
    return c;
  }, []);

  const rows = useMemo(() => {
    let r = INVOICES.filter((i) => (status === "All" || i.verdict === status) && (vendor === "All vendors" || i.vendor === vendor));
    r = [...r].sort((a, b) => {
      const d = sort.dir === "asc" ? 1 : -1;
      if (sort.key === "amount") return (a.amount - b.amount) * d;
      if (sort.key === "vendor") return a.vendor.localeCompare(b.vendor) * d;
      if (sort.key === "id") return a.id.localeCompare(b.id) * d;
      return a.date.localeCompare(b.date) * d;
    });
    return r;
  }, [status, vendor, sort]);

  // Invoices defaults to "most recent first" on a fresh column click — the
  // mirror image of the Contracts table, which defaults to ascending. Both
  // tables render the header with the same SortableTh component; only this
  // default direction is screen-specific.
  const toggleSort = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }));

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "8px 4px 64px" }}>
      <ScreenHeader
        eyebrow="AP Manager · Compliance queue"
        title="Invoices"
        desc="Every invoice is audited against its governing contract before payment. Open any row for the full report — which checks ran, what failed, and the contracted-versus-billed delta."
      />

      {/* verdict tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map((t) => {
          const active = status === t;
          return (
            <button
              key={t}
              onClick={() => setStatus(t)}
              className="clm-press"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: F.rSm,
                border: `1px solid ${active ? F.ink : F.line}`, background: active ? F.ink : F.surface,
                color: active ? "#fff" : F.ink2, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              {t !== "All" && <span style={{ width: 7, height: 7, borderRadius: 999, background: VERDICT_COLOR[t] }} />}
              {t}
              <span className="num" style={{ fontSize: 12, opacity: 0.7 }}>{tabCounts[t]}</span>
            </button>
          );
        })}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Select value={vendor} onChange={setVendor} options={vendors} ariaLabel="Filter by vendor" />
        </div>
      </div>

      <Card padding={0} style={{ overflow: "hidden" }}>
        {!isMobile && (
          <div style={{ display: "grid", gridTemplateColumns: GRID, gap: 12, padding: "13px 20px", borderBottom: `1px solid ${F.line}`, background: F.paper, alignItems: "center" }}>
            <SortableTh label="Invoice" sortKey="id" sort={sort} onClick={() => toggleSort("id")} />
            <SortableTh label="Vendor" sortKey="vendor" sort={sort} onClick={() => toggleSort("vendor")} />
            <SortableTh label="Amount" sortKey="amount" sort={sort} onClick={() => toggleSort("amount")} align="right" />
            <SortableTh label="Received" sortKey="date" sort={sort} onClick={() => toggleSort("date")} />
            <span style={{ fontFamily: fonts.body, fontSize: 13, color: F.ink3, fontWeight: 500 }}>Verdict</span>
            <span />
          </div>
        )}

        {rows.map((inv, i) => {
          if (isMobile) {
            return (
              <button
                key={inv.id}
                onClick={() => onOpen(inv)}
                className="clm-row"
                style={{ width: "100%", textAlign: "left", display: "flex", flexDirection: "column", gap: 8, padding: "14px 16px", cursor: "pointer", border: "none", background: "transparent", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${F.lineSoft}` }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div className="num" style={{ fontSize: 13.5, fontWeight: 600, color: F.ink }}>{inv.id}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 13.5, color: F.ink2, fontWeight: 500, marginTop: 1 }}>{inv.vendor}</div>
                  </div>
                  <VerdictBadge state={inv.verdict} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="num" style={{ fontSize: 13, color: F.ink3 }}>{inv.date}</span>
                  <span className="num" style={{ fontSize: 14.5, color: F.ink, fontWeight: 600 }}>{fmtFullMoney(inv.amount)}</span>
                </div>
                {inv.failed > 0 && <span style={{ fontFamily: fonts.body, fontSize: 12, color: F.ink3 }}>{inv.failed} of {inv.checks} checks failed</span>}
              </button>
            );
          }
          return (
            <button
              key={inv.id}
              onClick={() => onOpen(inv)}
              className="clm-row"
              style={{ width: "100%", textAlign: "left", display: "grid", gridTemplateColumns: GRID, gap: 12, padding: "15px 20px", alignItems: "center", cursor: "pointer", border: "none", background: "transparent", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${F.lineSoft}` }}
            >
              <div className="num" style={{ fontSize: 13.5, fontWeight: 600, color: F.ink }}>{inv.id}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 14, color: F.ink2, fontWeight: 500 }}>{inv.vendor}</div>
              <div className="num" style={{ fontSize: 14, color: F.ink, fontWeight: 600, textAlign: "right" }}>{fmtFullMoney(inv.amount)}</div>
              <div className="num" style={{ fontSize: 13, color: F.ink3 }}>{inv.date}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <VerdictBadge state={inv.verdict} />
                {inv.failed > 0 && <span style={{ fontFamily: fonts.body, fontSize: 12, color: F.ink3 }}>{inv.failed} of {inv.checks} failed</span>}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}><ChevronRight size={18} color={F.ink3} /></div>
            </button>
          );
        })}
        {rows.length === 0 && (
          <div style={{ padding: "48px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: fonts.body, fontSize: 15, color: F.ink2, fontWeight: 600 }}>No invoices in this view</div>
            <div style={{ fontFamily: fonts.body, fontSize: 13.5, color: F.ink3, marginTop: 6 }}>Switch the verdict tab or change the vendor filter.</div>
          </div>
        )}
      </Card>
    </div>
  );
}
