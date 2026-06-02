"use client";
import { animateShapes } from "@/utils/animations/animateShapes";
import { useEffect } from "react";
import { gsap } from "gsap/gsap-core";
function ArticlesAni({ filteredArticles }) {
  useEffect(() => {
    //
    // Articles card Ani
    //
    const articleCards = document.querySelectorAll(".script-article");
    const timeline = gsap.timeline({ paused: true });
    animateShapes(
      { start: 50, end: 0, axis: "y" },
      [{ element: articleCards }],
      {
        duration: 0.5,
        easing: "power1.out",
        staggerEase: "power1.out",
        stagger: 0.06,
        timeline: timeline,
      },
      {
        start: "top 85%",
      },
    );
  }, [filteredArticles]);
}

export default ArticlesAni;
