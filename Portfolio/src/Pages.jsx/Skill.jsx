import { useState, useRef, useEffect } from "react";
//Text
import { DynamicAniGitText, BasicDynamicText } from "./Text.js";
import { BasicToDoAppText, ToDoAppGitText } from "./Text.js";
import { BasicFitnessAppText, FitnessAppGitText } from "./Text.js";

function Skill() {
  const Text1Parent = useRef(null);
  const Text1Container = useRef(null);
  const [Text1, setText1] = useState(BasicDynamicText);

  const Text2Parent = useRef(null);
  const Text2Container = useRef(null);
  const [Text2, setText2] = useState(BasicToDoAppText);

  const Text3Parent = useRef(null);
  const Text3Container = useRef(null);
  const [Text3, setText3] = useState(BasicFitnessAppText);
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
  //If we pass in basic text we get a h4
  function TextHandler(num, TextToCompare) {
    const Text = [Text1, Text2, Text3];
    const Pretext = [DynamicAniGitText, ToDoAppGitText, FitnessAppGitText];
    if (Pretext[num] === TextToCompare) {
      return <pre>{Text[num]}</pre>;
    } else {
      return <h4>{Text[num]}</h4>;
    }
  }

  function TextFontSize(len) {
    if (len < 400) {
      return "1.5em";
    } else if (len < 1000) {
      return "1.3em";
    } else {
      return "1.1em";
    }
  }
  function buttonOnclick(num) {
    const textParent =
      num === 1 ? Text1Parent : num === 2 ? Text2Parent : Text3Parent;
    const textContainer =
      num === 1 ? Text1Container : num === 2 ? Text2Container : Text3Container;
    textParent.current.classList.toggle("Alter");
    textContainer.current.classList.toggle("Alter");
  }

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
            JWT, CI/CD, RESTful API, C++, Caddy, Azure, Aws, Figma, Git
          </h2>
        </div>

        <div className="ProjectBase Project1" ref={Text1Parent}>
          <h2>Dynamic animations</h2>
          <div className="ProjectText Project1Text" ref={Text1Container}>
            {TextHandler(0, Text1)}
            <button
              className="Expandbtn"
              onClick={() => {
                buttonOnclick(1), SwitcherOne(0);
              }}
            >
              Expand
            </button>
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
          <h2>ToDo App</h2>
          <div className="ProjectText Project2Text" ref={Text2Container}>
            {TextHandler(1, Text2)}
            {/* <pre style={{ fontSize: TextFontSize(Text2.length) }}>{Text2}</pre> */}
            <button
              className="Expandbtn"
              onClick={() => {
                SwitcherOne(1);
                buttonOnclick(2);
              }}
            >
              Expand
            </button>
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
          <h2>Fitness tracker</h2>
          <div className="ProjectText Project3Text" ref={Text3Container}>
            {TextHandler(2, Text3)}
            {/* <pre style={{ fontSize: TextFontSize(Text3.length) }}>{Text3}</pre> */}
            <button
              className="Expandbtn"
              onClick={() => {
                SwitcherOne(2);
                buttonOnclick(3);
              }}
            >
              Expand
            </button>
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
