"use client";
import { useEffect, useRef, useState } from "react";
import { tocScan } from "./navMenuFunc";

function NavMenu({ article, description }) {
  const [scrollPoints, setScrollPoints] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const headingRef = useRef([]);
  const screenCross = window.innerHeight * 0.25;
  //Collect all heading Y locations
  function collectHeadingYLocations() {
    const headings = document.querySelectorAll(
      ".subject-container-article h1, .subject-container-article h2, .subject-container-article h3"
    );
    const yLocations = Array.from(headings).map(
      (h) => h.getBoundingClientRect().top + window.scrollY
    );
    headingRef.current = headings;
    return yLocations;
  }
  // Determine current section based on scroll position
  function getCurrentSection(scrollY) {
    const screenPoint = scrollY + screenCross;
    for (let i = scrollPoints.length - 1; i >= 0; i--) {
      if (screenPoint >= scrollPoints[i]) {
        return i;
      }
    }
    return 0;
  }

  useEffect(() => {
    setScrollPoints(collectHeadingYLocations());
  }, [article]);

  useEffect(() => {
    function handleScroll() {
      setCurrentSection(getCurrentSection(window.scrollY));
    }

    window.addEventListener("scroll", handleScroll);
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
        {tocScan(article, currentSection, headingRef, screenCross)}
      </div>
    </div>
  );
}

export default NavMenu;
