import SectionInfo from "@/components/sectionInfo/sectionInfo";
import styles from "./intro.module.css";
import MorgottRune from "@/../public/icons/morgottRune.jsx";
import ActionButton from "@/components/button/actionButton";

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
      <MorgottRune />
      {/*  */}
      {/* Main BTN */}
      {/*  */}

      <ActionButton
        text={"FIND YOUR PROJECT"}
        height={"3rem"}
        fontSize={"var(--typo-size-14)"}
      />
      {/*  */}
      {/* Main image */}
      {/*  */}
      <img src="/introXfooter/intro.jpg" alt="Intro" />
    </section>
  );
}

export default Intro;
