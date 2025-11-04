"use client";
import PlayGround from "./playground/playGround";
import DownArr from "../../components/svg/DownArrow.jsx";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./about.css";

export default function AboutMobile({
  Header1,
  Header2,
  Header3,
  MainText1,
  MainText2,
  MainText3,
}) {
  const [ToSmall, setToSmall] = useState(false);

  function scrollDown() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function handleResize() {
      setToSmall(window.innerWidth < 1000);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="down-container">
        <DownArr onClick={scrollDown} />
      </div>
      {ToSmall === false && <PlayGround />}
      <div className={`mobile-about${ToSmall ? "" : " hidden"}`}>
        <div className="mobile-intro">
          <h4>{Header1}</h4>
          <p>{MainText1}</p>
        </div>
        <div className="mobile-intro">
          <h4>{Header2}</h4>
          <p>{MainText2}</p>
        </div>
        <div className="mobile-intro">
          <h4>{Header3}</h4>
          <p>{MainText3}</p>
        </div>
      </div>
    </>
  );
}

AboutMobile.propTypes = {
  Header1: PropTypes.string.isRequired,
  Header2: PropTypes.string.isRequired,
  Header3: PropTypes.string.isRequired,
  MainText1: PropTypes.string.isRequired,
  MainText2: PropTypes.string.isRequired,
  MainText3: PropTypes.string.isRequired,
};
