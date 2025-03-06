import PlayGround from "./Playground/PlayGround";
import { useRef, useState, useEffect } from "react";
import DownArr from "../Images/DownArrow";

function About() {
  const ColoredTextRef = useRef(null);
  const [MouseOver, setMouseOver] = useState(false);
  const Orginal = " Hi, my name is";
  const [Text, setText] = useState(" Hi, my name is");
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
    console.log(MouseOver);
    if (MouseOver) {
      TextScramble();
    }
  }, [MouseOver]);

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
        <PlayGround />
        {/* <div className="AboutLegend" ref={Ball1}>
          <h1>Where I am at and where to see my work</h1>
          <p>
            You can find my current work and projects on my GitHub which is
            located in the contacts section and my live projects and known tech
            stacks in the skills section. Currently I am working on improving my
            current projects and skills. I also do graphics programming on the
            side I am sure you did not see the interest surprise! I am among
            other things taking the cs50 course for fun.
          </p>
        </div>
        <div className="AboutPersonal" ref={Ball2}>
          <h1>Who am I</h1>
          <p>
            Hello my name is kaden wildauer and I am a web developer,
            programmer, and software engineer. I like a variety of things
            including programming, learning, art, music, books, anime, fitness
            and video games. A large part of my life is trying to further my
            interests and skills in these areas. Although currently I am average
            at best in all but programming and fitness.
          </p>
        </div>
        <div className="AboutStart" ref={Ball3}>
          <h1>How it started</h1>
          <p>
            I have always been interested in computers and technology I got into
            programming when I was 16 with the simple goal of keeping my mind
            sharp... After awhile I got hooked. The idea of being able to create
            almost anything within the confines of a computer and share it is
            endlessly entertaining to me. I find creation and improvement in the
            realm of computer science to be very fulfilling.
          </p>
        </div> */}
      </div>
    </>
  );
}

export default About;
