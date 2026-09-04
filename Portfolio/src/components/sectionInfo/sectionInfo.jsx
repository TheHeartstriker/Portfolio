import styles from "./sectionInfo.module.css";
import MorgottRune from "@/../public/icons/morgottRune.jsx";
import PropTypes from "prop-types";

function SectionInfo({ infoName }) {
  return (
    <div className={styles["section-info"]}>
      <h3>{infoName}</h3>
      <MorgottRune />
    </div>
  );
}

SectionInfo.propTypes = {
  infoName: PropTypes.string.isRequired,
};

export default SectionInfo;
