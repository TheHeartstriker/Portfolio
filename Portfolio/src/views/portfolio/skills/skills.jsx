"use client";
import { useState, useEffect } from "react";
import "./skills.css";
import { Separator } from "@/components/separator/separator";
import { SkillCard } from "./skillCard";
import { skillText } from "../text";
import SkillsAni from "./skillsAni";

function Skills() {
  const [activeCard, setActiveCard] = useState(1);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(true);
  }, []);

  return (
    <>
      {/*  */}
      {/* Skill section */}
      {/*  */}
      <SkillsAni />
      <div className="port-skills">
        <Separator headerArr={["Skills", "And Expertise"]} />
        <div className="port-skills-container">
          {/* Card1 */}
          <SkillCard
            title={skillText.card1.header}
            para={skillText.card1.para}
            active={activeCard === 0}
            onMouseEnter={() => setActiveCard(0)}
            imgUrl={skillText.card1.imgSrc}
            mobile={mobile}
          />
          {/* Card2 */}
          <SkillCard
            title={skillText.card2.header}
            para={skillText.card2.para}
            active={activeCard === 1}
            onMouseEnter={() => setActiveCard(1)}
            imgUrl={skillText.card2.imgSrc}
            mobile={mobile}
          />

          {/* Card3 */}
          <SkillCard
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

export default Skills;
