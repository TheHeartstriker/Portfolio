import { useState, useRef, useEffect } from "react";
//Text
import { DynamicAniGitText, BasicDynamicText } from "./Text.js";
import { BasicToDoAppText, ToDoAppGitText } from "./Text.js";
import { BasicFitnessAppText, FitnessAppGitText } from "./Text.js";

function Skill() {
  const TechStacks = [
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React.js",
    "Express",
    "Mysql",
    "Python",
    "C++",
    "Azure",
    "Aws",
    "Figma",
    "WebAssembly",
  ];

  const UsedTechApp1 = [
    "React.js",
    "JavaScript",
    "HTML Canvas",
    "C++",
    "WebAssembly",
    "Azure",
  ];

  const Paras = [
    `A web app to show the beauty of programming. Simulate natural phenomena such as lightning, sand or just look at beautiful simulations all within the web browser.`,
  ];

  const Header = ["Dynamic Animations", "FGraphs", "GenesisToDo"];

  function CreateFeatured({ Header, Para, Skills }) {
    return (
      <>
        {/* Main app split into two container one for image and other for text */}
        <div className="AppF">
          <div className="AppImage"></div>
          <div className="AppText">
            <div className="AppHeader">
              <h1>Featured project</h1>
              <h3>{Header}</h3>
            </div>
            <div className="AppPara">
              <p>{Para}</p>
            </div>
            <div className="AppSkills">
              {Skills.map((tech, index) => (
                <div className="BluePill2" key={index}>
                  <h2>{tech}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="MainSkillContainer">
      {/* Over head container for teck stacks */}
      <div className="TechStacksContainer">
        <h1>Known tech</h1>
        <div className="TechStacks">
          {TechStacks.map((tech, index) => (
            <div className="BluePill" key={index}>
              <h2>{tech}</h2>
            </div>
          ))}
        </div>
      </div>
      {/* Seperator element */}
      <div className="Separator">
        <h1>Stuff I made</h1>
        <hr></hr>
      </div>
      {/* Overhead container for main apps */}
      <div className="FeaturedApps">
        <CreateFeatured
          Header={Header[0]}
          Para={Paras[0]}
          Skills={UsedTechApp1}
        />
      </div>
      {/* Main container for folder aka less important apps and code */}
      <div className="NoFeaturedApps"></div>
    </div>
  );
}

export default Skill;
