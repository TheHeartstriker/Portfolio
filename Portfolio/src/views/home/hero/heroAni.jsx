"use client";
import styles from "./hero.module.css";
import styleNav from "@/components/nav/navMenu/nav.module.css";
import { animateText } from "@/utils/animations/animateText";
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
  function animate(nav, heading, para, detail) {
    timelineRef.current.to(nav, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
    });
    animateText(
      { start: 96, end: 0, type: "lines", mask: "lines" },
      [{ element: heading }, { element: para }],
      {
        duration: 0.6,
        easing: "power1.out",
        stagger: 0.06,
        staggerEase: "power1.out",
        timeline: timelineRef.current,
        offset: "-=0.15",
      },
    );
    timelineRef.current.to(
      detail,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      },
      "-=0.15",
    );
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
    const heading = document.querySelector(
      `.${styles["hero-main-heading"]} h1`,
    );
    const para = document.querySelector(`.${styles["hero-main"]} p`);
    const detail = document.querySelector(`.${styles["hero-detail"]}`);
    //
    // Setup for the animation
    gsap.set([nav, detail], {
      opacity: 0,
    });
    //
    //Clear timeline(of old animations) and attach animation
    timelineRef.current.clear();
    animate(nav, heading, para, detail);
    //
    // If transion is over play and set played to true so it's not rune twice
    if (!transition) {
      timelineRef.current.play();
      playedRef.current = true;
    }
  }, [transition]);
}

export default HeroAni;
