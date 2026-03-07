"use client";
import AboutMobile from "./aboutMobile";

import {
  Header1,
  Header2,
  Header3,
  MainText1,
  MainText2,
  MainText3,
} from "./text";
import Arrow from "../../../public/icons/arrow";
import { ScrollButton } from "@/components/nav/scrollButton";
import AboutAnimation from "./animations/aboutAnimation";
function About() {
  return (
    <div className="main-about-container">
      <AboutAnimation />
      {/* Hero Section */}
      <div className="about-hero-section">
        <h2>Hi, my name is</h2>
        <h1>Kaden Wildauer</h1>
        <div className="about-hero-section-info">
          <div className="about-hero-section-info-text">
            <p>
              I am a freelance web developer specializing in designing and
              building websites and web applications. I create engaging,
              handcrafted websites for businesses worldwide, using creativity
              and precision to deliver beautiful, effective online presences
              that truly stand out.
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
      {/* Playground / content section */}
      <AboutMobile
        Header1={Header1}
        Header2={Header2}
        Header3={Header3}
        MainText1={MainText1}
        MainText2={MainText2}
        MainText3={MainText3}
      />
    </div>
  );
}

export default About;
