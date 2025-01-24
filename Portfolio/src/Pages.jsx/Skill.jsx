import { useState, useRef, useEffect } from "react";
//Text
import { DynamicAniGitText, BasicDynamicText } from "./Text.js";
import { BasicToDoAppText, ToDoAppGitText } from "./Text.js";
import { BasicFitnessAppText, FitnessAppGitText } from "./Text.js";

function Skill() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //Refs for each project helps control the alter sub class
  const Text1Parent = useRef(null);
  const Text1Container = useRef(null);
  const [Text1, setText1] = useState(BasicDynamicText);

  const Text2Parent = useRef(null);
  const Text2Container = useRef(null);
  const [Text2, setText2] = useState(BasicToDoAppText);

  const Text3Parent = useRef(null);
  const Text3Container = useRef(null);
  const [Text3, setText3] = useState(BasicFitnessAppText);
  //Indivdual button refs for each project
  const Expand1 = useRef(null);
  const Expand2 = useRef(null);
  const Expand3 = useRef(null);
  //Used to see if the expand button should be shown
  const [Button, setButton] = useState(false);
  //Switches the text on click
  function SwitcherOne(num) {
    const setTextFunctions = [setText1, setText2, setText3];
    const Text = [Text1, Text2, Text3];
    const ToCompareGit = [DynamicAniGitText, ToDoAppGitText, FitnessAppGitText];
    const ToReturnBasic = [
      BasicDynamicText,
      BasicToDoAppText,
      BasicFitnessAppText,
    ];

    if (Text[num] === ToCompareGit[num]) {
      setTextFunctions[num](ToReturnBasic[num]);
    } else {
      setTextFunctions[num](ToCompareGit[num]);
    }
  }
  //Handles the switch between the longer text and shorter text
  //Happens when the expand button is clicked
  function TextHandler(num, TextToCompare) {
    const Text = [Text1, Text2, Text3];
    const Pretext = [DynamicAniGitText, ToDoAppGitText, FitnessAppGitText];
    if (Pretext[num] === TextToCompare) {
      return (
        <pre style={{ fontSize: TextFontSize(Text[num].length) }}>
          {Text[num]}
        </pre>
      );
    } else {
      return <h4>{Text[num]}</h4>;
    }
  }
  //Turns on the alter class for the text
  function buttonOnclick(num) {
    const textParent =
      num === 1 ? Text1Parent : num === 2 ? Text2Parent : Text3Parent;
    const textContainer =
      num === 1 ? Text1Container : num === 2 ? Text2Container : Text3Container;
    const Expand = num === 1 ? Expand1 : num === 2 ? Expand2 : Expand3;
    if (textParent.current && textContainer.current && Expand.current) {
      textParent.current.classList.toggle("Alter");
      textContainer.current.classList.toggle("Alter");
      Expand.current.classList.toggle("Alter");
    }
  }
  //Font changer makes it more friendly for smaller monitors
  function TextFontSize(len) {
    let Width = window.innerWidth;
    //Less than 700 word
    if (len < 700) {
      //Width
      if (Width < 1500) {
        return "1em";
      } else {
        return "1.2em";
      }
      //Between 700 and 1000
    } else if (len < 1000) {
      //Width
      if (Width < 1500) {
        return "1em";
      } else {
        return "1.1em";
      }
      //Greater than 1000
    } else {
      //Width
      if (Width < 1600) {
        return "0.8em";
      } else {
        return "0.9em";
      }
    }
  }
  //Resets all the alter classes used for when Button is false
  //Indicating that the screen is too small for the text to be expanded
  function resetAll() {
    const elements = [
      Text1Parent,
      Text2Parent,
      Text3Parent,
      Text1Container,
      Text2Container,
      Text3Container,
      Expand1,
      Expand2,
      Expand3,
    ];
    elements.forEach((element) => {
      if (element.current && element.current.classList.contains("Alter")) {
        element.current.classList.remove("Alter");
      }
    });
  }
  //Tracks the window width
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //Makes changes based on screen size
  useEffect(() => {
    //Removes the button and sets the text to the basic text
    if (windowWidth < 1100) {
      setButton(false);
      setText1(BasicDynamicText);
      setText2(BasicToDoAppText);
      setText3(BasicFitnessAppText);
      resetAll();
    } else {
      setButton(true);
    }
    //Re runs the text handler and changes the text based on the window size
    TextHandler(0, Text1);
    TextHandler(1, Text2);
    TextHandler(2, Text3);
  }, [windowWidth]);

  return (
    <>
      <div className="MainSkillContainer">
        <div className="SkillHeader">
          <h1>Skills and Tools</h1>
        </div>
        <div className="SkillContainer">
          {/* Make bigger */}
          <h2>
            HTML, CSS, Javascript, Node.js, React.js, Express, Mysql, Python,
            JWT, CI/CD, RESTful API, C++, Caddy, Azure, Aws, Figma, Git,
            Typescript
          </h2>
        </div>
        {/* First project no functions because it messes with the alter states*/}
        <div className="ProjectBase Project1" ref={Text1Parent}>
          <h2>Dynamic Animations</h2>
          <div className="ProjectText Project1Text" ref={Text1Container}>
            {TextHandler(0, Text1)}
            {Button && (
              <button
                className="Expandbtn"
                onClick={() => {
                  buttonOnclick(1), SwitcherOne(0);
                }}
                ref={Expand1}
              >
                Expand
              </button>
            )}
            <a
              href="https://www.dynamicanimations.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Link</h3>
            </a>
            <a
              href="https://github.com/TheHeartstriker/DynamicAnimations"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Code</h3>
            </a>
          </div>
        </div>
        {/* Second Project */}
        <div className="ProjectBase Project2" ref={Text2Parent}>
          <h2>GenesisTodo</h2>
          <div className="ProjectText Project2Text" ref={Text2Container}>
            {TextHandler(1, Text2)}
            {Button && (
              <button
                className="Expandbtn"
                onClick={() => {
                  SwitcherOne(1);
                  buttonOnclick(2);
                }}
                ref={Expand2}
              >
                Expand
              </button>
            )}
            <a
              href="https://www.genesistodo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Link</h3>
            </a>
            <a
              href="https://github.com/TheHeartstriker/ToDoApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Code</h3>
            </a>
          </div>
        </div>
        {/* Third Project */}
        <div className="ProjectBase Project3" ref={Text3Parent}>
          <h2>FGraphs</h2>
          <div className="ProjectText Project3Text" ref={Text3Container}>
            {TextHandler(2, Text3)}
            {Button && (
              <button
                className="Expandbtn"
                onClick={() => {
                  SwitcherOne(2);
                  buttonOnclick(3);
                }}
                ref={Expand3}
              >
                Expand
              </button>
            )}
            <a
              href="https://www.fgraphs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Link</h3>
            </a>
            <a
              href="https://github.com/TheHeartstriker/FitnessApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Code</h3>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skill;
