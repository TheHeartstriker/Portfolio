import styles from "./hero.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import MorgottRune from "@/../public/icons/morgottRune";
function Hero() {
  return (
    <section className={styles["hero"]}>
      {/*  */}
      {/* Hero */}
      {/*  */}
      <div className={styles["hero-main"]}>
        <h1>The Vision</h1>
        <p>{smallLorem}</p>
      </div>
      {/*  */}
      {/* Detail bottom */}
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
