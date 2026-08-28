import styles from "./about.module.css";
import RadahnRune from "@/../public/icons/radahnRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import {
  aboutImage,
  aboutMetaText,
  aboutHeading1,
  aboutHeading2,
} from "./text";

function About() {
  return (
    <section className={styles["about"]}>
      <SectionInfo infoName="ABOUT" />
      <div className={styles["about-con"]}>
        <div className={styles["about-image"]}>
          <div className={styles["about-image-overlay"]}></div>
          <img src={aboutImage} alt="About" />
        </div>

        <div className={styles["about-text"]}>
          <h2>
            {aboutHeading1} <br />
            <br />
            {aboutHeading2}
          </h2>
          <div className={styles["about-text-icon"]}>
            <RadahnRune />
            <p>{aboutMetaText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
