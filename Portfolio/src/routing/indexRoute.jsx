//Components

import { Routes, Route, useLocation } from "react-router-dom";
import FadeSettings from "./fadeSettings.jsx";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";

const About = lazy(() => import("../pages/about/about.jsx"));
const Skill = lazy(() => import("../pages/skills/skill.jsx"));
const Contact = lazy(() => import("../pages/contact/contact.jsx"));
const Scriptorium = lazy(() => import("../pages/scriptorium/scriptorium.jsx"));

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
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
      </Suspense>
    </AnimatePresence>
  );
}

export { AppRoutes };
