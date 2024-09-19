import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import About from "./Pages.jsx/About.jsx";
import Skill from "./Pages.jsx/Skill.jsx";
import Contact from "./Pages.jsx/Contact.jsx";
//Nav components
import Nav from "./Nav.jsx";
//Styles
import "./Navigate.css";
import "./PagesCss/about.css";
import "./PagesCss/skill.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skill />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
