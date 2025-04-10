import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppRoutes } from "./routing/indexRoute.jsx";
//Components

import Background from "./components/Backgrounds/Backgrond.jsx";
import Nav from "./components/Nav/Nav.jsx";
//Styles
import "./Site.css";

// // Just a helper to provide animation instuctions
// function AniSettings({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5, ease: "easeInOut" }}
//     >
//       {children}
//     </motion.div>
//   );
// }
// //Animation for page transitions
// function AnimtionFade() {
//   const location = useLocation();
//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route
//           path="/"
//           element={
//             <AniSettings>
//               <About />
//             </AniSettings>
//           }
//         />
//         <Route
//           path="/skills"
//           element={
//             <AniSettings>
//               <Skill />
//             </AniSettings>
//           }
//         />
//         <Route
//           path="/contact"
//           element={
//             <AniSettings>
//               <Contact />
//             </AniSettings>
//           }
//         />
//       </Routes>
//     </AnimatePresence>
//   );
// }
//Main render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Background />
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

//
// Website structure:
// - Nav contains the nav bar along with the css and jsx related to the cursor
// - Backgrounds contains the background animation currently a moving grid it also handles the radial gradient that follows the mouse
// - Images contains .svg and .jsx related to images used in the project
// - Skills, About, and Contact contain the jsx and css for the respective pages
// - Helper contains imported helper function such as main render and text scrambling.
//
