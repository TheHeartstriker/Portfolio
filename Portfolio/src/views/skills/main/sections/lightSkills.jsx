import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./lightSkills.css";
import { Separator } from "@/components/forViews/seperator";
import { lorem, smallLorem } from "@/utils/text";
import { SkillCards } from "./skillCards";
import Arrow from "@/../public/icons/arrow";
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
        <Separator headerArr={["Hightlights", "And Outcomes"]} reverse={true} />
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
        <Separator headerArr={["Skills", "And Expertise"]} />
        <div className="skill-myskills-container">
          {/* Card1 */}
          <SkillCards
            title="Performance And Optimization"
            para={lorem}
            active={false}
            imgUrl={card1}
          />
          {/* Card2 */}
          <SkillCards
            title="Design, Layout and Flow"
            para={lorem}
            active={true}
            imgUrl={card2}
          />

          {/* Card3 */}
          <SkillCards
            title="Choice And Customization"
            para={lorem}
            active={false}
            imgUrl={card3}
          />
        </div>
      </div>
    </>
  );
}

export default LightSkills;
