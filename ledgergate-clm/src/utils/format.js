/* ------------------------------------------------------------------ *
 * Formatting helpers shared by every screen that displays currency.
 * ------------------------------------------------------------------ */

export const fmtMoney = (n) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`;

export const fmtFullMoney = (n) => "$" + n.toLocaleString("en-US");

export const fmtLeverage = (n) => (n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`);
