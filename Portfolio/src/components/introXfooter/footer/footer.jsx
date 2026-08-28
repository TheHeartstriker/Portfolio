"use client";
import styles from "./footer.module.css";
import { footerBottom, footerLeft, footerMiddle, footerRight } from "./text";
import RadahnRune from "@/../public/icons/radahnRune.jsx";
import FooterAni from "./footerAni";
import BigRadahnRune from "@/../public/icons/bigRadahnRune";
import ScrollMotion from "@/components/animations/scrollMotion";
import TimeClock from "./timeClock";
import { Context } from "@/components/provider/provider";
import { useContext } from "react";

function Footer() {
  const { setTransition, setNavPage } = useContext(Context);
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
          <h2>{footerLeft.heading}</h2>
          <div className={styles["footer-top-intro-contact"]}>
            <h3>{footerLeft.itemHeading}</h3>
            <h4>{footerLeft.itemDetail}</h4>
          </div>
        </div>
        {/*  */}
        {/* Middle section nav */}
        <div className={styles["footer-top-nav"]}>
          <h3>{footerMiddle.itemHeading}</h3>
          <div className={styles["footer-top-nav-links"]}>
            <button
              onClick={() => {
                (setTransition(true), setNavPage("/"));
              }}
            >
              {footerMiddle.itemDetail1}
            </button>
            <button
              onClick={() => {
                (setTransition(true), setNavPage("/portfolio"));
              }}
            >
              {footerMiddle.itemDetail2}
            </button>
            <button
              onClick={() => {
                (setTransition(true), setNavPage("/blog"));
              }}
            >
              {footerMiddle.itemDetail3}
            </button>
            <button
              onClick={() => {
                (setTransition(true), setNavPage("/contact"));
              }}
            >
              {footerMiddle.itemDetail4}
            </button>
          </div>
        </div>
        {/*  */}
        {/* Right most section socials */}
        <div className={styles["footer-top-social"]}>
          <h3>{footerRight.itemHeading}</h3>
          <div className={styles["footer-top-social-links"]}>
            <a
              href={footerRight.item1.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerRight.item1.name}
            </a>
            <a
              href={footerRight.item2.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerRight.item2.name}
            </a>
            <a
              href={footerRight.item3.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerRight.item3.name}
            </a>
            <a
              href={footerRight.item4.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerRight.item4.name}
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
          <h5>{footerBottom.leftHeading}</h5>
          <h5>{footerBottom.middleHeading}</h5>
          <TimeClock />
        </div>
        {/*  */}
        {/* Bottom text */}
        <h4>{footerBottom.mainHeading}</h4>
      </div>
    </footer>
  );
}

export default Footer;
