import { useState, useEffect } from "react";
//Used to pass colors to helper functions
export function useColors(currTheme) {
  // Accept theme as parameter
  const [colors, setColors] = useState({
    bgColor: "rgba(255, 255, 255, 0.8)",
    brColor: "rgba(0, 0, 0, 1)",
    textColor: "rgba(0, 0, 0, 1)",
  });

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setColors({
      bgColor:
        root.getPropertyValue("--color-3").trim() || "rgba(255, 255, 255, 0.8)",
      brColor: root.getPropertyValue("--color-2").trim() || "rgba(0, 0, 0, 1)",
      textColor:
        root.getPropertyValue("--font-high").trim() || "rgba(0, 0, 0, 1)",
    });
  }, [currTheme]); // Re-run when theme changes

  return colors;
}
