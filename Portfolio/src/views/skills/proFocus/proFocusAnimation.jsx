import { useEffect } from "react";
import { animateShapes } from "@/utils/animations/animateShapes";
import gsap from "gsap";
function ProFocusAnimation() {
  //
  // Process animation
  //
  useEffect(() => {
    const cards = document.querySelectorAll(".skill-process-main-card");
    const timeline = gsap.timeline({ paused: true });
    animateShapes(
      { start: 50, end: 0, axis: "y" },
      [{ element: cards }],
      {
        duration: 0.5,
        stagger: 0.06,
        staggerEase: "power1.out",
        easing: "power1.out",
        timeline: timeline,
      },
      {
        start: "top 85%",
      },
    );
  }, []);

  //
  // Focus animation
  //
  useEffect(() => {
    const cards = document.querySelectorAll(".skill-focus-container-card");
    const timeline = gsap.timeline({ paused: true });
    animateShapes(
      { start: 50, end: 0, axis: "y" },
      [{ element: cards }],
      {
        duration: 0.5,
        stagger: 0.06,
        staggerEase: "power1.out",
        easing: "power1.out",
        timeline: timeline,
      },
      {
        start: "top 85%",
      },
    );
  }, []);
}

export default ProFocusAnimation;
