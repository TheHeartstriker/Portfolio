import styles from "./work.module.css";
import Project from "../newWork/project/project";
import { project1, project2, project3 } from "../newWork/project/text.js";
function Work() {
  return (
    <section className={styles["work"]}>
      <Project projectNum={0} project={project1} />
      <Project projectNum={1} project={project2} />
      <Project projectNum={2} project={project3} />
    </section>
  );
}

export default Work;
