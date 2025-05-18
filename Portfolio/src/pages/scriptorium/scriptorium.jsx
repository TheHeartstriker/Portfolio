import { useEffect, useState, useRef } from "react";
import { SubjectContainer } from "../../components/scriptorium/index.jsx";
import { markdown } from "./articles/article1.js";

import "./scriptorium.css";

function Scriptorium() {
  const [activeArts, setActiveArts] = useState({
    article1: false,
  });

  function handleClick(article) {
    setActiveArts((prevState) => ({
      ...prevState,
      [article]: !prevState[article],
    }));
  }

  return (
    <div className="mainScriptoriumContainer">
      <SubjectContainer
        title="Particle systems"
        subject="Mathematics's / programming "
        description="An introduction to creative coding. Overviews a base line for creating fun and unique web experiences. Such techniques were even used to create this website! Also something great to learn to practice fundamentals and improve problem solving skills. "
        active={activeArts.article1}
        onClick={() => handleClick("article1")}
        article={markdown}
      />
    </div>
  );
}

export default Scriptorium;
