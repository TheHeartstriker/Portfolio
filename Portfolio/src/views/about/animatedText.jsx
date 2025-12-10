"use client";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useContext } from "react";
import { AnimationContext } from "@/components/animationContext";
function AnimatedText() {
  const { isAnimating, timeline } = useContext(AnimationContext);
  function gsapAnimation() {
    const textSplit = new SplitText(".text-1, .text-2, .text-3, .text-4", {
      type: "words",
    });
    gsap.set([textSplit.words], { y: "100%", opacity: 0 });
    gsap.to([textSplit.words], {
      y: "0%",
      opacity: 1,
      duration: 0.75,
      stagger: 0.05,
      ease: "power2.out",
      delay: 3.5,
    });
  }
  useEffect(() => {
    if (isAnimating.current) {
      gsapAnimation();
    }
  }, []);
}

export default AnimatedText;
