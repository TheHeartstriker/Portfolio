"use client";
import styles from "./hero.module.css";
import styleNav from "@/components/nav/navMenu/nav.module.css";
import gsap from "gsap";
import { useEffect, useContext, useRef } from "react";
import { Context } from "@/components/provider/provider.jsx";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

function HeroAni() {
  const { transition } = useContext(Context);
  const playedRef = useRef(false);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  //
  // Actual aniamtion
  //
  function animate(nav, targets, detail) {
    //
    // Nav animate in
    timelineRef.current.to(nav, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
    });
    //
    // Text animate in
    timelineRef.current.to(
      targets,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
        stagger: {
          each: 0.06,
          ease: "power1.out",
        },
      },
      "-=0.15",
    );
    //
    // Detail animate in
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
    // Animate Text setup
    const headingSplit = new SplitText(heading, {
      type: "lines",
      mask: "lines",
    });
    const paraSplit = new SplitText(para, { type: "lines", mask: "lines" });
    const targets = [...headingSplit.lines, ...paraSplit.lines];
    //
    // Setup for the animation
    gsap.set([nav, detail], {
      opacity: 0,
    });
    gsap.set(targets, { y: 96, opacity: 0 });
    //
    //Clear timeline(of old animations) and attach animation
    timelineRef.current.clear();
    animate(nav, targets, detail);
    //
    // If transion is over play and set played to true so it's not rune twice
    if (!transition) {
      timelineRef.current.play();
      playedRef.current = true;
    }
  }, [transition]);
}

export default HeroAni;
