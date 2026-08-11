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
        <h1>Kaden Wildauer</h1>
        {/*  */}
        {/* Intro para and button */}
        <div className={styles["hero-main-content"]}>
          <p>{lorem + smallLorem}</p>
          <ActionButton text={"SEE THE WORK"} type={"regular"} />
        </div>
      </div>
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
