"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./highlight.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HighlightAni() {
  //
  // Scroll Animation
  //
  useEffect(() => {
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
      // Timeline
      const tl = gsap.timeline();
      tl.to(
        main,
        {
          x: function () {
            return -getScrollDistance();
          },
          ease: "none",
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
      });

      return function cleanupScrollTrigger() {
        st.kill();
      };
    }, section);

    return function cleanupContext() {
      ctx.revert();
    };
  }, []);
}

export default HighlightAni;
