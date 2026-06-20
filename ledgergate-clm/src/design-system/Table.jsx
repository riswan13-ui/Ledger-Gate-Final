import React from "react";
import { ArrowUpDown } from "lucide-react";
import { tokens as F, fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * SortableTh — a clickable column header with a sort indicator.
 *
 * The original file had two implementations of this: SoftTh on the
 * Contracts table (sans-serif, normal case) and a locally-defined `Th`
 * inside InvoiceQueue (monospace, uppercase, tracked). Both tables sit
 * one click apart in the product, so the mismatch was easy to spot.
 * This version standardizes on the Contracts treatment and leaves sort
 * *direction* logic to the screen (passed in via `onClick`) since that
 * default reasonably differs by column — e.g. a date column wants to
 * default to "newest first" where a name column wants A→Z.
 * ------------------------------------------------------------------ */
export function SortableTh({ label, sortKey, sort, onClick, align = "left" }) {
  const active = sort.key === sortKey;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: fonts.body,
        fontSize: 13,
        fontWeight: active ? 600 : 500,
        color: active ? F.ink : F.ink3,
        padding: 0,
        width: align === "right" ? "100%" : undefined,
        justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}
    >
      {label} {active && <ArrowUpDown size={12} />}
    </button>
  );
}

/* Th — a non-sortable column label, same type scale as SortableTh. */
export function Th({ children }) {
  return <span style={{ fontFamily: fonts.body, fontSize: 13, color: F.ink3, fontWeight: 500 }}>{children}</span>;
}
