import { useState, useRef, useEffect } from "react";
//Text
import {
  TechStacks,
  Header,
  Paras,
  UsedTechApp1,
  UsedTechApp2,
  UsedTechApp3,
  NoteWortheyH,
  NoteWortheyP,
} from "./Text.js";
import { TextScramble } from "../Helper/Scramble.jsx";

function Skill() {
  const [TextState, setTextState] = useState({
    S1: {
      Text: "Known tech",
      Original: "Known tech",
      Mouse: false,
    },
    S2: {
      Text: "Stuff I made",
      Original: "Stuff I made",
      Mouse: false,
    },
    S3: {
      Text: "Featured project",
      Original: "Featured project",
      Mouse: false,
    },
    S4: {
      Text: "Featured project",
      Original: "Featured project",
      Mouse: false,
    },
    S5: {
      Text: "Featured project",
      Original: "Featured project",
      Mouse: false,
    },
    S6: {
      Text: "Other Noteworthey Code",
      Original: "Other Noteworthey Code",
      Mouse: false,
    },
  });

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
        <h1>{TextState.S1.Text}</h1>
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
        <h1>{TextState.S2.Text}</h1>
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
