"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function getCssNumber(name, fallback) {
  if (typeof window === "undefined") return fallback;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function LayoutGuide({ color = "rgba(255, 0, 0, 0.15)" }) {
  const [layout, setLayout] = useState(() => ({
    columns: 12,
    gutter: 1.5,
    margin: 1.5,
  }));

  useEffect(() => {
    const updateLayout = () => {
      setLayout({
        columns: getCssNumber("--grid-columns", 12),
        gutter: getCssNumber("--gutter", 1.5),
        margin: getCssNumber("--margin", 1.5),
      });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    window.addEventListener("orientationchange", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("orientationchange", updateLayout);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        gap: `${layout.gutter}rem`,
        paddingInline: `${layout.margin}rem`,
        boxSizing: "border-box",
      }}
    >
      {Array.from({ length: layout.columns }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: color,
          }}
        />
      ))}
    </div>
  );
}

LayoutGuide.propTypes = {
  color: PropTypes.string,
};

export default LayoutGuide;
