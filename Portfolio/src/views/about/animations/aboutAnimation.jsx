import { gsap } from "gsap/gsap-core";
import { useEffect } from "react";
import { animateText } from "@/utils/animations/textAni";
import { animateBlocks } from "@/utils/animations/animations";
import { Context } from "@/components/forStyle/animations/animationContext.jsx";
import { useContext } from "react";

function AboutAnimation() {
  const { opening, setOpening } = useContext(Context);
  function initAnimations() {
    let delay = 0;
    if (opening) {
      delay = 2.25;
    }

    const timeline = gsap.timeline();
    const header = document.querySelector(".about-hero-section h1");
    const subHeader = document.querySelector(".about-hero-section h2");
    animateText({ start: 200, end: 0 }, [subHeader, header], timeline, {
      duration: 0.75,
      easing: "power2.out",
      delay: delay,
    });
    const blocks = document.querySelectorAll(
      ".about-hero-section-info-text, .about-hero-section-info button",
    );
    animateBlocks(
      { start: 50, end: 0, type: "y" },
      null,
      null,
      blocks,
      {
        duration: 0.75,
        easing: "power1.out",
        offset: "-=0.25",
        stagger: 0.25,
      },
      timeline,
    );
  }

  useEffect(() => {
    initAnimations();
  }, []);
}

export default AboutAnimation;
