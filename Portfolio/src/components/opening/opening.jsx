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
      counter.current = 1;
      setTransition(false);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    //
    // Animate
    timeline
      .to(svg, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      })
      .to(svg, {
        height: "5vh",
        width: "5vh",
        duration: 1.5,
        ease: "power1.out",
      })

      .to(container, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        onComplete: () => {
          onComplete();
        },
      });
    //
    // Closing rest opacity
    return () => {
      timeline.kill;
    };
  }, []);

  return (
    <div className={styles["opening"]}>
      <RadahnRune />
    </div>
  );
}

export default Opening;
