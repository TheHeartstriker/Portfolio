import { animateBlocks } from "../../../utils/animations/animations";
import { useEffect } from "react";
function LightSkillAnimation() {
  useEffect(() => {
    animateBlocks(
      { start: -100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll("#gal-arrow-1"),
      { duration: 0.85, delay: 0, easing: "power2.out" },
    );
    animateBlocks(
      { start: 100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll("#gal-arrow-2"),
      { duration: 1.25, delay: 0, easing: "back.out(1.05)" },
    );
    animateBlocks(
      { start: 100, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll(".skill-highlights-gal-item"),
      { duration: 0.85, delay: 0, easing: "power2.out" },
    );
  }, []);

  useEffect(() => {
    animateBlocks(
      { start: 100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll(".skill-myskills-container-card"),
      { duration: 1.25, delay: 0, easing: "back.out(1.05)" },
    );
  }, []);
}

export default LightSkillAnimation;
