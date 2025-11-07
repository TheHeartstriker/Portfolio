"use client";
import { useEffect } from "react";

/* -------------------------------------------------
   1. Mobile detection (SSR-safe)
   ------------------------------------------------- */
export function isMobile() {
  return (
    typeof window !== "undefined" &&
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
}

/* -------------------------------------------------
   2. The *real* viewport-unit polyfill
   ------------------------------------------------- */
export function useViewportUnits() {
  useEffect(() => {
    // ---- the actual updater -------------------------------------------------
    const update = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);
    };

    // ---- run once on mount --------------------------------------------------
    update();

    // ---- orientation change (portrait ↔ landscape) ---------------------------
    const onOrientation = () => update();
    window.addEventListener("orientationchange", onOrientation);

    // ---- visualViewport – the *only* reliable source ------------------------
    const vv = window.visualViewport;
    if (vv) {
      const onVV = () => update();
      vv.addEventListener("resize", onVV);
      vv.addEventListener("scroll", onVV); // helps PWAs & web-views

      return () => {
        vv.removeEventListener("resize", onVV);
        vv.removeEventListener("scroll", onVV);
        window.removeEventListener("orientationchange", onOrientation);
      };
    }

    // ---- fallback for browsers without visualViewport (very old Android) ---
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
    };
  }, []);
}

/* -------------------------------------------------
   3. Optional component wrapper (if you like JSX)
   ------------------------------------------------- */
export function MobileViewport() {
  useViewportUnits();
  return null;
}
