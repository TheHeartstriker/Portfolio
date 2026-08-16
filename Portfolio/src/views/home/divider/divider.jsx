import styles from "./divider.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import RadahnRune from "@/../public/icons/radahnRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";
import DividerAni from "./dividerAni";

function Divider() {
  return (
    <section className={styles["divider"]}>
      <DividerAni />
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
