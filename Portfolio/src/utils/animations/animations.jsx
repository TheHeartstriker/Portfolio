import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
//
// Function for animating blocks / cards
//
export function animateBlocks(pos, aniStart, aniEnd, elements, time, timeline) {
  if (!elements?.length || !time) return;

  // Use provided timeline or create a new shared one
  const sharedTimeline = timeline || gsap.timeline({ paused: true });

  // Set initial state for all elements at once
  gsap.set(elements, { [pos.type || "x"]: pos.start, opacity: 0 });

  // Add all elements to the shared timeline with stagger as a group
  sharedTimeline.to(
    elements,
    {
      [pos.type || "x"]: pos.end,
      opacity: 1,
      duration: time.duration,
      ease: time.easing || "power1.out",
      stagger: time.stagger || 0.03,
      delay: time.delay ?? 0,
    },
    time.offset || "+=0",
  );

  // Single ScrollTrigger on the first element as the trigger anchor
  if (aniStart && aniEnd) {
    ScrollTrigger.create({
      trigger: elements[0],
      start: `${aniStart.el} ${aniStart.scroll}`,
      end: `${aniEnd.el} ${aniEnd.scroll}`,
      onEnter: () => sharedTimeline.play(),
    });
  }
}
//
// Function for animating text by splitting it into characters and animating them in sequence
//
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
