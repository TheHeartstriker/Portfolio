"use client";
import styles from "./skills.module.css";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import ActionButton from "@/components/button/actionButton";
import Arrow from "../../../../out/icons/arrow";
import { Card1, Card2, Card3 } from "./text";
import SkillsAni from "./skillsAni";
import { useState } from "react";

function Skills() {
  const cards = [Card1, Card2, Card3];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(Card1);

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1,
    );
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <section className={styles["skills"]}>
      <SectionInfo infoName={"SKILLS"} />
      <SkillsAni index={currentCardIndex} set={setCurrentCard} cards={cards} />
      {/*  */}
      {/* Main container */}
      {/*  */}
      <div className={styles["skills-con"]}>
        <div className={styles["skills-con-info"]}>
          <p key={currentCardIndex}>{currentCard.cardDetails}</p>
          <ActionButton text={"SEE PROOF"} type={"regular"} />
        </div>

        <div className={styles["skills-con-heading"]}>
          <div className={styles["skills-con-heading-left"]}>
            <div className={styles["skills-con-heading-left-control"]}>
              <button onClick={handlePrevCard}>
                <Arrow />
              </button>
              <button onClick={handleNextCard}>
                <Arrow />
              </button>
            </div>

            <h3>
              {currentCardIndex + 1}—{cards.length}
            </h3>
          </div>
          <h2 key={currentCardIndex}>{currentCard.cardHeading}</h2>
        </div>
      </div>
    </section>
  );
}

export default Skills;
