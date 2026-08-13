import styles from "./about.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import RadahnRune from "@/../public/icons/radahnRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";

function About() {
  return (
    <section className={styles["about"]}>
      <SectionInfo infoName="ABOUT" />
      {/*  */}
      {/* Main content container */}
      {/*  */}
      <div className={styles["about-con"]}>
        {/*  */}
        {/* Left side image */}
        <div className={styles["about-image"]}>
          <img src="/home/about1.jpg"></img>
        </div>
        {/*  */}
        {/* Right side text */}
        <div className={styles["about-text"]}>
          <h2>
            A supersolid is a special quantum state of matter that’s both solid
            and fluid at the same time. <br />
            <br />
            Supersolid is a 100% creative-owned agency that’s both structured
            and seamless, logical and unexpected, proven and future-proof.
          </h2>
          {/* Icon and text */}
          <div className={styles["about-text-icon"]}>
            <RadahnRune />
            <p>{smallLorem}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
