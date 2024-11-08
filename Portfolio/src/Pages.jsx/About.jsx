import { useEffect, useState } from "react";

function About() {
  return (
    <>
      <div className="IAmContainer">
        <h3>
          Hello my name is kaden and I am a{" "}
          <span style={{ "--i": 0 }} data-text="Developer.">
            Developer.
          </span>
          <span style={{ "--i": 1 }} data-text="Programmer.">
            Programmer.
          </span>
          <span style={{ "--i": 2 }} data-text="Artist.">
            Artist.
          </span>
        </h3>
      </div>
      <div className="AboutContainer">
        <p>
          <h1>Who am I</h1>
          Hello my name is kaden wildauer and I am a developer, programmer, and
          enginer. I enjoy programming, learning, art, music, books, anime,
          fitness and video games. Yet I am always looking for new ways to
          further myself, my skills and intrests.
        </p>
        <p>
          <h1>How it started</h1>I have always been interested in computers and
          technology I got into programming when I was about 16 with the simple
          goal of keeping my mind sharp... After awhile I got hooked. The idea
          of being able to create almost anything within the confines of a
          computer and share it is unbelievable to me. I find creation and
          improvment to be my reason for living.
        </p>
        <p>
          <h1>What I am working on</h1>
          <p>
            Currently I am working on improving my current projects and skills.
            I also do graphics programming on the side I am sure you did not see
            the intrest suprise! I am also working on a real time typescript
            drawing app similar to r/place.
          </p>
        </p>
      </div>
    </>
  );
}

export default About;
