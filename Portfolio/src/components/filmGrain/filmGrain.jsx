"use client";

import { useEffect, useRef } from "react";
import styles from "./filmGrain.module.css";

function FilmGrain() {
  //   const turbulenceRef = useRef(null);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (turbulenceRef.current) {
  //         turbulenceRef.current.setAttribute(
  //           "seed",
  //           Math.floor(Math.random() * 100),
  //         );
  //       }
  //     }, 33);

  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <>
      <div id={styles["noise-bg"]}></div>
    </>
  );
}

export default FilmGrain;
