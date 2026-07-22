"use client";

import { useEffect } from "react";
import { animateShapes } from "@/utils/animations/animateShapes";
import gsap from "gsap";

function ProcessAni() {
  useEffect(() => {
    const cards = document.querySelectorAll(".port-process-main-card");

    if (!cards.length) return;

    const timeline = gsap.timeline({ paused: true });
    animateShapes(
      { start: 50, end: 0, axis: "y" },
      [{ element: cards }],
      {
        duration: 0.5,
        stagger: 0.06,
        staggerEase: "power1.out",
        easing: "power1.out",
        timeline,
      },
      {
        start: "top 85%",
      },
    );
  }, []);

  return null;
}

export default ProcessAni;
