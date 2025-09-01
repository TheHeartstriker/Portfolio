"use client";
import PlayGround from "./playground/playGround";
import DownArr from "../../components/svg/DownArrow.jsx";
import { useRef, useState, useEffect } from "react";
import { Header1, Header2, Header3 } from "./text";
import { MainText1, MainText2, MainText3 } from "./text";
import "./about.css";
function About() {
  const ColoredTextRef = useRef(null);

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
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="main-about-container">
        <div className="i-am-container">
          <h1 className="text-1" ref={ColoredTextRef}>
            Hi, my name is
          </h1>
          <h2 className="text-2">Kaden Wildauer.</h2>
          <h3 className="text-3">I build things for the web!</h3>
          <p className="text-4">
            I&apos;m a software engineer specializing in building websites and
            web applications. I enjoy creating efficient, scalable, and visually
            appealing digital experiences. You can find my work here!
          </p>
        </div>
        <div className="down-container">
          <DownArr onClick={scrollDown} />
        </div>
        {ToSmall === false && <PlayGround />}
        <div className={`mobile-about${ToSmall ? "" : " hidden"}`}>
          <div className="journey">
            <h4>{Header1}</h4>
            <p>{MainText1}</p>
          </div>
          <div className="beyond">
            <h4>{Header2}</h4>
            <p>{MainText2}</p>
          </div>
          <div className="more">
            <h4>{Header3}</h4>
            <p>{MainText3}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
