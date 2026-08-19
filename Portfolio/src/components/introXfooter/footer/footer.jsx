import styles from "./footer.module.css";
import { footerText } from "../text";
import RadahnRune from "@/../public/icons/radahnRune.jsx";
import FooterAni from "./footerAni";
import BigRadahnRune from "@/../public/icons/bigRadahnRune";
import ScrollMotion from "@/components/animations/scrollMotion";

import Link from "next/link";

function Footer() {
  return (
    <footer className={styles["footer"]}>
      {/*  */}
      {/* Animations */}
      {/*  */}
      <ScrollMotion
        item={`.${styles["footer"]}`}
        moveDirection="y"
        moveAmount={-15}
        start="top 85%"
        end="bottom bottom"
      />
      <FooterAni />
      {/*  */}
      {/* Top section */}
      {/*  */}
      <div className={styles["footer-top"]}>
        {/*  */}
        {/* Left most section intro*/}
        <div className={styles["footer-top-intro"]}>
          <h2>{footerText.intro}</h2>
          <div className={styles["footer-top-intro-contact"]}>
            <h3>Contact</h3>
            <h4>kaden@kadenwildauer.com</h4>
          </div>
        </div>
        {/*  */}
        {/* Middle section nav */}
        <div className={styles["footer-top-nav"]}>
          <h3>Navigation</h3>
          <div className={styles["footer-top-nav-links"]}>
            <Link href="/">Home</Link>
            <Link href="/">Portfolio</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        {/*  */}
        {/* Right most section socials */}
        <div className={styles["footer-top-social"]}>
          <h3>Socials</h3>
          <div className={styles["footer-top-social-links"]}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Middle section great rune */}
      {/*  */}
      <BigRadahnRune />
      {/*  */}
      {/* Bottom section & Text*/}
      {/*  */}
      <div className={styles["footer-bottom"]}>
        {/*  */}
        {/* Top details */}
        <div className={styles["footer-bottom-info"]}>
          <h5>@2026 Kaden wildauer</h5>
          <h5>LEGAL NOTICE</h5>
          <h5>Saturday 22:14:43 LA</h5>
        </div>
        {/*  */}
        {/* Bottom text */}
        <h4>KADEN WILDAUER</h4>
      </div>
    </footer>
  );
}

export default Footer;
