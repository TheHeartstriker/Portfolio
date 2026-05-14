import { useEffect } from "react";
import { animateBlocks } from "../../../utils/animations/animations";
function ProFocusAnimation() {
  useEffect(() => {
    animateBlocks(
      { start: -100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll(".skill-process-main-card"),
      { duration: 1, delay: 0, easing: "power2.out" },
    );
    animateBlocks(
      { start: 100, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll(".skill-focus-container-card"),
      { duration: 1.25, delay: 0, easing: "back.out(1.1)" },
    );
  }, []);
}

export default ProFocusAnimation;
