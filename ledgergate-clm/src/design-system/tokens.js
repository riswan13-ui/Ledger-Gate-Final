/* ------------------------------------------------------------------ *
 * Design tokens — the "Ferndesk" system.
 *
 * This is the ONLY place color, radius, and font values are defined.
 * Every component in /design-system and every screen in /screens reads
 * from this file (directly, or through a component that reads from it).
 * Change a value here and every screen that uses it updates together.
 *
 * Palette: warm near-white canvas, hairline borders, black primary
 * action, green accent for status/badges, serif display for headings.
 * ------------------------------------------------------------------ */

export const tokens = {
  // ---- ink / text ----
  ink: "#1A1A1A",   // primary text + black actions
  ink2: "#5C5C5A",  // secondary text
  ink3: "#8C8C88",  // muted / captions / labels
  ink4: "#B5B5B0",  // faintest text / disabled

  // ---- surfaces ----
  paper: "#FFFFFF",  // main content background
  canvas: "#F7F7F5", // sidebar / app chrome zone
  surface: "#FFFFFF",
  line: "#E8E8E4",     // hairline border
  lineSoft: "#F0F0EC", // softest divider
  hover: "#F5F5F2",    // row / item hover
  chip: "#F1F1EE",     // neutral chip background

  // ---- green accent (status, badges, primary toggle) ----
  green: "#4F9D34",
  greenSoft: "#E9F4E2",
  greenInk: "#3C7A28",

  // ---- signal colors (always paired with icon + text, never color-only) ----
  amber: "#9A6B12",
  amberSoft: "#FAF1DE",
  red: "#B23A2E",
  redSoft: "#F8E9E6",
  blue: "#2D6CDF",     // "syncing" / in-progress state
  blueSoft: "#E8F0FD",

  // ---- radii ----
  r: 12,
  rSm: 8,
  rXs: 6,

  // ---- brand tints for connector glyph tiles ----
  brand: {
    Ironclad: { fg: "#3B6FE0", bg: "#EDF2FD" },
    SpotDraft: { fg: "#7A52E0", bg: "#F0ECFB" },
    DocuSign: { fg: "#B8870F", bg: "#FAF3E2" },
    Coupa: { fg: "#2E8A5C", bg: "#E9F5EF" },
    "SAP Ariba": { fg: "#2173B0", bg: "#E8F1F9" },
    NetSuite: { fg: "#C0453A", bg: "#FAECEA" },
    "SAP S/4HANA": { fg: "#2173B0", bg: "#E8F1F9" },
    "Sage Intacct": { fg: "#2C8158", bg: "#E9F4EE" },
    "Dynamics 365": { fg: "#6A42C8", bg: "#EFEAFB" },
    SharePoint: { fg: "#2A7E84", bg: "#E6F3F4" },
    "Google Drive": { fg: "#2E9D58", bg: "#E9F6EE" },
  },
};

export const fonts = {
  display: "'Lora', Georgia, 'Times New Roman', serif", // serif — page headings only
  body: "'Inter', ui-sans-serif, system-ui, sans-serif", // everything else
  mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', monospace", // numbers, ids
};

/* Semantic color groups used by Badge / StatusDot so every "state" in the
 * product (verdicts, connector health, negotiation posture) draws from the
 * same handful of meanings instead of each screen inventing its own. */
export const semantic = {
  positive: { c: tokens.greenInk, bg: tokens.greenSoft, dot: tokens.green },
  caution: { c: tokens.amber, bg: tokens.amberSoft, dot: tokens.amber },
  negative: { c: tokens.red, bg: tokens.redSoft, dot: tokens.red },
  inProgress: { c: tokens.blue, bg: tokens.blueSoft, dot: tokens.blue },
  neutral: { c: tokens.ink3, bg: tokens.chip, dot: tokens.ink4 },
};

export default tokens;
