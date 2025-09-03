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
import { desParticle, desMappingFullstack } from "./articles/articleDes.js";
import { ScriptCard } from "../../components/scriptorium/scriptCard.jsx";

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
      <div className="article-card-container">
        <ScriptCard articleDes={desParticle} />

        <ScriptCard articleDes={desMappingFullstack} />
      </div>
    </div>
  );
}

export default Scriptorium;
