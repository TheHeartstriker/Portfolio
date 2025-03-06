import PlayGround from "./Playground/PlayGround";
import { useRef, useState, useEffect } from "react";
import DownArr from "../Images/DownArrow";
import { Header1, Header2, Header3 } from "./Text";
import { MainText1, MainText2, MainText3 } from "./Text";

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

  function TextScramble() {
    let Iter = 0;
    let Interval = setInterval(() => {
      setText((prevText) => {
        //Placeholder
        let newText = prevText
          .split("")
          .map((char, index) => {
            //Dont scramble spaces
            if (char === " ") {
              return char;
            }
            //If we have reached the end of the text
            if (Iter >= Orginal.length) {
              clearInterval(Interval);
              return Orginal[index];
            }
            //Slowly reveal the text
            if (index < Iter) {
              return Orginal[index];
            }
            //Scramble the text
            let Num = Math.floor(Math.random() * 26);
            if (char === char.toUpperCase()) {
              return Alphabet[Num].toUpperCase();
            } else {
              return Alphabet[Num];
            }
          })
          .join("");
        return newText;
      });
      Iter += 0.7;
    }, 40);
    setMouseOver(false);
  }

  useEffect(() => {
    if (MouseOver) {
      TextScramble();
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
          <h3 className="Text3">I build things for the web.</h3>
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
