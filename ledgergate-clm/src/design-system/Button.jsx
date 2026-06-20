import React from "react";
import { Loader } from "lucide-react";
import { tokens as F } from "./tokens";
import { fonts } from "./tokens";

/* ------------------------------------------------------------------ *
 * Button — every labelled action in the product (primary CTAs, form
 * submits, table toolbar actions, dialog confirm/cancel, AP decisions)
 * goes through this one component. It previously had at least four
 * independent implementations (ActionBtn, SoftConnectButton, the
 * trial-banner "Upgrade now" button, the auth submit button, etc.)
 * that each defined the same idea slightly differently. Now there's
 * one place that decides what a button looks like.
 *
 * variant: "solid" | "outline" | "ghost" | "plain"
 * tone:    "ink" (default/black) | "amber" | "green" | "red"
 * size:    "sm" | "md" | "lg"
 * ------------------------------------------------------------------ */
const TONE_COLOR = {
  ink: F.ink,
  amber: F.amber,
  green: F.greenInk,
  red: F.red,
};

const SIZE = {
  sm: { padding: "7px 14px", fontSize: 13, gap: 6 },
  md: { padding: "10px 16px", fontSize: 13.5, gap: 7 },
  lg: { padding: "12px 18px", fontSize: 14.5, gap: 8 },
};

export function Button({
  children,
  Icon,
  iconPosition = "left",
  variant = "solid",
  tone = "ink",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const color = TONE_COLOR[tone] || TONE_COLOR.ink;
  const sz = SIZE[size] || SIZE.md;

  let visual;
  if (variant === "solid") {
    visual = { background: color, color: "#fff", border: "none" };
  } else if (variant === "outline") {
    visual = { background: F.surface, color: tone === "ink" ? F.ink2 : color, border: `1px solid ${tone === "ink" ? F.line : color + "55"}` };
  } else if (variant === "ghost") {
    visual = { background: "transparent", color: tone === "ink" ? F.ink2 : color, border: `1px solid ${F.line}` };
  } else {
    // plain — text-only, no border/background (links, "Cancel", "Clear all")
    visual = { background: "none", color: tone === "ink" ? F.ink2 : color, border: "none" };
  }

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className="clm-press"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: sz.gap,
        width: fullWidth ? "100%" : undefined,
        padding: variant === "plain" ? 0 : sz.padding,
        borderRadius: F.rSm,
        fontFamily: fonts.body,
        fontSize: sz.fontSize,
        fontWeight: 600,
        cursor: isDisabled ? "default" : "pointer",
        opacity: isDisabled && !loading ? 0.55 : 1,
        whiteSpace: "nowrap",
        ...visual,
        ...style,
      }}
      {...rest}
    >
      {loading && <Loader size={sz.fontSize + 2} className="clm-spin" />}
      {!loading && Icon && iconPosition === "left" && <Icon size={sz.fontSize + 2.5} strokeWidth={2.3} />}
      {children}
      {!loading && Icon && iconPosition === "right" && <Icon size={sz.fontSize + 2.5} strokeWidth={2.3} />}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * IconButton — the square icon-only button (hamburger, dismiss "X",
 * notification bell, pagination chevrons, drawer close). This single
 * shape appeared more than a dozen times in the original file with
 * near-identical but not quite matching dimensions; now it's one
 * component with a `size` prop.
 * ------------------------------------------------------------------ */
export function IconButton({
  Icon,
  size = 34,
  variant = "outline", // "outline" | "plain" | "solid"
  tone = "ink",
  shape = "square", // "square" | "circle"
  ariaLabel,
  onClick,
  disabled = false,
  className = "",
  style,
  children,
}) {
  const color = TONE_COLOR[tone] || TONE_COLOR.ink;
  let visual;
  if (variant === "solid") {
    visual = { border: "none", background: disabled ? F.line : color };
  } else if (variant === "outline") {
    visual = { border: `1px solid ${F.line}`, background: F.surface };
  } else {
    visual = { border: "none", background: "transparent" };
  }
  const iconColor = variant === "solid" ? "#fff" : tone === "ink" ? F.ink2 : color;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`clm-press ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: shape === "circle" ? 999 : F.rSm,
        display: "grid",
        placeItems: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled && variant !== "solid" ? 0.45 : 1,
        flexShrink: 0,
        ...visual,
        ...style,
      }}
    >
      {Icon ? <Icon size={Math.round(size * 0.46)} color={iconColor} strokeWidth={variant === "solid" ? 2.3 : 2} /> : children}
    </button>
  );
}

export default Button;
