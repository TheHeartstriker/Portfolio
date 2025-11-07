"use client";
import { useEffect } from "react";

function Mobile() {
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;

    let done = false;

    const lock = () => {
      if (done) return;
      if (window.scrollY === 0) window.scrollTo(0, 1);

      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        document.documentElement.style.setProperty("--vw", `${vw}px`);
        done = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 120);
    };

    requestAnimationFrame(lock);
    const fallback = setTimeout(lock, 1000);
    return () => clearTimeout(fallback);
  }, []);

  return null;
}
export default Mobile;
