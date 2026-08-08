import SectionInfo from "@/components/sectionInfo/sectionInfo";
import styles from "./intro.module.css";
import MorgottRune from "@/../public/icons/morgottRune.jsx";
import RadahnRune from "@/../public/icons/radahnRune.jsx";

function Intro() {
  return (
    <section className={styles["intro"]}>
      {/*  */}
      {/* Section info */}
      {/*  */}
      <SectionInfo infoName="Intro" />
      {/*  */}
      {/* Main heading */}
      {/*  */}
      <h2>
        Let's find <br /> your project
      </h2>
      {/*  */}
      {/* Main rune */}
      {/*  */}
      <MorgottRune
        diameter={20}
        strokeWidth={1.5}
        lineMult={1.5}
        strokeColor="var(--light-1)"
      />
      {/*  */}
      {/* Main BTN */}
      {/*  */}
      <div className={styles["intro-button"]}>
        <div className={styles["intro-button-left"]}>
          <h4>FIND YOUR PROJECT</h4>
        </div>
        <div className={styles["intro-button-right"]}>
          <RadahnRune />
        </div>
      </div>
      {/*  */}
      {/* Main image */}
      {/*  */}
      <img src="/introXfooter/intro.jpg" alt="Intro" />
    </section>
  );
}

export default Intro;
