"use client";
import { useState } from "react";
import "./hero.css";
import { ScrollButton } from "@/components/nav/scrollButton";
import HeroAni from "./heroAni.jsx";

function Hero() {
  const headerimg = "/skill/headerimg.webp";
  const [activeCard1, setActiveCard1] = useState(3);

  return (
    <>
      {/*  */}
      {/* Hero */}
      {/*  */}
      <HeroAni />
      <div className="port-hero">
        {/* Intro  */}
        {/*  */}
        <div className="port-hero-intro">
          {/* Intro text*/}
          <div className="port-hero-intro-text">
            <h1>Your website, my mission</h1>
            <h2>Exceeding results in custom web development</h2>
          </div>
          <ScrollButton percent={110} className="port-hero-intro-button">
            <h3>Learn more</h3>
          </ScrollButton>
        </div>
        {/* Image */}
        {/*  */}
        <img src={headerimg} alt="Header" />
        {/* Stats  */}
        {/*  */}
        <div className="port-hero-stats">
          <div
            className={`port-hero-stats-item ${activeCard1 === 1 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(1)}
          >
            <h3>8</h3>
            <h4>Applications made</h4>
          </div>
          <div
            className={`port-hero-stats-item ${activeCard1 === 2 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(2)}
          >
            <h3>3</h3>
            <h4>Years of experience</h4>
          </div>
          <div
            className={`port-hero-stats-item ${activeCard1 === 3 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard1(3)}
          >
            <h3>3000+</h3>
            <h4>Hour&apos;s of work</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
