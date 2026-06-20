# Ledger Gate — Contract & Invoice Compliance UI

A responsive React UI for Ledger Gate: a contract-lifecycle and invoice-compliance
product. Built on the **Ferndesk** design system — a warm near-white canvas,
hairline borders, a black primary action color, a green status accent, and a
serif display face reserved for page-level headings.

This codebase was restructured from a single 3,000-line `.jsx` file into a real
design system + screen architecture. See [Design system](#design-system) below
for what that means in practice and what it fixed.

## Quick start

```bash
npm install
npm run dev       # starts Vite on http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

Requires Node 18+.

## Project structure

```
src/
  design-system/      ← the single source of truth for every visual primitive
    tokens.js          — colors, radii, fonts (the ONLY place these are defined)
    semantic tones      (positive/caution/negative/neutral/inProgress) in tokens.js
    GlobalStyles.jsx   — fonts, reset, responsive utility classes
    Button.jsx          Badge.jsx       StatusDot.jsx     Meter.jsx
    Tag.jsx              IconTile.jsx    Avatar.jsx        Card.jsx
    Panel.jsx            Stats.jsx       FormControls.jsx  Table.jsx
    Overlay.jsx          DataViz.jsx     ScreenHeader.jsx
    index.js            — barrel export; screens import from here

  hooks/index.js        — useViewport (responsive breakpoint), useEscapeKey
  utils/format.js        — fmtMoney, fmtFullMoney, fmtLeverage

  data/                 — all mock data, separated from UI (connectors,
                            contracts, invoices, chat, negotiation, admin,
                            notifications, nav)

  layout/                — app chrome: Sidebar, TopBar, NotificationsPanel

  screens/                — one folder per product area
    Home/  Connectors/  Contracts/  Invoices/  Chat/  Negotiation/  Admin/
    Auth/  Onboarding/
    (Contracts, Invoices, Negotiation, Chat each split into a list/queue view
    + a detail view, matching how the product actually drills down)

  App.jsx                — root: auth/onboarding/app view switch, routing
  main.jsx                — ReactDOM entry point
```

## Design system

Everything visual lives in `src/design-system/`. Every screen imports these
components instead of hand-rolling badges, buttons, dots, or cards inline.
**That's what makes a change propagate automatically:** edit
`design-system/Badge.jsx` once, and every verdict badge, posture badge, and
status pill across all nine screens updates together, because they all render
through that one component.

### What the rebuild actually fixed

The original file had accumulated the classic symptom of a design system
without enforcement: the same idea got reimplemented slightly differently
each time someone needed it on a new screen. Concretely, this pass found and
fixed:

- **Two dead components.** `HealthMeter` and `TypeTag` were fully written but
  never called anywhere — every screen that needed a meter or a type tag had
  quietly started using a second, separately-defined version (`SoftMeter`,
  `SoftTypeTag`) instead. The live ones are kept, under generic names
  (`Meter`, `Tag`); the dead ones are gone.
- **A real visual bug from drift.** The connector gallery's status dot and
  the Admin → Integration Health tab's status dot were two different
  components that were each supposed to represent the same five states. They'd
  drifted: "Syncing" rendered **blue** in one and **black** in the other.
  Now there's one `StatusDot`/`HealthIndicator` pair, so that can't happen
  again.
- **Inconsistent panel headers.** The contract detail screen's panels used a
  sans-serif header; the invoice audit screen's panels (the same component,
  `Panel`) used serif. Standardized on sans-serif — serif is now reserved
  for page-level `ScreenHeader` titles only, everywhere.
- **Two sortable-table-header treatments** one click apart in the product
  (Contracts used plain sans-serif labels, Invoices had a locally-redefined
  version using tracked uppercase monospace). Unified into one `SortableTh`.
- **At least four independent button implementations** (`ActionBtn`,
  `SoftConnectButton`, the trial-banner button, the auth submit button, plus
  a dozen one-off inline buttons) collapsed into one `Button` with
  `variant` (solid/outline/ghost/plain), `tone`, and `size` props, and one
  `IconButton` for the square icon-only buttons (hamburger, dismiss ✕,
  pagination, drawer close) that appeared more than a dozen times with
  almost-but-not-quite matching dimensions.
- **Three independent "Escape closes me" keyboard listeners** (confirm
  dialog, source drawer, notifications panel) became one `useEscapeKey` hook;
  the drawer shell itself (scrim + slide-in panel + header + close button)
  became one `Drawer` component that the source-citation drawer and the
  notifications panel both render.
- **Three components for "a label above a value at some scale"** (`Meta`,
  `SummaryStat`, plus ad-hoc inline versions) became one `LabelValue` with a
  `size` prop.

None of this changed the product's visual identity — every color, radius,
and spacing value is preserved from the original. It changed how many places
you'd have to edit to change it.

### Component reference

| Component | Replaces | Used for |
|---|---|---|
| `Button`, `IconButton` | `ActionBtn`, `SoftConnectButton`, ~15 inline buttons | every labelled and icon-only action |
| `Badge`, `VerdictBadge`, `PostureBadge`, `StatusBadge` | `VerdictBadge`, `PostureBadge` (now share one base) | invoice verdicts, renewal postures, team status |
| `StatusDot`, `HealthIndicator` | `HealthDot`, `SoftHealthDot`, `SummaryInline` | connector/source health, summary counts |
| `Meter` | `SoftMeter`, dead `HealthMeter` | CES completeness bars |
| `Tag` | `SoftTypeTag`, dead `TypeTag` | contract type / category chips |
| `IconTile` | inline colored icon boxes (10+ call sites) | connector glyphs, signal icons, sidebar logo |
| `Avatar` | inline initials circles/squares (5+ call sites) | vendor initials, team initials, account menu |
| `Card`, `Panel` | inline bordered boxes, two `Panel` variants | generic surfaces; titled content sections |
| `StatPill`, `BigStat`, `LabelValue` | `StatPill`, `SoftStat`, `Meta` + `SummaryStat` | the three stat-display scales in the product |
| `Select`, `FilterField`, `Checkbox`, `Toggle`, `TextField` | `Select`, `SoftFilterField`, `SoftCheck`, `Toggle`, `AuthField` | every form control |
| `SortableTh`, `Th` | `SoftTh` + a locally-redefined `Th` in Invoices | table column headers |
| `ConfirmDialog`, `Drawer` | `ConfirmDialog`, `SourceDrawer`, `NotificationsPanel` shells | modal confirmation; slide-over panels |
| `Viz`, `BarRow`, `Legend` | inline chart shells | negotiation signal visualizations |
| `Eyebrow`, `ScreenHeader` | `Eyebrow`, `ScreenHeader` | page-level headings |

### Adding to the system

- New color or radius → add it to `tokens.js`. Never hardcode a hex value in
  a screen; import `tokens` (aliased `F` by convention) instead.
- New recurring visual pattern → before adding it inline in a screen, check
  the table above — there's a reasonable chance a primitive already covers
  it (e.g. any "colored dot + label" is `StatusDot`, any "bordered box with
  an icon header" is `Panel`).
- New primitive → add the file to `design-system/`, export it from
  `design-system/index.js`, and document it in the table above.

## Pushing to a new GitHub repository

From inside this folder:

```bash
git init
git add .
git commit -m "Initial commit: Ledger Gate UI on the Ferndesk design system"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

(Create the empty repository on GitHub first — without a README/license, so
there's nothing to merge — then run the commands above.)
