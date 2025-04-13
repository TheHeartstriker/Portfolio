import PlayGround from "./playground/playGround";
import DownArr from "../../assets/DownArrow";
import { useRef, useState, useEffect } from "react";
import { Header1, Header2, Header3 } from "./text";
import { MainText1, MainText2, MainText3 } from "./text";
import { TextScramble } from "../../utils/Scramble";
import "./about.css";
function About() {
  const ColoredTextRef = useRef(null);
  const [MouseOver, setMouseOver] = useState(false);
  const [Text, setText] = useState(" Hi, my name is");
  const [ToSmall, setToSmall] = useState(false);
  const Orginal = " Hi, my name is";
  const Alphabet = "abcdefghijklmnopqrstuvwxyz";

  function scrollDown() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (MouseOver) {
      TextScramble(Orginal, Text, Alphabet, setText, 0.5);
      setMouseOver(false);
    }
  }, [MouseOver]);

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
      <div className="MainAboutContainer">
        <div className="IAmContainer">
          <h1
            className="Text1"
            ref={ColoredTextRef}
            onMouseEnter={() => {
              console.log("Mouse entered");
              setMouseOver(true);
            }}
          >
            {Text}
          </h1>
          <h2 className="Text2">Kaden Wildauer.</h2>
          <h3 className="Text3">I build things for the web!</h3>
          <p className="Text4">
            I'm a software engineer specializing in building websites and web
            applications. I enjoy creating efficient, scalable, and visually
            appealing digital experiences. You can find my work here!
          </p>
        </div>
        <DownArr onClick={scrollDown} />
        {ToSmall === false && <PlayGround />}
        {ToSmall && (
          <div className="MobileAbout">
            <div className="Journey">
              <h1>{Header1}</h1>
              <p>{MainText1}</p>
            </div>
            <div className="Beyond">
              <h1>{Header2}</h1>
              <p>{MainText2}</p>
            </div>
            <div className="More">
              <h1>{Header3}</h1>
              <p>{MainText3}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default About;
