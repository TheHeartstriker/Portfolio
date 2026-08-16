"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./footer.module.css";

gsap.registerPlugin(ScrollTrigger);

function FooterAni() {
  useEffect(() => {
    const footer = document.querySelector(`.${styles["footer"]}`);
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { yPercent: -15 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}

export default FooterAni;
