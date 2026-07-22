"use client";
import Hero from "./hero/hero";
import Work from "./work/work";
import Highlight from "./highlight/highlight";
import Skills from "./skills/skills";
import Process from "./process/process";
import Focus from "./focus/focus";
import "./portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio-container">
      {/*  */}
      {/* Hero and past work */}
      {/*  */}
      <Hero />
      <Work />
      {/*  */}
      {/* Highlights and skills */}
      {/*  */}
      <Highlight />
      <Skills />
      {/*  */}
      {/* Focus and process */}
      {/*  */}
      <Process />
      <Focus />
    </div>
  );
}

export default Portfolio;
