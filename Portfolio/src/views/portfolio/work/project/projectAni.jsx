"use client";
import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Context } from "@/components/provider/provider.jsx";
import { animateText } from "@/utils/animations/animateText";
import styles from "./project.module.css";
import styleNav from "@/components/nav/navMenu/nav.module.css";

gsap.registerPlugin(ScrollTrigger);

function ProjectAni() {
  const { transition } = useContext(Context);
  const playedRef = useRef(false);
  const initTimelineRef = useRef(gsap.timeline({ paused: true }));

  //
  // Actual aniamtion
  //
  function animate(nav, subheading, heading, para, btn, main) {
    //
    // Text animate in
    animateText(
      { start: 48, end: 0, type: "lines", mask: "lines" },
      [
        { element: subheading },
        {
          element: heading,
          clip: true,
          clipAmount: {
            bottom: "0.1em",
            top: "0em",
            left: "0em",
            right: "0em",
          },
        },
        { element: para },
      ],
      {
        duration: 0.6,
        easing: "power2.out",
        stagger: 0.06,
        staggerEase: "power2.out",
        timeline: initTimelineRef.current,
      },
    );
    initTimelineRef.current.to(
      main,
      {
        "--overlay-start-opacity": 0.6,
        "--overlay-middle-opacity": 0.3,
        "--overlay-end-opacity": 0,
        duration: 1,
        ease: "power1.out",
      },
      "-=0.15",
    );
    initTimelineRef.current.to(
      btn,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      },
      "<",
    );
    initTimelineRef.current.to(
      nav,
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
      return;
    }
    //
    // Collect refrences
    const nav = document.querySelector(`.${styleNav["nav"]}`);
    const subheading = document.querySelector(
      `.${styles["work-project-hero"]} h2`,
    );
    const heading = document.querySelector(
      `.${styles["work-project-hero"]} h1`,
    );
    const para = document.querySelector(
      `.${styles["work-project-hero-bottom"]} p`,
    );
    const btn = document.querySelector(
      `.${styles["work-project-hero-bottom"]} button`,
    );
    const main = document.querySelector(`.${styles["work-project-main"]}`);

    //
    // Setup for the animation
    gsap.set([nav, btn], {
      opacity: 0,
    });
    gsap.set(main, {
      "--overlay-start-opacity": 1,
      "--overlay-middle-opacity": 1,
      "--overlay-end-opacity": 1,
    });
    //
    //Clear timeline(of old animations) and attach animation
    initTimelineRef.current.clear();
    animate(nav, subheading, heading, para, btn, main);
    //
    // If transion is over play and set played to true so it's not rune twice
    if (!transition) {
      initTimelineRef.current.play();
      playedRef.current = true;
    }
  }, [transition]);
}

export default ProjectAni;
