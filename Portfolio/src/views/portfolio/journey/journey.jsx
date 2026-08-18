import styles from "./journey.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import MorgottRune from "@/../public/icons/morgottRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import JourneyAni from "./journeyAni";
function Journey() {
  return (
    <section className={styles["journey"]}>
      <SectionInfo infoName={"CLIENT PROCESS"} />
      <JourneyAni />
      {/*  */}
      {/* Main heading */}
      {/*  */}
      <h2>Project Journey</h2>
      {/*  */}
      {/* Main journey container */}
      {/*  */}
      <div className={styles["journey-con"]}>
        {/*  */}
        {/* Main item 1 */}
        <div className={styles["journey-con-item"]} id={styles["s1"]}>
          {/* Heading */}
          <h4>PROJECT PROCESS 01</h4>
          {/* Text */}
          <div className={styles["journey-con-item-text"]}>
            <h3>Discovery & Contract</h3>
            <p>{lorem + smallLorem}</p>
          </div>
        </div>
        {/*  */}
        {/* Main item 1 */}
        <div className={styles["journey-con-item"]} id={styles["s2"]}>
          {/* Heading */}
          <h4>PROJECT PROCESS 01</h4>
          {/* Text */}
          <div className={styles["journey-con-item-text"]}>
            <h3>Discovery & Contract</h3>
            <p>{lorem + smallLorem}</p>
          </div>
        </div>
        {/*  */}
        {/* Main item 1 */}
        <div className={styles["journey-con-item"]} id={styles["s2"]}>
          {/* Heading */}
          <h4>PROJECT PROCESS 01</h4>
          {/* Text */}
          <div className={styles["journey-con-item-text"]}>
            <h3>Discovery & Contract</h3>
            <p>{lorem + smallLorem}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Journey;
