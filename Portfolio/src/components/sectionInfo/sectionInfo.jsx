import styles from "./sectionInfo.module.css";
import MorgottRune from "@/../public/icons/morgottRune.jsx";

function SectionInfo({ infoName }) {
  return (
    <div className={styles["section-info"]}>
      <h3>{infoName}</h3>
      <MorgottRune
        diameter={8}
        strokeWidth={1}
        lineMult={1.6}
        strokeColor="var(--light-3)"
      />
    </div>
  );
}

export default SectionInfo;
