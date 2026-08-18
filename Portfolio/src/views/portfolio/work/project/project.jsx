import styles from "./project.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import MorgottRune from "@/../public/icons/morgottRune";
import ActionButton from "@/components/button/actionButton";
import ProjectAni from "./projectAni";

//
/// Rememver to replace overlay in css and image classes
//
//
function Project({ projectNum }) {
  return (
    <div className={styles["work-project"]}>
      <ProjectAni projectNum={projectNum} />
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
        {/* Image */}
        <img src="./dev/dev1.jpg"></img>
        <div className={styles["work-project-main-overlay"]}></div>
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
          <h4>CLIENT</h4>
          <h5>Personal</h5>
          <h5>Personal</h5>
          <h5>Personal</h5>
        </div>
      </div>
      {/*  */}
      {/* Middle intro area with para and sub heading*/}
      {/*  */}
      <div className={styles["work-project-middle"]}>
        {/*  */}
        {/* Top subheading */}
        <div className={styles["work-project-middle-top"]}>
          <h3>
            We recruited urgently needed stem cell donors to save the lives of
            ethnically diverse Australian blood cancer patients.
          </h3>
        </div>
        {/*  */}
        {/* Bottom area para and left side image*/}
        <div className={styles["work-project-middle-bottom"]}>
          {/* Image area left */}
          <div className={styles["work-project-middle-bottom-left"]}>
            {/* Image 1 */}
            <div className={styles["work-project-middle-bottom-left-image"]}>
              {/* Overlay and image */}
              <div
                className={
                  styles["work-project-middle-bottom-left-image-overlay"]
                }
              ></div>
              <img src="./dev/dev1.jpg"></img>
            </div>
            {/* Image 2 */}

            <div className={styles["work-project-middle-bottom-left-image"]}>
              {/* Overlay and image */}

              <div
                className={
                  styles["work-project-middle-bottom-left-image-overlay"]
                }
              ></div>

              <img src="./dev/dev1.jpg"></img>
            </div>
          </div>
          {/* Text area right */}
          <p>{lorem + lorem}</p>
        </div>
      </div>
      {/*  */}
      {/* Full large scale image's */}
      {/*  */}
      <div className={styles["work-project-image-1"]}>
        <div className={styles["work-project-image-overlay"]}></div>
        <img src="./dev/dev1.jpg"></img>
      </div>
      <div className={styles["work-project-image-2"]}>
        <div className={styles["work-project-image-overlay"]}></div>

        <img src="./dev/dev1.jpg"></img>
      </div>
      <div className={styles["work-project-image-3"]}>
        <div className={styles["work-project-image-overlay"]}></div>

        <img src="./dev/dev1.jpg"></img>
      </div>
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
        <div className={styles["work-project-exit-tab"]}>
          {/* Intro area */}
          <div className={styles["work-project-exit-tab-intro"]}>
            <h4>KEEP SCROLLING FOR THE NEXT PROJECT</h4>
            <MorgottRune />
          </div>
          {/* Line details */}
          <div className={styles["work-project-exit-tab-pro"]}>
            <div className={styles["work-project-exit-tab-pro-line1"]}></div>
            <div className={styles["work-project-exit-tab-pro-line2"]}></div>
          </div>
          {/* Image next section / details */}
          <div className={styles["work-project-exit-tab-image"]}>
            <div className={styles["work-project-overlay"]}></div>
            <img src="./dev/dev1.jpg"></img>
          </div>
          {/* Action button */}
          <ActionButton text={"SEE LIVE WEBSITE"} type={"work"} />
        </div>
      </div>
    </div>
  );
}

export default Project;
