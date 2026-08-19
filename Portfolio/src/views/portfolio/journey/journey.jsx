import styles from "./journey.module.css";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import JourneyAni from "./journeyAni";
import { journeyItems, journeyTitle } from "./text";

function Journey() {
  return (
    <section className={styles["journey"]}>
      <SectionInfo infoName={"CLIENT PROCESS"} />
      <JourneyAni />
      {/*  */}
      {/* Main heading */}
      {/*  */}
      <h2>{journeyTitle}</h2>
      {/*  */}
      {/* Main journey container */}
      {/*  */}
      <div className={styles["journey-con"]}>
        {journeyItems.map((item, index) => (
          <div
            className={styles["journey-con-item"]}
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
