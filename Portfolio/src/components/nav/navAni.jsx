"use client";
import { useEffect } from "react";
import gsap from "gsap";
import styles from "./nav.module.css";

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
    // Animation
    //
    timeline.to(nav, {
      backgroundColor: "var(--dark-2)",
      padding: "var(--space-16)",
      duration: 0.45,
      ease: "power2.out",
    });

    //
    // Animation cals on scroll
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      // Calls when we are close to the bottom of the page
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (currentScrollY + window.innerHeight);
      if (distanceFromBottom <= BOTTOM_OFFSET) {
        gsap.to(nav, {
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.out",
        });
        downAccum = 0;
      } else {
        gsap.to(nav, {
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
        });
        // Calls when we move upwards or downwards chnage the background
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
