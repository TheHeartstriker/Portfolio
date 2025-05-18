import { useEffect, useState, useRef } from "react";
import { SubjectContainer } from "../../components/scriptorium/index.jsx";

import "./scriptorium.css";

function Scriptorium() {
  return (
    <div className="mainScriptoriumContainer">
      <SubjectContainer
        title="Particle systems"
        subject="Mathematics's / programming "
        description="An introduction to creative coding. Overviews a base line for creating fun and unique web experiences. Such techniques were even used to create this website! Also something great to learn to practice fundamentals and improve problem solving skills. "
      />
    </div>
  );
}

export default Scriptorium;
