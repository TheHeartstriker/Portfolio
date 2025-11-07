"use client";
import { useEffect } from "react";

// Detect mobile (good for SSR fallback or analytics)
export function isMobile() {
  return (
    typeof window !== "undefined" &&
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
}

// Reusable hook (better than component)
export function useViewportUnits() {
  useEffect(() => {
    // Updates viewport units
    const updateUnits = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);
    };
    updateUnits();

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener("resize", updateUnits);
      visualViewport.addEventListener("orientationchange", updateUnits);
    }
    return () => {
      if (visualViewport) {
        visualViewport.removeEventListener("resize", updateUnits);
        visualViewport.removeEventListener("orientationchange", updateUnits);
      }
    };
  }, []);
}

// Optional: Component wrapper (if you prefer component over hook)
export function MobileViewport() {
  useViewportUnits();
  return null;
}
