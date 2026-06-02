import { useEffect } from "react";
import { animateShapes } from "@/utils/animations/animateShapes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

function LightSkillAnimation() {
  //
  // Highlights animation
  //
  useEffect(() => {
    const leftButton = document.querySelector("#gal-arrow-1");
    const rightButton = document.querySelector("#gal-arrow-2");
    const mainViewer = document.querySelectorAll(".skill-highlights-gal-item");
    const timeline = gsap.timeline({ paused: true });
    //
    //Left side animate
    animateShapes({ start: -50, end: 0 }, [{ element: leftButton }], {
      duration: 0.4,
      easing: "power1.out",
      timeline: timeline,
    });
    //
    //Right side animate
    animateShapes({ start: 50, end: 0 }, [{ element: rightButton }], {
      duration: 0.4,
      easing: "power1.out",
      timeline: timeline,
      offset: "<",
    });
    //
    //Viewer animate
    animateShapes(
      { start: 100, end: 0, axis: "y" },
      [{ element: mainViewer }],
      {
        duration: 0.5,
        easing: "power1.out",
        timeline: timeline,
      },
    );
    ScrollTrigger.create({
      trigger: leftButton,
      start: "top 85%",
      onEnter: () => timeline.play(),
    });
  }, []);
  //
  // My skills animation
  //
  useEffect(() => {
    const cards = document.querySelectorAll(".skill-myskills-container-card");
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

export default LightSkillAnimation;
