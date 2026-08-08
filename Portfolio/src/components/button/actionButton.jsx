import styles from "./actionButton.module.css";
import RadahnRune from "@/../public/icons/radahnRune.jsx";

function ActionButton({ text, height, fontSize }) {
  return (
    //
    // Main action button
    //
    <button className={styles["action-button"]} style={{ height }}>
      <div className={styles["action-button-left"]}>
        <h4 style={{ fontSize }}>{text}</h4>
      </div>

      <div className={styles["action-button-right"]}>
        <RadahnRune />
      </div>
    </button>
  );
}

export default ActionButton;
