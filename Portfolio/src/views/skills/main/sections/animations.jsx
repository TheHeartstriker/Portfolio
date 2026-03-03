import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateBlocks(pos, aniStart, aniEnd, elements, time) {
  if (!elements?.length || !time) return;

  // Use provided timeline or create a new shared one
  const sharedTimeline = time.timeline || gsap.timeline({ paused: true });

  // Set initial state for all elements at once
  gsap.set(elements, { [pos.type || "x"]: pos.start, opacity: 0 });

  // Add all elements to the shared timeline with stagger as a group
  sharedTimeline.to(elements, {
    [pos.type || "x"]: pos.end,
    opacity: 1,
    duration: time.duration,
    ease: time.easing || "power1.out",
    stagger: 0.06,
    delay: time.delay ?? 0,
  });

  // Single ScrollTrigger on the first element as the trigger anchor
  ScrollTrigger.create({
    trigger: elements[0],
    start: `${aniStart.el} ${aniStart.scroll}`,
    end: `${aniEnd.el} ${aniEnd.scroll}`,
    markers: false,
    onEnter: () => sharedTimeline.play(),
  });
}
