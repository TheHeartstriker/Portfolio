import styles from "./highlight.module.css";
import { lorem, smallLorem } from "@/utils/text/text";

function Highlight() {
  return (
    <section className={styles["highlight"]}>
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
