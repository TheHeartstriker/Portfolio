"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./lightSkills.css";
import { Separator } from "@/components/separator/separator";
import { SkillCards } from "./skillCards";
import Chevron from "../../../../public/icons/chevron";
import LightSkillAnimation from "../animations/lightSkillAnimation.jsx";
import { highlightText } from "../text";
import { skillText } from "../text";

function LightSkills() {
  const [activeCard, setActiveCard] = useState(1);
  const [activeGal, setActiveGal] = useState(2);
  const [mobile, setMobile] = useState(false);

  const galItemRef = useRef(null);

  const animateGalleryTransition = (direction) => {
    const xStart = direction === "next" ? 50 : -50;

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
    setMobile(true);
  }, []);

  return (
    <>
      {/*  */}
      {/* Gallery section */}
      {/*  */}
      <LightSkillAnimation />
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
            {highlightText[`media${activeGal}`].type === "video" ? (
              <video
                src={highlightText[`media${activeGal}`].src}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img src={highlightText[`media${activeGal}`].src} />
            )}
            <div className="skill-highlights-gal-item-text">
              <p>{highlightText[`media${activeGal}`].para}</p>
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
            title={skillText.card1.header}
            para={skillText.card1.para}
            active={activeCard === 0}
            onMouseEnter={() => setActiveCard(0)}
            imgUrl={skillText.card1.imgSrc}
            mobile={mobile}
          />
          {/* Card2 */}
          <SkillCards
            title={skillText.card2.header}
            para={skillText.card2.para}
            active={activeCard === 1}
            onMouseEnter={() => setActiveCard(1)}
            imgUrl={skillText.card2.imgSrc}
            mobile={mobile}
          />

          {/* Card3 */}
          <SkillCards
            title={skillText.card3.header}
            para={skillText.card3.para}
            active={activeCard === 2}
            onMouseEnter={() => setActiveCard(2)}
            imgUrl={skillText.card3.imgSrc}
            mobile={mobile}
          />
        </div>
      </div>
    </>
  );
}

export default LightSkills;
