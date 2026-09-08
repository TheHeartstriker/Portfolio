import styles from "./process.module.css";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import ScrollMotion from "@/components/animations/scrollMotion";
import { processItems } from "./text";

function Process() {
  return (
    <section className={styles["process"]}>
      <SectionInfo infoName={"DESIGN PROCESS"} />
      {/*  */}
      {/* Main item container */}
      {/*  */}
      <div className={styles["process-con"]}>
        {processItems.map((item, index) => (
          //
          // Overhead container(for the line seprator)
          <div key={item.title}>
            <div className={styles["process-con-item"]}>
              {/* Item image animation effect */}
              <ScrollMotion
                item={`[data-process-image="${index}"]`}
                moveDirection="y"
                moveAmount={-10}
                start="top 85%"
                end="bottom top"
              />
              {/* Left side text */}
              <div className={styles["process-con-item-text"]}>
                <p>{item.description}</p>
                <h2>{item.title}</h2>
              </div>
              {/* Right side image */}
              <div className={styles["process-con-item-image"]}>
                <div className={styles["process-con-item-image-overlay"]}></div>
                <img
                  src={item.image}
                  className={styles["process-con-item-image-media"]}
                  data-process-image={index}
                  alt={item.title}
                />
              </div>
            </div>
            {/*  */}
            {/* Line sep */}
            {index < processItems.length - 1 ? (
              <div className={styles["process-con-line"]}></div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
