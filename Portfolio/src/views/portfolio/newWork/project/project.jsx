"use client";
import { useEffect, useState } from "react";
import styles from "./project.module.css";
import MorgottRune from "@/../public/icons/morgottRune";
import ActionButton from "@/components/button/actionButton";
import ProjectAni from "./projectAni";
import { useLenis } from "lenis/react";
import processStyles from "../../process/process.module.css";
import PropTypes from "prop-types";

function Project({ projectNum, project }) {
  const lenis = useLenis();
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1050 : true,
  );

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1050);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function scrollToProcess() {
    const processSection = document.querySelector(
      `.${processStyles["process"]}`,
    );

    if (!processSection) return;

    lenis?.scrollTo(processSection, {
      offset: 0,
      duration: 2,
      easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    });
  }

  function getImageStyle(image, fallback = {}) {
    return {
      objectFit: image?.imageFit ?? fallback.imageFit,
      objectPosition: image?.imagePos ?? fallback.imagePos,
    };
  }

  return (
    <div className={styles["work"]}>
      <div className={styles["work-project"]}>
        {isDesktop && <ProjectAni projectNum={projectNum} />}
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
              <img
                src={project.exit.image}
                style={getImageStyle(project.exit, project.exit)}
              ></img>
            </div>
            {/* Action button */}
            <ActionButton
              text={project.exit.cta}
              type={"project"}
              onClick={scrollToProcess}
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
