"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const pathname = usePathname();
  const timelineRef = useRef(
    gsap.timeline({
      paused: true,
      delay: 2,
      onComplete: () => {
        isAnimating.current = false;
      },
    })
  );
  const isAnimating = useRef(pathname === "/" ? true : false);
  const [addedEl, setAddedEl] = useState(0);

  useEffect(() => {
    if (isAnimating.current && addedEl >= 2) {
      timelineRef.current.play();
    }
  }, [addedEl]);

  return (
    <AnimationContext.Provider
      value={{
        isAnimating: isAnimating,
        timeline: timelineRef.current,
        addedEl: addedEl,
        setAddedEl: setAddedEl,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
