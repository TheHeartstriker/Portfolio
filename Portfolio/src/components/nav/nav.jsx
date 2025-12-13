"use client";
import { useRef, useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavCursor from "./navCursor.jsx";
import "./navigate.css";
import { gsap } from "gsap";
import { AnimationContext } from "../animationContext.jsx";

function Nav() {
  const containerRef = useRef(null);
  const { isAnimating, timeline, setAddedEl } = useContext(AnimationContext);
  const router = useRouter();
  const location = useRef({});
  const pathname = usePathname();
  const current = useRef("About");
  const heightRef = useRef(45);
  //Creates the spans for the buttons
  function BoxElements() {
    const container = containerRef.current;
    // Create 40 span elements, append them and give them a movement delays
    if (container) {
      for (let i = 0; i < heightRef.current; i++) {
        let span = document.createElement("span");
        container.appendChild(span);
        // Get the current top value from CSS
        let currentTop = parseFloat(window.getComputedStyle(span).top) || 0;
        // Pushes each element slightly down
        span.style.top = `${currentTop + i + 1}px`;
        // Random delay
        let ranDelay = Math.random() * 0.35;
        span.style.transitionDelay = ranDelay + "s";
      }
    }
  }

  function locationFill() {
    location.current = {
      Skill: document.getElementById("SkillBtn").getBoundingClientRect(),
      About: document.getElementById("AboutBtn").getBoundingClientRect(),
      Script: document.getElementById("scriptoriumBtn").getBoundingClientRect(),
      Contact: document.getElementById("ContactBtn").getBoundingClientRect(),
    };
  }

  function spanMoveer(amountX) {
    const container = containerRef.current;
    const spans = container.querySelectorAll("span");
    // Get container's left position
    const containerLeft = container.getBoundingClientRect().left;
    // Calculate relative X
    // We consider the left position of the container to center the spans
    const relativeX = amountX + containerLeft / 2;
    spans.forEach((span) => {
      span.style.transform = `translateX(${relativeX}px)`;
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
      spanMoveer(location.current[current.current].left);
    }
    window.addEventListener("resize", handleResize);
    // Initial fill in case of resize before mount
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const basePath = "/" + pathname.split("/")[1];
    let active = "About";
    if (basePath === "/skills") active = "Skill";
    else if (basePath === "/scriptorium") active = "Script";
    else if (basePath === "/contact") active = "Contact";
    current.current = active;
    if (location.current[active]) {
      spanMoveer(location.current[active].left);
    }
  }, [pathname]);

  return (
    <>
      <NavCursor />
      <nav className="Container" ref={containerRef}>
        <button
          className="button"
          id="AboutBtn"
          onClick={() => {
            setValue("About", true);
            router.push("/");
          }}
        >
          About Me
        </button>
        <button
          className="button"
          id="SkillBtn"
          onClick={() => {
            setValue("Skill", true);
            router.push("/skills");
          }}
        >
          Skills and Work
        </button>
        {/* blog */}
        <button
          className="button"
          id="scriptoriumBtn"
          onClick={() => {
            setValue("Script", true);
            router.push("/scriptorium");
          }}
        >
          Blog
        </button>
        <button
          className="button"
          id="ContactBtn"
          onClick={() => {
            setValue("Contact", true);
            router.push("/contact");
          }}
        >
          Contacts
        </button>
      </nav>
    </>
  );
}

export default Nav;
