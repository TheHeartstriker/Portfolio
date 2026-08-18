import styles from "./divider.module.css";
import ScrollMotion from "@/components/animations/scrollMotion";

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
      {/*  */}
      {/* Image overlay for effect */}
      <div className={styles["divider-overlay-1"]}></div>
      <div className={styles["divider-overlay-2"]}></div>
      {/*  */}
      {/* Image and image wrapper  */}
      {/*  */}
      <div className={styles["divider-wrapper"]}>
        <img src="/home/about2.jpg"></img>
      </div>
    </section>
  );
}

export default Divider;
