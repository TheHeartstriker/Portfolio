import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import NavCursor from "./navCursor.jsx";
import "./navigate.css";
import scriptorium from "../../pages/scriptorium/scriptorium.jsx";

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
  const [btnState, setBtnState] = useState({
    About: true,
    Skill: false,
    Contact: false,
    scriptorium: false,
  });

  function setValue(name, value) {
    setBtnState({
      About: false,
      Skill: false,
      Contact: false,
      scriptorium: false,
      [name]: value,
    });
  }

  function Toggler() {
    const container = containerRef.current;
    if (btnState.About) {
      container.classList.remove("skill");
      container.classList.remove("contact");
    }
    if (btnState.Skill) {
      container.classList.add("skill");
    } else {
      container.classList.remove("skill");
    }
    if (btnState.Contact) {
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
  }, [btnState]);

  return (
    <>
      <NavCursor />
      <Link to="/">
        <button
          className="button"
          id="AboutBtn"
          onClick={() => setValue("About", true)}
        >
          AboutMe
        </button>
      </Link>
      <Link to="/skills">
        <button
          className="button"
          id="SkillBtn"
          onClick={() => setValue("Skill", true)}
        >
          Skills and Projects
        </button>
      </Link>
      <Link to="/contact">
        <button
          className="button"
          id="ContactBtn"
          onClick={() => setValue("Contact", true)}
        >
          Contacts
        </button>
      </Link>
      {/* blog */}
      <Link to="/scriptorium">
        <button
          className="button"
          id="scriptoriumBtn"
          onClick={() => setValue("scriptorium", true)}
        >
          Scriptorium
        </button>
      </Link>
      <div className="Container" ref={containerRef}></div>
    </>
  );
}

export default Nav;
