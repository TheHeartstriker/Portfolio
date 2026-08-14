import styles from "./hero.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import ActionButton from "@/components/button/actionButton";
import MorgottRune from "../../../../public/icons/morgottRune";
import HeroAni from "./heroAni";
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
            One Creative. <br />
            <span>One Obsession: Craft</span>
          </h1>
        </div>
        <p>{lorem + smallLorem}</p>
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
