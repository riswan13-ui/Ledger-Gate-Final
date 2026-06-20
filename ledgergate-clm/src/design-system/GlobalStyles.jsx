import React from "react";
import { tokens as F } from "./tokens";

/* ------------------------------------------------------------------ *
 * GlobalStyles — fonts, reset, focus ring, and every shared responsive
 * utility class (.clm-*) used across screens. Mount once near the root
 * of the app (App.jsx, AuthScreen, OnboardingWizard each render it,
 * matching the original standalone entry points).
 * ------------------------------------------------------------------ */
export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      * { box-sizing: border-box; }
      .num { font-family: 'IBM Plex Mono', ui-monospace, 'SF Mono', monospace; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
      .clm-scroll::-webkit-scrollbar { width: 10px; height: 10px; }
      .clm-scroll::-webkit-scrollbar-thumb { background: #DBDBD6; border-radius: 999px; border: 3px solid ${F.paper}; }
      .clm-card-btn { transition: background .14s ease, border-color .14s ease, box-shadow .14s ease; }
      .clm-card-btn:hover { border-color: ${F.ink4}; box-shadow: 0 2px 8px -4px rgba(26,26,26,.10); }
      .clm-card-btn:hover .clm-arrow { transform: translate(2px,-2px); }
      .clm-arrow { transition: transform .16s ease; }
      .clm-row { transition: background .12s ease; }
      .clm-row:hover { background: ${F.hover}; }
      .clm-linear-card { transition: background .14s ease, border-color .14s ease; }
      .clm-linear-card:hover { background: ${F.hover}; border-color: ${F.ink4}; }
      .clm-press { transition: background .14s ease, border-color .14s ease, color .14s ease, opacity .14s ease; }
      .clm-press:hover { opacity: .88; }
      .clm-press:active { opacity: 1; }
      button:focus-visible, a:focus-visible, [tabindex]:focus-visible, textarea:focus-visible, input:focus-visible, select:focus-visible {
        outline: 2px solid ${F.ink}; outline-offset: 2px; border-radius: ${F.rXs}px;
      }
      @media (prefers-reduced-motion: reduce) {
        * { transition: none !important; animation: none !important; }
      }
      @keyframes clm-spin-kf { to { transform: rotate(360deg); } }
      .clm-spin { animation: clm-spin-kf .8s linear infinite; }
      @keyframes clmpulse { 0%, 100% { opacity: .25; } 50% { opacity: .9; } }

      /* ---------------- Responsive system ---------------- */
      /* Generic auto-fit grids used across cards/stats — collapse gracefully */
      .clm-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .clm-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .clm-grid-stat3 { display: grid; grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 900px) {
        .clm-grid-3 { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 640px) {
        .clm-grid-3, .clm-grid-2 { grid-template-columns: 1fr; }
        .clm-grid-stat3 { grid-template-columns: 1fr; }
        .clm-grid-stat3 > div { border-left: none !important; border-top: 1px solid ${F.line}; padding-top: 16px !important; padding-left: 0 !important; }
        .clm-grid-stat3 > div:first-child { border-top: none; padding-top: 8px !important; }
      }

      /* Sidebar: static on desktop, slide-over drawer on tablet/mobile */
      .clm-sidebar { position: sticky; top: 0; height: 100vh; transition: transform .22s ease; }
      @media (max-width: 1023px) {
        .clm-sidebar {
          position: fixed; top: 0; left: 0; z-index: 200; height: 100dvh;
          transform: translateX(-100%); box-shadow: 0 0 0 rgba(0,0,0,0);
        }
        .clm-sidebar.clm-open { transform: translateX(0); box-shadow: 16px 0 40px -20px rgba(26,26,26,.35); }
      }
      .clm-sidebar-scrim { display: none; }
      @media (max-width: 1023px) {
        .clm-sidebar-scrim.clm-open {
          display: block; position: fixed; inset: 0; z-index: 190; background: rgba(26,26,26,.28);
        }
      }
      .clm-hamburger { display: none; }
      @media (max-width: 1023px) {
        .clm-hamburger { display: inline-flex; }
      }

      /* Top bar: hide the search field on very small screens, keep icon */
      .clm-topbar-search-text { display: block; }
      @media (max-width: 480px) {
        .clm-topbar-search-text { display: none; }
      }

      /* Table -> stacked cards on mobile */
      .clm-table-head { display: grid; }
      @media (max-width: 760px) {
        .clm-table-head { display: none; }
        .clm-table-row { display: flex !important; flex-direction: column; gap: 8px !important; }
      }

      /* Two-column detail layouts collapse to one column */
      .clm-detail-2col { display: grid; gap: 14px; }
      @media (max-width: 900px) {
        .clm-detail-2col { grid-template-columns: 1fr !important; }
      }

      /* Chat: history sidebar collapses on mobile */
      @media (max-width: 760px) {
        .clm-chat-history { display: none !important; }
        .clm-chat-pad { padding-left: 14px !important; padding-right: 14px !important; }
      }

      /* Renewal list rows: 4-col grid on desktop, stacked on small screens */
      @media (max-width: 760px) {
        .clm-renewal-row { grid-template-columns: 1fr !important; gap: 12px !important; }
        .clm-renewal-row > div:last-child { justify-self: start !important; justify-content: space-between; width: 100%; }
      }

      /* Generic responsive padding for main content */
      .clm-main-pad { padding: 28px 32px; }
      @media (max-width: 760px) {
        .clm-main-pad { padding: 18px 16px; }
      }
    `}</style>
  );
}
