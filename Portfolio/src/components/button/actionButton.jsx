import styles from "./actionButton.module.css";
import RadahnRune from "@/../public/icons/radahnRune.jsx";

function ActionButton({ text, type }) {
  return (
    <button className={`${styles["action-button"]} ${styles[type]}`}>
      <div className={styles["action-button-left"]}>
        <h4>{text}</h4>
      </div>

      <div className={styles["action-button-right"]}>
        <RadahnRune />
      </div>
    </button>
  );
}

export default ActionButton;
