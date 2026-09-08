"use client";

import { useState } from "react";
import styles from "./faq.module.css";
import RadahnRune from "@/../public/icons/radahnRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import { faqItems, faqTitle } from "./text";

function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles["faq"]}>
      <SectionInfo infoName={"DESIGN PROCESS"} />
      <div className={styles["faq-con"]}>
        {/*  */}
        {/* Left side heading */}
        {/*  */}
        <h2>{faqTitle}</h2>
        {/*  */}
        {/* Right side answer's container*/}
        {/*  */}
        <div className={styles["faq-con-ans"]}>
          {faqItems.map((item, index) => {
            const isActive = active === index;
            return (
              /*  */
              /* Ans Item */
              /*  */
              <div
                key={index}
                className={`${styles["faq-con-ans-item"]} ${isActive ? styles.active : ""}`}
                onClick={() => setActive(index)}
              >
                {/*  */}
                {/* Top heading and svg */}
                {/*  */}
                <div
                  className={`${styles["faq-con-ans-item-top"]} ${isActive ? styles.active : ""}`}
                >
                  <h3>{item.question}</h3>
                  <RadahnRune />
                </div>
                {/*  */}
                {/* Bottom para / answer text */}
                {/*  */}
                <p>{item.answer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
