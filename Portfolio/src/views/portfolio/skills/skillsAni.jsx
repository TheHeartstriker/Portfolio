import { useEffect } from "react";
import { animateShapes } from "@/utils/animations/animateShapes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

function SkillsAni() {
  //
  // My skills animation
  //
  useEffect(() => {
    const cards = document.querySelectorAll(".port-skills-container-card");
    const timeline = gsap.timeline({ paused: true });
    animateShapes(
      { start: 50, end: 0 },
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

export default SkillsAni;
