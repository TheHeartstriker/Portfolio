import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function animateText(pos, elements, timeline, time) {
  // Accept either a single element or an array of elements
  const elementArray = Array.isArray(elements) ? elements : [elements];

  if (!elementArray.length || !elementArray[0]) return;

  elementArray.forEach((element, index) => {
    if (!element) return;

    const split = new SplitText(element, { type: "words,chars" });
    const letters = split.chars;
    // Set initial state
    gsap.set(letters, { x: pos.start, opacity: 0, y: -10, rotation: -5 });

    const position =
      index === 0 ? (time.offset ?? "+=0") : (time.subsequentOffset ?? "-=0.4");

    timeline.to(
      letters,
      {
        x: pos.end,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: time.duration,
        ease: time.easing,
        stagger: time.stagger ?? 0.03,
        delay: index === 0 ? (time.delay ?? 0) : 0,
      },
      position,
    );
  });
}
