import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./lightSkills.css";
import { Separator } from "@/components/forViews/seperator";
import { lorem, smallLorem } from "@/utils/text";
const card1 = "/skill/card1.webp";
const card2 = "/skill/card2.jpg";
const card3 = "/skill/card3.jpg";
const fitShot = "/skill/FitShot.webp";
import Chevron from "../../../../../public/icons/chevron";
function LightSkills() {
  return (
    <>
      {/*  */}
      {/* Gallery section */}
      {/*  */}
      <div className="skill-highlights">
        <Separator header="My Highlights" para={lorem} />
        {/*  */}
        {/* Gallery container 'the images' */}
        <div className="skill-highlights-gal">
          {/* Arrow container */}
          <div className="skill-highlights-gal-arrow">
            <Chevron />
          </div>
          {/* The image */}
          <div className="skill-highlights-gal-item">
            <img src={fitShot} />
            <div className="skill-highlights-gal-item-text">
              <p>{smallLorem}</p>
            </div>
          </div>
          {/* Arrow container */}
          <div className="skill-highlights-gal-arrow">
            <Chevron />
          </div>
        </div>
      </div>
      {/*  */}
      {/* Skill section */}
      {/*  */}
      <div className="skill-myskills">
        <Separator header="My Skills" para={lorem} />
        <div className="skill-myskills-container">
          <div className="skill-myskills-container-card">
            <img src={card1}></img>
            <div className="skill-myskills-container-card-text">
              <h3>Design</h3>
              <p>{lorem}</p>
            </div>
          </div>
          <div className="skill-myskills-container-card">
            <img src={card2}></img>
            <div className="skill-myskills-container-card-text">
              <h3>Design</h3>
              <p>{lorem}</p>
            </div>
          </div>
          <div className="skill-myskills-container-card">
            <img src={card3}></img>
            <div className="skill-myskills-container-card-text">
              <h3>Design</h3>
              <p>{lorem}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LightSkills;
