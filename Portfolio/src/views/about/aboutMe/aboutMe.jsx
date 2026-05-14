"use client";
import PlayGround from "./playground/playGround";
import { useState, useEffect } from "react";
import "./aboutMe.css";

import {
  Header1,
  Header2,
  Header3,
  MainText1,
  MainText2,
  MainText3,
} from "../text";

function AboutMe() {
  //
  // Mobile alternative
  //
  const [ToSmall, setToSmall] = useState(false);
  useEffect(() => {
    function handleResize() {
      setToSmall(window.innerWidth < 1000);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="about-content">
      {ToSmall === false && <PlayGround />}
      {/*  */}
      {/* Mobile alternative */}
      {/*  */}
      <div className={`mobile-intro${ToSmall ? "" : " hidden"}`}>
        <h4>{Header1}</h4>
        <p>{MainText1}</p>
      </div>
      <div className={`mobile-intro${ToSmall ? "" : " hidden"}`}>
        <h4>{Header2}</h4>
        <p>{MainText2}</p>
      </div>
      <div className={`mobile-intro${ToSmall ? "" : " hidden"}`}>
        <h4>{Header3}</h4>
        <p>{MainText3}</p>
      </div>
    </div>
  );
}

export default AboutMe;
