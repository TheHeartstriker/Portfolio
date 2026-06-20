"use client";
import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
} from "../../articlesContent/articleDes";
import { ScriptCard } from "./scriptCard.jsx";
import "./articles.css";
import { useEffect, useState } from "react";
import { Separator } from "@/components/separator/separator.jsx";
import ArticlesAni from "./articlesAni";
const allArticles = [
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
];

function Articles() {
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
    <div className="article-container">
      <ArticlesAni filteredArticles={filteredArticles} />
      <Separator headerArr={["Post's", "And Content"]} reverse={false} />
      <div className="article-card-container">{handleCards()}</div>
    </div>
  );
}

export default Articles;
