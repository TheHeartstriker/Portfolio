import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
const activeSplits = new WeakMap();

export function animateText(ani, elements, time, scrollTrigger) {
  const elementArray = normalizeElements(elements);
  //
  //Iterate over elements
  let allTargets = [];
  elementArray.forEach((item) => {
    // Clean up previous splits
    if (activeSplits.has(item.element)) {
      activeSplits.get(item.element).split.revert();
      activeSplits.get(item.element).observer.disconnect();
    }

    // Create split
    const split = createSplit(item.element, ani.mask); // pass clip setting
    const targets = getTargets(split, ani.type);

    //Combine / add
    allTargets = allTargets.concat(targets);

    // Clip text note this makes the text's fatter it adds visable space
    if (item.clip) {
      gsap.set(split.masks, {
        paddingBottom: item.clipAmount?.bottom || "0.10em",
        paddingRight: item.clipAmount?.right || "0.10em",
        paddingLeft: item.clipAmount?.left || "0.10em",
        paddingTop: item.clipAmount?.top || "0.10em",
      });
    }

    //
    // Text observer \ Rebuilds the splits on width change
    let lastWidth = item.element.offsetWidth;
    function rebuildText() {
      const currentWidth = item.element.offsetWidth;
      if (currentWidth === lastWidth) return;
      lastWidth = currentWidth;
      //Rebuild the split since width has changed
      split.revert();
    }

    const observer = new ResizeObserver(rebuildText);
    observer.observe(item.element);

    // Store cleanup refs
    activeSplits.set(item.element, {
      split,
      observer,
    });
  });

  animate(allTargets, ani, time);

  if (scrollTrigger) {
    ScrollTrigger.create({
      trigger: elementArray[0]?.element || elementArray[0],
      start: scrollTrigger?.start,
      end: scrollTrigger?.end,
      onEnter: () => time.timeline.play(),
    });
  }
}

//Animation / ani helper
function animate(targets, ani, time) {
  gsap.set(targets, {
    y: ani.start ?? 60,
    x: 25,
    opacity: 0,
  });

  time.timeline.to(
    targets,
    {
      y: ani.end ?? 0,
      x: 0,
      opacity: 1,
      duration: time.duration,
      ease: time.easing,
      stagger: {
        each: time.stagger ?? 0.03,
        ease: time.staggerEase ?? "linear",
      },
      delay: time.delay ?? 0,
    },
    time.offset ?? "+=0",
  );
}

function normalizeElements(elements) {
  if (!elements) return [];

  // Convert to array if it's a single item
  const arr = Array.isArray(elements) ? elements : [elements];

  let flattened = [];

  arr.forEach((item) => {
    if (item && typeof item === "object" && "element" in item) {
      const el = item.element;

      if (el instanceof NodeList || el instanceof HTMLCollection) {
        // Flatten NodeList into individual config objects
        Array.from(el).forEach((node) => {
          flattened.push({
            element: node,
            clip: item.clip,
            clipAmount: item.clipAmount,
          });
        });
      } else {
        flattened.push(item);
      }
    } else {
      // Direct element (not in config object)
      flattened.push(item);
    }
  });

  return flattened;
}

//Create split text helper
function createSplit(element, mask) {
  return new SplitText(element, {
    type: "lines,words,chars",
    mask: mask || undefined,
  });
}
//Targets helper
function getTargets(split, type) {
  if (type === "chars") return split.chars;
  if (type === "lines") return split.lines;
  return split.words;
}
