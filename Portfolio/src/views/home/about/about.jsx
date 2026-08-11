import styles from "./about.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
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
        {/* Left side image*/}
        <div className={styles["about-con-image"]}>
          <img src="/home/dev.png"></img>
        </div>
        {/*  */}
        {/* Right side text*/}
        <div className={styles["about-con-text"]}>
          <h2>
            With over 5 year’s of providing, studying and mastering the art of
            web dev I am a professional offering the highest level of work I can
            offer
          </h2>
          <p>
            {lorem + lorem} <br /> <br /> {lorem}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
