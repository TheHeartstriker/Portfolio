"use client";
import { useEffect, useState } from "react";
import { tocScan } from "./navMenuFunc";

function NavMenu({ article, description }) {
  const [scrollPoints, setScrollPoints] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const screenCross = window.innerHeight * 0.25;

  function collectHeadingYLocations() {
    const headings = document.querySelectorAll(
      ".subject-container-article h1, .subject-container-article h2, .subject-container-article h3"
    );
    const yLocations = Array.from(headings).map(
      (h) => h.getBoundingClientRect().top + window.scrollY
    );
    console.log(yLocations);
    return yLocations;
  }

  function getCurrentSection(scrollY) {
    const midPoint = scrollY + screenCross;

    // Find the section that the midpoint has crossed
    for (let i = scrollPoints.length - 1; i >= 0; i--) {
      if (midPoint >= scrollPoints[i]) {
        return i;
      }
    }
    return 0;
  }

  useEffect(() => {
    const yLocations = collectHeadingYLocations();
    setScrollPoints(yLocations);
  }, [article]);

  useEffect(() => {
    function handleScroll() {
      const currentSectionIndex = getCurrentSection(window.scrollY);
      setCurrentSection(currentSectionIndex);
      console.log(
        "Current Section:",
        document.querySelector(`#toc-section-${currentSectionIndex}`)
      );
    }

    window.addEventListener("scroll", handleScroll);
    // Set initial section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPoints, screenCross]);

  return (
    <div className="article-nav-Menu">
      {/* Published time */}
      {/*  */}
      <div className="published-time">
        <h3>Published</h3>
        <p>
          {description.date
            ? `${description.date.day} ${description.date.month} ${description.date.year}`
            : "Unknown"}
        </p>
      </div>
      {/* Article Topics */}
      {/*  */}
      <h2>Article Topics</h2>
      <div className="article-topic">
        {description.tags.map((tag, idx) => (
          <h3 key={idx}>{tag}</h3>
        ))}
      </div>
      {/* Table of Contents */}
      {/*  */}
      <h2>Table of Contents</h2>
      <div className="table-of-contents">
        {tocScan(article, currentSection)}
      </div>
    </div>
  );
}

//For secondary elements reduce the left side width by 20% for each level of depth

export default NavMenu;
