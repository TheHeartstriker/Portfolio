"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { animateText } from "@/utils/animations/animateText";
import styles from "./skills.module.css";
function SkillsAni({ index, set, cards }) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    //
    // Get vars
    //
    const cardDetails = document.querySelector(
      `.${styles["skills-con-info"]} p`,
    );
    const cardHeading = document.querySelector(
      `.${styles["skills-con-heading"]} h2`,
    );
    if (!cardDetails || !cardHeading) return;
    //
    // Actial animation
    //
    gsap.timeline().to([cardDetails, cardHeading], {
      //
      // Inital animation fade out text
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
      //
      // When done
      onComplete: () => {
        // Update the new card aka the truth
        set(cards[index]);
        //Animate the next truth into the page
        requestAnimationFrame(() => {
          const newDetails = document.querySelector(
            `.${styles["skills-con-info"]} p`,
          );
          const newHeading = document.querySelector(
            `.${styles["skills-con-heading"]} h2`,
          );
          if (!newDetails || !newHeading) return;
          gsap.set([newDetails, newHeading], { opacity: 1 });
          const revealTimeline = gsap.timeline();
          //Actual animation
          animateText(
            { start: 32, end: 0, type: "lines", mask: "lines" },
            [
              { element: newDetails },
              {
                element: newHeading,
                clip: true,
                clipAmount: {
                  bottom: "0.1em",
                  top: "0em",
                  left: "0em",
                  right: "0em",
                },
              },
            ],
            {
              duration: 0.4,
              easing: "power2.out",
              stagger: 0.06,
              staggerEase: "power2.out",
              timeline: revealTimeline,
              offset: "+=0",
            },
          );
        });
      },
    });
  }, [index]);

  return null;
}

export default SkillsAni;
