"use client";
import { useEffect, useRef, useState } from "react";
import { tocScan } from "./navMenuHelper.jsx";
import PropTypes from "prop-types";
import "./navMenu.css";

function NavMenu({ article, description, articleClassName }) {
  const [scrollPoints, setScrollPoints] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const [navMenuTop, setNavMenuTop] = useState(62);
  const headingRef = useRef([]);
  const [screenCross, setScreenCross] = useState(0);
  const articleRef = useRef(null);
  const navScrollSettings = useRef({
    middle: 50,
    scrollDistance: 300,
  });

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
    const { middle, scrollDistance } = navScrollSettings.current;
    let boundingClient = articleRef.current.getBoundingClientRect();
    let topPxPos = boundingClient.top;
    let bottomPxPos = boundingClient.bottom;
    let topOffSet = (boundingClient.top / window.innerHeight) * 100 + 42.5; //Top pos but offset to start from 42.5% which is half the menu height
    //If we are above the article top
    if (scrollY <= 0) return `${topPxPos + window.innerHeight * 0.42}px`;
    //If we are bellow the article bottom
    if (scrollY + window.innerHeight >= bottomPxPos + window.scrollY) {
      return `${bottomPxPos - window.innerHeight * 0.42}px`;
    }
    //If we are in the middle area
    if (scrollY >= scrollDistance) return `${middle}%`;
    const progress = scrollY / scrollDistance;
    const value = topOffSet - progress * (topOffSet - middle);
    return `${value}%`;
  }
  //
  // Listenrs for menu stop and start points and smoothing
  //
  useEffect(() => {
    const articleElement = document.querySelector(`.${articleClassName}`);
    articleRef.current = articleElement;
  }, [articleClassName]);

  //
  // Resize listener to set screen cross point and show/hide menu
  //
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
  //
  //Scroll listener to update current section and nav menu top
  //
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
    <nav className="article-nav-Menu" style={{ top: navMenuTop }}>
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
  articleClassName: PropTypes.string.isRequired,
};

export default NavMenu;
