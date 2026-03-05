"use client";
import { useState, useRef, useEffect, use } from "react";
import { gsap } from "gsap";
import "./lightSkills.css";
import { Separator } from "@/components/separator/separator";
import { lorem, smallLorem } from "@/utils/text";
import { SkillCards } from "./skillCards";
import Arrow from "@/../public/icons/arrow";
const card1 = "/skill/card1.webp";
const card2 = "/skill/card2.jpg";
const card3 = "/skill/card3.jpg";
const fitShot = "/skill/FitShot.webp";
import Chevron from "../../../../public/icons/chevron";

import { animateBlocks } from "../../../utils/animations/animations";

function LightSkills() {
  const [activeCard, setActiveCard] = useState(1);
  const [activeGal, setActiveGal] = useState(1);
  const galItemRef = useRef(null);
  const mediaData = useRef({
    img1: {
      src: card1,
      para: lorem,
    },
    img2: {
      src: card2,
      para: lorem,
    },
    img3: {
      src: card3,
      para: lorem,
    },
  });

  const animateGalleryTransition = (direction) => {
    const xStart = direction === "next" ? 100 : -100;

    gsap
      .timeline()
      .to(galItemRef.current, {
        x: -xStart,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      .set(galItemRef.current, {
        x: xStart,
      })
      .to(galItemRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
  };

  const handlePrevious = () => {
    animateGalleryTransition("prev");
    setTimeout(() => {
      setActiveGal(activeGal === 1 ? 3 : activeGal - 1);
    }, 400);
  };

  const handleNext = () => {
    animateGalleryTransition("next");
    setTimeout(() => {
      setActiveGal(activeGal === 3 ? 1 : activeGal + 1);
    }, 400);
  };

  useEffect(() => {
    animateBlocks(
      { start: -100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll("#gal-arrow-1"),
      { duration: 0.85, delay: 0, easing: "power2.out" },
    );
    animateBlocks(
      { start: 100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll("#gal-arrow-2"),
      { duration: 1.25, delay: 0, easing: "back.out(1.05)" },
    );
    animateBlocks(
      { start: 100, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll(".skill-highlights-gal-item"),
      { duration: 0.85, delay: 0, easing: "power2.out" },
    );
  }, []);

  useEffect(() => {
    animateBlocks(
      { start: 100, end: 0, type: "x" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      document.querySelectorAll(".skill-myskills-container-card"),
      { duration: 1.25, delay: 0, easing: "back.out(1.05)" },
    );
  }, []);
  return (
    <>
      {/*  */}
      {/* Gallery section */}
      {/*  */}
      <div className="skill-highlights">
        <Separator headerArr={["Hightlights", "And Outcomes"]} reverse={true} />
        {/*  */}
        {/* Gallery container 'the images' */}
        <div className="skill-highlights-gal">
          {/* Arrow container */}
          <div
            className="skill-highlights-gal-arrow"
            id="gal-arrow-1"
            onClick={handlePrevious}
          >
            <Chevron />
          </div>
          {/* The image */}
          <div className="skill-highlights-gal-item" ref={galItemRef}>
            <img src={mediaData.current[`img${activeGal}`].src} />
            <div className="skill-highlights-gal-item-text">
              {mediaData.current[`img${activeGal}`].para}
            </div>
          </div>
          {/* Arrow container */}
          <div
            className="skill-highlights-gal-arrow"
            id="gal-arrow-2"
            onClick={handleNext}
          >
            <Chevron />
          </div>
        </div>
      </div>
      {/*  */}
      {/* Skill section */}
      {/*  */}
      <div className="skill-myskills">
        <Separator headerArr={["Skills", "And Expertise"]} />
        <div className="skill-myskills-container">
          {/* Card1 */}
          <SkillCards
            title="Performance, Optimization"
            para={lorem}
            active={activeCard === 0}
            onMouseEnter={() => setActiveCard(0)}
            imgUrl={card1}
          />
          {/* Card2 */}
          <SkillCards
            title="Design, Layout and Flow"
            para={lorem}
            active={activeCard === 1}
            onMouseEnter={() => setActiveCard(1)}
            imgUrl={card2}
          />

          {/* Card3 */}
          <SkillCards
            title="Choice And Customization"
            para={lorem}
            active={activeCard === 2}
            onMouseEnter={() => setActiveCard(2)}
            imgUrl={card3}
          />
        </div>
      </div>
    </>
  );
}

export default LightSkills;
