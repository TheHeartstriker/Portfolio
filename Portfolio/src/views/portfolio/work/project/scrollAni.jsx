"use client";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import projectStyles from "./project.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Context } from "@/components/provider/provider.jsx";
import { project1, project2, project3 } from "./text";

gsap.registerPlugin(ScrollTrigger);

function ScrollAni({ projectNum }) {
  const { setLeftMove, setTransition, setNavPage } = useContext(Context);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1050 : true,
  );
  const projectTextList = [project1, project2, project3];

  useEffect(() => {
    let resizeFrame;

    function handleResize() {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        setIsDesktop(window.innerWidth >= 1050);
      });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //
  // Scroll Animation desktop
  //
  useLayoutEffect(() => {
    if (!isDesktop) return;

    const section = document.querySelector(`.${projectStyles["work"]}`);
    const main = document.querySelector(`.${projectStyles["work-project"]}`);

    if (!section || !main) return;

    setLeftMove(true);

    const ctx = gsap.context(function () {
      //
      // Scroll distance
      function getScrollDistance() {
        return main.scrollWidth - main.clientWidth;
      }
      //
      // Exit lock — extra pinned distance (px) to transit to next page
      const exitTransitionDistance = 700;
      //
      // Extra scroll runway (px) to keep the section pinned AFTER the exit
      const pinHoldDistance = 6000;

      const scrollDistance = getScrollDistance();
      const line1 = main.querySelector(
        `.${projectStyles["work-project-exit-tab-pro-line1"]}`,
      );
      const line2 = main.querySelector(
        `.${projectStyles["work-project-exit-tab-pro-line2"]}`,
      );

      let hasTransitioned = false;

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
      // Exit progress lines — fills over the last exitTransitionDistance px, scrubbed so it reverses if the user scrolls back up
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
            duration: exitTransitionDistance,
          },
          ">",
        );

        tl.to(
          line2,
          {
            width: "0%",
            ease: "none",
            duration: exitTransitionDistance,
          },
          "<",
        );

        tl.call(
          () => {
            if (hasTransitioned) return;
            hasTransitioned = true;
            setTransition(true);
            setNavPage(projectTextList[projectNum].exit.next);
          },
          [],
          ">",
        );
      }

      //
      // Drives the horizontal scroll + exit line animation. Deliberately
      const scrubTrigger = ScrollTrigger.create({
        trigger: section,
        start: `top top`,
        end: function () {
          return `+=${getScrollDistance() + exitTransitionDistance}`;
        },
        scrub: true,
        invalidateOnRefresh: true,
        animation: tl,
      });

      //
      // Pin is page length plus the extra at the end plus the extra after so they cant scroll further
      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: `top top`,
        end: function () {
          return `+=${getScrollDistance() + exitTransitionDistance + pinHoldDistance}`;
        },
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      return function cleanupScrollTrigger() {
        scrubTrigger.kill();
        pinTrigger.kill();
      };
    }, main);

    return function cleanupContext() {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  //
  // Scroll Animation mobile
  //
  useLayoutEffect(() => {
    if (isDesktop) return;

    const section = document.querySelector(`.${projectStyles["work"]}`);

    if (!section) return;

    setLeftMove(false);

    const ctx = gsap.context(function () {
      //
      // Exit lock — pinned distance (px) to transit to next page once the column ends
      const exitTransitionDistance = 700;
      //
      // Extra scroll runway (px) to keep the section pinned AFTER the exit
      const pinHoldDistance = 6000;

      const line1 = section.querySelector(
        `.${projectStyles["work-project-exit-tab-pro-line1"]}`,
      );
      const line2 = section.querySelector(
        `.${projectStyles["work-project-exit-tab-pro-line2"]}`,
      );

      let hasTransitioned = false;

      //
      // Timeline — no horizontal scroll on mobile, just the exit lines + handoff
      const tl = gsap.timeline();

      //
      // Exit progress lines — fills over exitTransitionDistance px, scrubbed so it reverses if the user scrolls back up
      if (line1 && line2) {
        tl.set(line1, { width: "0%" }, 0);
        tl.set(line2, { width: "100%" }, 0);

        tl.to(
          line1,
          {
            width: "100%",
            ease: "none",
            duration: exitTransitionDistance,
          },
          0,
        );

        tl.to(
          line2,
          {
            width: "0%",
            ease: "none",
            duration: exitTransitionDistance,
          },
          0,
        );

        tl.call(
          () => {
            if (hasTransitioned) return;
            hasTransitioned = true;
            setTransition(true);
            setNavPage(projectTextList[projectNum].exit.next);
          },
          [],
          ">",
        );
      } else {
        //
        // No exit-line markup on this page — just fire the transition after the pin holds briefly
        tl.call(
          () => {
            if (hasTransitioned) return;
            hasTransitioned = true;
            setTransition(true);
            setNavPage(projectTextList[projectNum].exit.next);
          },
          [],
          0,
        );
      }

      //
      // Drives the exit line animation only — no horizontal scrub needed on mobile
      const scrubTrigger = ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: `+=${exitTransitionDistance}`,
        scrub: true,
        invalidateOnRefresh: true,
        animation: tl,
      });

      //
      // Locks the screen once the bottom of the section is reached, holding through the exit + extra runway
      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: `+=${exitTransitionDistance + pinHoldDistance}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      return function cleanupScrollTrigger() {
        scrubTrigger.kill();
        pinTrigger.kill();
      };
    }, section);

    return function cleanupContext() {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);
}

export default ScrollAni;
