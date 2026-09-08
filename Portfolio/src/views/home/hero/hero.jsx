"use client";

import { useRef } from "react";
import styles from "./hero.module.css";
import MorgottRune from "@/../public/icons/morgottRune";
import HeroAni from "./heroAni";
import { heroHeading1, heroHeading2, heroPara, scrollPara } from "./text";
function Hero() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const detailRef = useRef(null);
  return (
    <section className={styles["hero"]}>
      <HeroAni
        headingRef={headingRef}
        paraRef={paraRef}
        detailRef={detailRef}
      />
      {/*  */}
      {/* The main hero intro part */}
      {/*  */}
      <div className={styles["hero-main"]}>
        <div className={styles["hero-main-heading"]}>
          <h1 ref={headingRef}>
            {heroHeading1} <br />
            <span>{heroHeading2}</span>
          </h1>
        </div>
        <p ref={paraRef}>{heroPara}</p>
      </div>
      {/*  */}
      {/* The Intro details */}
      {/*  */}
      <div ref={detailRef} className={styles["hero-detail"]}>
        <MorgottRune />
        <h4>{scrollPara}</h4>
        <MorgottRune />
      </div>
    </section>
  );
}

export default Hero;
