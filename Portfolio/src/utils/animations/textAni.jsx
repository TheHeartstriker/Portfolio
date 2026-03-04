import { stagger } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function animateText(pos, elements, timeline, time) {
  // Accept either a single element or an array of elements
  const elementArray = Array.isArray(elements) ? elements : [elements];

  if (!elementArray.length || !elementArray[0]) return;

  elementArray.forEach((element, index) => {
    if (!element) return;

    const letters = new SplitText(element, { type: "chars" }).chars;
    // Set initial state
    gsap.set(letters, { x: pos.start, opacity: 0 });

    timeline.to(
      letters,
      {
        x: pos.end,
        opacity: 1,
        duration: time.duration,
        ease: time.easing,
        stagger: 0.03,
      },
      "-=0.2",
    );
  });
}
