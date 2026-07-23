import { gsap } from "gsap/gsap-core";
import { animateShapes } from "@/utils/animations/animateShapes";
import { useEffect } from "react";

function WorkAni() {
  useEffect(() => {
    // Script cards animation
    // Large main part
    const cards = document.querySelectorAll(".port-work-item");
    cards.forEach((card) => {
      const mainCardBody = card.querySelector(".port-work-item-main");
      const timeline1 = gsap.timeline({ paused: true });
      // Animate the large block
      animateShapes(
        { start: 50, end: 0 },
        [{ element: mainCardBody }],
        {
          duration: 0.5,
          easing: "power1.out",
          timeline: timeline1,
        },
        {
          start: "top 85%",
        },
      );

      // Scoped to the stats sibling, not the main block
      const smallBlocks = card.querySelectorAll(
        ".port-work-item-stats-con, .port-work-item-stats-con-sq-it",
      );
      const timeline2 = gsap.timeline({ paused: true });

      animateShapes(
        { start: 50, end: 0 },
        [{ element: smallBlocks }],
        {
          duration: 0.4,
          stagger: 0.06,
          easing: "power1.out",
          staggerEase: "power1.out",
          timeline: timeline2,
        },
        {
          start: "top 85%",
        },
      );
    });
  }, []);
}

export default WorkAni;
