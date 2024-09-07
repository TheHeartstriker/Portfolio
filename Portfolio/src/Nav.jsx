import { useState, useRef, useEffect } from "react";

function Nav() {
  const containerRef = useRef(null);

  function BoxElements() {
    const container = containerRef.current;
    if (container) {
      for (let i = 0; i < 40; i++) {
        let span = document.createElement("span");
        container.appendChild(span);
        // Pushes each element slightly down
        span.style.top = `${i + 1}px`;
        // Random delay
        let ranDelay = Math.random() * 0.25;
        span.style.transitionDelay = ranDelay + "s";
      }
    }
  }

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
    <div className="Container" ref={containerRef}>
      <button id="AboutBtn" onClick={handleAbout}>
        AboutMe
      </button>
      <button id="SkillBtn" onClick={handleSkill}>
        Skills/Projects
      </button>
      <button id="ContactBtn" onClick={handleContact}>
        Contacts
      </button>
    </div>
  );
}

export default Nav;
