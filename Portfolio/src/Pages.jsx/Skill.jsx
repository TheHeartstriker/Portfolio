import { useState } from "react";

function Skill() {
  return (
    <>
      <h1 id="SkillHeader">Skills</h1>
      <div className="SkillContainer">
        <h2>HTML, CSS, Javascript</h2>
      </div>
      <div className="ProjectBase Project1">
        <h2>Dynamic animations</h2>
        <div className="ProjectText Project1Text">
          <h4>
            A front end project that uses React and HTML canvas to create
            interactive and controlable dynamic animations.
          </h4>
          <h3>Link</h3>
          <h3>Code</h3>
        </div>
      </div>
      {/* Second Project */}
      <div className="ProjectBase Project2">
        <h2>Responsive Design</h2>
        <div className="ProjectText Project2Text">
          <h4>
            A front end project that uses React and CSS to create a responsive
            design that works on all devices.
          </h4>
        </div>
      </div>
      {/* Third Project */}
      <div className="ProjectBase Project3">
        <h2>Full Stack Development</h2>
        <div className="ProjectText Project3Text">
          <h4>
            A full stack project that uses React, Node.js, and MongoDB to create
            a full stack web application.
          </h4>
        </div>
      </div>
    </>
  );
}

export default Skill;
