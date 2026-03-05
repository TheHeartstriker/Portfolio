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
import { useState } from "react";
import { Separator } from "@/components/separator/separator.jsx";

const allArticles = [
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
];

function Scriptorium() {
  const [activeTags, setActiveTags] = useState([]);
  const tags = ["Design", "Creative", "Web", "Visual", "Systems", "Coding"];

  const filteredArticles =
    activeTags.length === 0
      ? allArticles
      : allArticles.filter((article) =>
          activeTags.every((tag) => article.tags.includes(tag)),
        );

  function handleTagClick(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function handleCards() {
    const cards = filteredArticles.map((article, index) => (
      <ScriptCard
        key={article.slug}
        articleDes={article}
        link={article.slug}
        reverse={index % 2 === 0}
      />
    ));

    if (cards.length >= 3) {
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
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              className={
                activeTags.includes(tag)
                  ? "article-filter-item-container-btn active"
                  : "article-filter-item-container-btn"
              }
            >
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
          <Separator
            headerArr={["Hightlights", "And Outcomes"]}
            reverse={false}
          />
          <div className="article-card-container">{handleCards()}</div>
        </div>
      </div>
    </>
  );
}

export default Scriptorium;
