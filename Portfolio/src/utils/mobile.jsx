"use client";
import { useEffect } from "react";

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
function Mobile() {
  function setStaticViewportHeight() {
    // Use visualViewport for accurate mobile viewport dimensions
    const viewport = window.visualViewport || window;
    const vh = viewport.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const vw = viewport.width * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }

  useEffect(() => {
    if (isMobile()) {
      setStaticViewportHeight();

      // Update on resize/orientation change
      window.visualViewport?.addEventListener(
        "resize",
        setStaticViewportHeight
      );

      return () => {
        window.visualViewport?.removeEventListener(
          "resize",
          setStaticViewportHeight
        );
      };
    }
  }, []);
}
export default Mobile;
