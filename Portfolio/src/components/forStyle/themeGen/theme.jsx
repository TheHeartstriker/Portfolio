"use client";
import { useEffect } from "react";

function ThemeGen({ theme }) {
  function hexToHsl(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: h * 360,
      s: s * 100,
      l: l * 100,
    };
  }

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

  useEffect(() => {
    if (theme) {
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
