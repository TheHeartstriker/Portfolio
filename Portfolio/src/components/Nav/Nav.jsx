import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import NavCursor from "./navCursor.jsx";
import "./Navigate.css";

function Nav() {
  const containerRef = useRef(null);

  //For the buttons
  function BoxElements() {
    const container = containerRef.current;
    // Create 40 span elements, append them and give them a movement delay
    if (container) {
      for (let i = 0; i < 40; i++) {
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

  //Simple state management for the buttons
  const [About, setAbout] = useState(false);
  const [Skill, setSkill] = useState(false);
  const [Contact, setContact] = useState(false);

  function handleAbout() {
    setAbout(true);
    setSkill(false);
    setContact(false);
  }

  function handleSkill() {
    setSkill(true);
    setAbout(false);
    setContact(false);
  }

  function handleContact() {
    setContact(true);
    setAbout(false);
    setSkill(false);
  }

  function Toggler() {
    const container = containerRef.current;
    if (About) {
      container.classList.remove("skill");
      container.classList.remove("contact");
    }
    if (Skill) {
      container.classList.add("skill");
    } else {
      container.classList.remove("skill");
    }
    if (Contact) {
      container.classList.add("contact");
    } else {
      container.classList.remove("contact");
    }
  }

  useEffect(() => {
    BoxElements();
  }, []);

  useEffect(() => {
    Toggler();
  }, [About, Skill, Contact]);

  return (
    <>
      <NavCursor />
      <Link to="/">
        <button className="button" id="AboutBtn" onClick={handleAbout}>
          AboutMe
        </button>
      </Link>
      <Link to="/skills">
        <button className="button" id="SkillBtn" onClick={handleSkill}>
          Skills and Projects
        </button>
      </Link>
      <Link to="/contact">
        <button className="button" id="ContactBtn" onClick={handleContact}>
          Contacts
        </button>
      </Link>
      <div className="Container" ref={containerRef}></div>
    </>
  );
}

export default Nav;
