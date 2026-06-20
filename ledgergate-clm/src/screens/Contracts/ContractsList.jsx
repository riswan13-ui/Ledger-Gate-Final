import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowDownUp, X, Download, Plus, ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { Button, IconButton } from "../../design-system/Button";
import { BigStat } from "../../design-system/Stats";
import { SortableTh, Th } from "../../design-system/Table";
import { FilterField, Checkbox } from "../../design-system/FormControls";
import { Tag } from "../../design-system/Tag";
import { Meter } from "../../design-system/Meter";
import { Avatar } from "../../design-system/Avatar";
import { CONTRACTS } from "../../data/contracts";
import { fmtMoney } from "../../utils/format";
import { useViewport } from "../../hooks";

const GRID = "44px 1.6fr 0.8fr 1fr 1.1fr 1.5fr 44px";

export default function ContractsList({ onOpen }) {
  const bp = useViewport();
  const isMobile = bp === "mobile";
  const [q, setQ] = useState("");
  const [type, setType] = useState("All types");
  const [expiry, setExpiry] = useState("Any expiry");
  const [status, setStatus] = useState("Any status");
  const [sort, setSort] = useState({ key: "expiry", dir: "asc" });
  const [sel, setSel] = useState(() => new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let rows = CONTRACTS.filter((c) => {
      if (q && !c.vendor.toLowerCase().includes(q.toLowerCase())) return false;
      if (type !== "All types" && c.type !== type) return false;
      if (status !== "Any status" && c.status !== status) return false;
      if (expiry === "Next 30 days" && c.days > 30) return false;
      if (expiry === "Next 90 days" && c.days > 90) return false;
      return true;
    });
    rows = [...rows].sort((a, b) => {
      const d = sort.dir === "asc" ? 1 : -1;
      if (sort.key === "value") return (a.value - b.value) * d;
      if (sort.key === "ces") return (a.ces - b.ces) * d;
      if (sort.key === "vendor") return a.vendor.localeCompare(b.vendor) * d;
      return (a.days - b.days) * d; // expiry
    });
    return rows;
  }, [q, type, expiry, status, sort]);

  // active filter chips (removable)
  const chips = [];
  if (type !== "All types") chips.push({ k: "type", label: `Type · ${type}`, clear: () => setType("All types") });
  if (expiry !== "Any expiry") chips.push({ k: "expiry", label: `Expiry · ${expiry}`, clear: () => setExpiry("Any expiry") });
  if (status !== "Any status") chips.push({ k: "status", label: `Status · ${status}`, clear: () => setStatus("Any status") });

  const totalValue = useMemo(() => CONTRACTS.reduce((s, c) => s + c.value, 0), []);
  const expiringSoon = useMemo(() => CONTRACTS.filter((c) => c.days <= 90).length, []);
  const avgCes = useMemo(() => Math.round(CONTRACTS.reduce((s, c) => s + c.ces, 0) / CONTRACTS.length), []);

  const allSel = filtered.length > 0 && filtered.every((c) => sel.has(c.vendor));
  const toggleAll = () => setSel(allSel ? new Set() : new Set(filtered.map((c) => c.vendor)));
  const toggleOne = (v) => setSel((s) => { const n = new Set(s); n.has(v) ? n.delete(v) : n.add(v); return n; });

  const sortLabels = { expiry: "Expiry", value: "Value", vendor: "Vendor", ces: "CES completeness" };
  const cycleSort = () => {
    const order = ["expiry", "value", "vendor", "ces"];
    setSort((s) => {
      const idx = order.indexOf(s.key);
      return { key: order[(idx + 1) % order.length], dir: "asc" };
    });
  };
  const toggleSort = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "12px 4px 64px", fontFamily: fonts.body }}>
      {/* title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 4 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 600, color: F.ink, margin: 0, letterSpacing: "-0.01em" }}>Contracts</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="outline" Icon={Download}>Export</Button>
          <Button variant="solid" Icon={Plus}>Add contract</Button>
        </div>
      </div>

      {/* stat header */}
      <div className="clm-grid-stat3" style={{ borderBottom: `1px solid ${F.line}`, margin: "22px 0 8px" }}>
        <BigStat big={fmtMoney(totalValue)} label="Total contract value" />
        <BigStat big={String(expiringSoon)} label="Expiring in 90 days" divider />
        <BigStat big={`${avgCes}%`} label="Avg. CES completeness" divider />
      </div>

      {/* search + filter + sort */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 0 14px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 280px", minWidth: 200 }}>
          <Search size={17} color={F.ink4} style={{ position: "absolute", left: 2, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search vendor…"
            aria-label="Search by vendor"
            style={{ width: "100%", padding: "9px 12px 9px 28px", border: "none", borderBottom: "1px solid transparent", fontFamily: fonts.body, fontSize: 16, color: F.ink, outline: "none", background: "transparent" }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <Button variant="outline" Icon={SlidersHorizontal} onClick={() => setFilterOpen((o) => !o)}>
            Filter {chips.length > 0 && <span style={{ background: F.ink, color: "#fff", borderRadius: 999, fontSize: 11, fontWeight: 600, padding: "1px 6px" }}>{chips.length}</span>}
          </Button>
          {filterOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 30, background: "#fff", border: `1px solid ${F.line}`, borderRadius: F.r, padding: 16, width: 240, boxShadow: "0 12px 32px -12px rgba(0,0,0,.18)" }}>
              <FilterField label="Type" value={type} onChange={setType} options={["All types", "MSA", "SOW", "Order Form"]} />
              <FilterField label="Expiry" value={expiry} onChange={setExpiry} options={["Any expiry", "Next 30 days", "Next 90 days"]} />
              <FilterField label="Status" value={status} onChange={setStatus} options={["Any status", "Active", "Review"]} last />
            </div>
          )}
        </div>
        <Button variant="outline" Icon={ArrowDownUp} onClick={cycleSort}>{sortLabels[sort.key]}</Button>
      </div>

      {/* filter chips */}
      {chips.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {chips.map((ch) => (
            <span key={ch.k} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: F.chip, borderRadius: 999, padding: "6px 8px 6px 13px", fontSize: 13, color: F.ink2, fontWeight: 500 }}>
              {ch.label}
              <button onClick={ch.clear} aria-label={`Remove ${ch.label}`} className="clm-press" style={{ display: "grid", placeItems: "center", width: 18, height: 18, borderRadius: 999, border: "none", background: "rgba(0,0,0,.06)", cursor: "pointer" }}>
                <X size={12} color={F.ink2} />
              </button>
            </span>
          ))}
          <Button variant="plain" size="sm" onClick={() => { setType("All types"); setExpiry("Any expiry"); setStatus("Any status"); }}>Clear all</Button>
        </div>
      )}

      {/* bulk action bar */}
      {sel.size > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 16px", background: F.hover, border: `1px solid ${F.line}`, borderRadius: F.rSm, marginBottom: 8 }}>
          <span style={{ fontSize: 13.5, color: F.ink2, fontWeight: 600 }}>{sel.size} selected</span>
          <Button variant="plain" size="sm">Export selected</Button>
          <Button variant="plain" size="sm" tone="ink" style={{ marginLeft: "auto", color: F.ink3 }} onClick={() => setSel(new Set())}>Clear</Button>
        </div>
      )}

      {/* table / mobile cards */}
      <div>
        {!isMobile && (
          <div style={{ display: "grid", gridTemplateColumns: GRID, gap: 12, padding: "10px 12px", borderBottom: `1px solid ${F.line}`, alignItems: "center" }}>
            <Checkbox checked={allSel} onChange={toggleAll} label="Select all contracts" />
            <SortableTh label="Vendor" sortKey="vendor" sort={sort} onClick={() => toggleSort("vendor")} />
            <Th>Type</Th>
            <SortableTh label="Value" sortKey="value" sort={sort} onClick={() => toggleSort("value")} />
            <SortableTh label="Expiry" sortKey="expiry" sort={sort} onClick={() => toggleSort("expiry")} />
            <SortableTh label="CES completeness" sortKey="ces" sort={sort} onClick={() => toggleSort("ces")} />
            <span />
          </div>
        )}

        {filtered.map((c) => {
          const checked = sel.has(c.vendor);
          if (isMobile) {
            return (
              <button
                key={c.vendor}
                onClick={() => onOpen(c)}
                className="clm-row"
                style={{ width: "100%", textAlign: "left", display: "flex", flexDirection: "column", gap: 10, padding: "14px 4px", borderBottom: `1px solid ${F.lineSoft}`, border: "none", background: "transparent", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar label={c.vendor[0]} size={34} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: F.ink }}>{c.vendor}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 2 }}>
                      <Tag>{c.type}</Tag>
                      {c.status === "Review" && <span style={{ fontSize: 11.5, color: F.amber, fontWeight: 500 }}>In review</span>}
                    </div>
                  </div>
                  <ChevronRight size={18} color={F.ink4} style={{ flexShrink: 0 }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 44 }}>
                  <div className="num" style={{ fontSize: 14.5, color: F.ink, fontWeight: 600 }}>{fmtMoney(c.value)}</div>
                  <div style={{ textAlign: "right" }}>
                    <div className="num" style={{ fontSize: 13, color: F.ink2 }}>{c.expiry}</div>
                    <div style={{ fontSize: 11.5, color: c.days <= 30 ? F.red : c.days <= 90 ? F.amber : F.ink4, fontWeight: 500 }}>in {c.days} days</div>
                  </div>
                </div>
                <div style={{ paddingLeft: 44 }}><Meter value={c.ces} /></div>
              </button>
            );
          }
          return (
            <div
              key={c.vendor}
              className="clm-row"
              style={{ display: "grid", gridTemplateColumns: GRID, gap: 12, padding: "16px 12px", alignItems: "center", borderBottom: `1px solid ${F.lineSoft}`, cursor: "pointer" }}
              onClick={() => onOpen(c)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={checked} onChange={() => toggleOne(c.vendor)} label={`Select ${c.vendor}`} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <Avatar label={c.vendor[0]} size={34} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: F.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.vendor}</div>
                  {c.status === "Review" && <div style={{ fontSize: 12, color: F.amber, fontWeight: 500 }}>In review</div>}
                </div>
              </div>
              <div><Tag>{c.type}</Tag></div>
              <div className="num" style={{ fontSize: 14.5, color: F.ink, fontWeight: 500 }}>{fmtMoney(c.value)}</div>
              <div>
                <div className="num" style={{ fontSize: 14, color: F.ink2 }}>{c.expiry}</div>
                <div style={{ fontSize: 12, color: c.days <= 30 ? F.red : c.days <= 90 ? F.amber : F.ink4, fontWeight: 500 }}>in {c.days} days</div>
              </div>
              <Meter value={c.ces} />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ChevronRight size={18} color={F.ink4} />
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ padding: "64px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 15.5, color: F.ink2, fontWeight: 600 }}>No contracts match these filters</div>
            <div style={{ fontSize: 14, color: F.ink3, marginTop: 6 }}>Clear a filter or widen the expiry window to see more.</div>
          </div>
        )}
      </div>

      {/* pagination footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, color: F.ink3 }}>
          10 per page <ChevronDown size={14} />
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
          <IconButton Icon={ChevronLeft} variant="plain" ariaLabel="Previous page" disabled size={28} />
          <span className="num" style={{ fontSize: 13.5, color: F.ink2 }}>1–{filtered.length} of {filtered.length}</span>
          <IconButton Icon={ChevronRight} variant="plain" ariaLabel="Next page" disabled size={28} />
        </div>
      </div>
    </div>
  );
}
