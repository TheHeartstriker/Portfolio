import styles from "./work.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import MorgottRune from "@/../public/icons/morgottRune";
import ActionButton from "@/components/button/actionButton";
import Project from "./project/project";
import ProjectAni from "./project/projectAni.jsx";
function Work() {
  return (
    <section className={styles["work"]}>
      <Project projectNum={0} />
      <Project projectNum={1} />
    </section>
  );
}

export default Work;
