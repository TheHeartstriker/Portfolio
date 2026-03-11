"use client";

import LightSkills from "./sections/lightSkills";
import ProFocus from "./sections/proFocus";
import HeaderIntro from "./sections/headerIntro";

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
