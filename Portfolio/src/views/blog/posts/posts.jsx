"use client";

import { useState, useRef } from "react";
import styles from "./posts.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import ActionButton from "@/components/button/actionButton";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import RadahnRune from "@/../public/icons/radahnRune";
import PostsCard from "./card";
import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
} from "./content/articleDes";
import PostsAni from "./postsAni";

function Posts() {
  const filterTypes = [
    "DESIGN",
    "CREATIVE",
    "WEB",
    "VISUAL",
    "SYSTEMS",
    "CODING",
  ];
  const posts = [
    desParticle,
    desMappingFullstack,
    desPolySVG,
    desFlowField,
    desBackendLookLike,
    desHoverCards,
    desColor,
  ];

  const [activeTags, setActiveTags] = useState([]);
  const [trigger, setTrigger] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardsRef = useRef(null);

  // if no filters are active, show everything
  // otherwise show a post only if it has ALL active tags
  const filteredPosts =
    activeTags.length === 0
      ? posts
      : posts.filter((post) =>
          activeTags.every((tag) => post.tags.includes(tag)),
        );

  return (
    <section className={styles["posts"]}>
      <SectionInfo infoName="POSTS" />
      <PostsAni
        containerRef={cardsRef}
        trigger={trigger}
        setTrigger={setTrigger}
        setActiveTags={setActiveTags}
        setIsAnimating={setIsAnimating}
      />
      {/*  */}
      {/* Filter menu */}
      {/*  */}
      <div className={styles["posts-menu"]}>
        {/*  */}
        {/* Filter Item */}
        {filterTypes.map((filterType) => (
          <button
            className={`${styles["posts-menu-btn"]} ${
              activeTags.includes(filterType) ? styles.active : ""
            }`}
            key={filterType}
            disabled={isAnimating}
            onClick={() => setTrigger(filterType)}
          >
            <h3>{filterType}</h3>
          </button>
        ))}
      </div>
      {/*  */}
      {/* Card Container */}
      {/*  */}
      <div className={styles["posts-con"]} ref={cardsRef}>
        {/*  */}
        {/* Cars */}
        {filteredPosts.map((article) => (
          <PostsCard
            key={article.slug}
            image={article.image}
            imageAlt={article.title}
            title={article.title}
            types={article.tags}
            date={`${article.date.month}/${article.date.day}/${article.date.year}`}
            text={article.des}
            buttonText="READ ME!"
            slug={article.slug}
          />
        ))}
      </div>
    </section>
  );
}

export default Posts;
