"use client";
import { useState } from "react";
import { SubjectContainer } from "../../components/scriptorium/index.jsx";
import { markdown } from "./articles/article1.js";
import {
  articleMappingFullStack1,
  articleMappingFullStack2,
  articleMappingFullStack3,
  articleMappingFullStack4,
} from "./articles/article2.js";
import ParticleSys from "./scripts/particleSys.jsx";
const art1Image = "/scriptorium/Map1.png";
const art2Image = "/scriptorium/Map2.png";
const art3Image = "/scriptorium/Map3.png";

import "./scriptorium.css";

function Scriptorium() {
  const articleArr1 = [markdown, ParticleSys];
  const articleArr2 = [
    articleMappingFullStack1,
    art1Image,
    articleMappingFullStack2,
    art2Image,
    articleMappingFullStack3,
    art3Image,
    articleMappingFullStack4,
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
    <div className="main-scriptorium-container">
      <SubjectContainer
        title="Mapping a full stack application"
        subject="Web development / Full stack"
        description="A mapping of a full stack application, using custom drawn diagrams an images to showcase the architecture and flow of a full stack application removed from abstractions like saas. This is a very fundamental article its about what happens when you visit a website, serving code, domain names, logging in, jwt, cookies, https and security."
        active={activeArts.article2}
        onClick={handleClick}
        article={articleArr2}
        articleName="article2"
      />
      <SubjectContainer
        title="Particle system's"
        subject="Mathematics's / programming "
        description="An introduction to creative coding through a particle system. Learn how logic, math, and code can recreate natural phenomena. These techniques power parts of this website and are an invaluable way to practice fundamentals and improve problem-solving skills. There is also a fun little demo at the end :)"
        active={activeArts.article1}
        onClick={handleClick}
        article={articleArr1}
        articleName="article1"
      />
    </div>
  );
}

export default Scriptorium;
