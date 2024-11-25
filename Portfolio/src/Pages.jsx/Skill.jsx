import { useState } from "react";

function Skill() {
  return (
    <>
      <div className="SkillHeader">
        <h1>Skills and Tools</h1>
      </div>
      <div className="SkillContainer">
        {/* Make bigger */}
        <h2>
          HTML, CSS, Javascript, Node.js, React.js, Express, Mysql, Python, JWT,
          CI/CD, RESTful API, C++, Caddy, Azure, Aws, Figma, Git
        </h2>
      </div>

      <div className="ProjectBase Project1">
        <h2>Dynamic animations</h2>
        <div className="ProjectText Project1Text">
          <h4>
            A front end project that uses React, HTML canvas and complex logic
            to create interactive and controlable dynamic animations. It
            includes wether animations, falling sand simulations, Gravity
            simulations and more. Deployed using azure.
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
            Along with storing them in folders does not require login to be
            used. Deployed using an ec2 instance through AWS cloud using Caddy.
          </h4>
          <a
            href="https://www.genesistodo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Link</h3>
          </a>
          <a
            href="https://github.com/TheHeartstriker/ToDoApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Code</h3>
          </a>
        </div>
      </div>
      {/* Third Project */}
      <div className="ProjectBase Project3">
        <h2>Fitness tracker</h2>
        <div className="ProjectText Project3Text">
          <h4>
            A full stack project that uses React, Node.js, express and mysql.
            Gives the user and overview of their fitness progress tracking total
            calories burned, time, zones, heartrate along with other metrics. It
            also includes the abilty to share data with others also using or
            visiting the application. Deployed using an ec2 instance through AWS
            cloud using Caddy.
          </h4>
          <a
            href="https://www.fgraphs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Link</h3>
          </a>
          <a
            href="https://github.com/TheHeartstriker/FitnessApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>Code</h3>
          </a>
        </div>
      </div>
    </>
  );
}

export default Skill;
