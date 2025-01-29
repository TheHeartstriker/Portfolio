import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import About from "./About/About.jsx";
import Skill from "./Skills/Skill.jsx";
import Contact from "./Contact/Contact.jsx";
import Background from "./Backgrounds/Backgrond.jsx";
import PlayGround from "./About/PlayGround.jsx";
//Nav components
import Nav from "./Nav.jsx";
//Styles
import "./Navigate.css";
import "./About/about.css";
import "./Skills/skill.css";
import "./Contact/contact.css";
import "./Backgrounds/background.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PlayGround />
      <Nav />
      <Background />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skill />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
