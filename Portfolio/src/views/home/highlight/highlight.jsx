import styles from "./highlight.module.css";
import HighlightAni from "./highlightAni";
import {
  highlightSubheading,
  highlightImages,
  highlightStats,
  highlightHeading1,
  highlightHeading2,
} from "./text";

function Highlight() {
  return (
    <section className={styles["highlight"]}>
      <HighlightAni />
      {/*  */}
      {/* Highlight heading / details */}
      {/*  */}
      <div className={styles["highlight-main"]}>
        {highlightImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`${styles["highlight-main-item"]} ${
              index % 2 === 0 ? styles["item1"] : styles["item2"]
            }`}
            style={{ width: `${image.width}`, height: `${image.height}` }}
          >
            <img src={image.src} alt="Highlight project" />
          </div>
        ))}
      </div>

      {/*  */}
      {/* Highlight heading / details */}
      {/*  */}
      <div className={styles["highlight-con"]}>
        {/*  */}
        {/* Highlight heading */}
        <div className={styles["highlight-con-heading"]}>
          <h4>{highlightSubheading}</h4>
          <h2>
            {highlightHeading1} <br /> {highlightHeading2}
          </h2>
          <div className={styles["highlight-con-heading-indi"]}>
            <div className={styles["highlight-con-heading-indi-line1"]}></div>
            <div className={styles["highlight-con-heading-indi-line2"]}></div>
          </div>
        </div>

        <div className={styles["highlight-con-detail"]}>
          {highlightStats.map((item) => (
            <div
              key={item.label}
              className={styles["highlight-con-detail-item"]}
            >
              <h3>{item.number}</h3>
              <h4>{item.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlight;
