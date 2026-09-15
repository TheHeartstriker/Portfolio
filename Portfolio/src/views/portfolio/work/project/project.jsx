"use client";
import styles from "./project.module.css";
import MorgottRune from "@/../public/icons/morgottRune";
import ActionButton from "@/components/button/actionButton";
import ScrollAni from "./scrollAni";
import ProjectAni from "./projectAni";
import PropTypes from "prop-types";
import { Context } from "@/components/provider/provider";
import { useContext } from "react";
function Project({ projectNum, project }) {
  const { setTransition, setNavPage } = useContext(Context);

  function getImageStyle(image, fallback = {}) {
    return {
      objectFit: image?.imageFit ?? fallback.imageFit,
      objectPosition: image?.imagePos ?? fallback.imagePos,
    };
  }

  return (
    <div className={styles["work"]}>
      <div className={styles["work-project"]}>
        <ScrollAni projectNum={projectNum} />
        <ProjectAni />
        {/*  */}
        {/* Hero intro */}
        {/*  */}
        <div className={styles["work-project-hero"]}>
          <h2>{project.hero.subHeading}</h2>
          <h1>{project.hero.heading}</h1>
          {/*  */}
          {/* Para details and btn */}
          <div className={styles["work-project-hero-bottom"]}>
            <p>{project.hero.detailsPara}</p>
            <ActionButton
              text={project.hero.cta}
              type={"regular"}
              onClick={() => {
                window.open(`${project.hero.ctaLink}`, "_blank");
              }}
            />
          </div>
        </div>
        {/*  */}
        {/* Main intro / details*/}
        {/*  */}
        <div className={styles["work-project-main"]}>
          {/*  */}
          {/* Image */}
          <img
            src={project.main.image}
            style={getImageStyle(project.main, project.main)}
          ></img>
          <div className={styles["work-project-main-overlay"]}></div>
          {/*  */}
          {/* Left detail section */}
          <div className={styles["work-project-main-left"]}>
            {/* Detail 1 */}
            <div className={styles["work-project-main-left-info"]}>
              <h3>{project.main.leftDetails[0].label}</h3>
              <h4>{project.main.leftDetails[0].value}</h4>
            </div>
            {/* Detail 1 */}
            <div className={styles["work-project-main-left-info"]}>
              <h3>{project.main.leftDetails[1].label}</h3>
              <h4>{project.main.leftDetails[1].value}</h4>
            </div>
          </div>
          {/*  */}
          {/* Right detail section */}
          <div className={styles["work-project-main-right"]}>
            <h3>{project.main.rightDetails.label}</h3>
            <h4>{project.main.rightDetails.values[0]}</h4>
            <h4>{project.main.rightDetails.values[1]}</h4>
            <h4>{project.main.rightDetails.values[2]}</h4>
          </div>
        </div>
        {/*  */}
        {/* Middle intro area with para and sub heading*/}
        {/*  */}
        <div className={styles["work-project-middle"]}>
          {/*  */}
          {/* Top subheading */}
          <div className={styles["work-project-middle-top"]}>
            <h2>{project.middle.heading}</h2>
          </div>
          {/*  */}
          {/* Bottom area para and left side image*/}
          <div className={styles["work-project-middle-bottom"]}>
            {/* Image area left */}
            <div className={styles["work-project-middle-bottom-left"]}>
              {/* Image 1 */}
              <div className={styles["work-project-middle-bottom-left-image"]}>
                {/* image */}
                <img
                  src={project.middle.images[0].source}
                  style={getImageStyle(
                    project.middle.images[0],
                    project.middle,
                  )}
                ></img>
              </div>
              {/* Image 2 */}
              <div className={styles["work-project-middle-bottom-left-image"]}>
                {/*  image */}
                <img
                  src={project.middle.images[1].source}
                  style={getImageStyle(
                    project.middle.images[1],
                    project.middle,
                  )}
                ></img>
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
          <img
            src={project.image.image1.source}
            style={getImageStyle(project.image.image1, project.image)}
          ></img>
        </div>
        <div className={styles["work-project-image-2"]}>
          <img
            src={project.image.image2.source}
            style={getImageStyle(project.image.image2, project.image)}
          ></img>
        </div>
        <div className={styles["work-project-image-3"]}>
          <img
            src={project.image.image3.source}
            style={getImageStyle(project.image.image3, project.image)}
          ></img>
        </div>
        {/*  */}
        {/* Exit section */}
        {/*  */}
        <div className={styles["work-project-exit"]}>
          {/*  */}
          {/* Heading */}
          <h3>{project.exit.nextProjectHeading}</h3>
          <h2>{project.exit.heading}</h2>
          {/*  */}
          {/* Main next tab */}
          <div className={styles["work-project-exit-tab"]}>
            {/* Intro area */}
            <div className={styles["work-project-exit-tab-intro"]}>
              <h3>{project.exit.instruction}</h3>
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
              <img
                src={project.exit.image}
                style={getImageStyle(project.exit, project.exit)}
              ></img>
            </div>
            {/* Action button */}
            <ActionButton
              text={project.exit.cta}
              type={"project"}
              onClick={() => {
                (setTransition(true), setNavPage("/portfolio"));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const projectTextShape = PropTypes.shape({
  subHeading: PropTypes.string,
  heading: PropTypes.string,
  detailsPara: PropTypes.string,
  cta: PropTypes.string,
  ctaLink: PropTypes.string,
});

Project.propTypes = {
  projectNum: PropTypes.number.isRequired,
  project: PropTypes.shape({
    hero: projectTextShape.isRequired,
    main: PropTypes.shape({
      image: PropTypes.string.isRequired,
      leftDetails: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ).isRequired,
      rightDetails: PropTypes.shape({
        label: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
    }).isRequired,
    middle: PropTypes.shape({
      heading: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({ source: PropTypes.string.isRequired }),
      ).isRequired,
      detailsPara: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.shape({
      image1: PropTypes.shape({
        source: PropTypes.string.isRequired,
        imageFit: PropTypes.string,
        imagePos: PropTypes.string,
      }).isRequired,
      image2: PropTypes.shape({
        source: PropTypes.string.isRequired,
        imageFit: PropTypes.string,
        imagePos: PropTypes.string,
      }).isRequired,
      image3: PropTypes.shape({
        source: PropTypes.string.isRequired,
        imageFit: PropTypes.string,
        imagePos: PropTypes.string,
      }).isRequired,
    }).isRequired,
    exit: PropTypes.shape({
      nextProjectHeading: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      instruction: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      cta: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Project;
