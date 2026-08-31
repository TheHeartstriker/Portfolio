"use client";
import styles from "./nav.module.css";
import ActionButton from "@/components/button/actionButton";
import NavAni from "./navAni";
import { Context } from "@/components/provider/provider";
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
        <h4>KW</h4>
      </button>
      {/*  */}
      {/* Middle links */}
      <div className={styles["nav-links"]}>
        <button
          onClick={() => {
            (setTransition(true), setNavPage("/"));
          }}
        >
          <h5>HOME</h5>
        </button>
        <button
          onClick={() => {
            (setTransition(true), setNavPage("/portfolio"));
          }}
        >
          {" "}
          <h5>PORTFOLIO</h5>
        </button>
        <button
          onClick={() => {
            (setTransition(true), setNavPage("/blog"));
          }}
        >
          <h5>BLOG</h5>
        </button>
        <button
          onClick={() => {
            (setTransition(true), setNavPage("/contact"));
          }}
        >
          {" "}
          <h5>CONTACT</h5>
        </button>
      </div>
      {/*  */}
      {/* CTA */}

      <ActionButton
        text={"LETS WORK TOGETHER"}
        type={"small"}
        className={styles["nav-cta"]}
        onClick={() => {
          (setTransition(true), setNavPage("/contact"));
        }}
      />
    </nav>
  );
}

export default Nav;
