"use client";
import { useEffect } from "react";

export default function Mobile() {
  useEffect(() => {
    // 1. Only run on mobile
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile || typeof window === "undefined") return;

    let done = false;

    const lockFullHeight = () => {
      if (done) return;

      // 2. Force address bar to hide
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
      }

      // 3. Wait for UI to settle (300ms works best in Google App)
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;

        document.documentElement.style.setProperty("--vh", `${vh}px`);
        document.documentElement.style.setProperty("--vw", `${vw}px`);

        done = true;

        // 4. Smooth scroll back to top (optional, but clean)
        if (window.scrollY !== 0) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 300);
    };

    // 5. Run after first paint
    requestAnimationFrame(lockFullHeight);

    // 6. Fallback in case RAF fails (e.g. background tab)
    const fallback = setTimeout(lockFullHeight, 1000);

    return () => {
      clearTimeout(fallback);
    };
  }, []);

  return null;
}
