import { gsap } from "gsap/gsap-core";
import { animateShapes } from "@/utils/animations/animateShapes";
import { animateText } from "@/utils/animations/textAnimation";
import { useEffect } from "react";

function HeaderAnimation() {
  //
  // Animating the opening header section
  //
  useEffect(() => {
    // Main header section
    // header text animation
    const timeline = gsap.timeline();
    const header = document.querySelector(".skill-header-intro-text h1");
    const subHeader = document.querySelector(".skill-header-intro-text h2");
    animateText(
      { start: -64, end: 0, type: "chars", mask: "lines" },
      [
        {
          element: header,
          clip: true,
          clipAmount: {
            bottom: "0em",
            top: "0em",
            left: "0em",
            right: "0.1em",
          },
        },
        { element: subHeader, clip: false },
      ],
      {
        duration: 0.6,
        stagger: 0.015, //There is quite a bit more char's here so stagger is halfed
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
      },
    );

    //
    // Large top block and button animation
    const buttonBlocks = document.querySelectorAll(
      ".skill-header-intro button",
    );
    const imageBlock = document.querySelector(".skill-header img");
    const Bottomblocks = document.querySelectorAll(".skill-header-stats-item");
    animateShapes(
      { start: 50, end: 0 },
      [
        { element: buttonBlocks },
        { element: imageBlock },
        { element: Bottomblocks },
      ],
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
  //
  // Animating the intro section
  //
  useEffect(() => {
    // Script cards animation
    // Large main part
    const cards = document.querySelectorAll(".skill-past-item");
    cards.forEach((card) => {
      const mainCardBody = card.querySelector(".skill-past-item-main");
      const timeline1 = gsap.timeline({ paused: true });
      // Animate the large block
      animateShapes(
        { start: 50, end: 0 },
        [{ element: mainCardBody }],
        {
          duration: 0.5,
          easing: "power1.out",
          timeline: timeline1,
        },
        {
          start: "top 85%",
        },
      );

      // Scoped to the stats sibling, not the main block
      const smallBlocks = card.querySelectorAll(
        ".skill-past-item-stats-con, .skill-past-item-stats-con-sq-it",
      );
      const timeline2 = gsap.timeline({ paused: true });

      animateShapes(
        { start: 50, end: 0 },
        [{ element: smallBlocks }],
        {
          duration: 0.4,
          stagger: 0.06,
          easing: "power1.out",
          staggerEase: "power1.out",
          timeline: timeline2,
        },
        {
          start: "top 85%",
        },
      );
    });
  }, []);
}

export default HeaderAnimation;
