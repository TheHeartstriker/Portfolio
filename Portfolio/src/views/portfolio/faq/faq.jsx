"use client";

import { useState } from "react";
import styles from "./faq.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import MorgottRune from "@/../public/icons/morgottRune";
import RadahnRune from "@/../public/icons/radahnRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";

function FAQ() {
  const [active, setActive] = useState(0);

  const faqItems = [
    {
      question:
        "HOW DO YOU WORK WITH BRANDS WITH EXISTING BOOKING AND DESIGN SYSTEMS?",
      answer: lorem + smallLorem,
    },
    {
      question: "HOW LONG DOES A WEBSITE PROJECT TAKE?",
      answer: lorem + smallLorem,
    },
    {
      question: "WHAT DOES YOUR DESIGN PROCESS LOOK LIKE?",
      answer: lorem + smallLorem,
    },
  ];

  return (
    <section className={styles["faq"]}>
      <SectionInfo infoName={"DESIGN PROCESS"} />
      <div className={styles["faq-con"]}>
        {/*  */}
        {/* Left side heading */}
        {/*  */}
        <h2>Common questions</h2>
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
