import { animateShapes } from "@/utils/animations/animateShapes";
import { useEffect } from "react";
import gsap from "gsap";
function FAQAni() {
  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });
    const faqCards = document.querySelectorAll(".contact-faq-container-item");
    animateShapes(
      { start: 50, end: 0 },
      [{ element: faqCards }],
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

export default FAQAni;
