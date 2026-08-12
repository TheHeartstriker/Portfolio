import styles from "./hero.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import ActionButton from "@/components/button/actionButton";
import MorgottRune from "../../../../public/icons/morgottRune";
function Hero() {
  return (
    <section className={styles["hero"]}>
      {/*  */}
      {/* The main hero intro part */}
      {/*  */}
      <div className={styles["hero-main"]}>
        <div className={styles["hero-main-heading"]}>
          <h1>
            <span>One Creative.</span>
            <span>One Obsession: Craft</span>
          </h1>
        </div>
        <p>{lorem + smallLorem}</p>
      </div>
      {/*  */}
      {/* Background Svg */}
      {/*  */}
      <MorgottRune className={styles["hero-rune"]} />
      {/*  */}
      {/* The Intro details */}
      {/*  */}
      <div className={styles["hero-detail"]}>
        <MorgottRune />
        <h4>Scroll to explore</h4>
        <MorgottRune />
      </div>
    </section>
  );
}

export default Hero;
