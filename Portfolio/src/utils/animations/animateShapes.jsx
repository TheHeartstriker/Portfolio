import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
//
// Animates shapes
//
export function animateShapes(ani, elements, time, scrollTrigger) {
  const elementArray = normalizeElements(elements);

  // Set initial state for all elements at once
  gsap.set(elementArray, { [ani.axis ?? "x"]: ani.start, opacity: 0 });

  // Add all elements to the shared timeline with stagger as a group
  time.timeline.to(
    elementArray,
    {
      [ani.axis ?? "x"]: ani.end,
      opacity: 1,
      duration: time.duration,
      ease: time.easing || "power1.out",
      stagger: {
        each: time.stagger ?? 0.03,
        ease: time.staggerEase ?? "linear",
      },
      delay: time.delay ?? 0,
    },
    time.offset || "+=0",
  );

  // Single ScrollTrigger on the first element as the trigger anchor
  if (scrollTrigger) {
    ScrollTrigger.create({
      trigger: elementArray[0]?.element || elementArray[0],
      start: scrollTrigger?.start,
      end: scrollTrigger?.end,
      onEnter: () => time.timeline.play(),
    });
  }
}
//
// Flattens and combines DOM elements or node lists into a single array for animations
//
function normalizeElements(elements) {
  if (!elements) return [];

  const arr = Array.isArray(elements) ? elements : [elements];

  const flattened = [];

  arr.forEach((item) => {
    // Case 1: config object { element: ... }
    if (item && typeof item === "object" && "element" in item) {
      const el = item.element;

      if (el instanceof NodeList || el instanceof HTMLCollection) {
        flattened.push(...Array.from(el));
      } else if (el) {
        flattened.push(el);
      }
    }

    // Case 2: raw NodeList / HTMLCollection
    else if (item instanceof NodeList || item instanceof HTMLCollection) {
      flattened.push(...Array.from(item));
    }

    // Case 3: single DOM element
    else if (item instanceof HTMLElement) {
      flattened.push(item);
    }
  });

  return flattened;
}
