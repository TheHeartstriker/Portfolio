import styles from "./work.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import MorgottRune from "@/../public/icons/morgottRune";
import ActionButton from "@/components/button/actionButton";
import Project from "./project/project";
function Work() {
  return (
    <section className={styles["work"]}>
      <Project />
    </section>
  );
}

export default Work;
