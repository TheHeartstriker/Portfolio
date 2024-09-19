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
          I am a full stack developer with a passion for creating beautiful and
          functional web applications. I have experience with a variety of
          technologies including HTML, CSS, JavaScript, React, and Node.js. I
          love to learn new things and am always looking for ways to improve my
          skills. In my free time, I enjoy drawing, painting, and playing video
          games. I am currently looking for new opportunities to work on
          exciting projects and expand my knowledge of web development.
        </p>
      </div>
    </>
  );
}

export default About;
