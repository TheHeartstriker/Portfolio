"use client";
import styles from "./hero.module.css";
import styleNav from "@/components/nav/navMenu/nav.module.css";
import { animateText } from "@/utils/animations/animateText";
import gsap from "gsap";
import { useEffect, useContext, useRef, useState } from "react";
import { Context } from "@/components/provider/provider.jsx";
import ScrollMotion from "@/components/animations/scrollMotion";

function HeroAni() {
  const { transition } = useContext(Context);
  const playedRef = useRef(false);
  const timelineRef = useRef(gsap.timeline({ paused: true }));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => setIsMobile(window.innerWidth <= 1050);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  //
  // Actual aniamtion
  // Note that the animation / effcts starts in its final possition in the css
  function animateDesktop(nav, image, headings, detail, imageWidth) {
    //
    //Animate headings to the left and right
    timelineRef.current
      .to(headings[0], {
        duration: 1,
        ease: "power2.out",
        marginRight: "auto",
        delay: "0.25",
      })
      //
      // Grow image
      .to(image, {
        duration: 1,
        ease: "power2.out",
        opacity: "1",
        height: "22.5rem",
        width: imageWidth,
        borderRadius: "var(--border-radius)",
      })
      //
      //Animate nav in
      .to(nav, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      })
      // Animate details in
      .to(
        detail,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        },
        "-=0.15",
      );

    //
    // Closing rest opacity
    return () => {
      timelineRef.current.kill();
    };
  }

  function animateMobile(nav, image, headings, detail) {
    //
    // Fade image in
    timelineRef.current.to(image, {
      duration: 1,
      ease: "power2.out",
      opacity: "1",
    });
    //
    //Animate text
    animateText(
      { start: 32, end: 0, type: "lines", mask: "lines" },
      [
        {
          element: headings,
          clip: true,
          clipAmount: {
            bottom: "0.1em",
            top: "0",
            left: "0",
            right: "0",
          },
        },
      ],
      {
        duration: 0.6,
        easing: "power1.out",
        stagger: 0.06,
        staggerEase: "power1.out",
        timeline: timelineRef.current,
        offset: "-=0.15",
      },
    );
    //
    //Animate nav in
    timelineRef.current
      .to(nav, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      })
      // Animate details in
      .to(
        detail,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        },
        "-=0.15",
      );

    //
    // Closing rest opacity
    return () => {
      timelineRef.current.kill();
    };
  }
  //
  // Actual animation call
  //
  useEffect(() => {
    //
    // This is to make sure we don't play it twice since we reflow on transition being done
    if (playedRef.current === true) return;
    //
    // Collect refrences
    const nav = document.querySelector(`.${styleNav["nav"]}`);
    const image = document.querySelector(`.${styles["hero-main-image"]}`);
    const headings = document.querySelectorAll(`.${styles["hero-main"]} h2`);
    const detail = document.querySelector(`.${styles["hero-detail"]}`);
    //
    // Get image natural size
    const measurement = document.createElement("div");
    measurement.style.position = "absolute";
    measurement.style.visibility = "hidden";
    document.body.appendChild(measurement);
    measurement.style.width = "var(--column-width)";
    const columnWidth = measurement.getBoundingClientRect().width;
    measurement.style.width = "var(--space-24)";
    const space24 = measurement.getBoundingClientRect().width;
    measurement.remove();
    const imageWidth = columnWidth * 5 + space24 * 3;
    if (!isMobile) {
      //
      // Setup for the animation
      gsap.set([nav, detail], { opacity: 0 });
      gsap.set(image, {
        opacity: "0",
        width: "0",
        height: "0",
        borderRadius: "25px",
      });
      gsap.set(headings[0], { marginRight: "0" });
      gsap.set(headings[1], { marginLeft: "0" });
    } else {
      gsap.set(image, {
        clearProps: "all",
      });
      gsap.set(headings[0], { marginRight: "auto" });
      gsap.set(headings[1], { marginLeft: "auto" });
      gsap.set(image, {
        opacity: "0",
      });
    }
    //
    //Clear timeline(of old animations) and attach animation
    timelineRef.current.clear();
    if (!isMobile) {
      animateDesktop(nav, image, headings, detail, imageWidth);
    } else {
      animateMobile(nav, image, headings, detail, imageWidth);
    }

    //
    // If transion is over play and set played to true so it's not rune twice
    if (!transition) {
      timelineRef.current.play();
      playedRef.current = true;
    }
  }, [transition, isMobile]);

  return (
    <ScrollMotion
      item={`.${styles["hero-main-image"]} img`}
      moveDirection="y"
      moveAmount={-15}
      start="top 15%"
      end="bottom 15%"
    />
  );
}

export default HeroAni;
