"use client";
import {
  TechStacks,
  Header,
  Paras,
  UsedTechApp1,
  UsedTechApp2,
  UsedTechApp3,
  UsedTechApp4,
  NoteWortheyH,
  NoteWortheyP,
} from "./text.js";
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
