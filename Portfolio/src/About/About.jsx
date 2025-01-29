import { useRef } from "react";
import PlayGround from "./PlayGround";

function About() {
  const Ball1 = useRef(null);
  const Ball2 = useRef(null);
  const Ball3 = useRef(null);

  function scrollDown() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="MainAboutContainer">
        <PlayGround />
        <div className="IAmContainer">
          <h3>
            Hello my name is kaden and I am a
            <span data-text=" Fullstack web developer!"></span>
          </h3>
        </div>
        <button className="MoveDownBtn" onClick={scrollDown}></button>
        <div className="AboutLegend" ref={Ball1}>
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
        </div>
      </div>
    </>
  );
}

export default About;
