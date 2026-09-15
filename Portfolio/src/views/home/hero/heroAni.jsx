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
  const splitsRef = useRef([]);
  //
  // Actual aniamtion
  //
  function animate(nav, targets, detail) {
    //
    // Text animate in
    timelineRef.current.to(targets, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power1.out",
      stagger: {
        each: 0.06,
        ease: "power1.out",
      },
    });
    //
    // Nav animate in
    timelineRef.current.to(nav, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
    });
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
    // Animate Text setup and update splits
    const headingSplit = new SplitText(heading, {
      type: "lines",
      mask: "lines",
    });
    const paraSplit = new SplitText(para, { type: "lines", mask: "lines" });
    const targets = [...headingSplit.lines, ...paraSplit.lines];
    splitsRef.current = [
      { element: heading, split: headingSplit, lastWidth: heading.offsetWidth },
      { element: para, split: paraSplit, lastWidth: para.offsetWidth },
    ];
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
  //
  // Resize observer to rebuild the splits on width change
  //
  useEffect(() => {
    let resizeTimeout;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        splitsRef.current.forEach((entry) => {
          const currentWidth = entry.element.offsetWidth;
          if (currentWidth === entry.lastWidth) return;
          entry.lastWidth = currentWidth;

          entry.split.revert();
          entry.split = new SplitText(entry.element, {
            type: "lines",
            mask: "lines",
          });
          gsap.set(entry.split.lines, { y: 0, opacity: 1 });
        });
      }, 150);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [splitsRef.current]);
}

export default HeroAni;
