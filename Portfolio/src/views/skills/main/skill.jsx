"use client";
import "./skill.css";
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
const client1 = "/skill/client1.webp";
const dynamicAnimations = "/DynamicShot.webp";
const fitShot = "/skill/FitShot.webp";
const todoShot = "/skill/todoShot.webp";
import LightSkills from "./sections/lightSkills";
import "./remove.css";
import { WorkCard } from "./workCard";
import ProFocus from "./sections/proFocus";
import HeaderIntro from "./sections/headerIntro";

import { lorem, smallLorem } from "@/utils/text";

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
