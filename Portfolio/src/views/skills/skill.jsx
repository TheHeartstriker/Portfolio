"use client";

import LightSkills from "./lightSkills/lightSkills";
import ProFocus from "./proFocus/proFocus";
import HeaderIntro from "./headerIntro/headerIntro";
import "./skill.css";

function Skill() {
  return (
    <div className="main-skill-container">
      {/*  */}
      {/* The header and intro work */}
      {/*  */}
      <HeaderIntro />
      {/*  */}
      {/* Highlights and skills */}
      {/*  */}
      <LightSkills />
      {/*  */}
      {/* Focus and process */}
      {/*  */}
      <ProFocus />
    </div>
  );
}

export default Skill;
