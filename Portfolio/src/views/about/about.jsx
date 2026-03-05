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
import { gsap } from "gsap/gsap-core";
import { useEffect } from "react";
import { animateText } from "@/utils/animations/textAni";
import { animateBlocks } from "@/utils/animations/animations";
import { Context } from "@/components/forStyle/animations/animationContext.jsx";
import { useContext } from "react";
function About() {
  const { opening, setOpening } = useContext(Context);
  function initAnimations() {
    let delay = 0;
    if (opening) {
      delay = 1.75;
    }

    const timeline = gsap.timeline();
    const header = document.querySelector(".about-hero-section h1");
    const subHeader = document.querySelector(".about-hero-section h2");
    animateText({ start: 200, end: 0 }, [subHeader, header], timeline, {
      duration: 0.75,
      easing: "power2.out",
      delay: delay,
    });
    const blocks = document.querySelectorAll(
      ".about-hero-section-info-text, .about-hero-section-info button",
    );
    animateBlocks(
      { start: 50, end: 0, type: "y" },
      null,
      null,
      blocks,
      {
        duration: 0.75,
        easing: "power1.out",
        offset: "-=0.25",
        stagger: 0.25,
      },
      timeline,
    );
  }

  useEffect(() => {
    initAnimations();
  }, []);

  return (
    <div className="main-about-container">
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
          <button>
            <span>
              <Arrow />
            </span>
            <h3>Learn More</h3>
          </button>
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
