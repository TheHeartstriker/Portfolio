import styles from "./divider.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import RadahnRune from "@/../public/icons/radahnRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";

function Divider() {
  return (
    <section className={styles["divider"]}>
      <img src="/home/about2.jpg"></img>
    </section>
  );
}

export default Divider;
