import styles from "./process.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import MorgottRune from "@/../public/icons/morgottRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import ScrollMotion from "@/components/animations/scrollMotion";
function Process() {
  return (
    <section className={styles["process"]}>
      <SectionInfo infoName={"DESIGN PROCESS"} />
      {/*  */}
      {/* Item animations */}
      {/*  */}
      <ScrollMotion
        item={`.${styles["process-con-item-image"]} img`}
        moveDirection="y"
        moveAmount={-10}
        start="top 85%"
        end="bottom top"
      />
      {/*  */}
      {/* Main item container */}
      {/*  */}
      <div className={styles["process-con"]}>
        {/*  */}
        {/* Main Item 1 */}
        <div className={styles["process-con-item"]}>
          {/* Left side text */}
          <div className={styles["process-con-item-text"]}>
            <p>{lorem + smallLorem}</p>
            <h2>Visual & Design</h2>
          </div>
          {/* Right side image */}
          <div className={styles["process-con-item-image"]}>
            <div className={styles["process-con-item-image-overlay"]}></div>
            <img
              src="./dev/dev1.jpg"
              className={styles["process-con-item-image-media"]}
            ></img>
          </div>
        </div>
        {/*  */}
        {/* Sep */}
        <div className={styles["process-con-line"]}></div>
        {/*  */}
        {/* Main Item 1 */}
        <div className={styles["process-con-item"]}>
          {/* Left side text */}
          <div className={styles["process-con-item-text"]}>
            <p>{lorem + smallLorem}</p>
            <h2>Visual & Design</h2>
          </div>
          {/* Right side image */}
          <div className={styles["process-con-item-image"]}>
            <div className={styles["process-con-item-image-overlay"]}></div>
            <img src="./dev/dev1.jpg"></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
