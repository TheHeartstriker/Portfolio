import styles from "./hero.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import ActionButton from "@/components/button/actionButton";
import MorgottRune from "@/../public/icons/morgottRune";
import { heroHeading1, heroHeading2, heroImage, scrollText } from "./text";
function Hero() {
  return (
    <section className={styles["hero"]}>
      {/*  */}
      {/* The main hero intro part */}
      {/*  */}
      <div className={styles["hero-main"]}>
        {/*  */}
        {/* Heading left */}
        <h2>{heroHeading1}</h2>
        {/*  */}
        {/* Main image */}
        <div className={styles["hero-main-image"]}>
          <img src={heroImage} alt="About" />
        </div>
        {/*  */}
        {/* Heading Right */}
        <h2>{heroHeading2}</h2>
      </div>

      {/*  */}
      {/* The Intro details */}
      {/*  */}
      <div className={styles["hero-detail"]}>
        <MorgottRune />
        <h4>{scrollText}</h4>
        <MorgottRune />
      </div>
    </section>
  );
}

export default Hero;
