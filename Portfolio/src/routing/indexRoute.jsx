//Components
import About from "../pages/About/About.jsx";
import Skill from "../pages/Skills/Skill.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import FadeSettings from "../utils/fadeRoute.jsx";
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
