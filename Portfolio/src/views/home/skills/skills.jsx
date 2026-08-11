import styles from "./skills.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import ActionButton from "@/components/button/actionButton";
import Arrow from "../../../../out/icons/arrow";

function Skills() {
  return (
    <section className={styles["skills"]}>
      <SectionInfo infoName={"SKILLS"} />
      {/*  */}
      {/* Main container */}
      {/*  */}
      <div className={styles["skills-con"]}>
        {/*  */}
        {/* Main information and CTA*/}
        <div className={styles["skills-con-info"]}>
          <p>{lorem}</p>
          <ActionButton text={"SEE PROOF"} type={"regular"} />
        </div>
        {/*  */}
        {/* Heading and switch*/}
        <div className={styles["skills-con-heading"]}>
          {/* Main switch / controls */}
          <div className={styles["skills-con-heading-left"]}>
            <div className={styles["skills-con-heading-left-control"]}>
              <button>
                {" "}
                <Arrow />
              </button>
              <button>
                <Arrow />
              </button>
            </div>

            <h3>01—02</h3>
          </div>
          {/* Heading */}
          <h2>Web Development</h2>
        </div>
      </div>
    </section>
  );
}

export default Skills;
