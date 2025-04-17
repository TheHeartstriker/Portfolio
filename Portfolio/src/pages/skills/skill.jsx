import { useState, useRef, useEffect } from "react";
//Text
import { animate, createAnimatable, utils } from "animejs";
import {
  TechStacks,
  Header,
  Paras,
  UsedTechApp1,
  UsedTechApp2,
  UsedTechApp3,
  NoteWortheyH,
  NoteWortheyP,
} from "./text.js";
import lottie from "lottie-web";
import { CreateFolder, CreateFeatured } from "../../components/skillPage";
import "./skill.css";

function Skill() {
  const AniRef1 = useRef(null);
  const AniRef2 = useRef(null);
  const Container1Ref = useRef(null);
  const Container2Ref = useRef(null);
  const root = useRef(null); // for animejs
  //Creates the lottie animation
  function createLottie(containerRef, animationRef) {
    import("../../assets/Glitch2.json").then((animationData) => {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
    });
  }

  function onMouseMove(event, animatablePills, bluePills) {
    const { clientX, clientY } = event;
    bluePills.forEach((pill, index) => {
      const bounding = pill.getBoundingClientRect();
      const { left, top, width, height } = bounding;
      // Calculate distance from the mouse to the center of the pill
      const dx = clientX - (left + width / 2);
      const dy = clientY - (top + height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Activate on distance
      if (distance < 150) {
        const hw = width / 2;
        const hh = height / 2;
        const x = utils.clamp(-(clientX - left - hw), -hw, hw);
        const y = utils.clamp(-(clientY - top - hh), -hh, hh);
        //Update x and y
        animatablePills[index].x(x);
        animatablePills[index].y(y);
      } else {
        animatablePills[index].x(0);
        animatablePills[index].y(0);
      }
    });
  }

  useEffect(() => {
    createLottie(Container1Ref, AniRef1);
    createLottie(Container2Ref, AniRef2);
  }, []);

  useEffect(() => {
    const bluePills = Array.from(
      document.querySelectorAll(
        ".BluePill, .BluePill h2, .BluePill2, .BluePill2 h2"
      )
    );
    // Create individual animations for each BluePill
    const animatablePills = bluePills.map((pill) =>
      createAnimatable(pill, {
        x: 300,
        y: 300,
        ease: "ease(2)",
      })
    );
    const handleMouseMove = (event) =>
      onMouseMove(event, animatablePills, bluePills);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      // Cleanup event listener
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="MainSkillContainer" ref={root}>
      {/* Over head container for teck stacks */}
      <div className="Seperator" id="Sep1">
        <h2>01.</h2>
        <h1 id="TestId">Known tech</h1>
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
        <h1>Stuff I made</h1>
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
