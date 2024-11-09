import { useState } from "react";

function Skill() {
  return (
    <>
      <h1 id="SkillHeader">Skills</h1>
      <div className="SkillContainer">
        {/* Make bigger */}
        <h2>
          HTML, CSS, Javascript, Node.js, React.js, Express, Mysql, Azure, AWS,
          Python, Git, JWT, CI/CD, RESTful API, C++,
        </h2>
      </div>
      <div className="ProjectBase Project1">
        <h2>Dynamic animations</h2>
        <div className="ProjectText Project1Text">
          <h4>
            A front end project that uses React and HTML canvas to create
            interactive and controlable dynamic animations. It includes wether
            animations, falling sand simulations, and more. Perfect if you
            happen to have an extra screen thats not being used. Deployed using
            azure.
          </h4>
          <a
            href="https://www.dynamicanimations.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Link</h3>
          </a>
          <a
            href="https://github.com/TheHeartstriker/DynamicAnimations"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Code</h3>
          </a>
        </div>
      </div>
      {/* Second Project */}
      <div className="ProjectBase Project2">
        <h2>ToDo App</h2>
        <div className="ProjectText Project2Text">
          <h4>
            This is a front and backend project that uses React, Node.js,
            express and mysql to create a full stack ToDo app. It includes user
            authentication, and the ability to create, edit, and delete tasks.
            Along with storing them in folders. Deployed using an ec2 instance
            through AWS cloud using Caddy.
          </h4>
          <h3>Link</h3>
          <h3>Code</h3>
        </div>
      </div>
      {/* Third Project */}
      <div className="ProjectBase Project3">
        <h2>Fitness tracker</h2>
        <div className="ProjectText Project3Text">
          <h4>
            A full stack project that uses React, Node.js, express and mysql.
            Gives the user and overview of their fitness progress tracking total
            calories burned, total time spent working out in a spefied period of
            time. Deployed using an ec2 instance through AWS cloud using Caddy.
          </h4>
          <h3>Link</h3>
          <h3>Code</h3>
        </div>
      </div>
    </>
  );
}

export default Skill;
