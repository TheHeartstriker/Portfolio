import styles from "./nav.module.css";
import ActionButton from "../button/actionButton";
import Link from "next/link";
import NavAni from "./navAni";

function Nav() {
  return (
    //
    // Main nav
    //
    <nav className={styles["nav"]}>
      <NavAni />
      {/*  */}
      {/* Left side home btn */}
      <button className={styles["nav-button"]}>
        <h3>KW</h3>
      </button>
      {/*  */}
      {/* Middle links */}
      <div className={styles["nav-links"]}>
        <Link href="/">HOME</Link>
        <Link href="/portfolio">PORTFOLIO</Link>
        <Link href="/blog">BLOG</Link>
        <Link href="/">CONTACT</Link>
      </div>
      {/*  */}
      {/* CTA */}

      <ActionButton text={"LETS WORK TOGETHER"} type={"small"} />
    </nav>
  );
}

export default Nav;
