import styles from "./highlight.module.css";
import MorgottRune from "@/../public/icons/morgottRune";
import {
  highlightHeading,
  highlightSectionName,
  highlightImage1,
  highlightImage2,
} from "./text";

import {
  highlightStatCard1,
  highlightStatCard2,
  highlightStatCard3,
  highlightStatCard4,
} from "./text";
function Highlight() {
  const cards = [
    highlightStatCard1,
    highlightStatCard2,
    highlightStatCard3,
    highlightStatCard4,
  ];
  return (
    <section className={styles["highlight"]}>
      {/*  */}
      {/* Main intro */}
      {/*  */}
      <div className={styles["highlight-intro"]}>
        <h2>{highlightHeading}</h2>
        {/*  */}
        {/* Section detail */}
        <div className={styles["highlight-intro-detail"]}>
          <h3>{highlightSectionName}</h3>
          <MorgottRune />
        </div>
      </div>
      {/*  */}
      {/* Main Gallery type highlight */}
      {/*  */}
      <div className={styles["highlight-gallery"]}>
        {/*  */}
        {/* Image One */}
        <div className={styles["highlight-gallery-image-1"]}>
          <div className={styles["highlight-gallery-image-overlay"]}></div>
          <img src={highlightImage1} alt="About" />
        </div>
        {/*  */}
        {/* Image Two */}
        <div className={styles["highlight-gallery-image-2"]}>
          <div className={styles["highlight-gallery-image-overlay"]}></div>
          <img src={highlightImage2} alt="About" />
        </div>
      </div>
      {/*  */}
      {/* Main Stat cards */}
      {/*  */}
      <div className={styles["highlight-stat"]}>
        {/*  */}
        {/* Items */}
        {cards.map((card, index) => (
          <div className={styles["highlight-stat-item"]} key={index}>
            <h4>{card.stat}</h4>
            <h3>{card.heading}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Highlight;
