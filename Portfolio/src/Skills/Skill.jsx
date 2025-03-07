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

  const UsedTechApp2 = [
    "HTML/CSS",
    "MySQL/Express",
    "Node.js",
    "React.js",
    "JavaScript",
    "Ec2/AWS",
  ];

  const UsedTechApp3 = [
    "HTML/CSS",
    "MySQL/Express",
    "Node.js",
    "React.js",
    "TypeScript",
    "Ec2/AWS",
  ];

  const Paras = [
    `A web app to show the beauty of programming. Simulate natural phenomena such as lightning, sand or just look at beautiful simulations all within the web browser.`,
    `A modern fitness tracker. Track heart rate, Time, calories and weight. Features graphs a custom made login system and method to share fitness history with others.`,
    `A simple todo app. Add, remove, edit, folders and marking as done are the main features. The app is was made to further my backend knowledge.`,
  ];

  const NoteWortheyH = ["CS50", "Portfolio", "CS Final Project"];
  const NoteWortheyP = [
    "All my code from the Harvard CS50 problem sets",
    "The code base for this website! Wondering how its done check here :)",
  ];

  const Header = ["Dynamic Animations", "FGraphs", "GenesisToDo"];

  function CreateFeatured({ Header, Para, Skills, Mirror, Id }) {
    return (
      <>
        {/* Main app split into two container one for image and other for text */}
        <div className={`AppF ${Mirror ? "mirror" : ""}`}>
          <div className="AppImage" id={Id}>
            <div className="TransparentFill"></div>
          </div>
          <div className={`AppText ${Mirror ? "mirror" : ""}`}>
            <div className="AppHeader">
              <h1>Featured project</h1>
              <h3>{Header}</h3>
            </div>
            <div className="AppPara">
              <p>{Para}</p>
            </div>
            <div className={`AppSkills ${Mirror ? "mirror" : ""}`}>
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

  function CreateFolder({ Header, Para }) {
    return (
      <div className="Folder">
        <div className="FolderSvgContainer"></div>
        <h1>{Header}</h1>
        <p>{Para}</p>
      </div>
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
          Id="F1"
        />
        <CreateFeatured
          Header={Header[1]}
          Para={Paras[1]}
          Skills={UsedTechApp2}
          Mirror={true}
          Id="F2"
        />
        <CreateFeatured
          Header={Header[2]}
          Para={Paras[2]}
          Skills={UsedTechApp3}
          Id="F3"
        />
      </div>
      {/* Main container for folder aka less important apps and code */}
      <div className="NoFeaturedApps">
        <div className="NonFeaturedHeader">
          <h1>Other Noteworthey Code</h1>
        </div>
        <div className="FolderContainer">
          <CreateFolder Header={NoteWortheyH[0]} Para={NoteWortheyP[0]} />
          <CreateFolder Header={NoteWortheyH[1]} Para={NoteWortheyP[1]} />
        </div>
      </div>
    </div>
  );
}

export default Skill;
