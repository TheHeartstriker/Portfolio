"use client";
import "./opening.css";
import { gsap } from "gsap/gsap-core";
import { useState, useEffect, use } from "react";
import { Context } from "../../../providers/context/contextProvider.jsx";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { animateText } from "@/utils/animations/textAnimation";
import { animateShapes } from "@/utils/animations/animateShapes";

function Opening() {
  const pathname = usePathname();
  //
  // Opening is a state that decides if the root / animation should play
  const { setOpening, opening } = useContext(Context);
  //
  //isVisible controls the curtain — initialized from opening so navigate-back starts as false
  const [isVisible, setIsVisible] = useState(opening);
  //
  //Helper functions
  //
  function slideUpDown(
    element,
    direction = "up",
    vhPercent = 50,
    vwPercent = 0,
    duration = 0.5,
    easing = "power2.out",
  ) {
    const vh = window.innerHeight * (vhPercent / 100);
    const vw = window.innerWidth * (vwPercent / 100);

    const y = direction === "up" ? -vh : vh;
    const x = direction === "left" ? -vw : vw;

    return gsap.to(element, {
      y: vhPercent ? y : 0,
      x: vwPercent ? x : 0,
      duration: duration,
      ease: easing,
    });
  }
  //
  //Animation functions
  //
  function openingAnimation(timeline) {
    const leftItems = document.querySelectorAll(".opening-container-left-item");
    const rightItems = document.querySelectorAll(
      ".opening-container-right-item",
    );
    timeline.add(slideUpDown(leftItems[0], "up", 80, 0, 1.5, "power2.out"), 0);
    timeline.add(slideUpDown(leftItems[1], "down", 20, 0, 1, "power2.out"), 0);
    timeline.add(
      slideUpDown(rightItems[0], "up", 50, 0, 1.25, "power2.out"),
      0,
    );
    timeline.add(
      slideUpDown(rightItems[1], "down", 50, 0, 1.25, "power2.out"),
      0,
    );
  }

  function navAnimation(timeline, offset) {
    const nav = document.querySelectorAll(".nav-bar")[0];
    gsap.set(nav, { opacity: 0, y: 35 });
    timeline.to(
      nav,
      {
        opacity: 1,
        duration: 1,
        y: 0,
        ease: "power2.out",
      },
      offset,
    );
  }

  function aboutTextAnimation(timeline) {
    const header = document.querySelector(".about-hero-section h1");
    const subHeader = document.querySelector(".about-hero-section h2");

    animateText(
      { start: -64, end: 0, type: "chars", mask: "lines" },
      [{ element: subHeader }, { element: header }],
      {
        duration: 0.6,
        stagger: 0.03,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
      },
    );
    const blocks = document.querySelectorAll(
      ".about-hero-section-info-text, .about-hero-section-info button",
    );
    animateShapes({ start: 50, end: 0 }, [{ element: blocks }], {
      duration: 0.6,
      easing: "power1.out",
      staggerEase: "power1.out",
      offset: "-=0.25",
      stagger: 0.15,
      timeline: timeline,
    });
  }

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }
    //Total takes 1.75 seconds
    //The easing makes it so we animate slowly at first then faster at the end.
    const tl = gsap.timeline();
    if (opening) {
      //
      //Opening animation
      openingAnimation(tl);
      tl.call(() => {
        setIsVisible(false);
        setOpening(false);
      });
      //
      //Nav animation
      navAnimation(tl, "-=0.25");
    }
    //
    //Text animation
    aboutTextAnimation(tl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="opening-container">
      <div className="opening-container-left">
        <div className="opening-container-left-item"></div>
        <div className="opening-container-left-item"></div>
      </div>
      <div className="opening-container-right">
        <div className="opening-container-right-item"></div>
        <div className="opening-container-right-item"></div>
      </div>
    </div>
  );
}

export default Opening;
