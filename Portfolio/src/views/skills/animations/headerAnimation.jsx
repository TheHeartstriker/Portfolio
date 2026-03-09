import { gsap } from "gsap/gsap-core";
import { animateBlocks } from "../../../utils/animations/animations";
import { animateText } from "@/utils/animations/textAni.jsx";
import { useEffect } from "react";

function HeaderAnimation() {
  function handleTextAnimation() {
    //
    // Main header section
    // header text animation
    const timeline = gsap.timeline();
    const header = document.querySelector(".skill-header-intro-text h1");
    const subHeader = document.querySelector(".skill-header-intro-text h2");
    animateText({ start: 150, end: 0 }, [header, subHeader], timeline, {
      duration: 0.5,
      easing: "power1.out",
    });

    //
    // Large top block and button animation
    const Topblocks = document.querySelectorAll(
      ".skill-header-intro button, .skill-header img",
    );
    animateBlocks(
      { start: 150, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      Topblocks,
      {
        duration: 1.5,
        easing: "back.out(1.1)",
        offset: "-=0.25",
      },
      timeline,
    );
    //
    // Bottom stats animation
    const Bottomblocks = document.querySelectorAll(".skill-header-stats-item");
    animateBlocks(
      { start: 150, end: 0, type: "x" },
      null,
      null,
      Bottomblocks,
      {
        duration: 0.75,
        easing: "power2.out",
        offset: "<+0.5",
      },
      timeline,
    );
    //
    // Script cards animation
    // Large main part
    const cards = document.querySelectorAll(".skill-past-item");
    cards.forEach((card) => {
      // Animate the large block
      animateBlocks(
        { start: 100, end: 0, type: "x" },
        { el: "top", scroll: "90%" },
        { el: "bottom", scroll: "40%" },
        [card.querySelector(".skill-past-item-main")],
        {
          duration: 1.25,
          delay: 0,

          easing: "back.out(1.1)",
        },
      );

      // Scoped to the stats sibling, not the main block
      const smallBlocks = card.querySelectorAll(
        ".skill-past-item-stats-con, .skill-past-item-stats-con-sq-it",
      );
      animateBlocks(
        { start: 100, end: 0, type: "x" },
        { el: "top", scroll: "90%" },
        { el: "bottom", scroll: "40%" },
        smallBlocks,
        {
          duration: 0.85,
          delay: 0,

          easing: "power2.out",
        },
      );
    });
  }

  useEffect(() => {
    handleTextAnimation();
  }, []);
}

export default HeaderAnimation;
