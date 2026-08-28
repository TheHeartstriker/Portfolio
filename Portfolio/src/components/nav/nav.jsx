"use client";
import styles from "./nav.module.css";
import ActionButton from "../button/actionButton";
import Link from "next/link";
import NavAni from "./navAni";
import { Context } from "../provider/provider";
import { useContext } from "react";
function Nav() {
  const { setTransition, transition, setNavPage } = useContext(Context);

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
        <button
          onClick={() => {
            (setTransition(true), setNavPage("/"));
          }}
        >
          HOME
        </button>
        <button
          onClick={() => {
            (setTransition(true), setNavPage("/portfolio"));
          }}
        >
          PORTFOLIO
        </button>
        <button
          onClick={() => {
            (setTransition(true), setNavPage("/blog"));
          }}
        >
          BLOG
        </button>
        <button
          onClick={() => {
            (setTransition(true), setNavPage("/contact"));
          }}
        >
          CONTACT
        </button>
      </div>
      {/*  */}
      {/* CTA */}

      <ActionButton
        text={"LETS WORK TOGETHER"}
        type={"small"}
        onClick={() => {
          (setTransition(true), setNavPage("/contact"));
        }}
      />
    </nav>
  );
}

export default Nav;
