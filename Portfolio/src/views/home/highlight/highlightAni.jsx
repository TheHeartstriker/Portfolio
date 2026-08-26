"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import styles from "./highlight.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//
// Animation vars
const CENTER_ZONE_REM = 10;
const MIN_OPACITY = 0.3;
const MAX_OPACITY = 0.6;

function HighlightAni() {
  //
  // Scroll Animation
  //
  useLayoutEffect(() => {
    const section = document.querySelector(`.${styles["highlight"]}`);
    const main = document.querySelector(`.${styles["highlight-main"]}`);
    const line1 = document.querySelector(
      `.${styles["highlight-con-heading-indi-line1"]}`,
    );
    const line2 = document.querySelector(
      `.${styles["highlight-con-heading-indi-line2"]}`,
    );
    if (!section || !main) return;

    const ctx = gsap.context(function () {
      //
      // Scroll distance
      function getScrollDistance() {
        return main.scrollWidth - section.clientWidth;
      }

      //
      // Overlay opacity calc
      function updateOverlays() {
        const items = main.querySelectorAll(
          `.${styles["highlight-main-item"]}`,
        );
        if (!items.length) return;

        const rootFontSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize,
        );
        const centerZoneHalf = (CENTER_ZONE_REM * rootFontSize) / 2;

        const viewportCenter = window.innerWidth / 2;
        const maxDist = Math.max(
          viewportCenter,
          window.innerWidth - viewportCenter,
        );

        items.forEach(function (item) {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const dist = Math.abs(itemCenter - viewportCenter);

          let opacity;
          if (dist <= centerZoneHalf) {
            opacity = MIN_OPACITY;
          } else {
            const t = Math.min(
              (dist - centerZoneHalf) / (maxDist - centerZoneHalf),
              1,
            );
            opacity = MIN_OPACITY + t * (MAX_OPACITY - MIN_OPACITY);
          }

          item.style.setProperty("--overlay-opacity", opacity.toFixed(3));
        });
      }

      //
      // Timeline
      const tl = gsap.timeline();
      tl.to(
        main,
        {
          x: function () {
            return -getScrollDistance();
          },
          ease: "none",
          onUpdate: updateOverlays,
        },
        0,
      );

      //
      // Line indicators
      if (line1 && line2) {
        tl.fromTo(
          line1,
          { width: "0%" },
          { width: "100%", ease: "none" },
          0,
        ).fromTo(line2, { width: "100%" }, { width: "0%", ease: "none" }, 0);
      }

      //
      // ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: function () {
          return `+=${getScrollDistance()}`;
        },
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        animation: tl,
        onRefresh: updateOverlays,
      });

      // Initial paint before any scroll happens
      updateOverlays();

      window.addEventListener("resize", updateOverlays);

      return function cleanupScrollTrigger() {
        window.removeEventListener("resize", updateOverlays);
        st.kill();
      };
    }, section);

    return function cleanupContext() {
      ctx.revert();
    };
  }, []);
}

export default HighlightAni;
