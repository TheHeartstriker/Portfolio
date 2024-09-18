import { useEffect, useState } from "react";

function About() {
  return (
    <div className="IAmContainer">
      <h2>
        Hello my name is kaden and I am a{" "}
        <span style={{ "--i": 0 }} data-text="Designer.">
          Designer.
        </span>
        <span style={{ "--i": 1 }} data-text="Programmer.">
          Programmer.
        </span>
        <span style={{ "--i": 2 }} data-text="Artist.">
          Artist.
        </span>
      </h2>
    </div>
  );
}

export default About;
