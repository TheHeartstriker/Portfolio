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

function Skill() {
  return (
    <div className="main-skill-container">
      {/*  */}
      {/* Header */}
      {/*  */}
      <div className="skill-header">
        {/* Intro  */}
        {/*  */}
        <div className="skill-header-intro">
          {/* Intro text*/}
          <div className="skill-header-intro-text">
            <h1>Your website, my mission</h1>
            <h2>Exceeding results in custom web development</h2>
          </div>
          <button>
            <h3>Learn more</h3>
          </button>
        </div>
        {/* Image */}
        {/*  */}
        <img src={"/imageTest4.png"}></img>
        {/* Stats  */}
        {/*  */}
        <div className="skill-header-stats">
          <div className="skill-header-stats-item">
            <h3>8</h3>
            <h4>Applications made</h4>
          </div>
          <div className="skill-header-stats-item">
            <h3>3</h3>
            <h4>Years of experience</h4>
          </div>

          <div className="skill-header-stats-item">
            <h3>3000+</h3>
            <h4>Hour's of work</h4>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Past work*/}
      {/*  */}
      <div className="skill-past">
        <div className="content-seperator">
          <h2>My Past work</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="skill-past-item">
          <div className="skill-past-item-main">
            <div className="skill-past-item-main-text"></div>
            <div className="skill-past-item-main-image"></div>
          </div>
          <div className="skill-past-item-stats"></div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default Skill;
