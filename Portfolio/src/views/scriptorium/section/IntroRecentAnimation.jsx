import { animateBlocks } from "@/utils/animations/animations.jsx";
import { animateText } from "@/utils/animations/textAni.jsx";
import { useEffect } from "react";
import { gsap } from "gsap/gsap-core";
import { stagger } from "framer-motion";
function IntroRecentAnimation() {
  //
  // Intro animation
  //
  function handleIntroAnimation() {
    const timeline = gsap.timeline();
    const heading = document.querySelector(".scriptorium-intro-text h1");
    //
    //Large text
    animateText({ start: 150, end: 0 }, heading, timeline, {
      duration: 0.5,
      easing: "power1.out",
    });
    //
    //Right side button and text block
    const textBlocks = document.querySelectorAll(
      ".scriptorium-intro-body-text-container, .scriptorium-intro-text button",
    );
    animateBlocks(
      { start: 150, end: 0, type: "x" },
      null,
      null,
      textBlocks,
      {
        duration: 0.5,
        easing: "power2.out",
        offset: "-=0.25",
        stagger: 0.25,
      },
      timeline,
    );
    const imageBlock = document.querySelectorAll(
      ".scriptorium-intro img, .scriptorium-intro-data-bar",
    );
    //
    // Image
    animateBlocks(
      { start: 100, end: 0, type: "y" },
      null,
      null,
      imageBlock,
      {
        duration: 1.5,
        easing: "back.out(1.1)",
        offset: "-=0.25",
        stagger: 0.1,
      },
      timeline,
    );
  }
  function handleRecentAnimation() {
    const recentCard = document.querySelectorAll(".scriptorium-recent-card");
    animateBlocks(
      { start: 100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      recentCard,
      {
        duration: 1,
        delay: 0,
        easing: "back.out(1.1)",
      },
    );
  }
  useEffect(() => {
    handleIntroAnimation();
    handleRecentAnimation();
  }, []);
}

export default IntroRecentAnimation;
