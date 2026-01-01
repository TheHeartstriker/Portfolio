"use client";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useContext } from "react";
import { Context } from "@/components/forStyle/animations/animationContext";
function AnimatedAbout() {
  const { isAnimating, timeline, setAddedEl } = useContext(Context);
  function gsapAnimation() {
    const textSplit = new SplitText(".text-1, .text-2, .text-3, .text-4", {
      type: "words",
      aria: false,
    });
    const downcontainer = document.querySelector(".i-am-container button");

    gsap.set(downcontainer, { opacity: 0, y: "25px" });
    gsap.set([textSplit.words], { y: "100%", opacity: 0 });
    timeline.to(
      [textSplit.words],
      {
        y: "0%",
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
        ease: "power1.out",
      },
      "-=0.5"
    );
    timeline.to(
      downcontainer,
      {
        opacity: 1,
        duration: 1,
        y: "0px",
        ease: "power1.out",
      },
      "-=0.25"
    );
    setAddedEl((prev) => prev + 1);
  }
  useEffect(() => {
    if (isAnimating) {
      gsapAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default AnimatedAbout;
