"use client";
import { animateShapes } from "@/utils/animations/animateShapes";
import { animateText } from "@/utils/animations/textAnimation";
import { useLayoutEffect } from "react";
import { gsap } from "gsap/gsap-core";
function IntroAni() {
  useLayoutEffect(() => {
    //
    // Intro animation
    //
    const timeline = gsap.timeline();
    const heading = document.querySelector(".scriptorium-intro-text h1");
    //
    //Large text
    animateText(
      { start: -64, end: 0, type: "chars", mask: "lines" },
      [{ element: heading }],
      {
        duration: 0.6,
        stagger: 0.03,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
      },
    );
    //
    //Right side button and text block
    const textBlocks = document.querySelectorAll(
      ".scriptorium-intro-body-text-container, .scriptorium-intro-text button",
    );
    const imageBlock = document.querySelectorAll(
      ".scriptorium-intro img, .scriptorium-intro-data-bar",
    );
    animateShapes(
      { start: 50, end: 0 },
      [{ element: textBlocks }, { element: imageBlock }],
      {
        duration: 0.6,
        stagger: 0.15,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
        offset: "-=0.25",
      },
    );
  }, []);
}

export default IntroAni;
