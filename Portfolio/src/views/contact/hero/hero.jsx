import styles from "./hero.module.css";
import { imageLeft, textMiddle, formRight } from "./text";
import ActionButton from "@/components/button/actionButton";

function Hero() {
  return (
    <div className={styles["hero"]}>
      {/*  */}
      {/* Left side image */}
      {/*  */}
      <div className={styles["hero-image"]}>
        <div className={styles["hero-image-overlay"]}></div>
        <img src={imageLeft.imageSrc} alt="About" />
      </div>
      {/*  */}
      {/* Middle info / heading */}
      {/*  */}
      <div className={styles["hero-text"]}>
        {/*  */}
        {/* Headings */}
        <h1>{textMiddle.heading}</h1>
        {/*  */}
        {/* Links*/}
        <div className={styles["hero-text-links"]}>
          {[1, 2, 3, 4, 5].map((linkNumber) => {
            const link = textMiddle[`link${linkNumber}`];

            return (
              <a
                key={link.link}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
            );
          })}
          <h3>{textMiddle.email}</h3>
        </div>
      </div>
      {/*  */}
      {/* Right side form container*/}
      {/*  */}
      <div className={styles["hero-con"]}>
        {/*  */}
        {/* Main heading */}
        <h2>{formRight.heading}</h2>
        {/*  */}
        {/* Main form item */}
        <form className={styles["hero-con-form"]}>
          {/* First row */}
          <div className={styles["hero-con-form-row"]}>
            <input
              type="text"
              name="firstName"
              placeholder={formRight.form.placeHolder1}
            />
            <input
              type="text"
              name="lastName"
              placeholder={formRight.form.placeHolder2}
            />
          </div>
          {/* Second row */}
          <div className={styles["hero-con-form-row"]}>
            <input
              type="email"
              name="email"
              placeholder={formRight.form.placeHolder3}
            />
            <input
              type="text"
              name="business"
              placeholder={formRight.form.placeHolder4}
            />
          </div>
          {/* Major text area */}
          <textarea name="message" placeholder={formRight.form.placeHolder5} />
          {/* Final btn */}
          <ActionButton text={formRight.form.CTA} type={"form"} />
        </form>
      </div>
    </div>
  );
}

export default Hero;
