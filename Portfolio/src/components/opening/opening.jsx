"use client";
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef, useContext } from "react";
import { Context } from "@/components/provider/provider.jsx";
import { useRouter } from "next/navigation";
import styles from "./opening.module.css";
import RadahnRune from "@/../public/icons/radahnRune";
function Opening() {
  const router = useRouter();
  const counter = useRef(0);
  const { setTransition, transition, navPage } = useContext(Context);
  //
  // This is the orgin opening aka the first one(longer more cinima)
  //
  useEffect(() => {
    if (!transition || counter.current !== 0) {
      return;
    }
    //
    //Collect and set timeline
    const container = document.querySelector(`.${styles["opening"]}`);
    const svg = container?.querySelector("svg");
    const timeline = gsap.timeline();
    //
    //Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });
    //
    // Fade in svg
    timeline
      .to(svg, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      })
      //
      //Shrink svg
      .to(svg, {
        height: "10vh",
        width: "10vh",
        duration: 1.5,
        ease: "power1.out",
      })
      //
      // Fade out svg
      .to(svg, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      })
      //
      // Cut path animation
      .to(container, {
        keyframes: [
          // Put the top left at the top right
          {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.6,
          },
          // Put the top left at the bottom right
          {
            clipPath: "polygon(100% 100%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.6,
          },
        ],
        ease: "power2.inOut",
      })
      //
      // At the end update the overhead
      .add(() => {
        counter.current = 1;
        setTransition(false);
      });
    //
    // Closing rest opacity
    return () => {
      timeline.kill();
    };
  }, []);

  //
  // Page transition handles transitions between pages
  //
  useEffect(() => {
    if (!transition || counter.current === 0) {
      return;
    }
    //Collect and set timeline
    const container = document.querySelector(`.${styles["opening"]}`);
    const svg = container?.querySelector("svg");
    const timeline = gsap.timeline();
    //
    // Cut path animation
    timeline.to(container, {
      keyframes: [
        // Put the top left at the top right
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.6,
        },
        // Put the top left at the bottom right
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.6,
        },
      ],
      ease: "power2.inOut",
      // Switch pages the screen and scroll to top while screen is covered
      onComplete: () => {
        router.push(navPage);
        window.scrollTo({ top: 0, behavior: "instant" });
      },
    });
    //
    // Fade in svg
    timeline
      .to(svg, {
        opacity: 1,
        duration: 0.25,
        ease: "power1.out",
      })
      //Wait
      .to(
        {},
        {
          duration: 0.5,
        },
      )
      //
      // Fade out svg
      .to(svg, {
        opacity: 0,
        duration: 0.25,
        ease: "power1.out",
      })
      //
      //Cut path animation
      .to(container, {
        keyframes: [
          // Put the top left at the top right
          {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.6,
          },
          // Put the top left at the bottom right
          {
            clipPath: "polygon(100% 100%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.6,
          },
        ],
        ease: "power2.inOut",
      })
      //
      // Update overhead single ani end
      .add(() => {
        setTransition(false);
      });
    return () => {
      timeline.kill();
    };
  }, [transition]);

  return (
    <div className={styles["opening"]}>
      <RadahnRune />
    </div>
  );
}

export default Opening;
