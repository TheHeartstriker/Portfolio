import styles from "./work.module.css";
import Project from "./project/project";
import { project1, project2 } from "./text.js";
function Work() {
  return (
    <section className={styles["work"]}>
      <Project projectNum={0} project={project1} />
      <Project projectNum={1} project={project2} />
    </section>
  );
}

export default Work;
