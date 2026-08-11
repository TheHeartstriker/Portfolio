import styles from "./intro.module.css";
import MorgottRune from "@/../public/icons/morgottRune.jsx";
import ActionButton from "@/components/button/actionButton";

function Intro() {
  return (
    <section className={styles["intro"]}>
      {/*  */}
      {/* Section info */}
      {/*  */}
      <div className={styles["intro-info"]}>
        <h3>REACH OUT</h3>
        <MorgottRune />
      </div>
      {/*  */}
      {/* Main heading */}
      {/*  */}
      <h2>
        Let's find <br /> your project
      </h2>
      {/*  */}
      {/* Main rune */}
      {/*  */}
      <div className={styles["intro-rune"]}>
        <MorgottRune />
      </div>
      {/*  */}
      {/* Main BTN */}
      {/*  */}

      <ActionButton text={"FIND YOUR PROJECT"} type={"intro"} />
      {/*  */}
      {/* Main image */}
      {/*  */}
      <img src="/introXfooter/intro.jpg" alt="Intro" />
    </section>
  );
}

export default Intro;
