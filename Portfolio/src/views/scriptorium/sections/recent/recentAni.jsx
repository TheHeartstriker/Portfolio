"use client";
import { animateBlocks, animateText } from "@/utils/animations/animations.jsx";
import { useEffect } from "react";
import { gsap } from "gsap/gsap-core";
function RecentAni() {
  useEffect(() => {
    //
    // Recent card Ani
    //
    const recentCard = document.querySelectorAll(".scriptorium-recent-card");
    animateBlocks(
      { start: 100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      recentCard,
      {
        duration: 1,
        delay: 0,
        easing: "back.out(1.1)",
      },
    );
  }, []);
}

export default RecentAni;
