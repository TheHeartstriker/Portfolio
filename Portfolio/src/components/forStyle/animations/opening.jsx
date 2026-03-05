"use client";
import "./opening.css";
import { gsap } from "gsap/gsap-core";
import { useState, useEffect, useRef } from "react";
import { Context } from "./animationContext.jsx";
import { useContext } from "react";
import { usePathname } from "next/navigation";

function Opening() {
  const pathname = usePathname();
  const initialPathname = useRef(pathname);
  const [isVisible, setIsVisible] = useState(initialPathname.current === "/");
  const { setOpening } = useContext(Context);

  function slideUpDown(
    element,
    direction = "up",
    vhPercent = 50,
    vwPercent = 0,
    duration = 0.5,
    easing = "power2.out",
  ) {
    const vh = window.innerHeight * (vhPercent / 100);
    const vw = window.innerWidth * (vwPercent / 100);

    const y = direction === "up" ? -vh : vh;
    const x = direction === "left" ? -vw : vw;

    return gsap.to(element, {
      y: vhPercent ? y : 0,
      x: vwPercent ? x : 0,
      duration: duration,
      ease: easing,

      delay: 0.15,
    });
  }

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }
    const leftItems = document.querySelectorAll(".opening-container-left-item");
    const rightItems = document.querySelectorAll(
      ".opening-container-right-item",
    );

    const tl = gsap.timeline();
    tl.add(slideUpDown(leftItems[0], "up", 100, 0, 1.5, "power1.inOut"), 0);
    tl.add(slideUpDown(leftItems[1], "down", 100, 0, 1, "power1.inOut"), 0);
    tl.add(slideUpDown(rightItems[0], "up", 100, 0, 1.25, "power1.inOut"), 0);
    tl.add(slideUpDown(rightItems[1], "down", 100, 0, 1.25, "power1.inOut"), 0);

    tl.then(() => {
      setIsVisible(false);
      setOpening(false);
    });
  }, []);

  if (pathname !== "/" || !isVisible) return null;

  return (
    <div className="opening-container">
      <div className="opening-container-left">
        <div className="opening-container-left-item"></div>
        <div className="opening-container-left-item"></div>
      </div>
      <div className="opening-container-right">
        <div className="opening-container-right-item"></div>
        <div className="opening-container-right-item"></div>
      </div>
    </div>
  );
}

export default Opening;
