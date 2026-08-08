import styles from "./actionButton.module.css";
import RadahnRune from "@/../public/icons/radahnRune.jsx";

function ActionButton({ text, padding, fontSize }) {
  return (
    //
    // Main action button
    //
    <button className={styles["action-button"]}>
      {/*  */}
      {/* Left side text */}
      <div className={styles["action-button-left"]}>
        <h4>{text}</h4>
      </div>
      {/*  */}
      {/* Right side icon */}
      <div className={styles["action-button-right"]}>
        <RadahnRune
          diameter={5}
          strokeWidth={1}
          lineMult={1.6}
          strokeColor="var(--light-3)"
        />
      </div>
    </button>
  );
}

export default ActionButton;
