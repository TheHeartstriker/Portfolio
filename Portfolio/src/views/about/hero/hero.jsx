"use client";

import Arrow from "../../../../public/icons/arrow";
import { ScrollButton } from "@/components/nav/scrollButton";
import Opening from "@/views/about/hero/opening";
import "./hero.css";
function Hero() {
  return (
    <div className="about-hero-section">
      <Opening />
      <h2>Hi, my name is</h2>
      <h1>Kaden Wildauer</h1>
      <div className="about-hero-section-info">
        <div className="about-hero-section-info-text">
          <p>
            I am a freelance web developer specializing in designing and
            building websites and web applications. I create engaging,
            handcrafted websites for businesses worldwide, using creativity and
            precision to deliver beautiful, effective online presences that
            truly stand out.
          </p>
        </div>

        <ScrollButton percent={125}>
          <span>
            <Arrow />
          </span>
          <h3>Learn More</h3>
        </ScrollButton>
      </div>
    </div>
  );
}

export default Hero;
