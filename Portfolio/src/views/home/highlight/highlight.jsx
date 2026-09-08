"use client";
import { useState, useLayoutEffect } from "react";
import styles from "./highlight.module.css";
import HighlightAni from "./highlightAni";
import {
  highlightSubheading,
  highlightImages,
  highlightStats,
  highlightHeading1,
  highlightHeading2,
} from "./text";

function getResponsiveWidth(value, viewportWidth) {
  if (viewportWidth < 500) return `calc(${value} * 4.25)`;
  if (viewportWidth < 600) return `calc(${value} * 3.25)`;
  if (viewportWidth < 800) return `calc(${value} * 2.5)`;
  if (viewportWidth < 1000) return `calc(${value} * 2.1)`;
  if (viewportWidth < 1300) return `calc(${value} * 1.6)`;
  if (viewportWidth < 1600) return `calc(${value} * 1.4)`;
  return value;
}

function getResponsiveHeight(value, viewportWidth) {
  if (viewportWidth < 1000) {
    return `calc(${value} + var(--typo-size-48) * 2 + var(--typo-size-12))`;
  }

  if (viewportWidth < 1500) {
    return `calc(${value} + var(--typo-size-64) * 2 + var(--typo-size-12))`;
  }

  return `calc(${value} + var(--typo-size-96) * 2 + var(--typo-size-12))`;
}

function Highlight() {
  const [viewportWidth, setViewportWidth] = useState(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (viewportWidth === null) {
    return null;
  }

  return (
    <section className={styles["highlight"]}>
      <HighlightAni />
      {/*  */}
      {/* Highlight heading / details */}
      {/*  */}
      <div className={styles["highlight-main"]}>
        {highlightImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`${styles["highlight-main-item"]} ${
              index % 2 === 0 ? styles["item1"] : styles["item2"]
            }`}
            style={{
              width: getResponsiveWidth(image.width, viewportWidth),
              height: getResponsiveHeight(image.height, viewportWidth),
            }}
          >
            <img src={image.src} alt="Highlight project" />
          </div>
        ))}
      </div>

      {/*  */}
      {/* Highlight heading / details */}
      {/*  */}
      <div className={styles["highlight-con"]}>
        {/*  */}
        {/* Highlight heading */}
        <div className={styles["highlight-con-heading"]}>
          <h4>{highlightSubheading}</h4>
          <h2>
            {highlightHeading1} <br /> {highlightHeading2}
          </h2>
          <div className={styles["highlight-con-heading-indi"]}>
            <div className={styles["highlight-con-heading-indi-line1"]}></div>
            <div className={styles["highlight-con-heading-indi-line2"]}></div>
          </div>
        </div>

        <div className={styles["highlight-con-detail"]}>
          {highlightStats.map((item) => (
            <div
              key={item.label}
              className={styles["highlight-con-detail-item"]}
            >
              <h3>{item.number}</h3>
              <h4>{item.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlight;
