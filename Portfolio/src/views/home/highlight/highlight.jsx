import styles from "./highlight.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import HighlightAni from "./highlightAni";

function Highlight() {
  return (
    <section className={styles["highlight"]}>
      <HighlightAni />
      {/*  */}
      {/* Highlight heading / details */}
      {/*  */}
      <div className={styles["highlight-main"]}>
        {/*  */}
        {/* Item 1 */}
        <div className={`${styles["highlight-main-item"]} ${styles["item1"]}`}>
          <img src="/home/about1.jpg" />
        </div>
        {/*  */}
        {/* Item 2 */}
        <div className={`${styles["highlight-main-item"]} ${styles["item2"]}`}>
          {" "}
          <img src="/home/about2.jpg" />
        </div>
        {/*  */}
        {/* Item 1 */}
        <div className={`${styles["highlight-main-item"]} ${styles["item1"]}`}>
          <img src="/home/about1.jpg" />
        </div>
        {/*  */}
        {/* Item 2 */}
        <div className={`${styles["highlight-main-item"]} ${styles["item2"]}`}>
          {" "}
          <img src="/home/about2.jpg" />
        </div>
      </div>
      {/*  */}
      {/* Highlight heading / details */}
      {/*  */}
      <div className={styles["highlight-con"]}>
        {/*  */}
        {/* Highlight heading */}
        <div className={styles["highlight-con-heading"]}>
          <h4>The work</h4>
          <h2>
            Life <br /> On The Web
          </h2>
          {/* Highlight length done indicator*/}
          <div className={styles["highlight-con-heading-indi"]}>
            <div className={styles["highlight-con-heading-indi-line1"]}></div>
            <div className={styles["highlight-con-heading-indi-line2"]}></div>
          </div>
        </div>
        {/*  */}
        {/* Detail's highlights */}
        <div className={styles["highlight-con-detail"]}>
          {/* Item 1 */}
          <div className={styles["highlight-con-detail-item"]}>
            <h3>4</h3>
            <h4>YEARS OF EXPERIANCE</h4>
          </div>
          {/* Item 1 */}
          <div className={styles["highlight-con-detail-item"]}>
            <h3>8</h3>
            <h4>PROJECTS COMPLETED</h4>
          </div>
          {/* Item 1 */}
          <div className={styles["highlight-con-detail-item"]}>
            <h3>1</h3>
            <h4>SATISFIED CLIENTS</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlight;
