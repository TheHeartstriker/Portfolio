"use client";
import Poly from "@/components/svg/polyArt.jsx";
import { useEffect, useRef, useState } from "react";
//
// Helper functions
//
function rgbToHsl(rgb) {
  const result = rgb.match(/\d+/g)?.map((num) => parseInt(num, 10));
  if (!result || result.length < 3) return null;
  let [r, g, b] = result;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function darkenColorDistance(i, distanceMax = 1000, intensity = [0.01, 0.99]) {
  let el = document.getElementById(i.id);
  if (!el) return;
  let distance = i.distanceToMouse;
  // Normalize distance
  const norm = intensity[0] + intensity[1] * (distance / distanceMax);
  const lightness = Math.round(i.color[2] * norm);

  // Glow strength: closer = stronger
  const glowStrength = Math.round(16 * (1 - distance / distanceMax)); // 0-16px
  const glowColor = `hsl(${i.color[0]}, ${i.color[1]}%, ${lightness + 20}%)`;

  el.style.fill = `hsl(${i.color[0]}, ${i.color[1]}%, ${lightness}%)`;
  el.style.stroke = `hsl(${i.color[0]}, ${i.color[1]}%, ${lightness}%)`;
  el.style.transition =
    "fill 0.3s linear, stroke 0.3s linear, filter 0.3s linear";
  el.style.filter = `drop-shadow(0 0 ${glowStrength}px ${glowColor})`;
}

// Main App
function App() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const otherPolyRef = useRef([]);
  const svgRef = useRef(null);

  function mouseMove(e) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    // Calculate mouse position relative to SVG
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Only update if mouse is inside SVG bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    mouseRef.current.x = x;
    mouseRef.current.y = y;

    for (const i of otherPolyRef.current) {
      updateDistances(i);
      darkenColorDistance(i, 1000, [0.2, 0.8]);
    }
  }

  //Loops and saves the intial distance, color and id of each poly
  function fillPoly() {
    let amount = 109;
    const svgRect = svgRef.current.getBoundingClientRect();
    for (let i = 1; i < amount; i++) {
      let poly = {
        id: "",
        distanceToMouse: 0,
        color: [0, 0, 0],
        elCenter: new DOMRect(),
      };
      let el = document.getElementById(`Vector${i}`);
      if (!el) continue;
      poly["id"] = `Vector${i}`;
      let elXY = el.getBoundingClientRect();
      if (!elXY) continue;
      // Center relative to SVG
      const centerX = elXY.x + elXY.width / 2 - svgRect.left;
      const centerY = elXY.y + elXY.height / 2 - svgRect.top;
      poly["elCenter"] = { x: centerX, y: centerY };
      // Distance to mouse (relative to SVG)
      const distance = Math.sqrt(
        (centerX - mouseRef.current.x) ** 2 +
          (centerY - mouseRef.current.y) ** 2
      );
      poly["distanceToMouse"] = distance;
      let hslColor = rgbToHsl(window.getComputedStyle(el).fill);
      el.style.stroke = "black";
      poly["color"] = hslColor ?? [0, 0, 0];
      otherPolyRef.current.push(poly);
    }
  }
  function updateCenter() {
    const svgRect = svgRef.current.getBoundingClientRect();
    for (const i of otherPolyRef.current) {
      let elXY = document.getElementById(i.id)?.getBoundingClientRect();
      if (!elXY) continue;
      // Center relative to SVG
      i.elCenter = {
        x: elXY.x + elXY.width / 2 - svgRect.left,
        y: elXY.y + elXY.height / 2 - svgRect.top,
      };
    }
  }
  //updates distance to mouse
  function updateDistances(i) {
    let elCenter = i.elCenter;
    if (!elCenter) return;
    const distance = Math.sqrt(
      (elCenter.x - mouseRef.current.x) ** 2 +
        (elCenter.y - mouseRef.current.y) ** 2
    );
    i.distanceToMouse = distance;
  }

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", updateCenter);
    return () => {
      svg.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", updateCenter);
    };
  }, []);

  useEffect(() => {
    if (otherPolyRef.current.length > 0) return;
    fillPoly();
    updateCenter();
  }, []);

  return <Poly ref={svgRef} />;
}

export default App;
