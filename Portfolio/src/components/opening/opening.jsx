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
  const { setTransition, transition, setNavOpen, navPage } =
    useContext(Context);
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
    //Complete and scroll to top
    function onComplete() {
      window.scrollTo({ top: 0, behavior: "instant" });
      counter.current = 1;
      setTransition(false);
    }
    //
    // Animate / Fade in svg fast
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
        duration: 1,
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
            duration: 0.5,
          },
          // Put the top left at the bottom right
          {
            clipPath: "polygon(100% 100%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.5,
          },
        ],
        ease: "power2.inOut",
        onComplete: () => {
          onComplete();
        },
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

  return (
    <div className={styles["opening"]}>
      <RadahnRune />
    </div>
  );
}

export default Opening;
