import { useState } from "react";
import { SubjectContainer } from "../../components/scriptorium/index.jsx";
import { markdown } from "./articles/article1.js";
import {
  articleMappingFullStack1,
  articleMappingFullStack2,
} from "./articles/article2.js";
import particleSys from "./scripts/particleSys.jsx";
import art1Image from "../../assets/Map1.png";
import art2Image from "../../assets/Map2.png";

import "./scriptorium.css";

function Scriptorium() {
  const articleArr1 = [markdown, particleSys];
  const articleArr2 = [
    articleMappingFullStack1,
    art1Image,
    articleMappingFullStack2,
    art2Image,
  ];
  const [activeArts, setActiveArts] = useState({
    article1: false,
    article2: false,
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
        article={articleArr1}
        articleName="article1"
      />

      <SubjectContainer
        title="Maping a full stack application"
        subject="Web development / system design"
        description="A maping of a full stack application, using custom drawn diagrams an images to showcase the architecture and flow of a full stack application removed from abstractions like saas. This is a very fundamentall article its about what happens when you visit a website, serving code, domain names, logging in, jwt and cookies."
        active={activeArts.article2}
        onClick={handleClick}
        article={articleArr2}
        articleName="article2"
      />
    </div>
  );
}

export default Scriptorium;
