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
import lottie from "lottie-web";
import { TextScramble } from "../Helper/Scramble.jsx";

function Skill() {
  const [Text, setText] = useState(" Known tech");
  const [Text2, setText2] = useState(" Stuff I made");
  const Orginal = " Known tech";
  const Orginal2 = " Stuff I made";

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

  const AniRef1 = useRef(null);
  const AniRef2 = useRef(null);
  const Container1Ref = useRef(null);
  const Container2Ref = useRef(null);

  function CreateLottie() {
    AniRef1.current = lottie.loadAnimation({
      container: Container1Ref.current,
      renderer: "svg",
      loop: false,
      path: "/src/Images/Glitch2.json",
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
    AniRef2.current = lottie.loadAnimation({
      container: Container2Ref.current,
      renderer: "svg",
      loop: false,
      path: "/src/Images/Glitch2.json",
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
  }

  useEffect(() => {
    CreateLottie();
    setTimeout(() => {
      TextScramble(Orginal, Text, "abcdefghijklmnopqrstuvwxyz", setText, 0.5);
      TextScramble(
        Orginal2,
        Text2,
        "abcdefghijklmnopqrstuvwxyz",
        setText2,
        0.5
      );
    }, 800);
  }, []);
  return (
    <div className="MainSkillContainer">
      {/* Over head container for teck stacks */}
      <div className="Seperator" id="Sep1">
        <h2>01.</h2>
        <h1>{Text}</h1>
        <hr></hr>
        <div id="lottie-container" ref={Container1Ref}></div>
      </div>
      <div className="TechStacksContainer">
        <div className="TechStacks">
          {TechStacks.map((tech, index) => (
            <div className="BluePill" key={index}>
              <h2>{tech}</h2>
            </div>
          ))}
        </div>
      </div>
      {/* Seperator element */}
      <div className="Seperator">
        <hr></hr>
        <h1>{Text2}</h1>
        <h2>.02</h2>
        <div id="lottie-container" ref={Container2Ref}></div>
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
