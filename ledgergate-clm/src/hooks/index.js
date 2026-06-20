import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ *
 * useViewport — responsive breakpoints shared across the whole app.
 * mobile  < 640   tablet 640–1023   desktop >= 1024
 * ------------------------------------------------------------------ */
export function useViewport() {
  const get = () => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const onResize = () => setBp(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return bp; // "mobile" | "tablet" | "desktop"
}

/* ------------------------------------------------------------------ *
 * useEscapeKey — every overlay (ConfirmDialog, Drawer, NotificationsPanel)
 * needs "Escape closes me". Previously this listener was copy-pasted in
 * three places; now there's one implementation to get right.
 * ------------------------------------------------------------------ */
export function useEscapeKey(onEscape) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onEscape();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEscape]);
}
