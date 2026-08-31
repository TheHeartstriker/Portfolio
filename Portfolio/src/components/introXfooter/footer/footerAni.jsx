"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./footer.module.css";
import { animateText } from "@/utils/animations/animateText";
import { usePathname } from "next/navigation";
import { useEffect, useContext } from "react";
import { Context } from "@/components/provider/provider.jsx";

gsap.registerPlugin(ScrollTrigger);

function FooterAni() {
  const { transition } = useContext(Context);
  const pathname = usePathname();
  //
  // The text animmation ps this can be considered a open / heading ani
  //
  useEffect(() => {
    const ctx = gsap.context(() => {
      //
      //Vars
      const text = document.querySelector(`.${styles["footer-bottom"]} h4`);
      if (!text) return;
      const textHeight = text.getBoundingClientRect().height;
      //
      //Timeline and trigger
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: `top+=${textHeight * 1.5} bottom`,
          once: true,
        },
      });
      //
      //Text ani
      animateText(
        { start: 128, end: 0, type: "chars", mask: "chars" },
        [{ element: text }],
        {
          duration: 0.6,
          easing: "power1.out",
          stagger: 0.06,
          staggerEase: "power1.out",
          timeline: timeline,
        },
      );
    });

    return () => ctx.revert();
  }, [pathname, transition]);

  return null;
}

export default FooterAni;
