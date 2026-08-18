import styles from "./about.module.css";
import RadahnRune from "@/../public/icons/radahnRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import { aboutImage, aboutMetaText, aboutSubtitle, aboutTitle } from "./text";

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
            {aboutTitle} <br />
            <br />
            {aboutSubtitle}
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
