"use client";

import styles from "./work.module.css";
import RadahnRune from "@/../public/icons/radahnRune";
import ScrollMotion from "@/components/animations/scrollMotion";
import WorkAni from "./workAni";
import { mainLeft, mainRight, cta } from "./text";
import ActionButton from "@/components/button/actionButton";
import { Context } from "@/components/provider/provider";
import { useContext } from "react";

const workItems = Object.values(mainRight);

function Work() {
  const { setTransition, setNavPage } = useContext(Context);
  return (
    <section className={styles["work"]}>
      <WorkAni />
      {/*  */}
      {/* Main preview link section */}
      {/*  */}
      <div className={styles["work-main"]}>
        {/*  */}
        {/* Main left side heading and info*/}
        <div className={styles["work-main-info"]}>
          {/* Heading text */}
          <div className={styles["work-main-info-text"]}>
            <h2>{mainLeft.heading}</h2>
            <p>{mainLeft.subHeading}</p>
          </div>
          {/* Bottom indicator for what project we are on */}
          <div className={styles["work-main-info-indi"]}>
            {[mainLeft.image1, mainLeft.image2, mainLeft.image3].map(
              (image, index) => (
                <div className={styles["work-main-info-indi-item"]} key={image}>
                  <div className={styles["work-main-info-indi-item-image"]}>
                    <img
                      src={image}
                      alt={`${workItems[index].heading} preview`}
                    />
                  </div>

                  {index === 0 && <RadahnRune />}
                </div>
              ),
            )}
          </div>
        </div>
        {/*  */}
        {/* Project preveiws and links to there showcase */}
        <div className={styles["work-main-con"]}>
          {workItems.map((item, index) => (
            <div
              className={styles["work-main-con-item"]}
              key={item.heading}
              onClick={() => {
                (setTransition(true), setNavPage(item.endPoint));
              }}
            >
              {/* Image or media container and input */}
              <div className={styles["work-main-con-item-media"]}>
                <ScrollMotion
                  item={`[data-work-image="${index}"]`}
                  moveDirection="y"
                  moveAmount={-15}
                  start="top 85%"
                  end="bottom top"
                />
                <div data-work-image={index}>
                  <img src={item.imgSrc} alt={item.heading} />
                </div>
              </div>
              {/* Bottom details */}
              <div className={styles["work-main-con-item-details"]}>
                <h3>{item.heading}</h3>
                <div className={styles["work-main-con-item-details-small"]}>
                  {item.details.map((detail) => (
                    <h4 key={detail}>{detail}</h4>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*  */}
      {/* Rythm break for next section and cta */}
      {/*  */}
      <div className={styles["work-cta"]}>
        {/*  */}
        {/* Text and button */}
        <div className={styles["work-cta-action"]}>
          <h3>{cta.mainText}</h3>
          <ActionButton
            text={cta.ctaText}
            type={"work"}
            onClick={() => {
              (setTransition(true), setNavPage("/portfolio/fgraphs"));
            }}
          />
        </div>
        {/*  */}
        {/* Projects amount */}
        <h4>{cta.numberCount}</h4>
      </div>
    </section>
  );
}

export default Work;
