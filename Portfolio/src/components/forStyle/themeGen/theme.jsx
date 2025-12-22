"use client";
import { useEffect } from "react";
import { hexToHsl } from "@/utils/math";
import { useContext } from "react";
import { Context } from "../animations/animationContext";

//Create theme variables and inject into document head
function generateCSSString(colors, isDark) {
  let cssString = ":root {\n";

  Object.entries(colors).forEach(([key, hexValue]) => {
    const colorNum = key.replace("color-", "");
    const hsl = hexToHsl(hexValue);

    if (hsl) {
      // Set base color as hsl
      cssString += `  --color-${colorNum}: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);\n`;
      if (colorNum === "5" && isDark) {
        cssString += `  --graph-lines: hsl(${hsl.h}, ${hsl.s - 10}%, ${
          hsl.l + 5
        }%);\n`;
      } else if (colorNum === "5" && !isDark) {
        cssString += `  --graph-lines: hsl(${hsl.h}, ${hsl.s - 10}%, ${
          hsl.l - 5
        }%);\n`;
      }

      // Generate opacity versions from 0.1 to 0.9
      for (let i = 1; i <= 9; i++) {
        const opacity = i / 10;
        cssString += `  --opacity-color-${colorNum}-${i}: hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${opacity});\n`;
      }
    }
  });

  // Add font colors based on theme mode
  if (isDark) {
    cssString += `  --font-high: #f0f0f0;\n`;
    cssString += `  --font-middle: #c5c5c5;\n`;
    cssString += `  --font-low: #969696;\n`;
  } else {
    cssString += `  --font-high: #131313ff;\n`;
    cssString += `  --font-middle: #3a3a3a;\n`;
    cssString += `  --font-low: #696969;\n`;
  }

  cssString += "}\n";
  return cssString;
}
//Function to apply theme dynamically
export function applyTheme(theme) {
  //Check theme vars for current theme so we dont reapply
  if (!theme) return;
  const existingStyle = document.getElementById("theme-variables");
  if (existingStyle) {
    existingStyle.remove();
  }
  const styleTag = document.createElement("style");
  styleTag.id = "theme-variables";
  styleTag.textContent = generateCSSString(theme, theme.dark);
  document.head.appendChild(styleTag);
}
//Sets the default theme on load
function ThemeGen({ theme }) {
  const { setCurrTheme } = useContext(Context);

  useEffect(() => {
    if (theme) {
      setCurrTheme(theme);
      // Remove existing theme style if it exists
      const existingStyle = document.getElementById("theme-variables");
      if (existingStyle) {
        existingStyle.remove();
      }

      // Create and inject new style tag
      const styleTag = document.createElement("style");
      styleTag.id = "theme-variables";
      styleTag.textContent = generateCSSString(theme, theme.dark);
      document.head.appendChild(styleTag);
    }
  }, [theme]);

  return null;
}

export default ThemeGen;
