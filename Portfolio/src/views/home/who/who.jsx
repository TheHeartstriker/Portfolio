import styles from "./who.module.css";
import { lorem, smallLorem } from "@/utils/text/text";
import RadahnRune from "@/../public/icons/radahnRune";
import SectionInfo from "@/components/sectionInfo/sectionInfo";

function Who() {
  return (
    <section className={styles["who"]}>
      {/*  */}
      {/* Row text and small heading */}
      {/*  */}
      <div className={styles["who-text"]}>
        <h2>WHO AM I</h2>
        <p>
          {lorem} <br /> <br />
          {lorem + smallLorem}
        </p>
      </div>
      {/*  */}
      {/* Row image and subhead text */}
      {/*  */}
      <div className={styles["who-bottom"]}>
        {/*  */}
        {/* Image */}
        <div className={styles["who-bottom-image"]}>
          <img src="/home/dev.jpg"></img>
        </div>
        {/*  */}
        {/* text section */}
        <div className={styles["who-bottom-text"]}>
          {/* Item 1 */}
          <div className={styles["who-bottom-text-item"]}>
            {/* Sub heading left */}
            <div className={styles["who-bottom-text-item-sub"]}>
              <h3>Identity</h3>
            </div>
            {/* Details right */}
            <div className={styles["who-bottom-text-item-detail"]}>
              <h4>
                Brand Platform <br />
                Brand Platform
                <br />
                Brand Platform
              </h4>
            </div>
          </div>
          {/* Item 1 */}
          <div className={styles["who-bottom-text-item"]}>
            {/* Sub heading left */}
            <div className={styles["who-bottom-text-item-sub"]}>
              <h3>Identity</h3>
            </div>
            {/* Details right */}
            <div className={styles["who-bottom-text-item-detail"]}>
              <h4>
                Brand Platform <br />
                Brand Platform
                <br />
                Brand Platform
              </h4>
            </div>
          </div>
          {/* Item 1 */}
          <div className={styles["who-bottom-text-item"]}>
            {/* Sub heading left */}
            <div className={styles["who-bottom-text-item-sub"]}>
              <h3>Identity</h3>
            </div>
            {/* Details right */}
            <div className={styles["who-bottom-text-item-detail"]}>
              <h4>
                Brand Platform <br />
                Brand Platform
                <br />
                Brand Platform
              </h4>
            </div>
          </div>
          {/* Item 1 */}
          <div className={styles["who-bottom-text-item"]}>
            {/* Sub heading left */}
            <div className={styles["who-bottom-text-item-sub"]}>
              <h3>Identity</h3>
            </div>
            {/* Details right */}
            <div className={styles["who-bottom-text-item-detail"]}>
              <h4>
                Brand Platform <br />
                Brand Platform
                <br />
                Brand Platform
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Who;
