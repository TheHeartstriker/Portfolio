"use client";
import { createContext, useContext, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const pathname = usePathname();
  const timelineRef = useRef(gsap.timeline({ paused: true }));
  const isAnimating = useRef(pathname === "/" ? true : false);

  return (
    <AnimationContext.Provider
      value={{
        isAnimating: isAnimating,
        timeline: timelineRef.current,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
