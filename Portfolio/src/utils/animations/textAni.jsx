import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

export function animateText(startPos, endPos, element, timeline, location) {
  if (!element) return;

  const letters = new SplitText(element, { type: "chars" }).chars;
  // Set initial state
  gsap.set(letters, { x: startPos, opacity: 0 });

  timeline.to(
    letters,
    {
      x: endPos,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.03,
    },
    `${location || 0}`,
  );

  ScrollTrigger.create({
    trigger: element,
    start: "top 100%",
    onEnter: () => timeline.play(),
  });
}
