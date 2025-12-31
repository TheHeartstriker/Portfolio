"use client";
import { createContext, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import PropTypes from "prop-types";
export const Context = createContext();
import { winterTheme } from "@/components/forStyle/themeGen/themes";

export function Provider({ children }) {
  const pathname = usePathname();
  const [addedEl, setAddedEl] = useState(0);
  const [currTheme, setCurrTheme] = useState(winterTheme);
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

  useEffect(() => {
    if (isAnimating && addedEl >= 2) {
      timelineRef.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedEl]);

  return (
    <Context.Provider
      value={{
        isAnimating: isAnimating,
        timeline: timelineRef.current,
        addedEl: addedEl,
        setAddedEl: setAddedEl,
        currTheme: currTheme,
        setCurrTheme: setCurrTheme,
      }}
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
