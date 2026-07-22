import { gsap } from "gsap/gsap-core";
import { animateShapes } from "@/utils/animations/animateShapes";
import { animateText } from "@/utils/animations/textAnimation";
import { useLayoutEffect } from "react";

function HeroAni() {
  //
  // Animating the opening header section
  //
  useLayoutEffect(() => {
    // Main header section
    // header text animation
    const timeline = gsap.timeline();
    const header = document.querySelector(".port-hero-intro-text h1");
    const subHeader = document.querySelector(".port-hero-intro-text h2");
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
    const buttonBlocks = document.querySelectorAll(".port-hero-intro button");
    const imageBlock = document.querySelector(".port-hero img");
    const Bottomblocks = document.querySelectorAll(".port-hero-stats-item");
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
}

export default HeroAni;
