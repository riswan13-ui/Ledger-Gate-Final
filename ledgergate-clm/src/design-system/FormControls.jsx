import React from "react";
import { ChevronDown, Check } from "lucide-react";
import { tokens as F, fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * Select — a native <select> styled to match the rest of the system.
 * `variant="compact"` is the smaller treatment used inside the filter
 * popover (FilterField below); the default is the toolbar-level select
 * (e.g. the vendor filter on Invoices).
 * ------------------------------------------------------------------ */
export function Select({ value, onChange, options, variant = "default", ariaLabel }) {
  const compact = variant === "compact";
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          width: compact ? "100%" : undefined,
          padding: compact ? "9px 30px 9px 12px" : "10px 34px 10px 14px",
          border: `1px solid ${F.line}`,
          borderRadius: compact ? F.rXs : F.rSm,
          fontFamily: fonts.body,
          fontSize: 13.5,
          color: compact ? F.ink : F.ink2,
          background: F.surface,
          cursor: "pointer",
          outline: "none",
          fontWeight: 500,
        }}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        size={compact ? 14 : 15}
        color={F.ink4}
        style={{ position: "absolute", right: compact ? 10 : 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      />
    </div>
  );
}

/* FilterField — a labeled Select, stacked inside a filter popover. */
export function FilterField({ label, value, onChange, options, last = false }) {
  return (
    <div style={{ marginBottom: last ? 0 : 14 }}>
      <div style={{ fontSize: 12, color: F.ink3, fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <Select value={value} onChange={onChange} options={options} variant="compact" ariaLabel={label} />
    </div>
  );
}

/* Checkbox — custom checkbox used for table row selection. */
export function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="clm-press"
      style={{
        width: 19,
        height: 19,
        borderRadius: 6,
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        border: `1.5px solid ${checked ? F.ink : "#CFCFD4"}`,
        background: checked ? F.ink : "#fff",
        padding: 0,
        flexShrink: 0,
      }}
    >
      {checked && <Check size={13} color="#fff" strokeWidth={3} />}
    </button>
  );
}

/* Toggle — on/off switch (notification preferences). */
export function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className="clm-press"
      style={{
        width: 46,
        height: 27,
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        padding: 3,
        background: on ? F.ink : F.line,
        display: "flex",
        justifyContent: on ? "flex-end" : "flex-start",
        transition: "background .2s",
        flexShrink: 0,
      }}
    >
      <span style={{ width: 21, height: 21, borderRadius: 999, background: "#fff" }} />
    </button>
  );
}

/* TextField — labeled text input with a leading icon and optional
 * trailing element (used for the show/hide-password toggle). */
export function TextField({ label, Icon, value, onChange, placeholder, type = "text", suffix }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: F.ink2, marginBottom: 7 }}>{label}</label>}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          border: `1px solid ${F.line}`,
          borderRadius: F.rSm,
          padding: "0 12px",
          background: F.surface,
          height: 44,
        }}
      >
        {Icon && <Icon size={16} color={F.ink3} style={{ flexShrink: 0 }} />}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: fonts.body,
            fontSize: 14.5,
            color: F.ink,
            height: "100%",
            minWidth: 0,
          }}
        />
        {suffix}
      </div>
    </div>
  );
}
