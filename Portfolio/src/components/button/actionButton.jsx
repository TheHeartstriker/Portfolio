import styles from "./actionButton.module.css";
import RadahnRune from "@/../public/icons/radahnRune.jsx";
import PropTypes from "prop-types";

function ActionButton({ text, type, onClick, className }) {
  return (
    <button
      className={`${styles["action-button"]} ${styles[type]} ${className || ""}`}
      onClick={onClick}
    >
      <div className={styles["action-button-left"]}>
        <h4>{text}</h4>
      </div>

      <div className={styles["action-button-right"]}>
        <RadahnRune />
      </div>
    </button>
  );
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ActionButton;
