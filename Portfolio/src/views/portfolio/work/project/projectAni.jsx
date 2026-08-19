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
      // Exit lock — extra pinned distance (px) after the horizontal pass
      // completes, during which the exit progress lines fill in
      const exitLockDistance = 700;
      const scrollDistance = getScrollDistance();

      const line1 = main.querySelector(
        `.${projectStyles["work-project-exit-tab-pro-line1"]}`,
      );
      const line2 = main.querySelector(
        `.${projectStyles["work-project-exit-tab-pro-line2"]}`,
      );

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
          duration: scrollDistance,
        },
        0,
      );

      //
      // Exit progress lines — fills over the last exitLockDistance px, scrubbed so it reverses if the user scrolls back up
      if (line1 && line2) {
        tl.set(
          line1,
          {
            width: "0%",
          },
          ">",
        );

        tl.set(
          line2,
          {
            width: "100%",
          },
          "<",
        );

        tl.to(
          line1,
          {
            width: "100%",
            ease: "none",
            duration: exitLockDistance,
          },
          ">",
        );

        tl.to(
          line2,
          {
            width: "0%",
            ease: "none",
            duration: exitLockDistance,
          },
          "<",
        );
      }

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
          return `+=${getScrollDistance() + exitLockDistance}`;
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
