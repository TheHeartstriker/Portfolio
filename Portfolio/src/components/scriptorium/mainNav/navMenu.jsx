"use client";
import { useEffect, useRef, useState } from "react";
import { tocScan } from "./navMenuHelper.jsx";
import PropTypes from "prop-types";
import "./navMenu.css";

function NavMenu({ article, description }) {
  const [scrollPoints, setScrollPoints] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const [navMenuTop, setNavMenuTop] = useState(62);
  const headingRef = useRef([]);
  const [screenCross, setScreenCross] = useState(0);
  const linearInterNavSet = {
    initialTop: 62,
    finalTop: 50,
    scrollDistance: 300,
  };

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

  // Calculate top value based on scroll position
  function calculateTopValue(scrollY) {
    if (scrollY <= 0) return linearInterNavSet.initialTop;
    if (scrollY >= linearInterNavSet.scrollDistance)
      return linearInterNavSet.finalTop;

    const progress = scrollY / linearInterNavSet.scrollDistance;
    return (
      linearInterNavSet.initialTop -
      progress * (linearInterNavSet.initialTop - linearInterNavSet.finalTop)
    );
  }

  useEffect(() => {
    function handleResize() {
      setScreenCross(window.innerHeight / 3);
      setScrollPoints(collectHeadingYLocations());
      setShowMenu(window.innerWidth > 1500);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [article]);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setCurrentSection(getCurrentSection(scrollY));
      setNavMenuTop(calculateTopValue(scrollY));
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPoints, screenCross]);

  if (!showMenu) return null;

  return (
    <nav className="article-nav-Menu" style={{ top: `${navMenuTop}%` }}>
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
    </nav>
  );
}

NavMenu.propTypes = {
  article: PropTypes.array.isRequired,
  description: PropTypes.object.isRequired,
};

export default NavMenu;
