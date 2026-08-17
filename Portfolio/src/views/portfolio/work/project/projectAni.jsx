"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import workStyles from "../work.module.css";
import projectStyles from "./project.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectAni({ projectNum }) {
  //
  // Scroll Animation
  //
  useEffect(() => {
    const section = document.querySelector(`.${workStyles["work"]}`);
    const main = document.querySelectorAll(`.${projectStyles["work-project"]}`)[
      projectNum
    ];
    if (!section || !main) return;

    const ctx = gsap.context(function () {
      //
      // Scroll distance
      function getScrollDistance() {
        const styles = getComputedStyle(section);
        const padding =
          parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

        return main.scrollWidth - (section.clientWidth - padding);
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
      // ScrollTrigger
      const space24 = getComputedStyle(document.documentElement)
        .getPropertyValue("--space-24")
        .trim();
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const remToPx = parseFloat(space24) * rootFontSize;

      const st = ScrollTrigger.create({
        trigger: main,
        start: `bottom bottom-=${remToPx}`,
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
    }, main);

    return function cleanupContext() {
      ctx.revert();
    };
  }, []);
}

export default ProjectAni;
