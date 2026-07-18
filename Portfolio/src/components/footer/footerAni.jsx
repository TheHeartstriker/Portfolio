"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { animateText } from "@/utils/animations/textAnimation";
gsap.registerPlugin(ScrollTrigger);

function FooterAni() {
  //
  // Highlights animation
  //
  useEffect(() => {
    const footerHeading = document.querySelector(".footer-heading");
    const footerHeadingText1 = document.querySelector(".footer-heading h4");
    const footerHeadingText2 = document.querySelector(".footer-heading h3");
    const footerTextItems = document.querySelectorAll(".footer-links-item");
    console.log(footerTextItems);

    const timeline = gsap.timeline({ paused: true });

    ScrollTrigger.create({
      trigger: footerHeading,
      start: "top 85%",
      onEnter: () => timeline.play(),
    });
    //
    // Heading text
    animateText(
      { start: -64, end: 0, type: "words", mask: "words" },
      [{ element: footerHeadingText1 }, { element: footerHeadingText2 }],
      {
        duration: 0.5,
        stagger: 0.09,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
      },
    );
    //
    //Line
    timeline.to(
      footerHeading,
      {
        "--footer-line-length": "100%",
        duration: 1,
        ease: "power1.out",
      },
      "<+=0.25",
    );
    //
    // Item text aka links and email

    animateText(
      { start: 12, end: 0, type: "lines", mask: "lines" },
      [{ element: footerTextItems, clip: false }],
      {
        duration: 0.4,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
        stagger: 0.03,
        offset: "<+=0.5",
      },
    );
  }, []);
}

export default FooterAni;
