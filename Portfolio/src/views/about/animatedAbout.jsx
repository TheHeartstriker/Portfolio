"use client";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useContext } from "react";
import { Context } from "@/components/forStyle/animations/animationContext";
function AnimatedAbout() {
  const { isAnimating, timeline, setAddedEl } = useContext(Context);
  function openingGsapAnimation(timeline, isAnimating) {
    if (!isAnimating || !timeline) {
      timeline = gsap.timeline();
    }

    const textSplit = new SplitText(".text-1, .text-2, .text-3, .text-4", {
      type: "words",
      aria: false,
    });
    const downcontainer = document.querySelector(".i-am-container button");

    gsap.set(downcontainer, { opacity: 0, y: "25px" });
    gsap.set([textSplit.words], { y: "100%", opacity: 0 });

    const position = isAnimating ? "-=0.5" : "+=0.25";

    timeline.to(
      [textSplit.words],
      {
        y: "0%",
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
        ease: "power1.out",
      },
      position,
    );
    timeline.to(
      downcontainer,
      {
        opacity: 1,
        duration: 1,
        y: "0px",
        ease: "power1.out",
      },
      "-=0.25",
    );
    if (isAnimating) {
      setAddedEl((prev) => prev + 1);
    }
  }

  useEffect(() => {
    openingGsapAnimation(timeline, isAnimating);

    const downcontainer = document.querySelector(".i-am-container button");

    if (downcontainer) {
      downcontainer.addEventListener("mouseenter", () => {
        gsap.to(downcontainer, {
          scale: 1.05,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      downcontainer.addEventListener("mouseleave", () => {
        gsap.to(downcontainer, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default AnimatedAbout;
