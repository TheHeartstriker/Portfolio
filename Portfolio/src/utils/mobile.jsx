"use client";
import { useEffect } from "react";

function Mobile() {
  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  function isGoogleApp() {
    const ua = navigator.userAgent.toLowerCase();

    // Android Google App WebView
    if (
      /android/.test(ua) &&
      /version\/[\d.]+/.test(ua) &&
      /wv/.test(ua) &&
      /google/.test(ua)
    ) {
      return true;
    }

    // iOS Google App (uses Safari but injects Google tokens)
    if (
      /iphone|ipad|ipod/.test(ua) &&
      /applewebkit/.test(ua) &&
      !/crios/.test(ua) && // Not Chrome
      /safari/.test(ua) &&
      /google/.test(ua) &&
      /version\//.test(ua)
    ) {
      return true;
    }

    return false;
  }

  function setStaticViewportHeight() {
    const vh = window.innerHeight * 0.01 * 2;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const vw = window.innerWidth * 0.01 * 2;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }

  useEffect(() => {
    if (isMobile() && isGoogleApp()) {
      setStaticViewportHeight();
    }
  }, []);
}
export default Mobile;
