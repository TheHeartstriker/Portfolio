import styles from "./divider.module.css";
import ScrollMotion from "@/components/animations/scrollMotion";
import { dividerImage } from "./text";

function Divider() {
  return (
    <section className={styles["divider"]}>
      <ScrollMotion
        item={`.${styles["divider-wrapper"]}`}
        moveDirection="y"
        moveAmount={-15}
        start="top 85%"
        end="bottom top"
      />
      <div className={styles["divider-overlay-1"]}></div>
      <div className={styles["divider-overlay-2"]}></div>
      <div className={styles["divider-wrapper"]}>
        <img src={dividerImage} alt="Divider" />
      </div>
    </section>
  );
}

export default Divider;
