import styles from "./who.module.css";
import { whoGroups, whoHeading, whoImage, whoIntro } from "./text";

function Who() {
  return (
    <section className={styles["who"]}>
      <div className={styles["who-text"]}>
        <h2>{whoHeading}</h2>
        <p>{whoIntro}</p>
      </div>

      <div className={styles["who-bottom"]}>
        <div className={styles["who-bottom-image"]}>
          <div className={styles["who-bottom-image-overlay"]}></div>
          <img src={whoImage} alt="Who" />
        </div>

        <div className={styles["who-bottom-text"]}>
          {whoGroups.map((group) => (
            <div key={group.label} className={styles["who-bottom-text-item"]}>
              <div className={styles["who-bottom-text-item-sub"]}>
                <h3>{group.label}</h3>
              </div>
              <div className={styles["who-bottom-text-item-detail"]}>
                <h4>
                  {group.items.map((item, index) => (
                    <span key={`${group.label}-${item}-${index}`}>
                      {item}
                      {index < group.items.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Who;
