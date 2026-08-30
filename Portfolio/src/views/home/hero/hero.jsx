import styles from "./hero.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import ActionButton from "@/components/button/actionButton";
import MorgottRune from "@/../public/icons/morgottRune";
import HeroAni from "./heroAni";
import { heroHeading1, heroHeading2, heroPara, scrollPara } from "./text";
function Hero() {
  return (
    <section className={styles["hero"]}>
      {/* <HeroAni /> */}
      {/*  */}
      {/* The main hero intro part */}
      {/*  */}
      <div className={styles["hero-main"]}>
        <div className={styles["hero-main-heading"]}>
          <h1>
            {heroHeading1} <br />
            <span>{heroHeading2}</span>
          </h1>
        </div>
        <p>{heroPara}</p>
      </div>

      {/*  */}
      {/* The Intro details */}
      {/*  */}
      <div className={styles["hero-detail"]}>
        <MorgottRune />
        <h4>{scrollPara}</h4>
        <MorgottRune />
      </div>
    </section>
  );
}

export default Hero;
