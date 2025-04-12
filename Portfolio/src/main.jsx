import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppRoutes } from "./routing/indexRoute.jsx";
//Components
import Background from "./components/Backgrounds/Backgrond.jsx";
import Nav from "./components/Nav/Nav.jsx";
//Styles
import "./Site.css";

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
// - assets contains all the images and videos
// - components contains all the components used globally in the website so the background, the nav and the cursor
// - pages contains all the pages used in the website so the about, skills and contact pages
// - routing centralizes the routing of the website
// - utils contains all the utils used in the website the most notable is the animationFrame it centralizes
//  all the frame calls into one function
//
