"use client";
import { useRef, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import NavCursor from "./navCursor.jsx";
import "./navigate.css";
import { gsap } from "gsap";
import { Context } from "../forStyle/animations/animationContext.jsx";
import Link from "next/link";
function Nav() {
  const containerRef = useRef(null);
  const { isAnimating, timeline, setAddedEl } = useContext(Context);
  const location = useRef({});
  const pathname = usePathname();
  const current = useRef("About");
  const heightRef = useRef(45);
  //Creates the div for the buttons
  function BoxElements() {
    const container = containerRef.current;
    // Create a single div element
    if (container) {
      let div = document.createElement("div");
      div.className = "nav-indicator";
      container.appendChild(div);
    }
  }

  function locationFill() {
    location.current = {
      Skill: document.getElementById("skillBtn").getBoundingClientRect(),
      About: document.getElementById("aboutBtn").getBoundingClientRect(),
      Script: document.getElementById("scriptoriumBtn").getBoundingClientRect(),
      Contact: document.getElementById("contactBtn").getBoundingClientRect(),
      Container: containerRef.current.getBoundingClientRect(),
    };
  }

  function newSpanMover(buttonRect, buttonName) {
    const div = containerRef.current.querySelector(".nav-indicator");
    if (!div) return;

    // Find the midpoint of the button (left + half of width)
    const buttonMidpoint = buttonRect.left + buttonRect.width / 2;

    // Get container's left position
    const containerLeft = location.current.Container.left;

    // Calculate the position relative to the container
    // We need to center the div on the button midpoint
    const divWidth = div.offsetWidth || 45;
    const relativeX = buttonMidpoint - containerLeft - divWidth / 2;

    // Use different easing for About and Contact to prevent off-screen overshoot
    const easing =
      buttonName === "About" || buttonName === "Contact"
        ? "power4.out"
        : "back.out";

    gsap.to(div, {
      x: relativeX,
      duration: 2,
      ease: easing,
    });
  }

  function setValue(name) {
    current.current = name;
  }
  //Gsap animation
  function upFadeIn(element) {
    gsap.set(element, {
      y: 50,
      opacity: 0,
    });
    // Main animation
    timeline.to(element, {
      y: 0,
      opacity: 1,
      duration: 1.75,
      ease: "power1.out",
    });
    setAddedEl((prev) => prev + 1);
  }

  function simpleFadeIn(element) {
    gsap.set(element, {
      opacity: 0,
    });
    gsap.to(element, {
      opacity: 1,
      duration: 1.5,
      ease: "power1.out",
    });
  }

  //Gets location data and create elements
  useEffect(() => {
    locationFill();
    BoxElements();
    if (isAnimating) {
      upFadeIn(containerRef.current);
    } else {
      simpleFadeIn(containerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Handles calculations on window resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1000) {
        heightRef.current = 40;
      }
      locationFill();
      newSpanMover(location.current[current.current], current.current);
    }
    window.addEventListener("resize", handleResize);
    // Initial fill in case of resize before mount
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //Handles path changes
  useEffect(() => {
    const basePath = "/" + pathname.split("/")[1];
    let active = "About";
    if (basePath === "/skills") active = "Skill";
    else if (basePath === "/scriptorium") active = "Script";
    else if (basePath === "/contact") active = "Contact";

    current.current = active;
    if (location.current[active]) {
      newSpanMover(location.current[active], active);
    }
  }, [pathname]);
  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="2"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <NavCursor />
      <nav className="Container" ref={containerRef}>
        <button
          className="button"
          id="aboutBtn"
          onClick={() => {
            setValue("About", true);
          }}
        >
          <Link href="/">About Me</Link>
        </button>
        <button
          className="button"
          id="skillBtn"
          onClick={() => {
            setValue("Skill", true);
          }}
        >
          <Link href="/skills">
            Skills
            <br />
            and
            <br />
            Work
          </Link>
        </button>
        {/* blog */}
        <button
          className="button"
          id="scriptoriumBtn"
          onClick={() => {
            setValue("Script", true);
          }}
        >
          <Link href="/scriptorium">Blog</Link>
        </button>
        <button
          className="button"
          id="contactBtn"
          onClick={() => {
            setValue("Contact", true);
          }}
        >
          <Link href="/contact">Contact</Link>
        </button>
      </nav>
    </>
  );
}

export default Nav;
