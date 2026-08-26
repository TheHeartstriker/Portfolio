"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollMotion({ item, moveDirection, moveAmount, start, end }) {
  useEffect(() => {
    const element = document.querySelector(item);
    if (!element) return;

    const ctx = gsap.context(() => {
      const axis = `${moveDirection}Percent`;

      gsap.fromTo(
        element,
        { [axis]: moveAmount },
        {
          [axis]: 0,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub: true,
            markers: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [item, moveDirection, moveAmount, start, end]);

  return null;
}

export default ScrollMotion;
