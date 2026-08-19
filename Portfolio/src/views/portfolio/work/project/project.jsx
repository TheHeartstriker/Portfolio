"use client";
import styles from "./project.module.css";
import MorgottRune from "@/../public/icons/morgottRune";
import ActionButton from "@/components/button/actionButton";
import ProjectAni from "./projectAni";
import { useLenis } from "lenis/react";
import processStyles from "../../process/process.module.css";

//
/// Rememver to replace overlay in css and image classes
//
//
function Project({ projectNum, project }) {
  const lenis = useLenis();

  function scrollToProcess() {
    const processSection = document.querySelector(
      `.${processStyles["process"]}`,
    );

    if (!processSection) return;

    lenis?.scrollTo(processSection, {
      offset: 0,
      duration: 1.5,
      easing: (t) => t * (2 - t),
    });
  }
  return (
    <div className={styles["work-project"]}>
      <ProjectAni projectNum={projectNum} />
      {/*  */}
      {/* Hero intro */}
      {/*  */}
      <div className={styles["work-project-hero"]}>
        <h3>{project.hero.subHeading}</h3>
        <h2>{project.hero.heading}</h2>
        {/*  */}
        {/* Para details and btn */}
        <div className={styles["work-project-hero-bottom"]}>
          <p>{project.hero.detailsPara}</p>
          <ActionButton text={project.hero.cta} type={"regular"} />
        </div>
      </div>
      {/*  */}
      {/* Main intro / details*/}
      {/*  */}
      <div className={styles["work-project-main"]}>
        {/*  */}
        {/* Image */}
        <img src={project.main.image}></img>
        <div className={styles["work-project-main-overlay"]}></div>
        {/*  */}
        {/* Left detail section */}
        <div className={styles["work-project-main-left"]}>
          {/* Detail 1 */}
          <div className={styles["work-project-main-left-info"]}>
            <h4>{project.main.leftDetails[0].label}</h4>
            <h5>{project.main.leftDetails[0].value}</h5>
          </div>
          {/* Detail 1 */}
          <div className={styles["work-project-main-left-info"]}>
            <h4>{project.main.leftDetails[1].label}</h4>
            <h5>{project.main.leftDetails[1].value}</h5>
          </div>
        </div>
        {/*  */}
        {/* Right detail section */}
        <div className={styles["work-project-main-right"]}>
          <h4>{project.main.rightDetails.label}</h4>
          <h5>{project.main.rightDetails.values[0]}</h5>
          <h5>{project.main.rightDetails.values[1]}</h5>
          <h5>{project.main.rightDetails.values[2]}</h5>
        </div>
      </div>
      {/*  */}
      {/* Middle intro area with para and sub heading*/}
      {/*  */}
      <div className={styles["work-project-middle"]}>
        {/*  */}
        {/* Top subheading */}
        <div className={styles["work-project-middle-top"]}>
          <h3>{project.middle.heading}</h3>
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
              <img src={project.middle.images[0].source}></img>
            </div>
            {/* Image 2 */}

            <div className={styles["work-project-middle-bottom-left-image"]}>
              {/* Overlay and image */}

              <div
                className={
                  styles["work-project-middle-bottom-left-image-overlay"]
                }
              ></div>

              <img src={project.middle.images[1].source}></img>
            </div>
          </div>
          {/* Text area right */}
          <p>{project.middle.detailsPara}</p>
        </div>
      </div>
      {/*  */}
      {/* Full large scale image's */}
      {/*  */}
      <div className={styles["work-project-image-1"]}>
        <div className={styles["work-project-image-overlay"]}></div>
        <img src={project.image.images[0].source}></img>
      </div>
      <div className={styles["work-project-image-2"]}>
        <div className={styles["work-project-image-overlay"]}></div>

        <img src={project.image.images[1].source}></img>
      </div>
      <div className={styles["work-project-image-3"]}>
        <div className={styles["work-project-image-overlay"]}></div>

        <img src={project.image.images[2].source}></img>
      </div>
      {/*  */}
      {/* Exit section */}
      {/*  */}
      <div className={styles["work-project-exit"]}>
        {/*  */}
        {/* Heading */}
        <h4>{project.exit.nextProjectHeading}</h4>
        <h3>{project.exit.heading}</h3>
        {/*  */}
        {/* Main next tab */}
        <div className={styles["work-project-exit-tab"]}>
          {/* Intro area */}
          <div className={styles["work-project-exit-tab-intro"]}>
            <h4>{project.exit.instruction}</h4>
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
            <img src={project.exit.image}></img>
          </div>
          {/* Action button */}
          <ActionButton
            text={project.exit.cta}
            type={"work"}
            onClick={scrollToProcess}
          />
        </div>
      </div>
    </div>
  );
}

export default Project;
