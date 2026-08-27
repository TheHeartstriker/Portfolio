"use client";
import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import styles from "./journey.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function cssLengthToPx(value) {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.height = value;
  document.body.appendChild(probe);
  const px = parseFloat(getComputedStyle(probe).height);
  document.body.removeChild(probe);
  return px;
}

export function JourneyAni({ journeyRef, journeyConRef, journeyConItemRef }) {
  useLayoutEffect(() => {
    const section = journeyRef.current;
    const con = journeyConRef.current;
    const items = journeyConItemRef.current.filter(Boolean);

    if (!section || !con || items.length < 2) return;

    const ctx = gsap.context(() => {
      const space32 = cssLengthToPx(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--space-32",
        ),
      );

      // cache all rects up front, before any transforms exist
      const conRect = con.getBoundingClientRect();
      const itemRects = items.map((it) => it.getBoundingClientRect());
      const h4Rects = items.map((it) =>
        it.querySelector("h4").getBoundingClientRect(),
      );

      const deltas = [null]; // deltas[i] = shift applied at step i
      for (let i = 1; i < items.length; i++) {
        const prevRect = itemRects[i - 1];
        const currRect = itemRects[i];
        const prevH4Rect = h4Rects[i - 1];

        const h4BottomWithinPrev =
          prevH4Rect.top - prevRect.top + prevH4Rect.height;
        const dockTop = prevRect.top + h4BottomWithinPrev + space32;

        deltas.push(dockTop - currRect.top);
      }

      // total cumulative shift on the LAST item = sum of every step's delta
      const totalShiftLast = deltas.slice(1).reduce((acc, d) => acc + d, 0);

      const lastRect = itemRects[items.length - 1];
      const finalHeight =
        lastRect.top - conRect.top + lastRect.height + totalShiftLast;

      // collapse the container to its true final height so nothing
      // leaves a gap once the pin releases
      con.style.height = `${finalHeight}px`;
      con.style.position = con.style.position || "relative";

      // total scroll distance = total pixels actually traveled,
      // so scroll speed and visual movement speed match 1:1
      const totalDistance = deltas
        .slice(1)
        .reduce((acc, d) => acc + Math.abs(d), 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalDistance}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < items.length; i++) {
        const delta = deltas[i];
        const movingItems = items.slice(i);

        tl.to(movingItems, {
          y: `+=${delta}`,
          ease: "none",
          duration: Math.abs(delta) || 0.0001,
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);
}
