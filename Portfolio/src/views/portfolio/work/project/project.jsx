import styles from "./project.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import MorgottRune from "@/../public/icons/morgottRune";
import ActionButton from "@/components/button/actionButton";
function Project() {
  return (
    <div className={styles["work-project"]}>
      {/*  */}
      {/* Hero intro */}
      {/*  */}
      <div className={styles["work-project-hero"]}>
        <h3>PERSONAL</h3>
        <h2>FGraphs Fitness Site</h2>
        {/*  */}
        {/* Para details and btn */}
        <div className={styles["work-project-hero-bottom"]}>
          <p>{lorem + lorem}</p>
          <ActionButton text={"SEE LIVE WEBSITE"} type={"regular"} />
        </div>
      </div>
      {/*  */}
      {/* Main intro / details*/}
      {/*  */}
      <div className={styles["work-project-main"]}>
        {/*  */}
        {/* Left detail section */}
        <div className={styles["work-project-main-left"]}>
          {/* Detail 1 */}
          <div className={styles["work-project-main-left-info"]}>
            <h4>CLIENT</h4>
            <h5>Personal</h5>
          </div>
          {/* Detail 1 */}
          <div className={styles["work-project-main-left-info"]}>
            <h4>CLIENT</h4>
            <h5>Personal</h5>
          </div>
        </div>
        {/*  */}
        {/* Right detail section */}
        <div className={styles["work-project-main-right"]}>
          {/* Detail 1 */}
          <div className={styles["work-project-main-right-info"]}>
            <h4>CLIENT</h4>
            <h5>Personal</h5>
            <h5>Personal</h5>
            <h5>Personal</h5>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Middle intro area with para and sub heading*/}
      {/*  */}
      <div className={styles["work-project-middle"]}>
        {/*  */}
        {/* Left subheading with imaage's */}
        <div className={styles["work-project-middle-left"]}>
          <h3>
            We recruited urgently needed stem cell donors to save the lives of
            ethnically diverse Australian blood cancer patients.
          </h3>
          {/* Images */}
          <div className={styles["work-project-middle-left-image"]}></div>
        </div>
        {/*  */}
        {/* right subheading with imaage's */}
        <div className={styles["work-project-middle-right"]}>
          <p>{lorem + lorem + lorem}</p>
        </div>
      </div>
      {/*  */}
      {/* Full large scale image's */}
      {/*  */}
      <div className={styles["work-project-image-1"]}></div>
      <div className={styles["work-project-image-2"]}></div>
      <div className={styles["work-project-image-3"]}></div>
      {/*  */}
      {/* Exit section */}
      {/*  */}
      <div className={styles["work-project-exit"]}>
        {/*  */}
        {/* Heading */}
        <h4>Next Project — Realtor</h4>
        <h3>To The Next One</h3>
        {/*  */}
        {/* Main next tab */}
        <div className={styles["work-project-exit"]}>
          {/* Intro area */}
          <div className={styles["work-project-exit-intro"]}>
            <h4>KEEP SCROLLING FOR THE NEXT PROJECT</h4>
            <MorgottRune />
          </div>
          {/* Line details */}
          <div className={styles["work-project-exit-complete"]}>
            <div className={styles["work-project-exit-complete-line1"]}></div>
            <div className={styles["work-project-exit-complete-line2"]}></div>
          </div>
          {/* Image next section / details */}
          <div className={styles["work-project-exit-image"]}></div>
          {/* Action button */}
          <ActionButton text={"SEE LIVE WEBSITE"} type={"regular"} />
        </div>
      </div>
    </div>
  );
}

export default Project;
