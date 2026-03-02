import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

export function animateBlocks(startPos, endPos, elements, timeline, location) {
  if (!elements || elements.length === 0) return;

  elements.forEach((element, index) => {
    // Set initial state
    gsap.set(element, { x: startPos, opacity: 0 });

    timeline.to(
      element,
      {
        x: endPos,
        opacity: 1,
        duration: 1.75,
        ease: "back.out(1.7)",
        stagger: 0.03,
      },
      `${location || 0}+=${index * 0.2}`, // Stagger start times for each element
    );

    ScrollTrigger.create({
      trigger: element,
      start: "top 100%",
      onEnter: () => timeline.play(),
    });
  });
}
