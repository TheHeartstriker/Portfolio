import { useState } from "react";

function Contact() {
  return (
    <div className="ContactContainer">
      <div className="ContactHeader">
        <h3>Contacts</h3>
        <h5>Email:SerKadenWildauer</h5>
        <h3>Code/Github</h3>
        <a
          href="https://github.com/TheHeartstriker"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>Github</h5>
        </a>

        <h3>Linkin</h3>
        <a
          href="https://www.linkedin.com/in/kaden-wildauer-155307337/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>Linkedin</h5>
        </a>
      </div>
    </div>
  );
}

export default Contact;
