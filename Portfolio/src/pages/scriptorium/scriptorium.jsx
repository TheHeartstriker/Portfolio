import { useState } from "react";
import { SubjectContainer } from "../../components/scriptorium/index.jsx";
import { markdown } from "./articles/article1.js";
import particleSys from "./scripts/particleSys.jsx";

import "./scriptorium.css";

function Scriptorium() {
  const articleArr = [markdown, particleSys];
  const [activeArts, setActiveArts] = useState({
    article1: false,
  });

  function handleClick(article, furl) {
    if (activeArts[article] === true && furl === true) return;
    setActiveArts((prevState) => ({
      ...prevState,
      [article]: !prevState[article],
    }));
  }

  return (
    <div className="mainScriptoriumContainer">
      <SubjectContainer
        title="Particle system's"
        subject="Mathematics's / programming "
        description="An introduction to creative coding through a particle system. Learn how logic, math, and code can recreate natural phenomena. These techniques power parts of this website and are an invaluable way to practice fundamentals and improve problem-solving skills."
        active={activeArts.article1}
        onClick={handleClick}
        article={articleArr}
        articleName="article1"
      />
    </div>
  );
}

export default Scriptorium;
