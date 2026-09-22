import styles from "./sectionInfo.module.css";
import MorgottRune from "@/../public/icons/morgottRune.jsx";
import PropTypes from "prop-types";

function SectionInfo({ infoName, type = "light" }) {
  const classType = type === "light" ? styles.light : styles.dark;

  return (
    <div className={`${styles["section-info"]} ${classType}`}>
      <h3>{infoName}</h3>
      <MorgottRune />
    </div>
  );
}

SectionInfo.propTypes = {
  infoName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["dark", "light"]),
};

export default SectionInfo;
