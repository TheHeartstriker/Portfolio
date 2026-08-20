"use client";
import { useRef } from "react";
import styles from "./journey.module.css";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import JourneyAni from "./journeyAni";
import { journeyItems, journeyTitle } from "./text";

function Journey() {
  const journeyRef = useRef(null);
  const journeyConRef = useRef(null);
  const journeyConItemRef = useRef([]);

  return (
    <section className={styles["journey"]} ref={journeyRef}>
      <SectionInfo infoName={"CLIENT PROCESS"} />
      <JourneyAni
        journeyRef={journeyRef}
        journeyConRef={journeyConRef}
        journeyConItemRef={journeyConItemRef}
      />
      {/*  */}
      {/* Main heading */}
      {/*  */}
      <h2>{journeyTitle}</h2>
      {/*  */}
      {/* Main journey container */}
      {/*  */}
      <div className={styles["journey-con"]} ref={journeyConRef}>
        {journeyItems.map((item, index) => (
          <div
            className={styles["journey-con-item"]}
            ref={(element) => {
              journeyConItemRef.current[index] = element;
            }}
            key={item.label}
            style={{ zIndex: (index + 1) * 5 }}
          >
            {/*  */}
            {/* Heading */}
            <h4>{item.label}</h4>
            <div className={styles["journey-con-item-text"]}>
              {/*  */}
              {/* Subheading and text*/}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Journey;
