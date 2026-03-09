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
import { ScriptCard } from "../../components/forViews/scriptorium/scriptCard.jsx";
import ScriptoriumIntroRecent from "./section/scriptoriumIntroRecent.jsx";
import "./scriptorium.css";
import { useEffect, useState } from "react";
import { Separator } from "@/components/separator/separator.jsx";
import { animateBlocks } from "@/utils/animations/animations.jsx";

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
  const [filterPosition, setFilterPosition] = useState(3);
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

    if (cards.length >= filterPosition) {
      cards.splice(filterPosition, 0, handleFilter());
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

  function animateCards() {
    // Scoped to the stats sibling, not the main block
    const cards = document.querySelectorAll(".script-article");
    animateBlocks(
      { start: 50, end: 0, type: "y" },
      { el: "top", scroll: "90%" },
      { el: "bottom", scroll: "40%" },
      cards,
      {
        duration: 0.25,
        delay: 0,
        easing: "power1.in",
        stagger: 0.15,
      },
    );
  }

  useEffect(() => {
    animateCards();
  }, [filteredArticles]);

  useEffect(() => {
    function updateFilterPosition() {
      const width = window.innerWidth;
      if (width <= 750) {
        setFilterPosition(0);
      } else if (width <= 1500) {
        setFilterPosition(1);
      } else {
        setFilterPosition(3);
      }
    }
    updateFilterPosition();
    window.addEventListener("resize", updateFilterPosition);
    return () => window.removeEventListener("resize", updateFilterPosition);
  }, []);

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
