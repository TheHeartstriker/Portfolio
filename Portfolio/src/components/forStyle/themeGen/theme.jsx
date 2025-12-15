import { useEffect } from "react";

function ThemeGen({ auto, color }) {
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }
    return null;
  }

  function generateColorVariables(colors) {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, hexValue]) => {
      const colorNum = key.replace("color-", "");
      const rgb = hexToRgb(hexValue);

      if (rgb) {
        // Set base color as rgb
        root.style.setProperty(
          `--color-${colorNum}`,
          `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        );

        // Generate opacity versions from 0.1 to 0.9
        for (let i = 1; i <= 9; i++) {
          const opacity = i / 10;
          root.style.setProperty(
            `--opacity-color-${colorNum}-${i}`,
            `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
          );
        }
      }
    });
  }

  // Generate variables when component mounts or color changes
  useEffect(() => {
    if (color) {
      generateColorVariables(color);
    }
  }, [color]);

  return null;
}

export default ThemeGen;
