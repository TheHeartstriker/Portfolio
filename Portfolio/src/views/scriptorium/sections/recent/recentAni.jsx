"use client";
import { animateShapes } from "@/utils/animations/animateShapes";
import { useEffect } from "react";
import { gsap } from "gsap/gsap-core";
function RecentAni() {
  useEffect(() => {
    //
    // Recent card Ani
    //
    const recentCard = document.querySelectorAll(".scriptorium-recent-card");
    const timeline = gsap.timeline({ paused: true });
    animateShapes(
      { start: 50, end: 0 },
      [{ element: recentCard }],
      {
        duration: 0.5,
        easing: "power1.out",
        timeline: timeline,
      },
      {
        start: "top 85%",
      },
    );
  }, []);
}

export default RecentAni;
