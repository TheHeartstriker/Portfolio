import { animateText } from "@/utils/animations/textAni.jsx";
import { animateBlocks } from "@/utils/animations/animations";
import { gsap } from "gsap/gsap-core";
import { useEffect } from "react";

function ContactAnimation() {
  useEffect(() => {
    const timeline = gsap.timeline();
    const header1 = document.querySelector("#test1");
    const header2 = document.querySelector("#test2");
    animateText({ start: 150, end: 0 }, [header1, header2], timeline, {
      duration: 0.75,
      easing: "power1.out",
      stagger: 0.05,
    });
    const emailBlock = document.querySelectorAll(".contact-intro-left-email");
    animateBlocks(
      { start: 50, end: 0, type: "y" },
      null,
      null,
      emailBlock,
      {
        duration: 0.5,
        easing: "power1.out",
      },
      timeline,
    );
    const rightIntro = document.querySelectorAll(".contact-intro-right h3");
    animateText({ start: 50, end: 0 }, rightIntro, timeline, {
      duration: 0.25,
      easing: "power1.out",
    });
    const rightText = document.querySelectorAll(".contact-intro-right-text");
    animateBlocks(
      { start: 25, end: 0, type: "y" },
      null,
      null,
      rightText,
      {
        duration: 0.5,
        easing: "power1.out",
      },
      timeline,
    );
  }, []);
}

export default ContactAnimation;
