"use client";
import styles from "./intro.module.css";
import { introText } from "./text";
import MorgottRune from "@/../public/icons/morgottRune.jsx";
import ActionButton from "@/components/button/actionButton";
import { Context } from "@/components/provider/provider";
import { useContext } from "react";
function Intro() {
  const { setTransition, setNavPage } = useContext(Context);
  return (
    <section className={styles["intro"]}>
      {/*  */}
      {/* Section info */}
      {/*  */}
      <div className={styles["intro-info"]}>
        <h3>{introText.label}</h3>
        <MorgottRune />
      </div>
      {/*  */}
      {/* Main heading */}
      {/*  */}
      <h2>
        {introText.heading.firstLine} <br /> {introText.heading.secondLine}
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
      <ActionButton
        text={introText.action}
        type={"intro"}
        onClick={() => {
          (setTransition(true), setNavPage("/contact"));
        }}
      />
      {/*  */}
      {/* Main image */}
      {/*  */}
      <img src="/introXfooter/intro.webp" alt={introText.imageAlt} />
      {/*  */}
      {/* Button overlay */}
      <div className={styles["intro-overlay-1"]}></div>
      <div className={styles["intro-overlay-2"]}></div>
    </section>
  );
}

export default Intro;
