"use client";
import styles from "./hero.module.css";
import styleNav from "@/components/nav/nav.module.css";
import { animateText } from "@/utils/animations/animateText";
import { animateShapes } from "@/utils/animations/animateShapes";
import gsap from "gsap";
import { useEffect, useContext, useRef } from "react";
import { Context } from "@/components/provider/provider.jsx";

function HeroAni() {
  const { transition } = useContext(Context);
  const playedRef = useRef(false);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  //
  // Actual aniamtion
  //
  function animate(nav, image, textHeading, textLink, textEmail, form) {
    timelineRef.current.to(nav, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      offset: "-=0.15",
    });
    timelineRef.current.to(image, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.in",
      offset: "-=0.15",
    });
    animateText(
      { start: 64, end: 0, type: "lines", mask: "lines" },
      [
        {
          element: textHeading,
          clip: true,
          clipAmount: {
            bottom: "0.1em",
            top: "0em",
            left: "0em",
            right: "0em",
          },
        },
        { element: textLink },
        { element: textEmail },
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
    timelineRef.current.to(form, {
      opacity: 1,
      duration: 0.6,
      ease: "power1.out",
      offset: "-=0.3",
    });
  }
  //
  // Actual animation call
  //
  useEffect(() => {
    //
    // This is to make sure we don't play it twice since we reflow on transition being done
    if (playedRef.current === true) {
      console.log("Already played");
      return;
    }
    //
    // Collect refrences
    const nav = document.querySelector(`.${styleNav["nav"]}`);
    const image = document.querySelector(`.${styles["hero-image"]}`);
    const textHeading = document.querySelector(`.${styles["hero-text"]} h1`);
    const textLink = document.querySelectorAll(`.${styles["hero-text"]} a`);
    const textEmail = document.querySelector(`.${styles["hero-text"]} h3`);
    const form = document.querySelector(`.${styles["hero-con"]}`);

    //
    // Setup for the animation
    gsap.set([nav, image, form], {
      opacity: 0,
    });
    //
    //Clear timeline(of old animations) and attach animation
    timelineRef.current.clear();
    animate(nav, image, textHeading, textLink, textEmail, form);
    //
    // If transion is over play and set played to true so it's not rune twice
    if (!transition) {
      timelineRef.current.play();
      playedRef.current = true;
    }
  }, [transition]);
}

export default HeroAni;
