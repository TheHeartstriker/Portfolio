"use client";
import { useEffect } from "react";

function Mobile() {
  // function isMobile() {
  //   return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //     navigator.userAgent
  //   );
  // }

  // function isGoogleApp() {
  //   const ua = navigator.userAgent.toLowerCase();

  //   // --------------------------------------------------------------
  //   // 1. Android – Google Search / Discover / News (WebView)
  //   // --------------------------------------------------------------
  //   //   * contains "wv"  → Android WebView
  //   //   * contains "google" (or "gws") → Google-app token
  //   //   * contains "version/" → Google-app version string
  //   //   * does NOT contain "chrome/" (Chrome uses "chrome/")
  //   if (
  //     /android/.test(ua) &&
  //     /wv/.test(ua) && // WebView marker
  //     /version\/[\d.]+/.test(ua) && // Google-app version
  //     (/google/.test(ua) || /gws/.test(ua)) && // Google token
  //     !/chrome\//.test(ua) // NOT Chrome
  //   ) {
  //     return true;
  //   }

  //   // --------------------------------------------------------------
  //   // 2. iOS – Google Search / Discover / News (Safari-based)
  //   // --------------------------------------------------------------
  //   //   * iPhone/iPad/iPod
  //   //   * AppleWebKit + Safari (but NOT CriOS = Chrome)
  //   //   * contains "google" AND "version/" (Google-app injects these)
  //   //   * does NOT contain "crios" (Chrome iOS)
  //   if (
  //     /iphone|ipad|ipod/.test(ua) &&
  //     /applewebkit/.test(ua) &&
  //     /safari/.test(ua) &&
  //     !/crios/.test(ua) && // NOT Chrome iOS
  //     /google/.test(ua) &&
  //     /version\/[\d.]+/.test(ua)
  //   ) {
  //     return true;
  //   }

  //   return false;
  // }

  function isGoogleApp() {
    const ua = navigator.userAgent.toLowerCase();

    // Android WebView (used by Google app and others)
    if (/android/.test(ua) && /wv/.test(ua)) {
      return true;
    }

    // iOS in-app browser (check for absence of Safari/)
    if (
      /iphone|ipad|ipod/.test(ua) &&
      /applewebkit/.test(ua) &&
      !/safari\//.test(ua) &&
      !/crios/.test(ua)
    ) {
      return true;
    }

    return false;
  }

  function setStaticViewportHeight() {
    // const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${10}px`);
    // const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${10}px`);
  }

  useEffect(() => {
    if (isGoogleApp()) {
      setStaticViewportHeight();
    }
  }, []);

  return null;
}
export default Mobile;
