"use client";
import { useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavCursor from "./navCursor.jsx";
import "./navigate.css";

function Nav() {
  const containerRef = useRef(null);
  const router = useRouter();
  const location = useRef({});
  const pathname = usePathname();
  const current = useRef("About");
  const height = 40; // 40 spans that are 1px apart and 1px high

  //Creates the spans for the buttons
  function BoxElements() {
    const container = containerRef.current;
    // Create 40 span elements, append them and give them a movement delay
    if (container) {
      for (let i = 0; i < height; i++) {
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
  //Gets location data and create elements
  useEffect(() => {
    locationFill();
    BoxElements();
  }, []);
  // Handles calculations on window resize
  useEffect(() => {
    function handleResize() {
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
          Skills and Projects
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
