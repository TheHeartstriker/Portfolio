import { useEffect, useState } from "react";

function About() {
  return (
    <>
      <div className="MainAboutContainer">
        <div className="IAmContainer">
          <h3>
            Hello my name is kaden and I am a
            <span data-text=" Fullstack web developer."></span>
          </h3>
        </div>
        <div className="AboutContainer">
          <h1>Who am I</h1>
          <p>
            Hello my name is kaden wildauer and I am a web developer,
            programmer, and software enginer. I like a varity of things
            including programming, learning, art, music, books, anime, fitness
            and video games. A large part of my life is trying to further my
            intrests and skills in these areas. Although currently I am average
            at best in all but programming and fitness.
          </p>
          <h1>How it started</h1>
          <p>
            I have always been interested in computers and technology I got into
            programming when I was 16 with the simple goal of keeping my mind
            sharp... After awhile I got hooked. The idea of being able to create
            almost anything within the confines of a computer and share it is
            endlessly entertaining to me. I find creation and improvment in the
            realm of computer science to be very fulfilling.
          </p>
          <h1>What I am working on</h1>
          <p>
            Currently I am working on improving my current projects and skills.
            I also do graphics programming on the side I am sure you did not see
            the intrest suprise! I am also taking the cs50 course for fun.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
