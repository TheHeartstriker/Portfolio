"use client";
import { useEffect } from "react";

export function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
export function Mobile() {
  function setStaticViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--static-vh", `${vh}px`);
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--static-vw", `${vw}px`);
  }

  useEffect(() => {
    if (isMobile()) {
      setStaticViewportHeight();
    }
  }, []);
}
export default Mobile;
