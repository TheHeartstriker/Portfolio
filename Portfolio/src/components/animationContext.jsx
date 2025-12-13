"use client";
import { createContext, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import PropTypes from "prop-types";
export const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const pathname = usePathname();
  const timelineRef = useRef(
    gsap.timeline({
      paused: true,
      delay: 2, // For the background animation to finish
      onComplete: () => {
        setIsAnimating(false);
      },
    })
  );
  const [isAnimating, setIsAnimating] = useState(
    pathname === "/" ? true : false
  );
  const [addedEl, setAddedEl] = useState(0);

  useEffect(() => {
    if (isAnimating && addedEl >= 2) {
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

AnimationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
