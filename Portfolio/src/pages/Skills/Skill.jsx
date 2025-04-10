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
import { TextScramble } from "../../Helper/Scramble.jsx";
import glitchAni from "../../Assets/Glitch2.json";

function Skill() {
  const [Text, setText] = useState(" Known tech");
  const [Text2, setText2] = useState(" Stuff I made");
  const Orginal = " Known tech";
  const Orginal2 = " Stuff I made";

  function handleLink(Link) {
    window.open(Link, "_blank", "noopener,noreferrer");
  }

  function CreateFeatured({ Header, Para, Skills, Mirror, Id, Link1, Link2 }) {
    return (
      <>
        {/* Main app split into two container one for image and other for text */}
        <div className={`AppF ${Mirror ? "mirror" : ""}`}>
          <div className="AppImage" id={Id}>
            <div className="TransparentFill"></div>
            <div
              className="Logocontainer ImgBackLogo1"
              onClick={() => {
                handleLink(Link1);
              }}
            ></div>
            <div
              className="Logocontainer ImgBackLogo2"
              onClick={() => {
                handleLink(Link2);
              }}
            ></div>
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

  function CreateFolder({ Header, Para, Link }) {
    return (
      <div className="Folder" onClick={() => handleLink(Link)}>
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
      animationData: glitchAni,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
    AniRef2.current = lottie.loadAnimation({
      container: Container2Ref.current,
      renderer: "svg",
      loop: false,
      animationData: glitchAni,
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
  // Code links
  //Animations
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
      <div className="Seperator" id="Sep2">
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
          Link1="https://www.dynamicanimations.com"
          Link2="https://github.com/TheHeartstriker/DynamicAnimations"
        />
        <CreateFeatured
          Header={Header[1]}
          Para={Paras[1]}
          Skills={UsedTechApp2}
          Mirror={true}
          Id="F2"
          Link1="https://www.fgraphs.com"
          Link2="https://github.com/TheHeartstriker/FitnessApp"
        />
        <CreateFeatured
          Header={Header[2]}
          Para={Paras[2]}
          Skills={UsedTechApp3}
          Id="F3"
          Link1="https://www.genesistodo.com"
          Link2="https://github.com/TheHeartstriker/ToDoApp"
        />
      </div>
      {/* Main container for folder aka less important apps and code */}
      <div className="NoFeaturedApps">
        <div className="NonFeaturedHeader">
          <h1>Other Noteworthey Code</h1>
        </div>
        <div className="FolderContainer">
          <CreateFolder
            Header={NoteWortheyH[0]}
            Para={NoteWortheyP[0]}
            Link={"https://github.com/TheHeartstriker/CS50"}
          />
          <CreateFolder
            Header={NoteWortheyH[1]}
            Para={NoteWortheyP[1]}
            Link={"https://github.com/TheHeartstriker/Portfolio"}
          />
          <CreateFolder
            Header={NoteWortheyH[2]}
            Para={NoteWortheyP[2]}
            Link={"https://github.com/TheHeartstriker/CS50Final"}
          />
        </div>
      </div>
    </div>
  );
}

export default Skill;
