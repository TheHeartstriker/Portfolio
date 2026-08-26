import styles from "./hero.module.css";
import MorgottRune from "@/../public/icons/morgottRune";
import { heroDescription, heroScrollLabel, heroTitle } from "./text";
import HeroAni from "./heroAni";

function Hero() {
  return (
    <section className={styles["hero"]}>
      <HeroAni />
      {/*  */}
      {/* Hero */}
      {/*  */}
      <div className={styles["hero-main"]}>
        <h1>{heroTitle}</h1>
        <p>{heroDescription}</p>
      </div>
      {/*  */}
      {/* Detail bottom */}
      {/*  */}
      <div className={styles["hero-detail"]}>
        <MorgottRune />
        <h4>{heroScrollLabel}</h4>
        <MorgottRune />
      </div>
    </section>
  );
}

export default Hero;
