"use client";
import { useEffect } from "react";

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
function Mobile() {
  function setStaticViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }

  useEffect(() => {
    if (isMobile()) {
      setStaticViewportHeight();
    }
  }, []);
}
export default Mobile;
