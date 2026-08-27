"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

function ScrollMotion({ item, moveDirection, moveAmount, start, end }) {
  const pathname = usePathname();

  useEffect(() => {
    let frameId;
    const ctx = gsap.context(() => {});

    frameId = requestAnimationFrame(() => {
      const element = document.querySelector(item);
      if (!element) return;

      ctx.add(() => {
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
            },
          },
        );
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frameId);
      ctx.revert();
    };
  }, [item, moveDirection, moveAmount, start, end, pathname]);

  return null;
}

export default ScrollMotion;
