import { gsap } from "gsap/gsap-core";
import { useEffect } from "react";
import { animateText } from "@/utils/animations/textAnimation";
import { animateShapes } from "@/utils/animations/animateShapes";
function HeroAni() {
  //
  // Heading / hero animation
  //
  useEffect(() => {
    const timeline = gsap.timeline();
    const header1 = document.querySelector("#test1");
    const header2 = document.querySelector("#test2");
    const emailBlock = document.querySelectorAll(".contact-intro-left-email");
    const rightIntro = document.querySelectorAll(".contact-intro-right h3");
    const rightText = document.querySelectorAll(".contact-intro-right-text");

    animateText(
      { start: -64, end: 0, type: "chars", mask: "lines" },
      [{ element: header1 }, { element: header2 }],
      {
        duration: 0.6,
        stagger: 0.06,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
      },
    );

    animateText(
      { start: -64, end: 0, type: "words", mask: "words" },
      [{ element: rightIntro }],
      {
        duration: 0.5,
        stagger: 0.03,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
        offset: "-=0.25",
      },
    );
    animateShapes(
      { start: 50, end: 0 },
      [{ element: rightText }, { element: emailBlock }],
      {
        duration: 0.6,
        easing: "power1.out",
        staggerEase: "power1.out",
        offset: "-=0.25",
        stagger: 0.15,
        timeline: timeline,
      },
    );
  }, []);
}

export default HeroAni;
