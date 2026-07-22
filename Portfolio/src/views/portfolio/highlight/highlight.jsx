"use client";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import "./highlight.css";
import { Separator } from "@/components/separator/separator";
import Chevron from "../../../../public/icons/chevron";
import HighlightAni from "./highlightAni.jsx";
import { highlightText } from "../text";

function Highlight() {
  const [activeGal, setActiveGal] = useState(2);

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
      setActiveGal(activeGal === 1 ? 4 : activeGal - 1);
    }, 400);
  };

  const handleNext = () => {
    animateGalleryTransition("next");
    setTimeout(() => {
      setActiveGal(activeGal === 4 ? 1 : activeGal + 1);
    }, 400);
  };

  return (
    <>
      {/*  */}
      {/* Gallery section */}
      {/*  */}
      <HighlightAni />
      <div className="port-highlights">
        <Separator headerArr={["Hightlights", "And Outcomes"]} reverse={true} />
        {/*  */}
        {/* Gallery container 'the images' */}
        <div className="port-highlights-gal">
          {/* Arrow container */}
          <div
            className="port-highlights-gal-arrow"
            id="gal-arrow-1"
            onClick={handlePrevious}
          >
            <Chevron />
          </div>
          {/* The image */}
          <div className="port-highlights-gal-item" ref={galItemRef}>
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
            <div className="port-highlights-gal-item-text">
              <p>{highlightText[`media${activeGal}`].para}</p>
            </div>
          </div>
          {/* Arrow container */}
          <div
            className="port-highlights-gal-arrow"
            id="gal-arrow-2"
            onClick={handleNext}
          >
            <Chevron />
          </div>
        </div>
      </div>
    </>
  );
}

export default Highlight;
