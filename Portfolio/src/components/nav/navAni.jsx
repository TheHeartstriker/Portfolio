"use client";
import { useEffect } from "react";
import gsap from "gsap";
import styles from "./nav.module.css";

function NavAni() {
  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });
    const nav = document.querySelector(`.${styles["nav"]}`);

    timeline.to(nav, {
      backgroundColor: "var(--dark-2)",
      padding: "var(--space-16)",
      duration: 0.5,
      ease: "power2.out",
    });

    function handleScroll() {
      window.scrollY > 10 ? timeline.play() : timeline.reverse();
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      timeline.kill();
    };
  }, []);

  return null;
}

export default NavAni;
