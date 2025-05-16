//Components
import About from "../pages/about/about.jsx";
import Skill from "../pages/skills/skill.jsx";
import Contact from "../pages/contact/contact.jsx";
import Scriptorium from "../pages/scriptorium/scriptorium.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import FadeSettings from "./fadeSettings.jsx";
import { AnimatePresence } from "framer-motion";

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <FadeSettings>
              <About />
            </FadeSettings>
          }
        />
        <Route
          path="/skills"
          element={
            <FadeSettings>
              <Skill />
            </FadeSettings>
          }
        />

        <Route
          path="/scriptorium"
          element={
            <FadeSettings>
              <Scriptorium />
            </FadeSettings>
          }
        />

        <Route
          path="/contact"
          element={
            <FadeSettings>
              <Contact />
            </FadeSettings>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export { AppRoutes };
