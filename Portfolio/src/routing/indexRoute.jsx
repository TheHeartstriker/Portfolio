//Components
import About from "../pages/About/About.jsx";
import Skill from "../pages/Skills/Skill.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import { Routes, Route } from "react-router-dom";
import FadeSettings from "../Helper/fadeRoute.jsx";
import { AnimatePresence } from "framer-motion";

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
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
