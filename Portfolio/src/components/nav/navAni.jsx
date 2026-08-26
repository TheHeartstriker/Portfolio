"use client";
import { useEffect } from "react";
import gsap from "gsap";
import styles from "./nav.module.css";
import workStyles from "../../views/portfolio/work/work.module.css";

function NavAni() {
  //
  // Nav appear and disappear
  //
  useEffect(() => {
    //
    // Var's
    const timeline = gsap.timeline({ paused: true });
    const nav = document.querySelector(`.${styles["nav"]}`);
    // Direction tracking
    let lastScrollY = window.scrollY;
    let downAccum = 0;
    // How far the user has to scroll down before the nav reverts
    const DOWN_THRESHOLD = 50;
    // Ignore direction changes before the user leaves the very top
    const TOP_OFFSET = 10;
    // How close to the bottom before the nav completely disappears
    const BOTTOM_OFFSET = 125;

    //
    // Inital Animation
    //
    timeline.to(nav, {
      backgroundColor: "var(--dark-2)",
      padding: "var(--space-12)",
      duration: 0.45,
      ease: "power2.out",
    });
    //
    // Normal nav operations(aka disappearing fading background in out)
    //
    function handleReverse(currentScrollY, delta) {
      if (currentScrollY <= TOP_OFFSET) {
        //
        // Near top, keep nav hidden
        timeline.reverse();
        downAccum = 0;
      } else if (delta < 0) {
        //
        // Scrolling up, show nav
        timeline.play();
        downAccum = 0;
      } else if (delta > 0) {
        //
        // Scrolling down, accumulate before reverting
        downAccum += delta;

        if (downAccum > DOWN_THRESHOLD) {
          timeline.reverse();
        }
      }

      gsap.to(nav, {
        autoAlpha: 1,
        duration: 0.45,
        ease: "power2.out",
      });
    }

    //
    // Completely disappear nav
    //
    function handleDisappear() {
      gsap.to(nav, {
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.out",
      });

      downAccum = 0;
    }
    //
    // Check whats under and if it's work
    //
    function isUnder() {
      const navRect = nav.getBoundingClientRect();
      // Point directly underneath the nav, in the middle of the screen
      const navPoint = document.elementFromPoint(
        window.innerWidth / 2,
        navRect.bottom + 1,
      );

      // Point in the middle of the screen
      const centerPoint = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2,
      );

      const workClass = workStyles["work"];

      const navIsOverWork = navPoint?.closest(`.${workClass}`);
      const centerIsOverWork = centerPoint?.closest(`.${workClass}`);

      if (navIsOverWork && centerIsOverWork) {
        return true;
      } else {
        false;
      }
    }

    //
    // Animation calls on scroll
    //
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (currentScrollY + window.innerHeight);

      if (distanceFromBottom <= BOTTOM_OFFSET || isUnder()) {
        handleDisappear();
      } else {
        handleReverse(currentScrollY, delta);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      timeline.kill();
    };
  }, []);

  return null;
}

export default NavAni;
