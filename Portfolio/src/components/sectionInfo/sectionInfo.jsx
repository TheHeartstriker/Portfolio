import styles from "./sectionInfo.module.css";
import MorgottRune from "@/../public/icons/morgottRune.jsx";

function SectionInfo({ infoName }) {
  return (
    <div className={styles["section-info"]}>
      <h3>{infoName}</h3>
      <MorgottRune />
    </div>
  );
}

export default SectionInfo;
