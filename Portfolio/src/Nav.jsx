import { use } from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const containerRef = useRef(null);
  //Cursor states
  const [Clickable, setClickable] = useState(false);
  const CursorRef = useRef(null);
  //UseRef so there is no constant re-rendering
  let mouseX = useRef(0);
  let mouseY = useRef(0);
  let cursorX = useRef(0);
  let cursorY = useRef(0);
  //Animation frame
  let animationFrameId = useRef(null);

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
  //Cursor
  //Cursor handlers
  const handleMouseOver = (e) => {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
      setClickable(true);
    }
  };
  const handleMouseOut = (e) => {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
      setClickable(false);
    }
  };
  const handleMouseMove = (e) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
    CursorRef.current.style.opacity = "1";
  };
  //Animation function
  function animateCursor(Click, CursorMSpeed) {
    let speed = CursorMSpeed;
    let cursor = CursorRef.current;
    //Infinity loop animate function
    const animate = () => {
      //Distance between cursor and mouse
      let distance = Math.sqrt(
        Math.pow(cursorX.current - mouseX.current, 2) +
          Math.pow(cursorY.current - mouseY.current, 2)
      );
      //Movement
      cursorX.current += (mouseX.current - cursorX.current) * speed;
      cursorY.current += (mouseY.current - cursorY.current) * speed;
      cursor.style.left = cursorX.current + "px";
      cursor.style.top = cursorY.current + "px";
      //If the cursor is over a clickable element
      if (distance > 40) {
        cursor.classList.add("shrink");
      } else if (Click === true) {
        cursor.classList.add("Change");
      } else {
        cursor.className = "Cursor";
      }
      //Update the cursor position
      animationFrameId.current = requestAnimationFrame(animate);
    };
    //Initial call handlers
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    animate();
    //Clean up on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      //Cancel the frame
      cancelAnimationFrame(animationFrameId.current);
    };
  }

  useEffect(() => {
    let clean = animateCursor(Clickable, 0.1);
    return clean;
  }, [Clickable]);

  useEffect(() => {
    BoxElements();
  }, []);

  useEffect(() => {
    Toggler();
  }, [About, Skill, Contact]);

  return (
    <>
      <div className="Cursor" ref={CursorRef}></div>
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
