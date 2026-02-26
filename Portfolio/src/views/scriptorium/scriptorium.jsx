"use client";
import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
} from "./articles/articleDes.js";
import TimeSharp from "../../../public/icons/time-sharp.jsx";
import { ScriptCard } from "../../components/forViews/scriptorium/scriptCard.jsx";
import PillAnimation from "@/components/forStyle/animations/pillAnimation.jsx";
import ScriptoriumIntroRecent from "./scriptoriumIntroRecent.jsx";
import Masonry from "react-masonry-css";
import "./scriptorium.css";
import { useRef, useState } from "react";

function Scriptorium() {
  const [articles, setArticles] = useState([
    desParticle,
    desMappingFullstack,
    desPolySVG,
    desFlowField,
    desBackendLookLike,
    desHoverCards,
    desColor,
  ]);
  const tags = ["Design", "Creative", "Web", "Visual", "Systems", "Coding"];

  function handleCards() {
    const cards = articles.map((article, index) => (
      <ScriptCard
        key={index}
        articleDes={article}
        link={article.slug}
        reverse={index % 2 === 0}
      />
    ));

    if (articles.length >= 3) {
      cards.splice(3, 0, handleFilter());
    } else {
      cards.push(handleFilter());
    }

    return cards;
  }

  function handleFilter() {
    return (
      <div key="filter" className="article-filter-container">
        <div className="article-filter-text">
          <h3>Filter by tags</h3>
        </div>
        <div className="article-filter-item-container">
          {tags.map((tag, index) => (
            <button key={index}>
              <h5>{tag}</h5>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-scriptorium-container">
        <ScriptoriumIntroRecent />
        <div className="article-container">
          <div className="article-card-container">{handleCards()}</div>
        </div>
      </div>
    </>
  );
}

export default Scriptorium;
